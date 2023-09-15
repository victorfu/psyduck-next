import { sql002 } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { area_no: string } },
) {
  const area_no = params.area_no;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ C_AreaNo: area_no }),
  };

  const response = await fetch(sql002, options);
  const result = await response.json();
  return NextResponse.json(result, { status: 200 });
}
