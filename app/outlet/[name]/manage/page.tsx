import ManageInventory from "@/app/components/ManageInventory";
import { AppUtilities, apiRoutes } from "@/apputilities";
import React from "react";
interface Props {
  params: { name: string };
}
const page = async ({ params: { name } }: Props) => {
  const url = `${apiRoutes.store_inventories}/${name}`;
  const inventory = await AppUtilities.fetchResource(url);
  return <ManageInventory inventories={inventory} />;
};

export default page;
