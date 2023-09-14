"use server";

import { addItem, deleteItem } from "@/lib/firebase-admin-helper";
import { getUserFromHeader } from "@/utils/session-utils";
import { revalidatePath } from "next/cache";

export async function actionAddItem(formData: FormData) {
  const user = getUserFromHeader();
  if (!user) return { error: "Failed to create an item" };

  const title = formData.get("title");
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
    await addItem(newItem);
    revalidatePath("/administration/items");
    return { error: null };
  } catch (e) {
    return { error: "Failed to create an item" };
  }
}

export async function actionDeleteItem(id: string) {
  try {
    await deleteItem(id);
    revalidatePath("/administration/items");
    return { error: null };
  } catch (e) {
    return { error: "Failed to delete an item" };
  }
}
