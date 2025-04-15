"use client";
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../_utils/firebase';
import { useRouter } from 'next/navigation'; 

export default function SingleBlogPage({ params }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter(); 

    const { id } = params;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, 'posts', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('Blog post not found.');
                }
                setLoading(false);
            } catch (e) {
                setError('Failed to fetch blog post.');
                console.error('Error fetching post:', e);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <p className="text-center my-8">Loading blog post...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center my-8">{error}</p>;
    }

    if (!post) {
        return <p className="text-center my-8">Blog post not found.</p>;
    }

    return (
        <article className="max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-md font-sans bg-gray-100"> 
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <p className="text-gray-700 text-sm">Author: {post.author}</p> 
            </header>
            <article className="leading-relaxed text-lg text-gray-800"> 
                {post.content}
            </article>
            <div className="mt-8 text-center">
                <button
                    onClick={() => router.back()}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                    Back to Home
                </button>
            </div>
        </article>
    );
}