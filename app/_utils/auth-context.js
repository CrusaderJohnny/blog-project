"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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

    const emailSignUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Email Sign Up error: ", error);
            throw error;
        }
    };

    const emailSignIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Email Sign In error: ", error);
            throw error;
        }
    };

    const firebaseSignOut = () => {
    return signOut(auth);
    };

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
    }, []);

    return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut, emailSignIn, emailSignUp }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};
