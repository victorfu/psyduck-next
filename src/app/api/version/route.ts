import { NextResponse } from "next/server";

export function GET() {
  const version = require("../../../../package.json").version;
  return NextResponse.json({ version });
}
