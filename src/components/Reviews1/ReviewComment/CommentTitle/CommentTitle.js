import React, { useEffect, useState } from "react";
import {
  CloseAnswer,
  MobileStar,
  SearchIcon,
  StarIcon,
} from "../../../../assets/icons";
import EditComponent from "./EditComponent";

const CommentTitle = ({ titleStore, handleRefetch }) => {
  
  const [state, setState] = useState({
    startReviews: true,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-full  flex flex-col md:gap-y-[15px]">
      <div className="pb-1 md:justify-end text-tableTextTitle2 text-xl not-italic font-AeonikProMedium flex items-center md:gap-x-4 mt-[37px] mb-[18px] md:mt-0 md:mb-0">
        <p className="mr-[10px] md:ml-0"> Отзывы клиентов</p>
        <span className="block md:hidden text-xs text-mobileTextColor mt-[3px]">
          ( {titleStore?.locationListId?.shop?.ratings?.length || 0} отзывы ){" "}
        </span>
      </div>

      <div className="flex md:hidden gap-x-[14px] mb-4">
        <div className="w-[70%] h-9 overflow-hidden border border-lightBorderColor flex items-center rounded-lg">
          <input
            type="text"
            className="w-full h-full text-[13px] px-[10px] outline-0"
            placeholder="Поиск"
          />
          <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
            <SearchIcon />
          </span>
        </div>
        <button
          onClick={() => setState({ ...state, startReviews: false })}
          className="w-[30%] h-9 active:scale-95 bg-textBlueColor flex items-center justify-center text-white rounded-lg px-[8px] ls:px-[10px]"
        >
          <span className="text-[10px] ls:text-[11px] flex-none not-italic font-AeonikProMedium mr-[5px]">
            По отзывам
          </span>
          <MobileStar />
        </button>
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
        console.log(titleStore?.locationListId?.shop?.ratings, "DATA");
        return (
          <div key={id}>
            <EditComponent
              item={item}
              titleStore={titleStore}
              handleRefetch={handleRefetch}
              // sendReply={sendReply}
              // sendReplyEdit={sendReplyEdit}
            />
          </div>
        );
      })}
    </div>
  );
};
export default React.memo(CommentTitle);
