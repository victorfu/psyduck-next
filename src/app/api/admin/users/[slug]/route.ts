import { NextResponse } from "next/server";
import { verifySessionAndGetUser } from "@/utils/sessionUtils";
import { adminAuth } from "@/lib/firebase-admin-helper";
import { isEmpty } from "lodash";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { error, user } = await verifySessionAndGetUser();
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const uid = params.slug;

  const { customClaims } = user;
  if (customClaims?.isAdmin !== true) {
    return NextResponse.json({ error: "Permission denied" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
    if (isEmpty(body)) {
      return NextResponse.json({ error: "Empty body" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const target = await adminAuth.getUser(uid);
  if (!target) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
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
          { error: "Cannot remove admin role from the last admin" },
          { status: 403 },
        );
      }
    }
  }

  await adminAuth.setCustomUserClaims(uid, body);
  return NextResponse.json({}, { status: 200 });
}
