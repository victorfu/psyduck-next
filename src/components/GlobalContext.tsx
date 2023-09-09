"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  FC,
  ReactNode,
} from "react";
import {
  User,
  signInWithPopup,
  signOut as signOutFirebase,
} from "firebase/auth";
import {
  auth,
  googleAuthProvider,
  lineAuthProvider,
} from "@/lib/firebase-web-helper";

interface GlobalContextProps {
  user: User | null;
  signInByGoogle: (callback?: () => void) => void;
  signInByLine: (callback?: () => void) => void;
  signOut: (callback?: () => void) => void;
  loadingAuthState: boolean;
  getAuthProviderName: () => string;
  convertProviderIdToName: (providerId: string) => string;
}

export const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  signInByGoogle: () => {},
  signInByLine: () => {},
  signOut: () => {},
  loadingAuthState: true,
  getAuthProviderName: () => "",
  convertProviderIdToName: () => "",
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
  const [loadingAuthState, setLoadingAuthState] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/account")
      .then(async (res) => {
        const { user } = await res.json();
        setUser(user);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      })
      .finally(() => {
        setLoadingAuthState(false);
      });
  }, []);

  const signInByGoogle = useCallback(async (callback?: () => void) => {
    setLoadingAuthState(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();
      const { user } = await login(idToken);
      setUser(user);

      if (callback) callback();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAuthState(false);
    }
  }, []);

  const signInByLine = useCallback(async (callback?: () => void) => {
    setLoadingAuthState(true);
    try {
      const result = await signInWithPopup(auth, lineAuthProvider);
      const idToken = await result.user.getIdToken();
      const { user } = await login(idToken);
      setUser(user);

      if (callback) callback();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAuthState(false);
    }
  }, []);

  const signOut = useCallback(async (callback?: () => void) => {
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

      if (callback) callback();
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

  const convertProviderIdToName = (providerId: string): string => {
    if (providerId === "google.com") {
      return "Google";
    }
    if (providerId === "oidc.line") {
      return "LINE";
    }
    return providerId;
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        signInByGoogle,
        signInByLine,
        signOut,
        loadingAuthState,
        getAuthProviderName,
        convertProviderIdToName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
