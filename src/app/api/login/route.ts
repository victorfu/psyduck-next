import { NextRequest, NextResponse } from "next/server";
import {
  adminAuth,
  verifyIdTokenAndGetUser,
} from "@/lib/firebase-admin-helper";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const decodedClaims = await adminAuth.verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function POST(request: NextRequest, response: NextResponse) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      {
        message: "Authorization header missing",
      },
      {
        status: 401,
      },
    );
  }

  const idToken = authHeader.split("Bearer ")[1];
  if (!idToken) {
    return NextResponse.json(
      {
        message: "IdToken missing",
      },
      {
        status: 401,
      },
    );
  }

  let user;
  try {
    user = await verifyIdTokenAndGetUser(idToken);
    if (!user) {
      throw new Error("Invalid IdToken");
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid IdToken",
      },
      {
        status: 401,
      },
    );
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });
  const options = {
    name: "session",
    value: sessionCookie,
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  cookies().set(options);
  return NextResponse.json({ isLogged: true, user }, { status: 200 });
}
