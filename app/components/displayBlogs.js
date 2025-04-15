"use client";
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../_utils/firebase';
import Link from 'next/link';

export default function DisplayBlogs() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const fetchedPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sort posts by createdAt in descending order (newest first)
                fetchedPosts.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

                setPosts(fetchedPosts);
                setLoading(false);
            } catch (e) {
                setError('Failed to fetch blog posts.');
                console.error('Error fetching posts:', e);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); 

    if (loading) {
        return <p className="text-center my-8">Loading blog posts...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center my-8">{error}</p>;
    }

    return (
        <article className="max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-md font-sans bg-gray-100">
            <header className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Blog Posts </h2> 
                <div className='mt-2 flex justify-end'>
                <Link 
                href="blogs/create" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                >
                    Create a Post!
                </Link> 
                </div>               
            </header>
            {posts.length > 0 ? (
                <div className="space-y-4"> 
                    {posts.map(post => (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h3> 
                            <p className="text-gray-700 text-sm mb-1">Author: {post.author}</p> 
                            <p className="text-gray-800">{post.content.substring(0, 100)}...</p> 
                            <div className="mt-2 flex justify-end"> 
                                <Link href={`/blogs/${post.id}`} passHref>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"> 
                                        Read More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-700">No blog posts available yet.</p>
            )}
            <footer className="text-center text-gray-500 text-sm mt-8">
                <p>© BlogIt</p>
            </footer>
        </article>
    );
}