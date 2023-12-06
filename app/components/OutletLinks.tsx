import { AppUtilities, apiRoutes } from "@/apputilities";
import Link from "next/link";
import React from "react";

const OutletLinks = async () => {
  const url = apiRoutes.outlets;
  const stores: { name: string; id: string }[] =
    await AppUtilities.fetchResource(url);
  return (
    <details open>
      <summary>outlets</summary>
      <ul>
        {stores.map((i) => (
          <li key={i.id}>
            <Link href={`/outlet/${i.id}?name=${i.name}`}>{i.name}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default OutletLinks;
