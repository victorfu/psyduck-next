import { verifySessionCookieAndGetUser } from "@/lib/firebase-admin-helper";
import { cookies } from "next/headers";
import { headers } from "next/headers";

/***
 * If session cookie is valid, return user object. Otherwise, return 401 or 400.
 */
export async function verifySessionAndGetUser(): Promise<{
  error: string | null;
  user: any;
}> {
  try {
    const session = cookies().get("session")?.value || "";
    if (!session) {
      return { error: "Empty session", user: null };
    }
    const user = await verifySessionCookieAndGetUser(session);
    if (!user) {
      return { error: "Invalid session", user: null };
    }
    return { error: null, user };
  } catch (error) {
    return { error: "Invalid session", user: null };
  }
}

export const getUserFromHeader = (): User | null => {
  const headersList = headers();
  const userString = headersList.get("user");
  if (!userString) {
    return null;
  }
  const user: User | null = userString ? JSON.parse(userString) : null;
  return user;
};
