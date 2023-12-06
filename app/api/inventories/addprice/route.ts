import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbclient";

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || "";
  const req_data = await req.json();
  // if (req_data.length > 0) {
  //     for (let i = 0; i < req_data.length; i++) {
  //       const resp = await prisma.inventories.update({
  //         where: { id: req_data[i].id },
  //         data: {
  //           quantity: { increment: req_data[i].quantity },
  //         },
  //       });

  //     }
  //     return NextResponse.json({ status: "success" });
  // }
  const resp = await prisma.inventories.update({
    where: { id: id },
    data: {
      price: {
        create: { unit: req_data.unit, price: req_data.price },
      },
    },
    include: { price: true },
  });
  //   console.log(resp);
  return NextResponse.json(resp);
}
