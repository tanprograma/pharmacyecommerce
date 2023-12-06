import prisma from "@/prisma/dbclient";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  searchParams: { outletId: string; customerId: string };
}

export async function POST(req: NextRequest) {
  const outletId = req.nextUrl.searchParams.get("outletId");
  const customerId = req.nextUrl.searchParams.get("customerId");
  const data = await req.json();
  const prescription = await prisma.prescriptions.create({
    data: {
      outletId: outletId || "",
      customerId: customerId || "",
      items: {
        createMany: {
          data: data,
        },
      },
    },
    include: { items: true },
  });

  for (let i = 0; i < prescription.items.length; i++) {
    const item = prescription.items[i];
    await prisma.inventories.update({
      where: {
        id: item.inventoryId,
      },
      data: {
        quantity: { decrement: item.quantity * item.unitValue },
      },
    });
  }

  return NextResponse.json(prescription);
}
