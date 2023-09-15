import { NextRequest, NextResponse } from "next/server";

const sql300 = "https://info.nhi.gov.tw/api/inae1000/inae1000s00/SQL300";

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
