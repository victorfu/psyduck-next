import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Logger } from "@/lib/logger";

const fetchLogin = async (apiUrl: string, session: string) => {
  if (!session) {
    return { error: "Empty session", user: null };
  }
  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      headers: {
        Cookie: `session=${session}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { error: "Invalid session", user: null };
  }
};

const redirectTo = (url: string, request: NextRequest) =>
  NextResponse.redirect(new URL(url, request.url));

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionValue = request.cookies.get("session")?.value || "";
  const { error, user } = await fetchLogin(
    `${request.nextUrl.origin}`,
    sessionValue,
  );
  const isLoggedIn = !error && user;

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

  const userString = JSON.stringify(user);
  Logger.log(`[${pathname}][user -> ${userString}]`);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("user", userString);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/login", "/account/:path*", "/administration"],
};
