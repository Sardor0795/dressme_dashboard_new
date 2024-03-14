import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export default function NoLocationProduct() {
  const { t } = useTranslation("product");


  return (
    <div className="w-full h-[90vh] flex items-center justify-center px-4 md:px-10">
      <div className="w-fit h-fit flex flex-col justify-center items-center gap-y-[50px]">
        <p className="text-red-500 text-2xl not-italic font-AeonikProRegular">
          {t("PRNoLocation")}
        </p>
        <Link
          to={"/locations-store"}
          className="px-7 active:scale-95  active:opacity-70 cursor-pointer py-3 rounded-lg flex items-center justify-center bg-textBlueColor text-white text-lg not-italic font-AeonikProMedium"
        >
          {t("PRaddTocation")}
        </Link>
      </div>
    </div>
  );
}
