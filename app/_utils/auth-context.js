"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
    GoogleAuthProvider
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try{
        await signInWithPopup(auth, provider);
    } catch(error) {
        console.error("Github Sign in error: ", error);
    }
    return signInWithPopup(auth, provider);
    };

    const firebaseSignOut = () => {
    return signOut(auth);
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try{
            await signInWithPopup(auth,provider);
        } catch(error) {
            console.error("Google Sign in error: ", error);
        }
        return signInWithPopup(auth, provider);
    };

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
    }, []);

    return (
    <AuthContext.Provider value={{ user, gitHubSignIn, googleSignIn, firebaseSignOut }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};
