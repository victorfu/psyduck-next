import { NextRequest, NextResponse } from "next/server";

const sql001 = "https://info.nhi.gov.tw/api/inae1000/inae1000s01/SQL001";

export async function GET(request: NextRequest) {
  const response = await fetch(sql001);
  const result = await response.json();
  return NextResponse.json(result, { status: 200 });
}
