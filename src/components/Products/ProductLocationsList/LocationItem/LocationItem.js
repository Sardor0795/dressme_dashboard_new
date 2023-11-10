import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import StoreListModal from "./StoreListModal";
import {
  AddLocationIcon,
  BgNoImgIcon,
  CheckIcons,
  DeleteIcon,
} from "../../../../assets/icons";
import { wearImg } from "../../../../assets";

function LocationItem({ data, click }) {
  const [openStoreList, setOpenStoreList] = useState(false);

  const storeToggle = React.useCallback(() => setOpenStoreList(false), []);

  const navigate = useNavigate();
  const goProductDetailEdit = (id) => {
    navigate(`/locations-store/edit-detail/:${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };

  const productList = [
    {
      id: 1,
      name_product: "Кроссовка Nike RUN",
      status: "Одобренный",
      money: "452 000 сум"

    },
    {
      id: 2,
      name_product: "Кроссовка Nike RUN",
      status: "Одобренный",
      money: "452 000"
    },
    {
      id: 3,
      name_product: "Кроссовка Nike RUN",
      status: "Одобренный",
      money: "452 000"
    },
    {
      id: 4,
      name_product: "Кроссовка Nike RUN",
      status: "Одобренный",
      money: "452 000"
    },
    {
      id: 5,
      name_product: "Кроссовка Nike RUN",
      status: "Одобренный",
      money: "452 000"
    },
    {
      id: 6,
      name_product: "Кроссовка Nike RUN",
      status: "Одобренный",
      money: "452 000"
    },
  ];
  console.log(data, "dataBuQandayData");
  return (
    <div className="border border-green-500">
      {data?.map(data => {
        // console.log(data?.photos[0]?.url_photo);
        return (

          <div className="w-full border border-red-500">

            {/* Item List For Desktop */}
            <div className="hidden md:flex items-center w-full ">
              {openStoreList && <StoreListModal onClick={storeToggle} />}

              <div
                onClick={() => {
                  click(data?.id);
                }}
                className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${data?.isCheck
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
                  } flex items-center justify-center rounded-[6px] md:rounded-lg mr-[8px]`}
              >
                <div
                  className={`${data?.isCheck ? "flex items-center justify-center" : "hidden"
                    }`}
                >
                  <CheckIcons />
                </div>
              </div>
              <div className="border-lightBorderColor border rounded-[12px] bg-white pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
                <div className="w-[40px]">{data?.id}</div>
                <div className="mr-[55px] flex items-center justify-center w-[150px] overflow-hidden h-[100px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
                  <img src={data?.photos[0]?.url_photo} alt={"red"} className="w-full h-full object-cover" />
                </div>
                <div className="flex w-full items-center">
                  <div className="w-[18%] text-weatherWinterColor">
                    <span className="max-w-[169px] inline-block text-base not-italic font-AeonikProMedium">
                      {data?.name_ru}
                    </span>
                  </div>
                  <div className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium w-[12%]">{data?.sku}</div>
                  <div className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium w-[11%]">{data?.type_id}</div>
                  <div className="w-[10%] text-tableTextTitle2 text-base not-italic font-AeonikProMedium">{data?.created_at}</div>
                  <div className="w-[14%]">
                    <div
                      className={`w-[113px] text-center text-white font-AeonikProRegular py-[5px] px-[8px] rounded-full bg-green-500 `}
                    >
                      {data?.status}
                    </div>
                  </div>
                  <div className="w-[12%] text-tableTextTitle2 text-base not-italic font-AeonikProMedium">{data?.price || "no price"} сум</div>
                  <button
                    onClick={() => goProductDetailEdit(data?.id)}
                    className="text-[18px] text-weatherWinterColor w-[15%] text-center"
                  >
                    Подробнее
                  </button>
                  <button className="w-[9%] flex justify-center cursor-auto">
                    <span
                      onClick={() => setOpenStoreList(true)}
                      className="cursor-pointer active:translate-y-[2px] text-[#D2D2D2] hover:text-[#F4A622] transition-colors duration-[0.2s] ease-linear"
                    >
                      <AddLocationIcon width={30} />
                    </span>
                  </button>
                  <button className="w-[9%] flex justify-center cursor-auto">
                    <span className="cursor-pointer active:translate-y-[2px] text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                      <DeleteIcon width={30} />
                    </span>
                  </button>
                </div>
              </div>
            </div>


            {/* Item List For Mobile */}
            {productList.map(data => (
              <div key={data.id} className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full">
                <div className="mb-2">
                  <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                    <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                    <span className="text-checkboxBorder">0{data.id}</span>
                    <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                  </div>
                </div>

                <div className="mb-3 h-[148px]">
                  <figure className="w-full h-full rounded-lg overflow-hidden">
                    <img className="w-[100%] h-[100%]" src={wearImg} alt="" />
                  </figure>
                </div>

                <div className="mb-6">
                  <div className="w-full flex items-center  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] gap-x-[10px] mb-[8px]">
                    <div className="w-[40%] flex items-center">Имя товара</div>
                    <div className="w-[30%] flex items-center">Статус</div>
                    <div className="w-[30%] flex items-center">Цена товара</div>
                  </div>

                  <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">
                    <div className="w-[40%]"> {data?.name_product}</div>
                    <div className=" w-[30%] flex items-center justify-center text-white bg-green-500 rounded-lg px-[5px] py-[2px]">{data?.status}</div>
                    <div className="w-[30%]"> {data?.money} сум </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => goMapWear(data?.city)}
                    className="text-[#ED7925] bg-[#FDF1E8] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                  >
                    Добавить в локацию
                  </button>
                  <button
                    onClick={() => goMapCity(data?.city)}
                    className="text-[#007DCA] bg-[#E8F5FD] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                  >
                    Подробнее
                  </button>
                </div>

                <div className="w-full flex items-center justify-between mt-[18px]">
                  <div
                    onClick={() => {
                      click(data?.id);
                    }}
                    className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${data?.isCheck
                      ? "bg-[#007DCA] border-[#007DCA]"
                      : "bg-white border-checkboxBorder"
                      } flex items-center justify-center rounded mr-[8px]`}
                  >
                    <div
                      className={`${data?.isCheck ? "flex items-center justify-center" : "hidden"
                        }`}
                    >
                      <CheckIcons />
                    </div>
                  </div>
                  <button to="#" className="text-textBlueColor text-[13px] font-AeonikProMedium">
                    Больше...
                  </button>
                  <button className="text-red-600 text-[11px] font-AeonikProMedium">Удалить</button>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  );
}
export default React.memo(LocationItem)
