import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL || "")),
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
};

function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    return initializeApp(firebaseAdminConfig);
  } else {
    return getApp();
  }
}

const admin = initializeFirebaseAdmin();
export const adminAuth = getAuth(admin);
export const adminFirestore = getFirestore(admin);

export async function getUser(uid: string) {
  const user = await adminAuth.getUser(uid);
  return { error: null, user };
}

export async function listUsers() {
  const { users } = await adminAuth.listUsers();
  return users;
}

export async function verifyIdTokenAndGetUser(token: string) {
  const decodedToken = await adminAuth.verifyIdToken(token, true);
  const uid = decodedToken.uid;
  return await adminAuth.getUser(uid);
}

export async function verifySessionCookieAndGetUser(sessionCookie: string) {
  const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
  return await adminAuth.getUser(decodedToken.uid);
}

export default admin;
