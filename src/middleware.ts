import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLogin } from "./lib/apis";
import { PATHNAME_HOME, PATHNAME_LOGIN } from "./lib/constants";

const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

export async function middleware(request: NextRequest) {
  let isLoggedIn = false;
  let useObj = null;
  const sessionValue = request.cookies.get("session")?.value;
  if (sessionValue) {
    const { error, user } = await getLogin(
      `${request.nextUrl.origin}`,
      sessionValue,
    );
    isLoggedIn = !error && user;
    useObj = user;
  }

  if (request.nextUrl.pathname === PATHNAME_LOGIN) {
    return isLoggedIn
      ? redirectTo(PATHNAME_HOME, request)
      : NextResponse.next({ request });
  }

  const requestHeaders = new Headers(request.headers);

  if (request.nextUrl.pathname === PATHNAME_HOME) {
    if (!isLoggedIn) return NextResponse.next({ request });

    const userString = JSON.stringify(useObj);
    requestHeaders.set("user", userString);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (!isLoggedIn) {
    return redirectTo(PATHNAME_LOGIN, request);
  }

  const userString = JSON.stringify(useObj);
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
