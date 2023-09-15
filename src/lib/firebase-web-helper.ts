import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
  signOut as signOutFirebase,
} from "firebase/auth";
import { postLogin } from "./apis";

let app: FirebaseApp;
if (!getApps().length) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  };
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});
const lineAuthProvider = new OAuthProvider("oidc.line");
lineAuthProvider.addScope("openid");

export const signInByGoogle = async (): Promise<User | undefined> => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const idToken = await result.user.getIdToken();
    const { user } = await postLogin(idToken);
    return user;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const signInByLine = async (): Promise<User | undefined> => {
  try {
    const result = await signInWithPopup(auth, lineAuthProvider);
    const idToken = await result.user.getIdToken();
    const { user } = await postLogin(idToken);
    return user;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const signOut = async () => {
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
};

export { app, googleAuthProvider, lineAuthProvider };
