"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EditButton from "./EditButton";
import CancelButton from "./CancelButton";
import { apiRoutes } from "@/apputilities";
import axios from "axios";
interface Props {
  item: any;
}
const AddPrice = ({ item }: Props) => {
  const [prices, setPrices] = useState<any>([]);
  const { handleSubmit, register, reset } = useForm();
  const [disabled, setDisabled] = useState(false);
  const units = item?.product?.units || [];
  const onSubmit = (data: any) => {
    const url = `${apiRoutes.all_inventories}/addprice?id=${item.id}`;
    const payload = { unit: data.unit, price: parseInt(data.price) };
    setDisabled(true);
    axios.post(url, payload).then((res) => {
      setPrices(res.data.price);
      setDisabled(false);
    });
    setDisabled(true);
    reset();
  };
  const btnSize = "btn-xs";
  if (!item) return null;
  return (
    <div className="rounded p-2 mt-1 border-slate-800">
      {disabled && (
        <form className="max-w-xs ml-auto mr-auto">
          <div className="form-control">
            <label htmlFor="unit" className="label">
              <span className="label-text">unit</span>
            </label>
            <select disabled>
              <option value="">select unit</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="price" className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input disabled />
          </div>
          <button disabled className="btn btn-primary w-full max-w-xs mt-2">
            Add
          </button>
        </form>
      )}
      {!disabled && (
        <form
          className="max-w-xs ml-auto mr-auto"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="form-control">
            <label htmlFor="unit" className="label">
              <span className="label-text">unit</span>
            </label>
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
            <label htmlFor="price" className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              {...register("price")}
              id="price"
              name="price"
              className="input input-primary w-full max-w-xs"
              min={1}
            />
          </div>
          <button className="btn btn-primary w-full max-w-xs mt-2">Add</button>
        </form>
      )}
      {prices.length > 0 && (
        <table className="table table-bordered max-w-xs">
          <thead>
            <tr>
              <th>sn</th>
              <th>unit</th>
              <th>price</th>
            </tr>
          </thead>

          <tbody>
            {prices.map((i: any, index: number) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{i.unit}</th>
                <th>{i.price}</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddPrice;
