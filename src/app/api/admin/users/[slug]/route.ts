import { NextResponse } from "next/server";
import { verifySessionAndGetUser } from "@/utils/sessionUtils";
import { adminAuth } from "@/lib/firebase-admin-helper";
import { isEmpty } from "lodash";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const verificationResult = await verifySessionAndGetUser();
  if (verificationResult instanceof NextResponse) {
    return verificationResult;
  }

  const { user } = verificationResult;
  const uid = params.slug;

  const { customClaims } = user;
  if (customClaims?.isAdmin !== true) {
    return NextResponse.json({ message: "Permission denied" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
    if (isEmpty(body)) {
      return NextResponse.json({ message: "Empty body" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  const target = await adminAuth.getUser(uid);
  if (!target) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // if there is only one admin, prevent admin from removing admin role from themselves
  if (body.isAdmin === false) {
    if (target.customClaims?.isAdmin === true) {
      const { users } = await adminAuth.listUsers();
      const admins = users.filter(
        (user) => user.customClaims?.isAdmin === true,
      );
      if (admins.length === 1) {
        return NextResponse.json(
          { message: "Cannot remove admin role from the last admin" },
          { status: 403 },
        );
      }
    }
  }

  await adminAuth.setCustomUserClaims(uid, body);
  return NextResponse.json({}, { status: 200 });
}
