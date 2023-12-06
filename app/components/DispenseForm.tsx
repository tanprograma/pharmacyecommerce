"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EditButton from "./EditButton";
import CancelButton from "./CancelButton";
interface Props {
  inventories: any;
  add: (item: any) => void;
  isUser: any;
}
const DispenseForm = ({ inventories, add, isUser }: Props) => {
  const { handleSubmit, register, reset } = useForm();
  const [units, setUnits] = useState([]);

  const onSubmit = (data: any) => {
    const $item = inventories.find((i: any) => i.product.name == data.medicine);
    const item = {
      name: data.medicine,
      id: $item?.id,
      unit: data.unit,
      unitValue: parseInt(
        $item?.product?.units?.find((i: any) => i.name == data.unit)?.value
      ),
      quantity: parseInt(data.quantity),
    };
    add(item);
    setUnits([]);
    reset();
  };
  const btnSize = "btn-xs";
  if (!isUser)
    return (
      <form className="max-w-xs ml-auto mr-auto">
        <div className="form-control">
          <input
            disabled
            className="input input-primary w-full max-w-xs mt-1"
            placeholder="bidhaa"
          />
        </div>
        <div className="form-control">
          <select
            disabled
            className="mt-1 input input-primary w-full max-w-xs"
          ></select>
        </div>
        <div className="form-control">
          <label htmlFor="quantity" className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input disabled className="input input-primary w-full max-w-xs" />
        </div>
        <button disabled className="btn btn-primary w-full max-w-xs mt-2">
          Add
        </button>
      </form>
    );
  return (
    <form
      className="max-w-xs ml-auto mr-auto"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div className="form-control">
        <input
          {...register("medicine")}
          list="medicines"
          id="medicine"
          name="medicine"
          className="input input-primary w-full max-w-xs mt-1"
          placeholder="bidhaa"
          onChange={(e) =>
            setUnits(
              inventories.find((i: any) => i.product.name == e.target.value)
                ?.product.units || []
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
        <select
          {...register("unit")}
          id="unit"
          name="unit"
          className="mt-1 input input-primary w-full max-w-xs"
        >
          <option value="">select unit</option>
          {units.map((i: any) => (
            <option key={i.name} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="quantity" className="label">
          <span className="label-text">Quantity</span>
        </label>
        <input
          type="number"
          {...register("quantity")}
          id="quantity"
          name="quantity"
          className="input input-primary w-full max-w-xs"
          min={1}
        />
      </div>
      <button className="btn btn-primary w-full max-w-xs mt-2">Add</button>
    </form>
  );
};

export default DispenseForm;
