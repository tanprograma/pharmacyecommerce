"use client";
import React, { useState } from "react";
import InventoryEditTable from "./InventoryEditTable";
import SearchByName from "./SearchByName";
import { AppUtilities } from "@/apputilities";
import AddPrice from "./AddPrice";
interface Props {
  inventories: any;
}
const ManageInventory = ({ inventories }: Props) => {
  const [term, setTerm] = useState("");
  const items = AppUtilities.transformStoreInventory(inventories);
  const searchItems = items.map((i: any) => i.name);
  const displayed: any =
    inventories.find((i: any) => i.product.name == term) || "";

  const searchInventory = (item: string) => {
    setTerm(item);
  };
  return (
    // <div className="manage-inventory h-full">

    //   <div className="table-section">
    //     <InventoryEditTable item={displayed} />
    //   </div>
    //   <AddPrice item={displayed} />
    // </div>
    <div>
      <div>
        <SearchByName items={searchItems} search={searchInventory} />
        {Boolean(term) && !Boolean(displayed) && (
          <p className="text-red-500">Item not found</p>
        )}
      </div>
      <div className="manage-container"></div>
    </div>
  );
};
export default ManageInventory;
