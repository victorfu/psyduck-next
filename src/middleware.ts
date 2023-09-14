import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Logger } from "@/lib/logger";
import { getLogin } from "./lib/apis";

const PATHNAME_HOME = "/";
const PATHNAME_LOGIN = "/login";

const redirectTo = (url: string, request: NextRequest) => {
  Logger.log(`Redirecting to ${url}`);
  return NextResponse.redirect(new URL(url, request.url));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionValue = request.cookies.get("session")?.value || "";
  const { error, user } = await getLogin(
    `${request.nextUrl.origin}`,
    sessionValue,
  );
  const isLoggedIn = !error && user;

  if (pathname === PATHNAME_LOGIN) {
    return isLoggedIn
      ? redirectTo(PATHNAME_HOME, request)
      : NextResponse.next({ request });
  }

  if (!isLoggedIn) {
    return redirectTo(PATHNAME_LOGIN, request);
  }

  const requestHeaders = new Headers(request.headers);
  const userString = JSON.stringify(user);
  requestHeaders.set("user", userString);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
