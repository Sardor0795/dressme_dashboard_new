import React, { useState } from "react";
import { DeleteIcon, InputCheckedTrueIcons, MenuCloseIcons, StarLabel } from "../../../../../../../assets/icons";
import { ColourCard } from "../../../../../../../assets";
import AllSizeListForWear from "../../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import AccessoriesAdd from "../../../Details/Accessories/AccessoriesAdd";
import HeadWearAdd from "../../../Details/HeadWear/HeadWearAdd";
import OutWearAdd from "../../../Details/OutWear/OutWearAdd";
import ShoesAdd from "../../../Details/Shoes/ShoesAdd";
import UnderAddWear from "../../../Details/UnderAddWear/UnderAddWear";
import { BiCheck } from "react-icons/bi";

function AllSizeModalEdit({ onClick, colorGroup, colorSelect, stateList, sizeOfColor }) {

  const [checkColor, setCheckColor] = useState(stateList?.sizeGetList?.colors[0]?.pivot?.id)
  const [addSizeColorById, setAddSizeColorById] = useState(false)
  const [openColorModal, setOpenColorModal] = useState(false)
  const [sizedeleteModal, setSizedeleteModal] = useState(false)

  const onHanldeColorModal = React.useCallback(
    () => setOpenColorModal(true),
    []
  );
  const onHandleDeleteSize = React.useCallback(
    () => setSizedeleteModal(true),
    []
  );

  function onHandleCheckColor(id) {
    if (!checkColor) {
      setCheckColor(id)
    }
    if (checkColor !== id) {
      setCheckColor(id)
    }
  }
  function onHandleAddColorSize(id) {
    if (!addSizeColorById) {
      setAddSizeColorById(id)
    }
    if (addSizeColorById !== id) {
      setAddSizeColorById(id)
    }
  } console.log(sizedeleteModal, "sizedeleteModal");
  // --------------------------------------------------------
  // green black red inputРазмер Талии
  console.log(stateList?.sizeGetList, "stateList?.sizeGetList");
  return (
    <div className="w-full md:w-[780px] h-fit bg-white md:rounded-lg bg-white md:py-5 px-2 ls:px-3 ll:px-5 py-[6px] ls:py-2 ll:py-[10px] md:px-4 ">
      <section
        onClick={() => {
          setOpenColorModal(false)
          setSizedeleteModal(false)
        }}
        className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${openColorModal || sizedeleteModal ? "" : "hidden"}`}
      ></section>
      {/* Color Modal */}
      <div
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openColorModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"}`}>
        <div className="flex items-center justify-between">
          <p>
            Выберите цвет
          </p>
          <button
            className="py-2"
            type="button"
            onClick={() => setOpenColorModal(false)}
          >
            <MenuCloseIcons colors={"#a2a2a2"} />
          </button></div>
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
          <button onClick={() => setOpenColorModal(false)}
            className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
            Готово
          </button>
        </div>
      </div>
      {/* Color Delete Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${sizedeleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"}`}>

        <button
          onClick={() => setSizedeleteModal(false)}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a2a2a2"} />
        </button>

        <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
          <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
            <span className="cursor-pointer active:translate-y-[2px] text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
              <DeleteIcon width={30} />
            </span>
          </span>
          <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
            Вы уверены?
          </span>
        </div>

        {/* } */}
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">

          <button
            onClick={() => setSizedeleteModal(false)}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            Oтмена
          </button>
          <button
            onClick={() => setSizedeleteModal(false)}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            Удалить</button>
        </div>

      </section>
      <div className="w-full flex items-center justify-between md:pl-7 ">
        <div className="w-fit flex items-center gap-x-2">
          <span className="text-black text-md not-italic font-AeonikProRegular"> Цветa:</span>
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
                </span>
              </div>
            );
          })}
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
        <div className="w-full h-full overflow-auto   flex flex-col gap-y-2   md:py-1 mb-5">

          {/* Filter Area */}
          <div className="w-full h-full overflow-auto ">
            <HeadWearAdd stateList={stateList?.sizeGetList} colorsList={stateList?.sizeGetList?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} checkColor={checkColor} />
            <OutWearAdd stateList={stateList?.sizeGetList} colorsList={stateList?.sizeGetList?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} checkColor={checkColor} />
            <UnderAddWear stateList={stateList?.sizeGetList} colorsList={stateList?.sizeGetList?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} checkColor={checkColor} />
            <ShoesAdd stateList={stateList?.sizeGetList} colorsList={stateList?.sizeGetList?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} checkColor={checkColor} />
            <AccessoriesAdd stateList={stateList?.sizeGetList} colorsList={stateList?.sizeGetList?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} checkColor={checkColor} />

          </div>
        </div>
      </div>
    </div >
  );
}
export default React.memo(AllSizeModalEdit);

