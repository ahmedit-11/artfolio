// src/services/userService.js
import {
  doc, getDoc, setDoc, collection, getDocs,
  query, where, updateDoc, serverTimestamp,
  orderBy, startAt, endAt
} from "firebase/firestore";
import { db } from "../utils/firebase";

// Get user profile data
export async function getUserProfile(userId) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}

// Create or update user profile
export async function createOrUpdateUserProfile(userId, userData) {
  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      // normalized fields for case-insensitive search
      nameLower: (userData?.name || "").toLowerCase(),
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
  }
}


// Search users for starting new chats
export async function searchUsers(searchTerm) {
  try {
    const rawTerm = (searchTerm || "").trim();
    if (!rawTerm) return [];
    const term = rawTerm.toLowerCase();
    const usersRef = collection(db, "users");
    // Primary: case-insensitive prefix search using normalized field
    try {
      const q1 = query(
        usersRef,
        orderBy("nameLower"),
        startAt(term),
        endAt(term + '\uf8ff')
      );
      const snap1 = await getDocs(q1);
      if (!snap1.empty) {
        return snap1.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      // ignore and fallback
    }

    // Fallback: case-sensitive prefix search on 'name'
    try {
      const q2 = query(
        usersRef,
        orderBy("name"),
        startAt(rawTerm),
        endAt(rawTerm + '\uf8ff')
      );
      const snap2 = await getDocs(q2);
      if (!snap2.empty) {
        return snap2.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      // ignore and fallback
    }

    // Last resort: client-side filter (testing only)
    const allSnap = await getDocs(usersRef);
    return allSnap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(u => (u.name || "").toLowerCase().includes(term));
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
}

// Get multiple user profiles
export async function getUserProfiles(userIds) {
  try {
    const profiles = {};
    const promises = userIds.map(async (userId) => {
      const profile = await getUserProfile(userId);
      if (profile) {
        profiles[userId] = profile;
      }
    });
    
    await Promise.all(promises);
    return profiles;
  } catch (error) {
    console.error("Error getting user profiles:", error);
    return {};
  }
}
