'use client';

import { createContext, useContext } from 'react';
import { useFirebaseAuth } from './useFirebaseAuth';
import { UserType } from './user';
import { UserCredential } from 'firebase/auth';

interface AuthType {
  user: UserType;
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<string | UserCredential | unknown | undefined>;
  logIn: (
    email: string,
    password: string
  ) => Promise<string | UserCredential | undefined>;
  logInWithGoogle: () => Promise<string | UserCredential | undefined>;
  logOut: () => Promise<void>;
  updateName: (text: string) => Promise<void>;
  updateUsername: (text: string) => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<any>;
}

export const authUserContext = createContext<AuthType>({
  user: {
    id: null,
    name: null,
    email: null,
    username: null,
    level: null,
    points: null,
    savedQuizzes: [],
    historyQuizzes: [],
  },
  signUp: async function (
    username: string,
    email: string,
    password: string
  ): Promise<string | UserCredential | unknown | undefined> {
    throw new Error('Function not implemented.');
  },
  logIn: function (
    email: string,
    password: string
  ): Promise<string | UserCredential | undefined> {
    throw new Error('Function not implemented.');
  },
  logInWithGoogle: function (): Promise<string | UserCredential | undefined> {
    throw new Error('Function not implemented.');
  },
  logOut: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updateName: function (name: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updateUsername: function (username: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  sendResetPasswordEmail: function (email: string): Promise<any> {
    throw new Error('Function not implemented.');
  },
});

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
