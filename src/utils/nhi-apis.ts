const sql100 = "https://info.nhi.gov.tw/api/inae1000/inae1000s01/SQL100";

export async function searchHosp(
  funcType: string | null,
  name: string,
  type: string,
  area_no: string,
  area_cod: string,
  area_name: string,
  page: number,
  size: number,
) {
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
  return result;
}
