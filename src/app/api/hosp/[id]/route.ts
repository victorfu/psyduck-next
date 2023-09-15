import { sql300 } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const hosp_id = params.id;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ C_HospID: hosp_id, C_planType: "" }),
  };

  const response = await fetch(sql300, options);
  const result = await response.json();
  return NextResponse.json(result, { status: 200 });
}
