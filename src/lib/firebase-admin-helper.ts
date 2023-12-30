import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { UserRecord, getAuth } from "firebase-admin/auth";
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

export async function getUser(uid: string): Promise<UserRecord> {
  return await adminAuth.getUser(uid);
}

export async function listUsers(
  nextPageToken?: string,
  allUsers: UserRecord[] = [],
) {
  try {
    const listUsersResult = await getAuth().listUsers(1000, nextPageToken);
    const currentUsers = listUsersResult.users.map((userRecord) => userRecord);
    allUsers.push(...currentUsers);

    if (listUsersResult.pageToken) {
      return listUsers(listUsersResult.pageToken, allUsers);
    } else {
      return allUsers;
    }
  } catch (error) {
    console.error("Error listing users:", error);
    throw error;
  }
}

export async function verifyIdTokenAndGetUser(
  token: string,
): Promise<UserRecord> {
  const decodedToken = await adminAuth.verifyIdToken(token, true);
  const uid = decodedToken.uid;
  return await adminAuth.getUser(uid);
}

export async function verifySessionCookieAndGetUser(
  sessionCookie: string,
): Promise<UserRecord> {
  const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
  return await adminAuth.getUser(decodedToken.uid);
}

export default admin;
