import React from "react";
import { deliveryIcon, man, nike, woman } from "../../../../assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StarIcon } from "../../../../assets/icons";

const ReviewStore = () => {
  const data = [
    { id: 1, name: "Nike Store Official Dealer" },
    { id: 2, name: "Nike Store Official Dealer" },
    { id: 3, name: "Nike Store Official Dealer" },
    { id: 4, name: "Nike Store Official Dealer" },
    { id: 5, name: "Nike Store Official Dealer" },
    { id: 6, name: "Nike Store Official Dealer" },
  ];
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/reviews/review/comment-store/${id}`);
  };

  return (
    <div className="w-full h-fit flex flex-col gap-y-[30px]">
      {data.map((data) => {
        return (
          <div
            key={data?.id}
            className="w-full h-fit md:h-[100px] flex flex-col md:flex-auto justify-between items-center mx-auto border border-borderColor px-[15px] md:pr-10 rounded-lg py-5 md:py-0"
          >
            <action className="w-full flex md:hidden items-center justify-between">
              <span className="w-1/2 h-[1px] bg-borderColor"></span>
              <span className="text-[#d2d2d2] text-base font-AeonikProRegular mx-[10px]">0{data.id}</span>
              <span className="w-1/2 h-[1px] bg-borderColor"></span>
            </action>
            <action className="w-full flex items-center justify-between md:-mt-3">
              <section className="w-full md:w-fit flex items-center pb-[15px] md:pb-0 border-b border-borderColor md:border-none">
                <div className="hidden md:flex items-center justify-center pr-7 pl-5 text-xl font-AeonikProRegular">
                  {data.id}
                </div>
                <figure className="w-[75px] h-[75px] md:w-[120px] md:h-[120px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
                  <img src={nike} alt="" />
                </figure>
                <div className="flex flex-col ml-[8px] md:ml-8">
                  <p className="text-sm md:text-xl font-AeonikProMedium mb-3">
                    Nike Store Official Dealer
                  </p>
                  <div className="flex items-center">
                    <div className="flex md:hidden items-center mr-[5px] md:mr-[6px]">
                      <StarIcon width={14} height={14}/>
                      <StarIcon width={14} height={14}/>
                      <StarIcon width={14} height={14}/>
                      <StarIcon width={14} height={14}/>
                      <StarIcon width={14} height={14}/>
                    </div>
                    <div className="hidden md:flex items-center mr-[5px] md:mr-[6px]">
                      <StarIcon width={16} height={16}/>
                      <StarIcon width={16} height={16}/>
                      <StarIcon width={16} height={16}/>
                      <StarIcon width={16} height={16}/>
                      <StarIcon width={16} height={16}/>
                    </div>
                    <div className="flex items-center not-italic font-AeonikProRegular leading-4 text-right text-gray-500 md:ml-1 text-[12px] mt-[2px] md:mt-[3px] md:text-sm">
                      <p className="font-AeonikProMedium text-black mr-[5px]">
                        5.0
                      </p>
                      <p className="text-setTexOpacity font-AeonikProRegular">
                        (859 votes) <span className="ml-[7px] md:ml-[10px]">|</span>{" "}
                      </p>
                      <p className="font-AeonikProRegular ml-[7px] md:ml-[10px] text-setTexOpacity">
                        4937 orders
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="hidden md:flex items-center gap-x-1">
                <div className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
                  <img src={man} alt="" />
                </div>
                <div className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
                  <img src={woman} alt="" />
                </div>
              </section>
              <section className="hidden md:flex items-center h-12 px-5 active:opacity-70 border border-borderColor rounded-lg gap-x-3">
                <img src={deliveryIcon} alt="" />
                <span className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                  Собственная доставка
                </span>
              </section>
              <section className="hidden md:flex items-center gap-x-[50px]">
                <p
                  onClick={() => goDetail(data?.id)}
                  className="text-textBlueColor cursor-pointer  text-base not-italic font-AeonikProMedium hover:underline"
                >
                  Подробнее
                </p>
              </section>
            </action>
            <action className="w-full flex md:hidden items-center gap-x-1 mt-3">
              <div className="w-9 h-9 rounded-lg border border-borderColor bg-lightBgColor flex items-center justify-center">
                <img src={man} alt="" />
              </div>
              <div className="w-9 h-9 rounded-lg border border-borderColor bg-lightBgColor flex items-center justify-center">
                <img src={woman} alt="" />
              </div>
              <div className="flex items-center h-9 ml-auto bg-lightBgColor px-[10px] active:opacity-70 border border-borderColor rounded-lg gap-x-3">
                <img src={deliveryIcon} alt="" />
                <span className="text-tableTextTitle2 text-[13px] md:text-base not-italic font-AeonikProMedium">
                  Собственная доставка
                </span>
              </div>
            </action>
            <button className="w-full active:scale-95 block md:hidden h-8 text-textBlueColor bg-[#E8F5FD] rounded-lg mt-6 text-[13px] font-AeonikProMedium">
              Подробнее
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default ReviewStore;
