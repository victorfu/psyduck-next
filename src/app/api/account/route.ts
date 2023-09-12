import { NextResponse } from "next/server";
import { verifySessionAndGetUser } from "@/utils/sessionUtils";

export async function GET() {
  const { error, user } = await verifySessionAndGetUser();
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
