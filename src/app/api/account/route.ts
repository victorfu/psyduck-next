import { NextResponse } from "next/server";
import { verifySessionCookieAndGetUser } from "@/lib/firebase-admin-helper";
import { cookies } from "next/headers";

export async function GET() {
  const session = cookies().get("session")?.value || "";

  if (!session) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  try {
    const user = await verifySessionCookieAndGetUser(session);
    if (!user) {
      return NextResponse.json(
        {
          isLoggedIn: false,
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({ isLoggedIn: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        isLoggedIn: false,
      },
      {
        status: 400,
      },
    );
  }
}
