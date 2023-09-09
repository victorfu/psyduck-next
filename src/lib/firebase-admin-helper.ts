import {
  applicationDefault,
  getApp,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  credential: applicationDefault(),
};

function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    console.info(`Firestore initialized`);
    return initializeApp(firebaseAdminConfig);
  } else {
    console.info(`Firestore resused`);
    return getApp();
  }
}

const admin = initializeFirebaseAdmin();
export const adminAuth = getAuth(admin);

export async function verifyIdTokenAndGetUser(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token, true);
    const uid = decodedToken.uid;
    return await adminAuth.getUser(uid);
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw error;
  }
}

export async function verifySessionCookieAndGetUser(sessionCookie: string) {
  try {
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true,
    );
    return await adminAuth.getUser(decodedToken.uid);
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    throw error;
  }
}

export default admin;
