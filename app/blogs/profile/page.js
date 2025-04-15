"use client";

import Image from 'next/image';
import React, {useEffect} from 'react';
import { useUserAuth } from '@/app/_utils/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
    const { user } = useUserAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    const displayNameToShow = () => {
        if (user.displayName) {
            return user.displayName;
        }
        if (user.email) {
            return user.email.split('@')[0];
        }
        return 'Not available';
    };

    return (
        <article className="max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-md font-sans bg-gray-100">
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Profile</h1>
            </header>
            <div className="flex items-center gap-4 mb-4"> 
                {user.photoURL && (
                    <div className="shrink-0">
                        <Image
                            src={user.photoURL}
                            alt="Profile"
                            className="rounded-lg object-cover shadow-md" 
                            width={96}
                            height={96}
                        />
                    </div>
                )}
                <div>
                    <p className="text-lg text-gray-800 mb-1">Display Name: {displayNameToShow()}</p>
                    <p className="text-lg text-gray-800 mb-1">Email: {user.email || 'Not available'}</p>
                </div>
            </div>
            <div className="mt-8 text-center">
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline">
                    Back to Home
                </Link>
                <Link href="../blogs" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline">
                    View Blogs
                </Link>
                <Link href="create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline">
                    Create a Blog
                </Link>
            </div>
            <footer className="text-center text-gray-500 text-sm mt-8">
                <p>© BlogIt</p>
            </footer>
        </article>
    );
}