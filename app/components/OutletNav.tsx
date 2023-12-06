"use client";
import Link from "next/link";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
// import OutletTitle from "./OutletTitle";
const OutletNav = () => {
  const { name } = useParams();
  const params = useParams();
  console.log(params);
  const searchParams = useSearchParams();
  const storename = searchParams.get("name");
  // const api = process.env.NEXT_PUBLIC_API;
  // const req = await fetch(`${api}/outlets`, { cache: "no-store" });
  // const stores = await req.json();

  return (
    <ul className="flex">
      <li className="mr-10">
        <h2>{storename?.toUpperCase() || ""}</h2>
      </li>
      <li className="mr-2">
        <Link href={`/outlet/${name}/?name=${storename}`}>statistics</Link>
      </li>
      <li className="mr-2">
        <Link href={`/outlet/${name}/dispense/?name=${storename}`}>
          dispense
        </Link>
      </li>
      <li className="mr-2">
        <Link href={`/outlet/${name}/request/?name=${storename}`}>request</Link>
      </li>
      <li className="mr-2">
        <Link href={`/outlet/${name}/issue/?name=${storename}`}>issue</Link>
      </li>
      <li className="mr-2">
        <Link href={`/outlet/${name}/manage/?name=${storename}`}>manage</Link>
      </li>
      <li className="mr-2">
        <Link href={"/outlet"}>outlets</Link>
      </li>
      <li className="mr-2">
        <Link href={"/home"}>home</Link>
      </li>
    </ul>
  );
};

export default OutletNav;
