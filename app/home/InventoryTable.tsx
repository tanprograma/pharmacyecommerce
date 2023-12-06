import React from "react";
interface Props {
  inventories: {
    name: string;
    unit: { name: string; value: number };
    quantity: number;
  }[];
}
const InventoryTable = ({ inventories }: Props) => {
  return (
    <table className=" bg-white table table-bordered max-w-4xl ml-auto mr-auto ">
      <thead>
        <tr>
          <th>sn</th>
          <th>medicine</th>
          <th>unit</th>
          <th>quantity</th>
        </tr>
      </thead>
      <tbody>
        {inventories.map((i, index) => (
          <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>{i.name}</td>
            <td>{i.unit.name}</td>
            <td>{Math.floor(i.quantity / i.unit.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
