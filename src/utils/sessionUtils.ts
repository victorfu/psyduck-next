import { NextResponse } from "next/server";
import { verifySessionCookieAndGetUser } from "@/lib/firebase-admin-helper";
import { cookies } from "next/headers";
import { headers } from "next/headers";

/***
 * If session cookie is valid, return user object. Otherwise, return 401 or 400.
 *
 * @returns {NextResponse | { isLoggedIn: boolean, user: any }}
 */
export async function verifySessionAndGetUser() {
  const session = cookies().get("session")?.value || "";
  if (!session) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  try {
    const user = await verifySessionCookieAndGetUser(session);
    if (!user) {
      return NextResponse.json({ isLoggedIn: false }, { status: 401 });
    }
    return { isLoggedIn: true, user };
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false }, { status: 400 });
  }
}

export const getAuthInfo = (): AuthInfo | null => {
  const headersList = headers();
  const userInfoString = headersList.get("auth-info");
  const userInfo: AuthInfo | null = userInfoString
    ? JSON.parse(userInfoString)
    : null;

  return userInfo;
};
