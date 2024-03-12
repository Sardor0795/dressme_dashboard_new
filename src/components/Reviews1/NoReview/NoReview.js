import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function NoReviewProduct() {

  const { t } = useTranslation("reviews")

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-[calc(100vh-250px)]  flex items-center justify-center">
      <span className="text-gray-800 text-base md:text-2xl not-italic font-AeonikProRegular">
        {t("no_reviews")} !
      </span>
    </div>
  );
}
