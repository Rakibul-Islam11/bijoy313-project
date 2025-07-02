import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification
} from "firebase/auth";
import { app } from "../../../firbase.config";

export const authContext = createContext(null);
export const auth = getAuth(app);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user with email and pass
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //send email verification
    const sendVerificationEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    //sign in
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign out
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    //update profile
    const updateUserProfile = (name, photoURL, referCode) => {
        console.log("referCode from param:", referCode);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL || "https://i.ibb.co/h1m0f8yD/Untitled-design-1.png",
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("Current User:", currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const serveDATA = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        sendVerificationEmail,
        
    };

    return (
        <authContext.Provider value={serveDATA}>
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;