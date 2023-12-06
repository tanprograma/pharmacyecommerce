import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbclient";

export async function POST(req: NextRequest) {
  const req_data = await req.json();
  for (let i = 0; i < req_data.length; i++) {
    const resp = await prisma.inventories.update({
      where: { id: req_data[i].id },
      data: {
        quantity: { increment: req_data[i].quantity },
      },
    });
    console.log("updated", resp);
  }

  return NextResponse.json({ status: "success" });
}
