import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<BotDetail>> {
  const res = await request.json();
  const { channelId, ses } = res;
  const lineApiUrl = `https://developers.line.biz/api/v1/channel/${channelId}`;
  const lineApiHeaders = {
    "Content-Type": "application/json",
    Cookie: `ses=${ses}`,
  };
  const response = await fetch(lineApiUrl, {
    method: "GET",
    headers: lineApiHeaders,
  });
  const data = await response.json();
  return NextResponse.json(data);
}
