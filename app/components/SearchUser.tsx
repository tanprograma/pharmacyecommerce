import React from "react";
import { useForm } from "react-hook-form";
import SearchById from "./SearchById";
import SearchByName from "./SearchByName";
interface Props {
  users: any;
  searchUserById: (user: number) => void;
  searchUserByName: (user: string) => void;
}
const SearchUser = ({ searchUserById, searchUserByName, users }: Props) => {
  const { handleSubmit, register, reset } = useForm();
  return (
    <div className="search-user p-1 rounded mt-1 flex justify-start">
      <SearchById searchUserById={searchUserById} />
      <SearchByName items={users} search={searchUserByName} />
    </div>
  );
};

export default SearchUser;
