import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Logger } from "./utils/logger";

const fetchLogin = async (apiUrl: string, session: string) => {
  if (!session) {
    return { isLoggedIn: false };
  }

  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      headers: {
        Cookie: `session=${session}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error in fetchLogin: ", error);
    return { isLoggedIn: false };
  }
};

const redirectTo = (url: string, request: NextRequest) =>
  NextResponse.redirect(new URL(url, request.url));

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionValue = request.cookies.get("session")?.value || "";
  const { isLoggedIn, uid, email, displayName, photoURL } = await fetchLogin(
    `${request.nextUrl.origin}`,
    sessionValue,
  );
  Logger.log(`[${pathname}][isLoggedIn: ${isLoggedIn}]`);

  // Redirect logic for /login path
  if (pathname === "/login" && isLoggedIn) {
    Logger.log("Redirecting to /");
    return redirectTo("/", request);
  }
  if (pathname === "/login" && !isLoggedIn) {
    return NextResponse.next();
  }

  // Redirect logic for non-/login paths
  if (!isLoggedIn) {
    Logger.log("Redirecting to /login");
    return redirectTo("/login", request);
  }

  Logger.log(`[${pathname}][${uid}][${email}][${displayName}][${photoURL}]`);

  // Add uid to request headers for logged in users
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "user-auth-info",
    JSON.stringify({ uid, email, displayName, photoURL }),
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/login", "/account/:path*"],
};
