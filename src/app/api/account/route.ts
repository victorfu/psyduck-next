import { NextResponse } from "next/server";
import { verifySessionAndGetUser } from "@/utils/sessionUtils";

export async function GET() {
  const verificationResult = await verifySessionAndGetUser();
  if (verificationResult instanceof NextResponse) {
    return verificationResult;
  }

  return NextResponse.json(verificationResult, { status: 200 });
}
