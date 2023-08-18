import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import {
  InputCheck,
  InputCheckedTrueIcons,
} from "../../../../../../assets/icons";

export default function WearCollection({ onClick }) {
  const [selectColorToggleMobile, setSelectColorToggleMobile] = useState(true); // Type
  const [colorGroup, setColorGroup] = useState([
    { id: 1, ColorId: 1, icons: InputCheck, action: false, colors: "bg-black" },
    { id: 2, ColorId: 2, icons: InputCheck, action: false, colors: "bg-white" },
    {
      id: 3,
      ColorId: 3,
      icons: InputCheck,
      action: false,
      colors: "bg-zinc-500",
    },
    {
      id: 4,
      ColorId: 4,
      icons: InputCheck,
      action: false,
      colors: "bg-purple-500",
    },
    {
      id: 5,
      ColorId: 5,
      icons: InputCheck,
      action: false,
      colors: "bg-sky-600",
    },
    {
      id: 6,
      ColorId: 6,
      icons: InputCheck,
      action: false,
      colors: "bg-amber-400 ",
    },
    {
      id: 7,
      ColorId: 7,
      icons: InputCheck,
      action: false,
      colors: "bg-green-700 ",
    },
    {
      id: 8,
      ColorId: 8,
      icons: InputCheck,
      action: false,
      colors: "bg-amber-600 ",
    },
    {
      id: 9,
      ColorId: 9,
      icons: InputCheck,
      action: false,
      colors: "bg-red-700  ",
    },
    {
      id: 10,
      ColorId: 10,
      icons: InputCheck,
      action: false,
      colors: "bg-purple-800 ",
    },
    {
      id: 11,
      ColorId: 11,
      icons: InputCheck,
      action: false,
      colors: "bg-blue-900 ",
    },
    {
      id: 12,
      ColorId: 12,
      icons: InputCheck,
      action: false,
      colors: "bg-yellow-900 ",
    },
  ]);
  return (
    <div className="w-full">
      <section
        className={`h-fit top-30  left-[16px] fixed  bg-white shadow-lg  duration-200 z-50  w-[92%]`}
      >
        <div className="fixed inset-0 z-10 ">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={onClick}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className={`flex items-center justify-between`}>
                <span className="text-gray-800 text-2xl not-italic font-AeonikProRegular">
                  Все фото
                </span>
                <button className="py-2" type="" onClick={onClick}>
                  <GrClose size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
