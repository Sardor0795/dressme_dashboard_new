import React, { useEffect, useState } from "react";
import {
  CloseAnswer,
  MobileStar,
  SearchIcon,
  StarIcon,
} from "../../../../assets/icons";
import EditComponent from "./EditComment";
import { useTranslation } from "react-i18next";

export default function WearCommentTitle({ titleProduct, handleRefetch }) {
  const [state, setState] = useState({
    startReviews: true,
    searchComment: ""
  });

  const { t } = useTranslation("reviews");

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-full  flex flex-col md:gap-y-[15px]  ">
      <div className="pb-1 md:justify-end text-tableTextTitle2 text-xl not-italic font-AeonikProMedium flex items-center md:gap-x-4 mt-[37px] mb-[18px] md:mt-0 md:mb-0 ">
        <p className="mr-[10px] md:ml-0"> {t("customer_reviews")}</p>
        <span className="block md:hidden text-xs text-mobileTextColor">
          ( {titleProduct?.locationListId?.product?.ratings?.length || 0}{" "}
          {t("reviews_two")}){" "}
        </span>
      </div>
      {titleProduct?.locationListId?.product?.ratings?.map((item, id) => {
        return (
          <div key={id}>
            <EditComponent
              item={item}
              titleProduct={titleProduct}
              handleRefetch={handleRefetch}
            />
          </div>
        );
      })}
    </div>
  );
}
