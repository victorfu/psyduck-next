import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Logger } from "@/lib/logger";

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
  const { isLoggedIn, authInfo } = await fetchLogin(
    `${request.nextUrl.origin}`,
    sessionValue,
  );
  Logger.log(`[${pathname}][is-logged-in: ${isLoggedIn}]`);

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

  const authInfoString = JSON.stringify(authInfo);
  Logger.log(`[${pathname}][auth-info: ${authInfoString}]`);

  // Add uid to request headers for logged in users
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("auth-info", authInfoString || "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/login", "/account/:path*"],
};
