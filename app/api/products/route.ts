import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbclient";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const res_data = await prisma.products.findMany();

    return NextResponse.json(res_data);
  } catch (error) {
    return NextResponse.json([]);
  }
}
export async function POST(req: NextRequest) {
  const req_data = await req.json();
  if (req_data.length) {
    try {
      const res_data = await prisma.products.createMany({
        data: req_data,
      });
      return NextResponse.json(res_data);
    } catch (error) {
      console.log("error occured");
      return NextResponse.json([]);
    }
  }
  try {
    const res_data = await prisma.products.create({
      data: req_data,
    });

    return NextResponse.json(res_data);
  } catch (error) {
    return NextResponse.json({});
  }
}
