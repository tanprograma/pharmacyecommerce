import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbclient";
export async function GET(req: NextRequest, res: NextResponse) {
  const res_data = await prisma.stores.findMany({
    include: {
      inventory: true,
    },
  });

  return NextResponse.json(res_data);
}
export async function POST(req: NextRequest) {
  const req_data = await req.json();
  const products = await getProducts();
  if (req_data.length) {
    const stores = [];
    for (let i = 0; i < req_data.length; i++) {
      const store = await createStore(req_data[i], products);
      stores.push(store);
    }
    return NextResponse.json(stores);
  }

  const res_data = await createStore(req_data, products);

  return NextResponse.json(res_data);
}
async function getProducts() {
  return prisma.products.findMany();
}

async function createStore(
  store: { name: string; isWarehouse: boolean },
  products: { id: string }[]
) {
  const stor = await prisma.stores.create({
    data: { name: store.name, isWarehouse: store.isWarehouse },
  });
  if (products.length) {
    await createInventories(stor, products);
  }
  return stor;
}
async function createInventories(
  store: { name: string; isWarehouse: boolean; id: string },
  products: { id: string }[]
) {
  const inveData = products.map((i) => {
    return { productId: i.id, outletId: store.id, quantity: 0 };
  });

  await prisma.inventories.createMany({ data: inveData });
}
