import React, { useState } from "react";
import { AddIconsCircle, MenuCloseIcons } from "../../../assets/icons";
import { Link } from "react-router-dom";

export default function NoLocationProduct() {
  const [isWear, setIsWear] = useState(true);
  return (
    <div className="w-full h-[calc(100vh-200px)] ">
      {isWear ? (
        <div className="w-full h-fit">
          <section className="flex items-center  gap-x-4 py-10">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Yunusobod
            </p>
            <button
              onClick={() => setIsWear(false)}
              className="flex items-center gap-x-[4px] cursor-pointer"
            >
              <span>
                <AddIconsCircle />
              </span>
              <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
                Добавить одежду
              </span>
            </button>
          </section>
          <section className="w-full h-[80px] border border-borderColor rounded-lg flex items-center pl-6">
            <span className="text-red-500 text-2xl not-italic font-AeonikProRegular">
              У вас пока нет одежд в этой локации !
            </span>
          </section>
        </div>
      ) : (
        <div className="flex items-center h-full justify-center">
          <Link className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline">
            Сначала добавьте локацию !
          </Link>
        </div>
      )}
    </div>
  );
}
