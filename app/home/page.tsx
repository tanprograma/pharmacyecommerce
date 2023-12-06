import axios from "axios";
import Link from "next/link";
import React from "react";
import InventoryTable from "./InventoryTable";
import { document } from "postcss";
import InventoryContainer from "./InventoryContainer";
interface Props {
  searchParams: { outlet: string };
}
const Inventory = async ({ searchParams: { outlet } }: Props) => {
  let display = true;
  const req = await fetch("http://127.0.0.1:3000/api/outlets", {
    cache: "no-store",
  });
  const stores = await req.json();
  const inventories = outlet
    ? await getStoreInventory(outlet)
    : await getAllInventory();
  const getTitle = () => {
    if (outlet) {
      const s = stores.find((i: any) => {
        return i.id == outlet;
      })?.name;
      return s ? s.toUpperCase() : "";
    }
    return "ALL";
  };
  const title = getTitle();

  const download = () => {
    display = false;
    window.print();
  };
  return (
    <InventoryContainer
      inventories={inventories}
      stores={stores}
      title={title}
    />
  );
};

export default Inventory;
async function getAllInventory() {
  const req = await fetch("http://127.0.0.1:3000/api/inventories", {
    cache: "no-store",
  });
  const res = await req.json();
  const data = res.map((i: any) => {
    const unit = i.product.units.sort((a: any, b: any) => {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0;
    })[0];
    return {
      name: i.product.name,
      quantity: i.quantity,
      unit: unit,
      outlet: i.outlet,
    };
  });
  return Object.values(
    data.reduce((acc: any, el: any) => {
      const uniqueKey = el.name;
      if (!acc[uniqueKey]) {
        acc[uniqueKey] = el;
      } else {
        acc[uniqueKey].quantity += el.quantity;
      }
      return acc;
    }, {})
  );
}
async function getStoreInventory(store: string) {
  const req = await fetch(
    `http://127.0.0.1:3000/api/inventories/outlet/${store}`,
    { cache: "no-store" }
  );
  const res = await req.json();
  return res.map((i: any) => {
    const unit = i.product.units.sort((a: any, b: any) => {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0;
    })[0];

    return {
      name: i.product.name,
      quantity: i.quantity,
      unit: unit,
      outlet: i.outlet,
    };
  });
}
