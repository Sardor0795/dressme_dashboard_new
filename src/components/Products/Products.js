import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";


export default function Products() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const location = useLocation();
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname !== 'products/location/:id') {
      setDressInfo({ ...dressInfo, nextPageShowForm: true })
    }

  }, [location.pathname]);
  return (
    <main className="products w-full px-4 md:px-10 md:pb-5">
      <Outlet />{" "}
    </main>
  );
}
