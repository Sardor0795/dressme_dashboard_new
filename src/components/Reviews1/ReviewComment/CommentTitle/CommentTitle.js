import React, { useEffect, useState } from "react";
import {
  CloseAnswer,
  MobileStar,
  SearchIcon,
  StarIcon,
} from "../../../../assets/icons";
import EditComponent from "./EditComment";
import { useTranslation } from "react-i18next";

const CommentTitle = ({ titleStore, handleRefetch }) => {
  const { t } = useTranslation("reviews");

  const [state, setState] = useState({
    startReviews: true,
    searchComment: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col md:gap-y-[15px]">
      <div className="pb-1 md:justify-end text-tableTextTitle2 text-xl not-italic font-AeonikProMedium flex items-center md:gap-x-4 mt-[37px] mb-[18px] md:mt-0 md:mb-0">
        <p className="mr-[10px] md:ml-0"> {t("customer_reviews")}</p>
        <span className="block md:hidden text-xs text-mobileTextColor mt-[3px]">
          ({t("reviews_two")}:
          <span className="ml-[4px]">
            {titleStore?.locationListId?.shop?.ratings?.length || 0}{" "}
          </span>
          )
        </span>
      </div>

      {!state.startReviews ? (
        <div className="w-full flex md:hidden items-center justify-between mb-4">
          <div className="flex items-center ">
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg mr-[5px]">
              <span className="mr-[5px] group-focus:text-white">1</span>
              <StarIcon width={14} height={14} />
            </button>
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg mr-[5px]">
              <span className="mr-[5px] group-focus:text-white">2</span>
              <StarIcon width={14} height={14} />
            </button>
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg mr-[5px]">
              <span className="mr-[5px] group-focus:text-white">3</span>
              <StarIcon width={14} height={14} />
            </button>
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg mr-[5px]">
              <span className="mr-[5px] group-focus:text-white">4</span>
              <StarIcon width={14} height={14} />
            </button>
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg">
              <span className="mr-[5px] group-focus:text-white">5</span>
              <StarIcon width={14} height={14} />
            </button>
          </div>
          <button
            onClick={() => setState({ ...state, startReviews: true })}
            className="w-9 h-9 bg-white flex items-center justify-center active:scale-95  active:opacity-70 text-white border border-textBlueColor rounded-lg"
          >
            <CloseAnswer colors="#007DCA" />
          </button>
        </div>
      ) : (
        ""
      )}

      {titleStore?.locationListId?.shop?.ratings?.map((item, id) => {
        return (
          <div key={id}>
            <EditComponent
              item={item}
              titleStore={titleStore}
              handleRefetch={handleRefetch}
            />
          </div>
        );
      })}
    </div>
  );
};
export default React.memo(CommentTitle);
