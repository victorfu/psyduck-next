import { verifySessionCookieAndGetUser } from "@/lib/firebase-admin-helper";
import { cookies } from "next/headers";
import { headers } from "next/headers";

/***
 * If session cookie is valid, return user object. Otherwise, return 401 or 400.
 */
export async function verifySessionAndGetUser(): Promise<{
  error: string | undefined;
  user: any;
}> {
  try {
    const session = cookies().get("session")?.value || "";
    if (!session) {
      return { error: "Empty session", user: undefined };
    }
    const user = await verifySessionCookieAndGetUser(session);
    if (!user) {
      return { error: "Invalid session", user: undefined };
    }
    return { error: undefined, user };
  } catch (error) {
    return { error: "Invalid session", user: undefined };
  }
}

export const getUserFromHeader = (): User | undefined => {
  const headersList = headers();
  const userString = headersList.get("user");
  if (!userString) {
    return undefined;
  }
  const user: User | undefined = userString
    ? JSON.parse(userString)
    : undefined;
  return user;
};
