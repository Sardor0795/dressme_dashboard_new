import React from "react";
import { Outlet } from "react-router-dom";


export default function Products() {

  return (
    <main className="products w-full px-4 md:px-10 md:py-5">
      <Outlet />{" "}
    </main>
  );
}
