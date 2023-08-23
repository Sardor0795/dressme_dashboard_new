import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowTopIcons, StarLabel, TelIcon } from "../../../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import StoreListModal from "./Modal/StoreListModal";
import YandexMaps from "./YandexMaps";

export default function AddLocation() {
  const navigate = useNavigate();

  const [openStoreList, setOpenStoreList] = useState(false);

  const storeToggle = React.useCallback(() => setOpenStoreList(false), []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12">
      {openStoreList && <StoreListModal onClick={storeToggle} />}
      <div className="my-4">
        <div className="text-center mb-6 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium">
          Добавить локацию магазина
        </div>
        <div className="mb-3">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
          >
            <AiOutlineLeft />
          </button>
        </div>
        <div className="h-[400px]">
          <YandexMaps />
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
              placeholder="Имя администратора"
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
              placeholder="9:00"
              className="mr-5 ml-[5px] border border-borderColor p-3 rounded-lg w-full max-w-[68px] text-base font-AeonikProMedium text-center"
            />
            до
            <input
              type="text"
              placeholder="21:00"
              className="text-center ml-[5px] border border-borderColor p-3 rounded-lg w-full max-w-[68px] text-base font-AeonikProMedium"
            />
          </div>
        </div>

        <div className="flex items-center w-full gap-[32px] mb-[50px]">
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Номер администратора
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </div>
            <div className="flex items-center border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
              <span className="h-full flex items-center px-[12px] border-r border-lightBorderColor">
                +998
              </span>
              <input
                type="tel"
                placeholder="(97) 740-23-99"
                className="pl-3 outline-none "
              />
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
          <div className="flex-1">
            <div className="w-full" onClick={() => setOpenStoreList(true)}>
              <div className="text-base flex items-center mb-[10px]">
                Выберите регион
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="flex items-center justify-between px-3 cursor-pointer border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                <span className="text-[#8C8C8C] font-AeonikProRegular text-[13px]">
                  Выберите регион
                </span>
                <span className="rotate-[90deg]">
                  <ArrowTopIcons colors={"#A4A4A4"} />
                </span>
              </div>
            </div>
          </div>
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
// export default React.memo(AddLocation);
