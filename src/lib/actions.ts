"use server";

import { adminAuth, adminFirestore } from "@/lib/firebase-admin-helper";
import { searchHosp } from "@/lib/nhi-apis";
import { getUserFromHeader } from "@/lib/session-utils";
import { revalidatePath } from "next/cache";

function protectOwner(uid: string) {
  console.log(uid, process.env.OWNER_UID);
  if (uid !== process.env.OWNER_UID) {
    throw new Error("Cannot adjust owner's permission");
  }
}

function validateUser(): User {
  const user = getUserFromHeader();
  if (!user) throw new Error("User is empty");
  return user;
}

function validateAdmin(user: User): void {
  if (!user.customClaims.isAdmin) throw new Error("User is not admin");
}

export async function search(formData: FormData, path?: string) {
  const question = formData.get("question");
  if (!question) return { error: "Question is required" };

  const trimQuestion = (question as string).trim();
  const result = await searchHosp("", trimQuestion, "", "", "", "", 0, 0);
  if (path) revalidatePath(path);
  return result;
}

export async function toggleIsAdmin(
  uid: string,
  isAdmin: boolean,
  path?: string,
) {
  try {
    protectOwner(uid);
    const user = validateUser();
    validateAdmin(user);

    const { customClaims } = user;
    const newClaims = {
      ...(customClaims || {}),
      isAdmin: !isAdmin,
    };

    await adminAuth.setCustomUserClaims(uid, newClaims);
    if (path) revalidatePath(path);
    return { error: undefined };
  } catch (error) {
    return { error };
  }
}

export async function setCustomUserClaims(uid: string) {
  try {
    const user = validateUser();
    validateAdmin(user);

    await adminAuth.setCustomUserClaims(uid, { isAdmin: true });
    return { error: undefined };
  } catch (error) {
    return { error };
  }
}

export async function getProfile(): Promise<any> {
  try {
    const user = validateUser();

    const uid = user.uid;
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
    return { error };
  }
}

export async function updateProfile(formData: FormData, path?: string) {
  try {
    const user = validateUser();

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
    await adminFirestore
      .collection("users")
      .doc(uid)
      .set(data, { merge: true });
    if (path) revalidatePath(path);
    return { error: undefined };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function getBots(): Promise<{
  error?: any;
  bots?: Bot[];
}> {
  try {
    validateUser();
    const querySnapshot = await adminFirestore.collection("bots").get();
    const bots: Bot[] = [];
    querySnapshot.forEach((doc) => {
      bots.push({ id: doc.id, ...doc.data() } as Bot);
    });
    return {
      error: undefined,
      bots,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function deleteBot(id: string, path?: string) {
  try {
    const user = validateUser();
    protectOwner(user.uid);

    await adminFirestore.collection("bots").doc(id).delete();
    if (path) revalidatePath(path);
    return { error: undefined };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function addLineBot(bot: LineBot, path?: string) {
  try {
    const user = validateUser();
    const name = bot.name;
    const description = bot.description;
    const channelId = bot.id;
    const channelSecret = bot.secret;
    const channelAccessToken = bot.issuedToken?.accessToken;

    if (!channelId) return { error: "Channel ID is required" };
    if (!channelSecret) return { error: "Channel Secret is required" };
    if (!channelAccessToken)
      return { error: "Channel Access Token is required" };

    const querySnapshot = await adminFirestore
      .collection("bots")
      .where("channelId", "==", channelId)
      .get();

    if (!querySnapshot.empty) {
      return { error: "Bot already exists" };
    }

    await adminFirestore.collection("bots").add({
      type: "line",
      name,
      description,
      channelId,
      channelSecret,
      channelAccessToken,
      raw: bot,
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
      updatedAt: new Date().toISOString(),
      updatedBy: user.uid,
    });

    if (path) revalidatePath(path);
    return {
      error: undefined,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function getDevices(): Promise<{
  error?: any;
  devices?: Device[];
}> {
  try {
    validateUser();
    const querySnapshot = await adminFirestore.collection("devices").get();
    const devices: Device[] = [];
    querySnapshot.forEach((doc) => {
      devices.push({ id: doc.id, ...doc.data() } as Device);
    });
    return {
      error: undefined,
      devices,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function getDeviceById(id: string): Promise<{
  error?: any;
  device?: Device;
}> {
  try {
    validateUser();
    const doc = await adminFirestore.collection("devices").doc(id).get();
    const device = doc.exists
      ? ({ id: doc.id, ...doc.data() } as Device)
      : undefined;
    return {
      error: undefined,
      device,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function deleteDevice(id: string, path?: string) {
  try {
    validateUser();
    await adminFirestore.collection("devices").doc(id).delete();
    if (path) revalidatePath(path);
    return { error: undefined };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function addDevice(
  {
    name,
    description,
  }: {
    name: string;
    description?: string;
  },
  path?: string,
) {
  try {
    const user = validateUser();

    if (!name) return { error: "Name is required" };

    const querySnapshot = await adminFirestore
      .collection("devices")
      .where("name", "==", name)
      .get();

    if (!querySnapshot.empty) {
      return { error: "Device already exists" };
    }

    await adminFirestore.collection("devices").add({
      name,
      description,
      uid: user.uid,
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
      updatedAt: new Date().toISOString(),
      updatedBy: user.uid,
    });

    if (path) revalidatePath(path);
    return {
      error: undefined,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function updateDevice(
  id: string,
  {
    name,
    description,
  }: {
    name?: string;
    description?: string;
  },
  path?: string,
) {
  try {
    const user = validateUser();

    if (!id) return { error: "Id is required" };

    const doc = await adminFirestore.collection("devices").doc(id).get();
    if (!doc.exists) {
      return { error: "Device not found" };
    }

    const data: {
      [key: string]: string;
    } = {};
    if (name) data["name"] = name;
    if (description) data["description"] = description;

    data["updatedAt"] = new Date().toISOString();
    data["updatedBy"] = user.uid;

    await adminFirestore.collection("devices").doc(id).update(data);

    if (path) revalidatePath(path);
    return {
      error: undefined,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
