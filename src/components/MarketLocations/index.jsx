import React from "react";
import { Outlet } from "react-router-dom";

export default function MarketLocations() {
  return (
    <div className="py-1">
      <Outlet />
    </div>
  );
}
