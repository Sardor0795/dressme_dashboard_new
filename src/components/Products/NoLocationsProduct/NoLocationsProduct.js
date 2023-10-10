import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dressMainData } from "../../../hook/ContextTeam";

export default function NoLocationProduct() {
  const [dressInfo, setDressInfo] = useContext(dressMainData)


  return (
    <div className="w-full h-[90vh] ">
      {
        dressInfo?.hasMagazin?.shops?.data?.length ? (

          !dressInfo?.hasLocation?.length && <div className="flex items-center h-full justify-center">
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
