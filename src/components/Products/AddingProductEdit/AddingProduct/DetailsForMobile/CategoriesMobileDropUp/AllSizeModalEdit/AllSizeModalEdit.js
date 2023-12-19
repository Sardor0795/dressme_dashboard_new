import React, { useState } from "react";
import { InputCheckedTrueIcons, MenuCloseIcons, StarLabel } from "../../../../../../../assets/icons";
import { ColourCard } from "../../../../../../../assets";
import AllSizeListForWear from "../../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import AccessoriesAdd from "../../../Details/Accessories/AccessoriesAdd";
import HeadWearAdd from "../../../Details/HeadWear/HeadWearAdd";
import OutWearAdd from "../../../Details/OutWear/OutWearAdd";
import ShoesAdd from "../../../Details/Shoes/ShoesAdd";
import UnderAddWear from "../../../Details/UnderAddWear/UnderAddWear";
import { BiCheck } from "react-icons/bi";

function AllSizeModalEdit({ onClick, colorGroup, colorSelect, stateList, sizeOfColor }) {
  // console.log(onClick, "onClick");
  // console.log(colorGroup, "colorGroup");
  // console.log(colorSelect, "colorSelect");
  // console.log(stateList?.category_Id, "stateList");
  // console.log(stateList?.sizeGetList[0], "stateList");
  // console.log(stateList?.sizeGetList?.colors, "sizes --- stateList");
  const [checkColor, setCheckColor] = useState(stateList?.sizeGetList?.colors[0]?.pivot?.id)
  const [addSizeColorById, setAddSizeColorById] = useState(false)
  const [openColorModal, setOpenColorModal] = useState(false)
  // console.log(stateList?.sizeGetList?.colors[0]?.pivot?.id, "stateList?.sizeGetList?.colors[0]?.pivot?.id");
  function onHandleCheckColor(id) {
    if (!checkColor) {
      setCheckColor(id)
    }
    if (checkColor === id) {
      setCheckColor()
    }
    if (checkColor !== id) {
      setCheckColor(id)
    }
    console.log(id, "id");
  }
  function onHandleAddColorSize(id) {
    console.log(id, "onHandleAddColorSize");
    if (!addSizeColorById) {
      setAddSizeColorById(id)
    }

    if (addSizeColorById !== id) {
      setAddSizeColorById(id)
    }
    // setAddSizeColorById(id)
  }
  // --------------------------------------------------------
  // green black red inputРазмер Талии
  console.log(stateList?.sizeGetList, "stateList?.sizeGetList");
  return (
    <div className="w-full md:w-[780px] h-fit bg-white md:rounded-lg bg-white md:py-5 px-2 ls:px-3 ll:px-5 py-[6px] ls:py-2 ll:py-[10px] md:px-4 ">
      <section
        onClick={() => { setOpenColorModal(false) }}
        className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${openColorModal ? "" : "hidden"}`}
      ></section>
      <div className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openColorModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"}`}>
        <div className="w-full py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6">
          {stateList?.sizeGetList?.colors?.filter(e => e?.pivot?.id !== checkColor)?.map((data) => {
            return (
              <div
                key={data?.id}
                className={`flex flex-col items-center justify-center `}>
                <div
                  className={` relative rounded-[12px] overflow-hidden flex items-center justify-center  w-[65px] h-[40px] bg-[${data.hex
                    }] cursor-pointer ${data?.id == 2
                      ? "border border-setTexOpacity flex items-center justify-center"
                      : ""
                    }
                     `}
                >
                  <div
                    onClick={() => onHandleAddColorSize(data?.pivot?.id)}
                    style={{ background: `${data.hex}` }}
                    className="w-full h-full flex items-center justify-center">
                    {data?.pivot?.id == addSizeColorById && data?.id !== 1 ?
                      <BiCheck size={28} color={"#000"} className="flex items-center justify-center" />
                      : null}
                    {data?.pivot?.id == addSizeColorById && data?.id === 1 ?
                      <BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />
                      : null}
                  </div>
                </div>
                <span
                  className={`text-black text-center text-[14px] not-italic font-AeonikProRegular  `}
                >
                  {data?.name_ru}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-end  gap-x-5">

          {/* {state?.color_Id &&
            <button
              onClick={() => setOpenColorModal(false)}
              className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"                    >
              Отключить
            </button>
          } */}
          <button onClick={() => setOpenColorModal(false)}
            className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
            Готово
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-between md:pl-7 ">
        <div className="w-fit flex items-center gap-x-2">
          <span className="text-black text-md not-italic font-AeonikProRegular"> Цветa:</span>
          {/* {colorGroup?.filter(e => colorSelect?.includes(e?.id))?.map((data) => {
            return (
              <div onClick={() => onHandleCheckColor(data?.id)} key={data?.id} style={{ background: `${data.hex}` }}
                className={`w-[22px] h-[22px] rounded-full ${data?.id === 2 ? "border border-black" : ""}`}
              >
                <span
                  className={`w-[22px] h-[22px] rounded-full flex items-center justify-center`}
                >
                  {data?.id === checkColor &&
                    <BiCheck size={28} color={"#000"} className="flex items-center justify-center" />
                  }
                </span>
              </div>
            );
          })} */}
          {stateList?.sizeGetList?.colors?.map((data) => {
            return (
              <div onClick={() => onHandleCheckColor(data?.pivot?.id)} key={data?.id} style={{ background: `${data.hex}` }}
                className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
              >
                <span
                  className={`w-[22px] h-[22px] rounded-full flex items-center justify-center`}
                >
                  {data?.pivot?.id === checkColor && data?.id !== 1 &&
                    < BiCheck size={28} color={"#000"} className="flex items-center justify-center" />
                  }
                  {data?.pivot?.id === checkColor && data?.id === 1 &&
                    < BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />
                  }

                  {/* {(
                    <BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />
                  ) : null} */}

                </span>
              </div>
            );
          })}
          {/* <span className="w-[18px] h-[18px] flex items-center mt-[2px]"><MenuCloseIcons colors={"#007dca"} /></span> */}
        </div>
        <button className="md:flex hidden" type="button " onClick={onClick}>
          <MenuCloseIcons colors={"#000"} />
        </button>
        <label className="md:hidden flex items-center border border-borderColor rounded-lg overflow-hidden">
          <input type="checkbox" className="w-[20px] h-[20px] rounded-lg" />
        </label>
      </div>

      {/* All Cards */}
      <div className="md:h-[694px]  overflow-hidden h-500  md:mt-6">
        <div className="w-full h-full overflow-auto VerticelScroll  flex flex-col gap-y-2   md:py-1 mb-5">
          <div className="md:flex hidden items-center justify-between mb-[10px] ">
            <button type="button" className="flex items-center gap-x-[5px]">
              <span className="w-[22px] h-[22px] border border-borderColor rounded-lg"></span>
              <span className="text-gray-900 text-base not-italic font-AeonikProMedium">
                Выбрать все
              </span>
            </button>

            <button type="button" onClick={() => setOpenColorModal(true)} className="text-textBlueColor hover:underline text-base not-italic font-AeonikProMedium">
              Добавить выбранные к цвету
            </button>
          </div>

          {/* Filter Area */}
          <div className="w-full h-full overflow-auto VerticelScroll">
            {
              stateList?.sizeGetList?.sizes?.filter(e => e?.product_color_id == checkColor)?.map(item => {
                return (
                  <div className="">
                    <AccessoriesAdd stateList={item} colorsList={stateList?.sizeGetList?.colors} />
                    <ShoesAdd stateList={item} colorsList={stateList?.sizeGetList?.colors} />
                    <HeadWearAdd stateList={item} colorsList={stateList?.sizeGetList?.colors} />
                    <OutWearAdd stateList={item} colorsList={stateList?.sizeGetList?.colors} />
                    <UnderAddWear stateList={item} colorsList={stateList?.sizeGetList?.colors} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div >
  );
}
export default React.memo(AllSizeModalEdit);

