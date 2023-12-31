import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<Bot[]>> {
  const res = await request.json();
  const { providerId, ses } = res;
  const lineApiUrl = `https://developers.line.biz/api/v1/channel/?providerId=${providerId}`;
  const lineApiHeaders = {
    "Content-Type": "application/json",
    Cookie: `ses=${ses}`,
  };
  const response = await fetch(lineApiUrl, {
    method: "GET",
    headers: lineApiHeaders,
  });
  const { values } = await response.json();
  return NextResponse.json(values);
}
