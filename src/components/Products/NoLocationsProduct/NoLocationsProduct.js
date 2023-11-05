import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dressMainData } from "../../../hook/ContextTeam";
import { useHttp } from "../../../hook/useHttp";

export default function NoLocationProduct() {

  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const { request } = useHttp()
  const [isLocation, setIsLocation] = useState()
  const [isShops, setIsShops] = useState()

  useQuery(["magazin_location"], () => { return request({ url: "/shops/locations/index", token: true }); },
    {
      onSuccess: (res) => {
        setIsLocation(res)
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  useQuery(["shops_index"], () => { return request({ url: "/shops", token: true }) },
    {
      onSuccess: (res) => {
        if (res?.shops) {
          setIsShops(res?.shops)
        }
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );



  console.log(isLocation, "isLocation------");
  console.log(isShops, "isShops---------");
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="w-fit h-fit flex flex-col justify-center items-center gap-y-[50px]">
        <p className="text-red-500 text-2xl not-italic font-AeonikProRegular">
          У вас пока нет локации !
        </p>
        <Link
          to={"/locations-store"}
          className="px-7 active:scale-95  active:opacity-70 cursor-pointer py-3 rounded-lg flex items-center justify-center bg-textBlueColor text-white text-lg not-italic font-AeonikProMedium"
        >
          Добавить локацию
        </Link>
      </div>
      {/* {
        isShops?.data?.length ? (

          !dressInfo?.SellerMagazinLocation?.length && <div className="flex items-center h-full justify-center">
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
      } */}
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
