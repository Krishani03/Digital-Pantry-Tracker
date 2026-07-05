import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth } from "./firebase";

const pantryCollection = collection(db, "pantryItems");

// 1. Add a new item
export const addItem = async (name: string, quantity: number, unit: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    return await addDoc(pantryCollection, {
        userId: user.uid,
        name,
        quantity,
        unit,
        createdAt: new Date()
    });
};

// 2. Fetch all items for the logged-in user
export const getAllItems = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const q = query(pantryCollection, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
};

// 3. Delete an item
export const deleteItem = async (itemId: string) => {
    const itemDoc = doc(db, "pantryItems", itemId);
    await deleteDoc(itemDoc);
};