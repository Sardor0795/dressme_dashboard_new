import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  ArrowTopIcons,
  GoBackIcons,
  SearchIcon,
  StarLabel,
  TelIcon,
} from "../../../../assets/icons";
import { Aligarx } from "../../../../assets";
import { message } from "antd";
import { AiOutlineLeft } from "react-icons/ai";
import { DatePicker, Space } from "antd";
import LocationOfYandex from "./LocationOfYandex/LocationOfYandex.js";
import RegionListOfLocation from "./Modal/RegionListOfLocation";

const { RangePicker } = DatePicker;

function LocationMapCity() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { id } = useParams();
  const NewId = id.replace(":", "");
  const success2 = () => {
    messageApi.open({
      type: "success",
      content: "Удалить",
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);



  const [openRegionList, setOpenRegionList] = useState(false);

  const RegionToggle = React.useCallback(() => setOpenRegionList(false), []);

  return (
    <div className="w-full">
      <div className="">
        <section
          onClick={() => setOpenRegionList(false)}
          className={`fixed inset-0 z-[10000] border border-red-500 duration-200 w-full h-[100vh] bg-black opacity-50 
          ${openRegionList ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`max-w-[440px] w-full h-fit mx-auto fixed z-[10001] left-0 right-0  duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openRegionList ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          {openRegionList &&
            <RegionListOfLocation onClick={RegionToggle} />
          }
        </section>
      </div>
      <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12 mb-[30px]">
        <div className="my-4 ">
          <div className="  flex items-center justify-center mb-6">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="  md:hidden absolute left-2 flex items-center cursor-pointer justify-center "
            >
              <GoBackIcons />
            </button>
            <div className="text-center  text-xl md:text-[35px] font-AeonikProMedium   md:px-0 ">
              {NewId}
            </div>
          </div>{" "}
          <div className=" px-4 md:px-0  w-full flex items-center justify-end md:justify-between mb-2 md:mb-3 md:pb-0 pb-[8px] md:border-0 border-b border-borderColor">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <AiOutlineLeft />
            </button>
            <div className="flex items-center gap-x-[8px] xs:gap-x-[15px]">
              <NavLink
                to="/store/location-add"
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
              >
                Изменить магазин{" "}
              </NavLink>
              <span className="w-[2px] h-[12px] xs:h-[14px] bg-borderColor"></span>
              <NavLink
                to="/store/market-add"
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
              >
                Одежда{" "}
              </NavLink>
              <span className="w-[2px] h-[12px] xs:h-[14px] bg-borderColor"></span>
              <button
                onClick={success2}
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
              >
                Удалить
              </button>
            </div>
          </div>
          <div className="h-[400px]">
            <LocationOfYandex />
          </div>
          <div className=" px-4 md:px-0  flex mt-[10px] justify-between items-centers gap-x-[5px] ls:gap-x-[10px] md:gap-[25px] mb-[25px] ">
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={Aligarx}
                alt=""
              />
            </div>
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={Aligarx}
                alt=""
              />
            </div>
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={Aligarx}
                alt=""
              />
            </div>
          </div>
          <div className="w-full  px-4 md:px-0  ">
            <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 ">
              <label className="w-full md:w-[31%] xs:w-[48%]   ">
                <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                  Имя администратора{" "}
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full w-full md:max-w-[287px] text-base font-AeonikProMedium">
                  <input
                    type="text"
                    name="fname"
                    value={"Samandar"}
                    placeholder=" Имя администратора"
                    className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2"
                  />
                </div>
              </label>
              <label className="w-full md:w-[31%] xs:w-[48%]  ">
                <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                  Имя второго администратора{" "}
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="w-full flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[287px] text-base font-AeonikProMedium">
                  <input
                    type="text"
                    name="fname"
                    value={"Samandar"}
                    placeholder=" (не обезательно)"
                    className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2 "
                  />
                </div>
              </label>
              <div className="w-full md:w-[31%] xs:w-[48%]  ">
                <div className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                  Рабочее время
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="w-full flex  items-center">
                  {" "}
                  <span className="w-fit text-[12px] md:text-base flex items-center ">
                    от
                  </span>
                  <input
                    type="text"
                    value={"09:00"}
                    className="mr-5 ml-[5px] w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-[32px] md:h-[45px] rounded md:rounded-lg  md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular "
                  />
                  <span className="w-fit text-[12px] md:text-base flex items-center ">
                    до
                  </span>
                  <input
                    type="text"
                    value={"20:00"}
                    className="ml-[5px] w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-[32px] md:h-[45px] rounded md:rounded-lg  md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular "
                  />
                </div>
              </div>
              <label className="w-full md:w-[31%] xs:w-[48%]   ">
                <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                  Номер администратора
                  <span className="ml-[5px]">{/* <StarLabel /> */}</span>
                </div>
                <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full w-full md:max-w-[287px] text-base font-AeonikProMedium">
                  <span className="h-full text-[12px] md:text-base  flex items-center px-[12px] border-r border-lightBorderColor">
                    +998
                  </span>
                  <input
                    type="phone"
                    value={"(97) 214-34-56"}
                    className="pl-3 outline-none text-[12px] md:text-[14px] font-AeonikProRegular  "
                  />
                </div>
              </label>
              <label className="w-full md:w-[31%] xs:w-[48%]  ">
                <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                  Номер второго администратора{" "}
                  <span className="ml-[5px]">{/* <StarLabel /> */}</span>
                </div>
                <div className="flex items-center border border-borderColor  h-[32px] md:h-[45px]  rounded md:rounded-lg w-full w-full md:max-w-[287px] text-base font-AeonikProMedium">
                  <span className="h-full text-[12px] md:text-base  flex items-center px-[12px] border-r border-lightBorderColor">
                    +998
                  </span>
                  <input
                    value={"(97) 214-34-56"}
                    className="pl-3 outline-none text-[12px] md:text-[14px] font-AeonikProRegular  "
                  />
                </div>
              </label>
              <div className="w-full md:w-[31%] xs:w-[48%]   ">
                <div className="w-full">
                  <div className="text-[12px] md:text-[14px] font-AeonikProRegular flex items-center mb-[10px]">
                    Выберите регион
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div onClick={() => setOpenRegionList(true)} className="flex items-center justify-between px-3 cursor-pointer border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full w-full md:max-w-[287px] text-base font-AeonikProMedium">
                    <span className="text-[#8C8C8C] font-AeonikProRegular text-[12px] md:text-[14px] font-AeonikProRegular ">
                      Выберите регион
                    </span>
                    <span className="rotate-[90deg]">
                      <ArrowTopIcons colors={"#A4A4A4"} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-[50px]  px-4 md:px-0 ">
            <Link
              className="w-full md:w-fit h-[42px] flex items-center justify-center md:px-[100px]  bg-textBlueColor text-white rounded md:rounded-lg active:scale-95"
            // to={"/store"}
            >
              Добавить
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(LocationMapCity);
