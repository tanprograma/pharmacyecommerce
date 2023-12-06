"use client";

import React, { useReducer, useState } from "react";
import DispenseForm from "./DispenseForm";
import itemsReducer from "../reducers/itemsReducer";
import DispenseTable from "./DispenseTable";
import DispenseEdit from "./DispenseEdit";
import SearchUser from "./SearchUser";
import axios from "axios";
import { useParams } from "next/navigation";
import { AppUtilities } from "@/apputilities";

interface Props {
  inventories: any;
  customers: any;
}
const Dispense = ({ inventories, customers }: Props) => {
  const { name } = useParams();
  const getFullName = AppUtilities.getFullName;
  const [items, dispatch] = useReducer(itemsReducer, []);
  const [itemToEdit, setItemToEdit] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [message, setMessage] = useState<string>("search customers");
  const customersList = customers.map((i: any) => {
    return getFullName(i);
  });
  const isUser = Boolean(customer);
  const isEdit = Boolean(itemToEdit);
  const handleAdd = (item: any) => {
    dispatch({ type: "add", item });
  };
  const handleEdit = (item: any) => {
    dispatch({ type: "edit", item });
    setItemToEdit(null);
  };
  const handleDelete = (id: string) => {
    dispatch({ type: "delete", id });
  };
  const handleDeleteAll = () => {
    dispatch({ type: "deleteAll" });
  };
  const handleSaveAll = async () => {
    const url = `${process.env.NEXT_PUBLIC_API}/dispense?outletId=${name}&customerId=${customer.id}`;
    console.log(url);
    const data = items.map((i: any) => {
      return {
        inventoryId: i.id,
        quantity: i.quantity,
        unit: i.unit,
        unitValue: i.unitValue,
      };
    });
    const res = await axios.post(url, data);
    if (res.data.items.length == items.length) {
      handleDeleteAll();
      setCustomer(null);
      setMessage("search user");
    }
  };
  const handelSearchUserById = (userId: number) => {
    const user = customers.find((i: any) => i.projectId == userId);
    if (user) {
      setCustomer(user);
      setMessage(
        `customer : ${user.firstname} ${user.middlename || ""} ${
          user.lastname || ""
        } `
      );
      return;
    }
    setMessage("customer not found");
    setCustomer(null);
  };
  const handelSearchUserByName = (userName: string) => {
    const user = customers.find((i: any) => getFullName(i) == userName);
    if (user) {
      setCustomer(user);
      setMessage(getFullName(user));
      return;
    }
    setMessage("customer not found");
    setCustomer(null);
  };
  return (
    <>
      {!isEdit && (
        <div className="outlet-section">
          <div className="form">
            <SearchUser
              searchUserById={handelSearchUserById}
              searchUserByName={handelSearchUserByName}
              users={customersList}
            />
            <p className="ml-2 p-2 mt-1 max-w-full bg-zinc-300 flex justify-center align-middle rounded">
              {message}
            </p>

            <DispenseForm
              inventories={inventories}
              add={handleAdd}
              isUser={isUser}
            />
          </div>
          <div className="display">
            <DispenseTable
              items={items}
              onDelete={handleDelete}
              onEdit={(i) => setItemToEdit(i)}
              deleteAll={handleDeleteAll}
              saveAll={handleSaveAll}
            />
          </div>
        </div>
      )}
      {isEdit && (
        <div className="flex align-middle justify-center">
          <DispenseEdit
            inventories={inventories}
            item={itemToEdit}
            handleEdit={handleEdit}
          />
        </div>
      )}
    </>
  );
};

export default Dispense;
