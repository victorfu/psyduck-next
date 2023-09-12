import { NextRequest, NextResponse } from "next/server";
import {
  adminAuth,
  verifyIdTokenAndGetUser,
} from "@/lib/firebase-admin-helper";
import { cookies } from "next/headers";
import { verifySessionAndGetUser } from "@/utils/sessionUtils";

export async function GET() {
  const { error, user } = await verifySessionAndGetUser();
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }

  return NextResponse.json({ user }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      {
        error: "Authorization header missing",
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
        error: "IdToken missing",
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
        error: "Invalid IdToken",
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
  return NextResponse.json({ isLoggedIn: true, user }, { status: 200 });
}
