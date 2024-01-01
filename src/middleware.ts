import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticateBySession } from "./lib/apis";
import { PATHNAME_HOME, PATHNAME_LOGIN } from "./lib/constants";

const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

const getUserFromSession = async (
  request: NextRequest,
): Promise<User | null> => {
  const sessionValue = request.cookies.get("session")?.value;
  if (!sessionValue) return null;

  try {
    const { error, user } = await authenticateBySession(
      `${request.nextUrl.origin}`,
      sessionValue,
    );
    return !error && user ? user : null;
  } catch (e) {
    console.error("Error validating session:", e);
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const user = await getUserFromSession(request);
  const isLoggedIn = user !== null;

  if (request.nextUrl.pathname === PATHNAME_LOGIN) {
    return isLoggedIn
      ? redirectTo(PATHNAME_HOME, request)
      : NextResponse.next({ request });
  }

  if (!isLoggedIn) {
    return redirectTo(PATHNAME_LOGIN, request);
  }

  const modifiedHeaders = new Headers(request.headers);
  modifiedHeaders.set("user", JSON.stringify(user));

  return NextResponse.next({
    request: {
      headers: modifiedHeaders,
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
