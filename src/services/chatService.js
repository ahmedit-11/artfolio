// src/services/chatService.js
import {
    doc, setDoc, collection, addDoc,
    query, orderBy, onSnapshot, serverTimestamp,
    where, deleteDoc, getDocs, updateDoc
  } from "firebase/firestore";
  import { db } from "../utils/firebase";
  
  export const makeChatId = (a, b) =>
    [a, b].map(s => String(s).trim()).sort().join("__");
  
  // ينشئ المحادثة لو مش موجودة ويرجع chatId
  export async function createOrGetChat(userA, userB) {
    const chatId = makeChatId(userA, userB);
    const userAStr = String(userA);
    const userBStr = String(userB);
    await setDoc(doc(db, "chats", chatId), {
      users: [userAStr, userBStr],
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
      createdAt: serverTimestamp()
    });

    // تحديث المحادثة بآخر رسالة
    const updateData = {
      lastMessage: { 
        text,
        senderId,
        createdAt: serverTimestamp()
      },
      updatedAt: serverTimestamp()
    };

    await updateDoc(doc(db, "chats", chatId), updateData);
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
    const q = query(collection(db, "chats"), where("users", "array-contains", String(userId)));
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

