import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function NoLocationProduct() {
  const [state, setState] = useState({
    hasMagazin: "",
    hasLocation: "",
  })
  const url = "https://api.dressme.uz/api/seller"

  // // ------------GET  Has Magazin ?-----------------
  useQuery(["magazin"], () => {
    return fetch(`${url}/shops`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",

        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setState({ ...state, hasMagazin: res })
      },
      onError: (err) => {
        console.log(err, "err magazin");
      },
      // keepPreviousData: true,
      // refetchOnWindowFocus: false,
    }
  )

  // ------------GET  Has Location ?-----------------
  useQuery(["magazin location"], () => {
    return fetch(`${url}/shops/locations/index`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",

        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setState({ ...state, hasLocation: res })
      },
      onError: (err) => {
        console.log(err, "err magazin location");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  console.log(state?.hasLocation, "state?.hasLocation");
  console.log(state?.hasMagazin, "state?.hasMagazin");
  return (
    <div className="w-full h-[90vh] ">
      {
        state?.hasMagazin?.shops?.data?.length ? (

          !state?.hasLocation?.length && <div className="flex items-center h-full justify-center">
            <Link
              to="/locations-store"
              className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
            >
              Сначала добавьте локацию!
            </Link>
          </div>
        )
          :
          <div className="flex items-center h-full justify-center">
            <Link
              to="/store"
              className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
            >
              Сначала создайте магазин!
            </Link>
          </div>
      }
      {/* { dressInfo?.hasMagazin?.shops?.data?.length && dressInfo?.hasLocation && <div className="flex items-center h-full justify-center">
        <Link
          to="/locations-store"
          className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
        >
          Сначала добавьте локацию!
        </Link>
      </div>}
      {
        !dressInfo?.hasMagazin?.shops?.data?.length && <div className="flex items-center h-full justify-center">
          <Link
            to="/store"
            className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
          >
            Сначала создайте магазин!
          </Link>
        </div>
      } */}



    </div>
  );
}
