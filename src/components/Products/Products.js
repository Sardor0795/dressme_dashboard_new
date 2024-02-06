import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../hook/useHttp";
import LoadingForSeller from "../Loading/LoadingFor";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;


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


  useEffect(() => {
    const fetchDataLocations = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/products/locations`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
          }
        });
        if (data?.status >= 200 && data?.status < 300) {
          setDressInfo({ ...dressInfo, getProductList: data?.data })
          data?.data?.products_locations?.map(item => {
            if (item?.shop_locations?.length >= 1) {
              setDressInfo({ ...dressInfo, isCheckPoructList: item?.shop_locations })
            }
          })
        }
        console.log(data?.data, "data?.data");
      } catch (error) {

      }
    };
    if (!dressInfo?.isCheckPoructList) {
      fetchDataLocations();
    }
  }, [])

  return (
    <main className="products w-full px-4 md:px-10 md:pb-5">
      {dressInfo?.isCheckPoructList ?
        <Outlet />
        :
        <LoadingForSeller />
      }
    </main>
  );
}
