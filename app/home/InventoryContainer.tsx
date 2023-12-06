"use client";
import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import Link from "next/link";
interface Props {
  inventories: any;
  stores: any;
  title: string;
}
const InventoryContainer = ({ inventories, stores, title }: Props) => {
  const download = () => {
    window.print();
  };
  return (
    <div className="h-full">
      <div className="list">
        <ul className="flex justify-around">
          <li>
            <Link href={`/home`}>All</Link>
          </li>
          {stores.map((i: any) => (
            <li key={i.id}>
              <Link href={`/home?outlet=${i.id}`}>{i.name}</Link>
            </li>
          ))}
          <li>
            <button onClick={() => download()}>PRINT</button>
          </li>
        </ul>
      </div>

      <div className="inventory">
        <h1 className="text-center">
          {title.toUpperCase()} INVENTORY {new Date().toLocaleDateString()}
        </h1>
        <div className="inventory-table">
          <InventoryTable inventories={inventories} />
        </div>
      </div>
    </div>
  );
};

export default InventoryContainer;
