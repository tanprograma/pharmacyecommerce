"use client";
import React from "react";
import { useForm } from "react-hook-form";
interface Props {
  searchUserById: (user: number) => void;
}
const SearchById = ({ searchUserById }: Props) => {
  const { handleSubmit, register, reset } = useForm();
  return (
    <form
      className=""
      onSubmit={handleSubmit((data) => searchUserById(parseInt(data.user)))}
    >
      <input
        type="number"
        {...register("user")}
        id="user"
        name="user"
        className="input input-primary w-full max-w-xs mr-1"
      />
      <button className="btn btn-outline w-full max-w-xs">
        SEARCH USER ID
      </button>
    </form>
  );
};

export default SearchById;
