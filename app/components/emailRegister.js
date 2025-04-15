"use client";
import React, { useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EmailRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { emailSignUp } = useUserAuth();
    const router = useRouter();

    const handleSignUp = async () => {
        setError('');
        try {
            await emailSignUp(email, password);
            router.push('/'); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <article className="max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-md font-sans bg-gray-100">
            <header className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign Up</h2>
            </header>
            <div className="mb-4">
                {error && <p className="text-red-500 text-sm italic mb-2">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={handleSignUp}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                    <p className="text-gray-600 text-sm">
                        Already have an account?
                        <Link href="/" className="text-blue-500 hover:underline ml-1">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </article>
    );
}