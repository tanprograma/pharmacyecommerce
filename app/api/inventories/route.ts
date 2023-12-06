import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbclient";
export async function GET(req: NextRequest, res: NextResponse) {
  const res_data = await prisma.inventories.findMany({
    include: { product: true, outlet: true },
  });

  return NextResponse.json(res_data);
}
