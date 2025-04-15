"use client";
import React, {useState} from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";



export default function EmailLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { emailSignIn } = useUserAuth();
    const router = useRouter();

    const handleSignIn = async () => {
        setError('');
        try {
            await emailSignIn(email, password);
            router.push('/'); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <article className="max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-md font-sans bg-gray-100">
            <header className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Login with Email</h2>
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
                        onClick={handleSignIn}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => router.push('register')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </div>
            </div>
        </article>
    );
}