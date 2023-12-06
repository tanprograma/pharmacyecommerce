import { connectDB } from "@/database/db";
import { LogModel } from "@/database/models/logs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();
  const logs = await LogModel.find();
  return NextResponse.json(logs);
}
