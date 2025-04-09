import { db } from "../_utils/firebase";
import {collection, getDocs, addDoc, deleteDoc, doc, where, query} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import blogPost from '../types/blogTypes';

async function getItems(authorID) {
    try {
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, where("authorId", "==", authorID));
        const postsGet = await getDocs(q);
        const blogPosts = [];

        postsGet.forEach((doc) => {
            const data = doc.data();
            const blog = new blogPost(
                data.title,
                data.date,
                data.content,
                data.authorID,
                doc.id
            );
            blogPosts.push(blog);
        });
        return posts;
    } catch (error) {
        console.error("Error getting posts: ", error);
        return [];
    }
}

async function addItem(blogPost) {
    try {
        const postsCollection = collection(db, "posts");
        const docRef = await addDoc(postsCollection , {
            title: blogPost.title,
            date: blogPost.date,
            content: blogPost.content,
            userId: blogPost.userId,
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
        console.log(`Post with ID ${itemId} deleted succesfully`);
    } catch (error) {
        console.error("Error deleting post: ", error);
    }
}

export { getItems, addItem, deleteItem };