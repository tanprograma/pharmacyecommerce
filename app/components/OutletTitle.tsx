import React from "react";
interface Props {
  id: any;
}
const OutletTitle = async ({ id }: Props) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}/outlets`, {
    cache: "no-store",
  });
  const stores = await req.json();
  const store = stores.find((i: any) => {
    return i.id == id;
  });
  return <h2>{store ? store.name : "no store"}</h2>;
};

export default OutletTitle;
