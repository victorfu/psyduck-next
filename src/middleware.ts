import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticateBySession } from "./lib/apis";
import { PATHNAME_HOME, PATHNAME_LOGIN } from "./lib/constants";
import PerformanceMeasure from "./lib/performance-measure";

const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

const getUserFromSession = async (
  request: NextRequest,
): Promise<User | null> => {
  const pm = new PerformanceMeasure("getUserFromSession");

  const sessionValue = request.cookies.get("session")?.value;
  if (!sessionValue) {
    pm.end();
    return null;
  }

  try {
    const { error, user } = await authenticateBySession(
      `${request.nextUrl.origin}`,
      sessionValue,
    );

    pm.end();
    return !error && user ? user : null;
  } catch (e) {
    console.error("Error validating session:", e);
    pm.end();
    return null;
  }
};

const isPublicPath = (pathname: string) => {
  return [PATHNAME_HOME, PATHNAME_LOGIN].includes(pathname);
};

export async function middleware(request: NextRequest) {
  const user = await getUserFromSession(request);
  const isLoggedIn = user !== null;

  if (!isLoggedIn) {
    if (isPublicPath(request.nextUrl.pathname)) {
      return NextResponse.next({ request });
    }
    return redirectTo(PATHNAME_LOGIN, request);
  }

  if (request.nextUrl.pathname === PATHNAME_LOGIN) {
    return redirectTo(PATHNAME_HOME, request);
  }

  const modifiedHeaders = new Headers(request.headers);
  modifiedHeaders.set("user", JSON.stringify(user));
  const modifiedRequest = {
    ...request,
    headers: modifiedHeaders,
  };

  return NextResponse.next({
    request: modifiedRequest,
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
