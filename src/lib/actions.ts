"use server";

import { adminAuth, adminFirestore } from "@/lib/firebase-admin-helper";
import { searchHosp } from "@/lib/nhi-apis";
import { getUserFromHeader } from "@/lib/session-utils";
import { revalidatePath } from "next/cache";

export async function search(formData: FormData, path?: string) {
  const question = formData.get("question");
  if (!question) return { error: "Question is required" };

  const trimQuestion = (question as string).trim();
  const result = await searchHosp("", trimQuestion, "", "", "", "", 0, 0);
  if (path) revalidatePath(path);
  return result;
}

export async function toggleAdminPermission(
  uid: string,
  isAdmin: boolean,
  path?: string,
) {
  try {
    if (uid === process.env.OWNER_UID) {
      return { error: "Cannot change owner status" };
    }
    const user = getUserFromHeader();
    if (!user) return { error: "User is empty" };
    if (!user.customClaims.isAdmin) return { error: "User is not admin" };

    await adminAuth.setCustomUserClaims(uid, { isAdmin: !isAdmin });
    if (path) revalidatePath(path);
    return { error: undefined };
  } catch (error) {
    return { error: "Failed to toggle admin status" };
  }
}

export async function getProfile(): Promise<any> {
  const user = getUserFromHeader();
  if (!user) return { error: "User is empty" };

  const uid = user.uid;
  try {
    const doc = await adminFirestore.collection("users").doc(uid).get();
    const userData = doc.exists ? { profile: { ...doc.data() } } : {};
    return {
      error: undefined,
      user: {
        ...user,
        ...userData,
        uid,
      },
    };
  } catch (error) {
    console.error(error);
    return { error: "Error getting profile" };
  }
}

export async function updateProfile(formData: FormData, path?: string) {
  const user = getUserFromHeader();
  if (!user) return { error: "User is empty" };

  const uid = user.uid;
  const name = formData.get("name");
  const country = formData.get("country");
  const streetAddress = formData.get("street-address");
  const city = formData.get("city");
  const postalCode = formData.get("postal-code");

  const data = {
    name,
    address: {
      country: country,
      streetAddress: streetAddress,
      city: city,
      postalCode: postalCode,
    },
    updatedAt: new Date().toISOString(),
    updatedBy: user.uid,
  };

  try {
    await adminFirestore
      .collection("users")
      .doc(uid)
      .set(data, { merge: true });
    if (path) revalidatePath(path);
    return { error: undefined };
  } catch (error) {
    console.error(error);
    return { error: "Error updating profile" };
  }
}
