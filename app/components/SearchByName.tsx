"use client";

import React from "react";
import { useForm } from "react-hook-form";
interface Props {
  style?: string;
  items: string[];
  search: (user: any) => void;
}
const SearchByName = ({ items, search, style }: Props) => {
  const { handleSubmit, register, reset } = useForm();
  return (
    <form
      className={`${style}`}
      onSubmit={handleSubmit((data) => search(data.user))}
    >
      <input
        placeholder="search by name"
        list="customers"
        autoComplete="off"
        {...register("user")}
        id="user"
        name="user"
        className="input input-primary w-full max-w-xs mr-1"
      />
      <datalist id="customers">
        {items.map((i: any, index: number) => (
          <option key={index} value={i}></option>
        ))}
      </datalist>
      <button className="btn btn-outline w-full max-w-xs">SEARCH</button>
    </form>
  );
};

export default SearchByName;
