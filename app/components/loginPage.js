"use client";
import React from 'react';
import { useUserAuth } from '../_utils/auth-context';
import Link from 'next/link';

export default function LoginPage() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleSignIn = async (signInFunction) => {
        try {
            await signInFunction();
        } catch (error) {
            if(error.code === 'auth/popup-closed-by-user') {
                console.log('Popup closed by user. Sign-in Cancelled.')
                alert('Sign-in was cancelled.')
            } else {
            console.error('GitHub sign-in error:', error);
            }
        }
        };

    const handleSignOut = async () => {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.error('Firebase sign-out error:', error);
        }
        };
return (
    <div className="flex justify-center items-center h-screen flex-col">
        {user ? (
        <div className="text-center">
            <p className="text-xl mb-4">Welcome, {user.displayName || 'User'}, {user.email}</p>
            {console.log("user object:", user)}
            <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
            >
                Sign Out
            </button>
            <Link
            href="blogs"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            >
                View Blogs
            </Link>
            <Link 
            href="blogs/create" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
            >
                Create a Blog!
            </Link>
            <Link 
            href="blogs/profile" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
            >
                View Profile
            </Link>
        </div>
        ) : (
        <div className="text-center">
            <p className="text-lg mb-4">Please sign in to continue.</p>
            <button
            onClick={() => handleSignIn(gitHubSignIn)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
            >
                Sign In with GitHub
            </button>
        </div>
        )}
        <footer className="text-center text-gray-500 text-sm mt-8">
            <p>© BlogIt</p>
        </footer>
    </div>
    );
}