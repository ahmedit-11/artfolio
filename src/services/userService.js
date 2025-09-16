import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";

// Create or update user profile
export async function createOrUpdateUserProfile(userId, userData) {
  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      nameLower: (userData?.name || "").toLowerCase(),
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
  }
}
