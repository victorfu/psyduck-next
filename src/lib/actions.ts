"use server";

import { adminFirestore } from "@/lib/firebase-admin-helper";
import { searchHosp } from "@/lib/nhi-apis";
import { getUserFromHeader } from "@/lib/session-utils";
import { revalidatePath } from "next/cache";

export async function addQuestion(content: string, path?: string) {
  const user = getUserFromHeader();
  if (!user) return { error: "User is empty" };

  const data = {
    content: content,
    createdAt: new Date().toISOString(),
    createdBy: user.uid,
    updatedAt: new Date().toISOString(),
    updatedBy: user.uid,
  };

  try {
    await adminFirestore.collection("questions").add(data);
    if (path) revalidatePath(path);
    return { error: null };
  } catch (error) {
    return { error: "Error adding question" };
  }
}

export async function getQuestions(uid?: string) {
  try {
    const ref = adminFirestore.collection("questions");
    if (uid) ref.where("createdBy", "==", uid);
    const result = await ref.orderBy("createdAt", "desc").get();
    const data = result.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { error: null, questions: data };
  } catch (error) {
    return { error: "Error getting questions" };
  }
}

export async function deleteQuestion(id: string, path?: string) {
  try {
    await adminFirestore.collection("questions").doc(id).delete();
    if (path) revalidatePath(path);
    return { error: null };
  } catch (error) {
    return { error: "Error deleting question" };
  }
}

export async function search(formData: FormData, path?: string) {
  const question = formData.get("question");
  if (!question) return { error: "Question is required" };

  const trimQuestion = (question as string).trim();
  await addQuestion(trimQuestion);
  const result = await searchHosp("", trimQuestion, "", "", "", "", 0, 0);
  if (path) revalidatePath(path);
  return result;
}
