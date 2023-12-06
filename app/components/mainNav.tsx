import Link from "next/link";
import React from "react";

import { AppUtilities } from "@/apputilities";
import OutletLinks from "./OutletLinks";
// import OutletTitle from "./OutletTitle";

const MainNav = () => {
  // const title = process.env.TITLE || "";
  return (
    <div className="navbar bg-slate-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/home"}>home</Link>
            </li>
            <li>
              {/* links to the outlets */}
              <OutletLinks />
            </li>
            <li>
              <a>About</a>
            </li>
            {/* <li>
              <OutletTitle/>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">HELLO</a>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default MainNav;
