// src/services/chatService.js
import {
    doc, setDoc, collection, addDoc,
    query, orderBy, onSnapshot, serverTimestamp,
    where, deleteDoc, getDocs, updateDoc, increment
  } from "firebase/firestore";
  import { db } from "../utils/firebase";
  
  export const makeChatId = (a, b) =>
    [a, b].map(s => String(s).trim()).sort().join("__");
  
  // ينشئ المحادثة لو مش موجودة ويرجع chatId
  export async function createOrGetChat(userA, userB) {
    const chatId = makeChatId(userA, userB);
    await setDoc(doc(db, "chats", chatId), {
      users: [userA, userB],
      updatedAt: serverTimestamp()
    }, { merge: true });
    return chatId;
  }
  
  // إرسال رسالة (ويحدّث lastMessage)
  export async function sendMessage(chatId, senderId, text) {
    const messagesCol = collection(db, "chats", chatId, "messages");
    await addDoc(messagesCol, {
      senderId,
      text,
      createdAt: serverTimestamp(),
      isRead: false
    });

    // استنتاج المستلم مباشرةً من chatId لتجنّب استعلام إضافي
    // chatId مُكوَّن من userA__userB (مرتّبين)
    const parts = String(chatId).split("__");
    let otherUserId = null;
    if (parts.length === 2) {
      const [a, b] = parts;
      otherUserId = String(a) === String(senderId) ? String(b) : String(a);
    }

    // تحديث المحادثة بآخر رسالة وزيادة عدد غير المقروء للمستلم
    const updateData = {
      lastMessage: { text, senderId, createdAt: serverTimestamp(), isRead: false },
      updatedAt: serverTimestamp(),
    };

    if (otherUserId) {
      updateData[`unreadCount.${otherUserId}`] = increment(1);
    }

    await setDoc(doc(db, "chats", chatId), updateData, { merge: true });
  }
  
  // اشتراك realtime على رسائل محادثة
  export function listenForMessages(chatId, onUpdate) {
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc"));
    return onSnapshot(q, snap => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      onUpdate(msgs);
    });
  }
  
  // اشتراك realtime لقائمة محادثات لمستخدم (يعتمد users array)
  export function listenForUserChats(userId, onUpdate) {
    // قد تحتاج إنشاء index إذا استخدمت orderBy مع where
    const q = query(collection(db, "chats"), where("users", "array-contains", userId));
    return onSnapshot(q, snap => {
      const chats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      onUpdate(chats);
    });
  }

  // Set typing indicator
  export async function setTypingStatus(chatId, userId, isTyping) {
    try {
      await setDoc(doc(db, "chats", chatId, "typing", userId), {
        isTyping,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error setting typing status:", error);
    }
  }

  // Listen for typing indicators
  export function listenForTyping(chatId, onUpdate) {
    const typingRef = collection(db, "chats", chatId, "typing");
    return onSnapshot(typingRef, snap => {
      const typingUsers = {};
      snap.docs.forEach(doc => {
        const data = doc.data();
        if (data.isTyping) {
          typingUsers[doc.id] = data;
        }
      });
      onUpdate(typingUsers);
    });
  }

  // Mark messages as read
  export async function markMessagesAsRead(chatId, userId) {
    try {
      // Update unread count for this user
      await updateDoc(doc(db, "chats", chatId), {
        [`unreadCount.${userId}`]: 0,
        "lastMessage.isRead": true
      });
      
      // Mark all messages as read
      const messagesQuery = query(
        collection(db, "chats", chatId, "messages"),
        where("isRead", "==", false)
      );
      const snapshot = await getDocs(messagesQuery);
      
      const batch = [];
      snapshot.forEach(doc => {
        if (doc.data().senderId !== userId) {
          batch.push(updateDoc(doc.ref, { isRead: true }));
        }
      });
      
      await Promise.all(batch);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  }

  // Delete a chat conversation
  export async function deleteChat(chatId, userId) {
    try {
      // Delete all messages
      const messagesQuery = collection(db, "chats", chatId, "messages");
      const messagesSnapshot = await getDocs(messagesQuery);
      
      const deletePromises = [];
      messagesSnapshot.forEach(doc => {
        deletePromises.push(deleteDoc(doc.ref));
      });
      
      // Delete typing indicators
      const typingQuery = collection(db, "chats", chatId, "typing");
      const typingSnapshot = await getDocs(typingQuery);
      typingSnapshot.forEach(doc => {
        deletePromises.push(deleteDoc(doc.ref));
      });
      
      await Promise.all(deletePromises);
      
      // Delete the chat document itself
      await deleteDoc(doc(db, "chats", chatId));
      
      return true;
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  }

  // Delete entire conversation (alias for deleteChat)
  export const deleteConversation = deleteChat;
