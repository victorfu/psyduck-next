"use client";

import { createContext, useCallback, FC, ReactNode } from "react";
import { signInWithPopup, signOut as signOutFirebase } from "firebase/auth";
import {
  auth,
  googleAuthProvider,
  lineAuthProvider,
} from "@/lib/firebase-web-helper";

interface GlobalContextProps {
  signInByGoogle: () => Promise<User | null>;
  signInByLine: () => Promise<User | null>;
  signOut: () => Promise<void>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  signInByGoogle: () => Promise.resolve<User | null>(null),
  signInByLine: () => Promise.resolve<User | null>(null),
  signOut: () => Promise.resolve(),
});

interface GlobalProviderProps {
  children: ReactNode;
}

const login = async (idToken: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  };
  const res = await fetch(`/api/login`, options);
  return await res.json();
};

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const signInByGoogle = useCallback(async (): Promise<User | null> => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();
      const { user } = await login(idToken);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const signInByLine = useCallback(async (): Promise<User | null> => {
    try {
      const result = await signInWithPopup(auth, lineAuthProvider);
      const idToken = await result.user.getIdToken();
      const { user } = await login(idToken);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await signOutFirebase(auth);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`/api/logout`, options);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        signInByGoogle,
        signInByLine,
        signOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
