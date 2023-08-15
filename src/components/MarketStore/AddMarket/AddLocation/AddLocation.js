import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { StarLabel, TelIcon } from "../../../../assets/icons";
import { YMaps, Map, GeolocationControl, ZoomControl } from "react-yandex-maps";


function AddLocation() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full max-w-[1120px] mx-auto mt-6 md:mt-12">
      <div className="my-4">
        <div className="text-center mb-6 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium">
          Добавить локацию магазина
        </div>

        <div className="w-full">
          <YMaps query={{ apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21" }}>
            <Map
              defaultState={{ center: [41.311753, 69.241822], zoom: 13 }} 
              width="100%"
              height="400px"
              modules={["control.FullscreenControl"]}
            >
              <GeolocationControl
              options={{
                float: "right",
                position: { bottom: 200, right: 10 },
              }}
            />
            <ZoomControl
              options={{
                float: "right",
                position: { bottom: 145, right: 10, size: "small" },
                size: "small",
              }}
            />

           </Map>
          </YMaps>
        </div>

        
        <div className="flex mt-[10px] gap-[25px] mb-[25px]">
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                Фото локации
              </span>
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </Link>
          </div>
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                Второе фото локации ?
              </span>
            </Link>
          </div>
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                Третье фото локации ?
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center w-full gap-[32px] mb-5">
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Имя администратора
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </div>
            <input
              type="text"
              className="border border-borderColor p-3 rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium"
            />
          </div>
          <div className="flex-1">
            <div className="text-base mb-[10px]">
              Имя второго администратора
            </div>
            <input
              type="text"
              placeholder="(не обезательно)"
              className="border placeholder:text-xs border-borderColor p-3 rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium"
            />
          </div>
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Рабочее время
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </div>
            от
            <input
              type="text"
              className="mr-5 ml-[5px] border border-borderColor p-3 rounded-lg w-full max-w-[63px] text-base font-AeonikProMedium"
            />
            до
            <input
              type="text"
              className="ml-[5px] border border-borderColor p-3 rounded-lg w-full max-w-[63px] text-base font-AeonikProMedium"
            />
          </div>
        </div>

        <div className="flex items-center w-full gap-[32px] mb-[50px]">
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Номер администратора
              <span className="ml-[5px]">{/* <StarLabel /> */}</span>
            </div>
            <div className="flex items-center border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
              <span className="h-full flex items-center px-[12px] border-r border-lightBorderColor">
                +998
              </span>
              <input type="tel" className="pl-3 outline-none " />
              <span className="mr-12">
                <TelIcon />
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Номер второго администратора
            </div>
            <div className="flex items-center border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
              <span className="h-full flex items-center px-[12px] border-r border-lightBorderColor">
                +998
              </span>
              <input
                type="tel"
                placeholder="(не обезательно)"
                className="pl-3 outline-none placeholder:text-xs"
              />
              <span className="mr-12">
                <TelIcon />
              </span>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="flex justify-center">
          <Link
            className="inline-block px-[100px] py-[15px] bg-textBlueColor text-white rounded-lg active:scale-95"
            // to={"/store"}
          >
            Добавить
          </Link>
        </div>
      </div>
    </div>
  );
}
export default React.memo(AddLocation);