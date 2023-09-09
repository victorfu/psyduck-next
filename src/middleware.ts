import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const fetchLogin = async (apiUrl: string, session: string) => {
  if (!session) {
    return false;
  }

  const responseAPI = await fetch(`${apiUrl}/api/login`, {
    headers: {
      Cookie: `session=${session}`,
    },
  });
  return responseAPI.status === 200;
};

const redirectTo = (url: string, request: NextRequest) =>
  NextResponse.redirect(new URL(url, request.url));

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionValue = request.cookies.get("session")?.value || "";
  const isLogged = await fetchLogin(`${request.nextUrl.origin}`, sessionValue);

  if (pathname === "/login") {
    if (isLogged) {
      return redirectTo("/", request);
    }
  } else {
    if (!isLogged) {
      return redirectTo("/login", request);
    }
  }

  // TODO: remove this workaround
  // pass url to server component via headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/login", "/account/:path*", "/admin/:path*"],
};
