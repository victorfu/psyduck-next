import { searchHosp } from "@/lib/nhi-apis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";
  const funcType = searchParams.get("funcType") || "";
  const type = searchParams.get("type") || "";
  const area_no = searchParams.get("area_no") || "";
  const area_cod = searchParams.get("area_cod") || "";
  const area_name = searchParams.get("area_name") || "";
  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "0";

  const result = await searchHosp(
    funcType,
    name,
    type,
    area_no,
    area_cod,
    area_name,
    parseInt(page),
    parseInt(size),
  );

  return NextResponse.json(result);
}
