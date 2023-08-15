import React, { useEffect } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { ArrowTopIcons, StarLabel, TelIcon } from "../../../../assets/icons";
import { Aligarx, mapImg } from "../../../../assets";
import { message,} from "antd";
import { AiOutlineLeft } from "react-icons/ai";

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
  return (
    <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12 mb-[30px]">
      <div className="my-4">
        <div className="text-center  text-5 md:text-[35px] font-AeonikProMedium">
          {NewId}
        </div>
        <div className="flex items-center justify-between mb-3 mt-2">
          <div>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <AiOutlineLeft />
            </button>
          </div>
          <div className="flex items-end ">
            {" "}
            <div className="flex items-end gap-x-[15px] pt-3">
              <NavLink
                to="/#"
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-sm not-italic font-AeonikProMedium"
              >
                Изменить магазин{" "}
              </NavLink>
              <span className="w-[2px] h-[14px] bg-borderColor"></span>
              <NavLink
                to="/#"
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-sm not-italic font-AeonikProMedium"
              >
                Одежда{" "}
              </NavLink>
              <span className="w-[2px] h-[14px] bg-borderColor"></span>
              <button
                onClick={success2}
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-sm not-italic font-AeonikProMedium"
              >
                Удалить
              </button>
              {contextHolder}
            </div>
          </div>
        </div>
        <div className="map h-[400px] bg-slate-400 rounded-lg overflow-hidden">
          <img src={mapImg} alt="" className="w-full h-full" />
        </div>

        <div className="flex mt-[10px] gap-[25px] mb-[25px]">
          <div className="relative w-full h-fit flex flex-col items-center justify-center rounded-lg">
            <div className="w-full h-[130px]">
              <img className="w-full h-full" src={Aligarx} alt="" />
            </div>
            <div className="w-full mt-6">
              <div className="text-base flex items-center mb-[10px]">
                Имя администратора
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <input
                type="text"
                value={"Samandar"}
                className="border border-borderColor p-3 rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium"
              />
            </div>
            <div className="w-full mt-8">
              <div className="text-base flex items-center mb-[10px]">
                Номер администратора
                <span className="ml-[5px]">{/* <StarLabel /> */}</span>
              </div>
              <div className="flex items-center border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                <span className="h-full flex items-center px-[12px] border-r border-lightBorderColor">
                  +998
                </span>
                <input
                  type="tel"
                  value={"(97) 214-34-56"}
                  className="pl-3 outline-none "
                />
                <span className="mr-12">
                  <TelIcon />
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-fit flex flex-col items-center justify-center rounded-lg">
            <div className="w-full h-[130px]">
              <img className="w-full h-full" src={Aligarx} alt="" />
            </div>
            <div className="w-full mt-6">
              <div className="text-base flex items-center mb-[10px]">
                Имя второго администратора{" "}
              </div>
              <input
                type="text"
                value={"Samandar"}
                className="border border-borderColor p-3 rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium"
              />
            </div>
            <div className="w-full mt-8">
              <div className="text-base flex items-center mb-[10px]">
                Номер второго администратора{" "}
                <span className="ml-[5px]">{/* <StarLabel /> */}</span>
              </div>
              <div className="flex items-center border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                <span className="h-full flex items-center px-[12px] border-r border-lightBorderColor">
                  +998
                </span>
                <input
                  type="tel"
                  value={"(97) 214-34-56"}
                  className="pl-3 outline-none "
                />
                <span className="mr-12">
                  <TelIcon />
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-fit flex flex-col items-center justify-center rounded-lg">
            <div className="w-full h-[130px]">
              <img className="w-full h-full" src={Aligarx} alt="" />
            </div>
            <div className="w-full mt-6">
              <div className="text-base flex items-center mb-[10px]">
                Рабочее время
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              от
              <input
                type="text"
                value={"09:00"}
                className="mr-5 ml-[5px] border border-borderColor p-3 rounded-lg w-full max-w-[80px] text-base font-AeonikProMedium"
              />
              до
              <input
                type="text"
                value={"20:00"}
                className="ml-[5px] border border-borderColor p-3 rounded-lg w-full max-w-[80px] text-base font-AeonikProMedium"
              />
            </div>
            <div className="w-full mt-8">
              <div className="text-base flex items-center mb-[10px]">
                Выберите регион{" "}
                <span className="ml-[5px]">{/* <StarLabel /> */}</span>
              </div>
              <div className="flex items-center justify-between px-3 cursor-pointer border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                <span>Tashkent, yunusobod</span>
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
export default React.memo(LocationMapCity);
