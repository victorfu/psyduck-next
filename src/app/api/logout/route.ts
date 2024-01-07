import { PATHNAME_HOME } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const options = {
    name: "session",
    value: "",
    maxAge: -1,
  };
  cookies().set(options);
  return NextResponse.redirect(new URL(PATHNAME_HOME, request.url));
}
