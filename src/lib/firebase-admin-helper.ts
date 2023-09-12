import { Logger } from "@/lib/logger";
import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL || "")),
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
};

function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    Logger.log(`Firestore initialized`);
    return initializeApp(firebaseAdminConfig);
  } else {
    Logger.log(`Firestore resused`);
    return getApp();
  }
}

const admin = initializeFirebaseAdmin();
export const adminAuth = getAuth(admin);

export async function getUser(uid: string) {
  try {
    return await adminAuth.getUser(uid);
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

export async function listUsers() {
  try {
    const { users } = await adminAuth.listUsers();
    return users;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error;
  }
}

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

export async function verifySessionCookie(sessionCookie: string) {
  try {
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true,
    );
    return decodedToken;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
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
