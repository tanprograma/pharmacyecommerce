import React from "react";
import { AppUtilities } from "@/apputilities";
import Dispense from "@/app/components/Dispense";
interface Props {
  params: { name: string };
}
const page = async ({ params: { name } }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;
  const inventoryURL = `${BASE_URL}/inventories/outlet/${name}`;
  const customerURL = `${BASE_URL}/customers`;
  const getInventory = async () => {
    const v = await AppUtilities.fetchResource(inventoryURL);
    return v;
  };
  const getCustomers = async () => {
    const v = await AppUtilities.fetchResource(customerURL);
    return v;
  };

  const [inventories, customers] = await Promise.all([
    getInventory(),
    getCustomers(),
  ]);
  //   console.log({ inventories, customers });
  return (
    <div>
      <Dispense inventories={inventories} customers={customers} />
    </div>
  );
};

export default page;
