import React from "react";
import EditButton from "./EditButton";
import CancelButton from "./CancelButton";
import SaveButton from "./SaveButton";
interface Props {
  items: any;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  saveAll: () => void;
  deleteAll: () => void;
}
const DispenseTable = ({
  items,
  onDelete,
  onEdit,
  saveAll,
  deleteAll,
}: Props) => {
  const btnSize = "btn-xs";
  return (
    <table className="table table-bordered w-full max-w-2xl">
      <thead>
        <tr>
          <th>sn</th>
          <th>medicine</th>
          <th>unit</th>
          <th>quantity</th>
          <th>
            {deleteAll ? (
              <CancelButton onClick={deleteAll} size="btn-xs" />
            ) : (
              ""
            )}
          </th>
          <th>
            {saveAll ? <SaveButton onClick={saveAll} size="btn-xs" /> : ""}
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((i: any, index: number) => (
          <tr key={i.id}>
            <td>{index + 1}</td>
            <td>{i.name}</td>
            <td>{i.unit}</td>
            <td>{i.quantity}</td>
            <td>
              <EditButton onClick={() => onEdit(i)} size={btnSize} />
            </td>
            <td>
              <CancelButton onClick={() => onDelete(i.id)} size={btnSize} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DispenseTable;
