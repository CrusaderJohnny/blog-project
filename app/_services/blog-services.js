import { db } from "../_utils/firebase";
import {collection, getDocs, addDoc, deleteDoc, doc, where, query} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

async function getItems(authorID) {
    try {
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, where("authorId", "==", authorID));
        const postsGet = await getDocs(q);
        const posts = [];

        postsGet.forEach((doc) => {
        posts.push({
            id: doc.id,
            ...doc.data(),
        });
        });
        return posts;
    } catch (error) {
        console.error("Error getting posts: ", error);
        return [];
    }
}

async function addItem(authorID, item) {
    try {
        const postsCollection = collection(db, "posts");
        const docRef = await addDoc(postsCollection, {
        ...item,
        authorId: authorID,
        createdAt: serverTimestamp(), 
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding post: ", error);
        return null;
    }
}

async function deleteItem(itemId) {
    try {
        const postDoc = doc(db, "posts", itemId);
        await deleteDoc(postDoc);
    } catch (error) {
        console.error("Error deleting post: ", error);
    }
}

export { getItems, addItem, deleteItem };