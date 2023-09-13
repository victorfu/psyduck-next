import { NextResponse } from "next/server";
import { verifySessionAndGetUser } from "@/utils/session-utils";
import { adminAuth } from "@/lib/firebase-admin-helper";

export async function GET() {
  const { error, user } = await verifySessionAndGetUser();
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { customClaims } = user;
  if (customClaims?.isAdmin !== true) {
    return NextResponse.json({ error: "Permission denied" }, { status: 403 });
  }

  const { users } = await adminAuth.listUsers();
  return NextResponse.json({ users }, { status: 200 });
}
