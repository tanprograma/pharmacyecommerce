"use client";
import React, { useState } from "react";
import EditButton from "./EditButton";
interface Props {
  item: any;
}
const InventoryEditTable = ({ item }: Props) => {
  const [price, setPrice] = useState(0);
  const prices = item?.price || [];
  if (!item) return null;
  return (
    <div className="max-w-xs ">
      <p>product name: {item?.product?.name || ""}</p>
      <table className=" bg-white table table-bordered max-w-xs ml-auto mr-auto ">
        <thead>
          <tr>
            <th>sn</th>
            <th>unit</th>
            <th>price(edit)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prices.map((i: any, index: number) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{i.unit}</td>
              <td>
                <input
                  defaultValue={i.price}
                  type="number"
                  name="price"
                  id="price"
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </td>

              <td>
                <EditButton size="bg-xs" onClick={() => console.log(price)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryEditTable;
