import { NextResponse } from "next/server";
import { verifySessionAndGetUser } from "@/utils/sessionUtils";
import { adminAuth } from "@/lib/firebase-admin-helper";

export async function GET() {
  const verificationResult = await verifySessionAndGetUser();
  if (verificationResult instanceof NextResponse) {
    return verificationResult;
  }

  const { user } = verificationResult;
  const { customClaims } = user;
  if (customClaims?.isAdmin !== true) {
    return NextResponse.json({ message: "Permission denied" }, { status: 403 });
  }

  const { users } = await adminAuth.listUsers();
  return NextResponse.json({ users }, { status: 200 });
}
