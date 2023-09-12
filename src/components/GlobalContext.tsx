"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  FC,
  ReactNode,
} from "react";
import { signInWithPopup, signOut as signOutFirebase } from "firebase/auth";
import {
  auth,
  googleAuthProvider,
  lineAuthProvider,
} from "@/lib/firebase-web-helper";
import { convertProviderIdToName } from "@/utils/convertProviderIdToName";

interface GlobalContextProps {
  user: User | null;
  signInByGoogle: () => Promise<void>;
  signInByLine: () => Promise<void>;
  signOut: () => Promise<void>;
  getAuthProviderName: () => string;
}

export const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  signInByGoogle: () => Promise.resolve(),
  signInByLine: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  getAuthProviderName: () => "",
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
  const result = await res.json();
  return result;
};

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/account")
      .then(async (res) => {
        const { user } = await res.json();
        setUser(user);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      });
  }, []);

  const signInByGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();
      const { user } = await login(idToken);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const signInByLine = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, lineAuthProvider);
      const idToken = await result.user.getIdToken();
      const { user } = await login(idToken);
      setUser(user);
    } catch (error) {
      console.error(error);
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
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getAuthProviderName = (): string => {
    if (user && user.providerData && user.providerData.length > 0) {
      return convertProviderIdToName(user.providerData[0].providerId);
    }
    return "";
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        signInByGoogle,
        signInByLine,
        signOut,
        getAuthProviderName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
