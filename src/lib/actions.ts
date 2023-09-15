"use server";

import { adminFirestore } from "@/lib/firebase-admin-helper";
import { searchHosp } from "@/utils/nhi-apis";
import { getUserFromHeader } from "@/utils/session-utils";
import { revalidatePath } from "next/cache";

export async function addItem(formData: FormData, path?: string) {
  const user = getUserFromHeader();
  if (!user) return { error: "Failed to create an item" };

  const title = formData.get("title");
  if (!title) return { error: "Title is required" };

  const description = formData.get("description");

  const newItem = {
    title: title as string,
    description: description as string,
    enabled: true,
    createdAt: new Date().toISOString(),
    createdBy: user.uid,
    updatedAt: new Date().toISOString(),
    updatedBy: user.uid,
  };

  try {
    await adminFirestore.collection("items").add(newItem);
    if (path) revalidatePath(path);
    return { error: null };
  } catch (error) {
    return { error: "Error adding item" };
  }
}

export async function updateItem(id: string, item: Item, path?: string) {
  try {
    await adminFirestore.collection("items").doc(id).update(item);
    if (path) revalidatePath(path);
    return { error: null };
  } catch (error) {
    return { error: "Error updating item" };
  }
}

export async function deleteItem(id: string, path?: string) {
  try {
    await adminFirestore.collection("items").doc(id).delete();
    if (path) revalidatePath(path);
    return { error: null };
  } catch (error) {
    return { error: "Error deleting item" };
  }
}

export async function search(formData: FormData, path?: string) {
  const question = formData.get("question");
  if (!question) return { error: "Question is required" };

  const trimQuestion = (question as string).trim();
  const result = await searchHosp("", trimQuestion, "", "", "", "", 0, 0);
  if (path) revalidatePath(path);
  return result;
}
