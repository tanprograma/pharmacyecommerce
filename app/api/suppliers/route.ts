import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbclient";
export async function GET(req: NextRequest, res: NextResponse) {
  const res_data = await prisma.suppliers.findMany();

  return NextResponse.json(res_data);
}
export async function POST(req: NextRequest) {
  const req_data = await req.json();
  if (req_data.length) {
    const res_data = await prisma.suppliers.createMany({
      data: req_data,
    });
    return NextResponse.json(res_data);
  }
  const res_data = await prisma.suppliers.create({
    data: req_data,
  });

  return NextResponse.json(res_data);
}
