import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../hook/useHttp";


export default function Products() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const { request } = useHttp()
  const location = useLocation();
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname !== 'products/location/:id') {
      setDressInfo({ ...dressInfo, nextPageShowForm: true })
    }

  }, [location.pathname]);
  useQuery(["products"], () => { return request({ url: "/products/locations", token: true }) },
    {
      onSuccess: (res) => {
        setDressInfo({ ...dressInfo, isCheckPoructList: res?.products_locations })
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  console.log(dressInfo?.isCheckPoructList?.length, "dressInfo?.isCheckPoructList?.length");

  return (
    <main className="products w-full px-4 md:px-10 md:pb-5">
      <Outlet />{" "}
    </main>
  );
}
