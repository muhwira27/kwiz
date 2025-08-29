'use client';

import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db } from '../config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { UserType, userConverter } from './user';
import { FirebaseError } from 'firebase/app';

export function useFirebaseAuth() {
  const [user, setUser] = useState<UserType>({
    id: null,
    name: null,
    email: null,
    username: null,
    level: null,
    points: null,
    savedQuizzes: [],
    historyQuizzes: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            username: userData.username,
            level: userData.level,
            points: userData.points,
            savedQuizzes: userData.savedQuizzes ?? [],
            historyQuizzes: userData.historyQuizzes ?? [],
          });
        } else {
          // Fallback when user doc isn't created yet (e.g., first Google login)
          setUser({
            id: user.uid,
            name: user.displayName ?? null,
            email: user.email ?? null,
            username: user.displayName ?? null,
            level: 0,
            points: 0,
            savedQuizzes: [],
            historyQuizzes: [],
          });
        }
      } else {
        setUser({
          id: null,
          name: null,
          email: null,
          username: null,
          level: null,
          points: null,
          savedQuizzes: [],
          historyQuizzes: [],
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const getUserData = async (uid: string) => {
    const docRef = doc(db, 'user', uid).withConverter(userConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user;
    } else {
      return null;
    }
  };

  const signUp = async (
    username: string,
    email: string,
    password: string
  ): Promise<any> => {
    try {
      const usersRef = collection(db, 'user');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return 'Username already exists';
      }
      const userCredential = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const credential = await userCredential;
      const newUserData = {
        id: credential.user.uid,
        name: username,
        email: email,
        username: username,
        level: 1,
        points: 0,
        savedQuizzes: [] as string[],
        historyQuizzes: [] as string[],
      } as unknown as UserType;
      await setDoc(doc(db, 'user', newUserData.id!), newUserData);
      await sendEmailVerification(credential.user);

      // create session
      const sessionData = {
        email: credential.user.email,
      };
      await setSessionCookie(sessionData);
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code == 'auth/email-already-in-use') {
          return 'Email already in use';
        } else if (e.code == 'auth/invalid-email') {
          return 'Invalid email address';
        } else if (e.code == 'auth/weak-password') {
          return 'Password should be at least 6 characters';
        } else {
          return e.code;
        }
      }
      return e;
    }
  };

  const logIn = async (
    email: string,
    password: string
  ): Promise<string | UserCredential | undefined> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // create session
      const sessionData = {
        email: email,
      };
      await setSessionCookie(sessionData);
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        if (e.code == 'auth/invalid-credential') {
          return "Oops! We couldn't log you in. Please double-check your email and password, then try again.";
        } else if (e.code == 'auth/invalid-email') {
          return 'Invalid email address';
        } else {
          return e.code;
        }
      }
    }
  };

  const logInWithGoogle = async (): Promise<
    string | UserCredential | undefined
  > => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const document = await getDoc(doc(db, 'user', user.uid));
      if (!document.exists()) {
        const newUserData = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          username: user.displayName,
          level: 0,
          points: 0,
          savedQuizzes: [] as string[],
          historyQuizzes: [] as string[],
        } as unknown as UserType;
        await setDoc(doc(db, 'user', newUserData.id!), newUserData);
        // Google accounts are typically already verified; ignore verification here
      }

      // create session
      const sessionData = {
        email: user.email,
      };
      await setSessionCookie(sessionData);

      return result;
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async (): Promise<void> => {
    setUser({
      id: null,
      name: null,
      email: null,
      username: null,
      level: null,
      points: null,
      savedQuizzes: [],
      historyQuizzes: [],
    });
    await clearSessionCookie();
    return await signOut(auth);
  };

  const updateName = async (name: string): Promise<void> => {
    await updateDoc(doc(db, 'user', user.id!), {
      name: name,
    });
    setUser({
      ...user,
      name: name,
    });
  };

  const updateUsername = async (username: string): Promise<void> => {
    await updateDoc(doc(db, 'user', user.id!), {
      username: username,
    });
    setUser({
      ...user,
      username: username,
    });
  };

  const sendResetPasswordEmail = async (email: string): Promise<any> => {
    try {
      const usersRef = collection(db, 'user');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return 'Email is not registered';
      }

      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code == 'auth/invalid-email') {
          return 'Invalid email address';
        } else {
          return e.code;
        }
      }
    }
  };

  return {
    user,
    signUp,
    logIn,
    logInWithGoogle,
    logOut,
    updateName,
    updateUsername,
    sendResetPasswordEmail,
  };
}
  const setSessionCookie = async (data: any) => {
    try {
      await fetch('/api/session/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const clearSessionCookie = async () => {
    try {
      await fetch('/api/session/delete', { method: 'POST' });
    } catch (e) {
      console.log(e);
    }
  };
