"use client";

import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../_utils/firebase';
import Link from 'next/link';
import { useUserAuth } from '../_utils/auth-context'; 

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const { user } = useUserAuth(); 

    useEffect(() => {
        if (user) {
            if (user.displayName) {
                setAuthor(user.displayName);
            } else if (user.email) {
                const emailParts = user.email.split('@');
                setAuthor(emailParts[0]);
            }
        }
    }, [user]); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmissionError(null);
        setSubmissionSuccess(false);

        try {
            const docRef = await addDoc(collection(db, 'posts'), {
                title: title,
                content: content,
                author: author,
                createdAt: serverTimestamp(),
            });
            console.log('Document written with ID: ', docRef.id);
            setTitle('');
            setContent('');
            setSubmissionSuccess(true);
        } catch (error) {
            console.error('Error adding document: ', error);
            setSubmissionError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <article className="max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-md font-sans bg-gray-100">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">Create New Blog Post</h1>
            </header>
            <form onSubmit={handleSubmit} className="leading-relaxed text-base">
                <div className='mb-6'>
                <label htmlFor="blogAuthor" className="block text-gray-800 text-sm font-bold mb-2">
                        Blog Author
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="blogAuthor"
                        type="text"
                        placeholder="Enter Author Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        readOnly
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="blogTitle" className="block text-gray-800 text-sm font-bold mb-2">
                        Blog Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="blogTitle"
                        type="text"
                        placeholder="Enter blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-gray-800 text-sm font-bold mb-2">
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
                        id="content"
                        placeholder="Write your blog content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-between">
                <Link
                    href="../blogs"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 flex"
                    >
                        Blog Home
                </Link>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 focus:outline-none focus:shadow-outline cursor-pointer "
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>

                {submissionError && (
                    <p className="text-red-500 text-xs italic mt-4">Error: {submissionError}</p>
                )}
                {submissionSuccess && (
                    <p className="text-green-500 text-xs italic mt-4">Blog post saved successfully!</p>
                )}
            </form>
            <footer className="text-center text-gray-500 text-sm mt-8">
                <p>© BlogIt</p>
            </footer>
        </article>
    );
}