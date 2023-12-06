"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  inventories: any;
  item: any;
  handleEdit: (item: any) => void;
}
const DispenseEdit = ({ inventories, handleEdit, item }: Props) => {
  const defaultItem = item ? item : { name: "", unit: "", quantity: 0 };
  const initialUnits =
    inventories.find((i: any) => i.id == item?.id).product?.units || [];
  const { handleSubmit, register, reset } = useForm();
  const [units, setUnits] = useState<any>(initialUnits);

  const onSubmit = (data: any) => {
    const $item = inventories.find((i: any) => i.product.name == data.medicine);
    const item = {
      name: data.medicine,
      id: $item?.id,
      unit: data.unit,
      unit_value: $item?.product?.units?.find((i: any) => i.name == data.unit)
        ?.value,
      quantity: data.quantity,
    };
    handleEdit(item);
    setUnits([]);
    reset();
  };
  const btnSize = "btn-xs";
  return (
    <form className="" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <h2 className="text-lg font-bold">Edit Item</h2>
      <div className="form-control">
        <input
          {...register("medicine")}
          defaultValue={item?.name || ""}
          list="medicines"
          id="medicine"
          name="medicine"
          className="input input-primary w-full max-w-xs mt-1"
          placeholder="medicine"
          onChange={(e) =>
            setUnits(
              inventories.find((i: any) => i.product.name == e.target.value)
                ?.product.units
            )
          }
        />
        <datalist id="medicines">
          {inventories.map((i: any) => (
            <option key={i.id} value={i.product.name}>
              {i.product.name}
            </option>
          ))}
        </datalist>
      </div>
      <div className="form-control">
        <input
          {...register("unit")}
          defaultValue={item?.unit || ""}
          id="unit"
          list="units"
          name="unit"
          className="mt-1 input input-primary w-full max-w-xs"
        />
        <datalist id="units">
          {units.map((i: any) => (
            <option key={i.name} value={i.name}>
              {i.name}
            </option>
          ))}
        </datalist>
      </div>

      <div className="form-control">
        <label htmlFor="quantity" className="label">
          <span className="label-text">Quantity</span>
        </label>
        <input
          type="number"
          defaultValue={item?.quantity || 0}
          {...register("quantity")}
          id="quantity"
          name="quantity"
          className="input input-primary w-full max-w-xs"
          min={1}
        />
      </div>
      <button className="btn btn-primary w-full max-w-xs mt-2">Edit</button>
    </form>
  );
};

export default DispenseEdit;
