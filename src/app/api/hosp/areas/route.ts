import { sql001 } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(sql001);
  const result = await response.json();
  return NextResponse.json(result, { status: 200 });
}
