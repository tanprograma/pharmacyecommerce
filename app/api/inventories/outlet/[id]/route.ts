import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbclient";
interface Props {
  params: { id: string };
}
export async function GET(
  req: NextRequest,
  { params: { id } }: Props,
  res: NextResponse
) {
  const res_data = await prisma.inventories.findMany({
    where: { outletId: id },
    include: { product: true, outlet: true, price: true },
  });

  return NextResponse.json(res_data);
}
