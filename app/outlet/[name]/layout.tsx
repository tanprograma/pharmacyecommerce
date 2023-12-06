import OutletNav from "@/app/components/OutletNav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="outlet-page">
      <div className="outlet-nav bg-slate-600 text-white">
        <OutletNav />
      </div>
      <div className="outlet-content bg-white">{children}</div>
    </div>
  );
};

export default layout;
