import { sql100 } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const funcType = searchParams.get("funcType");
  const type = searchParams.get("type");
  const area_no = searchParams.get("area_no");
  const area_cod = searchParams.get("area_cod");
  const area_name = searchParams.get("area_name");
  let page = searchParams.get("page") || 0;
  let size = searchParams.get("size") || 0;

  const body = {
    C_FuncType: funcType || "",
    C_HospID: "",
    C_HospName: name || "",
    C_AreaCod: area_cod || area_no,
    C_AreaName: area_name,
    C_Type: type || "",
    C_BranchCode: "",
    C_HospAddr: "",
    C_HospCntType: "4",
    C_NoneObs: "",
    C_Pre: "",
    C_SrvList: "",
    C_HospAlliance: "",
    C_HospFlu: "",
    C_Plans: "",
    C_SrvDay: "selAll",
    C_SrvTime: "012",
    C_LongHoliday: "",
    C_LongHolidayTime: "",
    C_ShowType: "1",
    pageDataCount: size,
    nowPage: page,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(sql100, options);
  const result = await response.json();
  return NextResponse.json(result, { status: 200 });
}
