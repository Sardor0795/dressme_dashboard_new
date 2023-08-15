import { Link } from "react-router-dom";
import {
  AddLocationIcon,
  BgNoImgIcon,
  ColorsIcon,
  DeleteIcon,
  FemaleIcon,
  MaleIcon,
} from "../../../../../assets/icons";

export default function LocationItem({ data, click }) {
  return (
    <div className="flex items-center w-full">
      <div
        onClick={() => {
          click(data?.id);
        }}
        className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
          data?.isCheck
            ? "bg-[#007DCA] border-[#007DCA]"
            : "bg-white border-checkboxBorder"
        } flex items-center justify-center rounded mr-[8px]`}
      >
        <span
          className={`${
            data?.isCheck ? "flex items-center justify-center" : "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="13"
            viewBox="0 0 11 13"
            fill="none"
          >
            <path
              d="M1 9.5L5.88235 11L10 1"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </div>
      <div className="border-lightBorderColor border rounded-[12px] bg-white pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
        <div className="mr-[55px] flex items-center justify-center min-w-[60px] min-h-[60px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
          <BgNoImgIcon />
        </div>
        <div className="flex w-full items-center">
          <div className="w-[16%] text-weatherWinterColor">
            Спортивная мужская кроссовка Nike RUN
          </div>
          <div className="text-tableTextTitle2 w-[10%]">BAA-00004</div>
          <div className="text-tableTextTitle2 w-[10%]">Футболка</div>
          <div className="w-[10%] flex items-center">
            <div className="rounded-lg border border-lightBorderColor flex items-center py-[3px] px-[5px]">
              <span className="mr-[5px]">
                <ColorsIcon />
              </span>
              5
            </div>
          </div>
          <div className="w-[10%]">
            <div className="bg-[url('/src/assets/seasons.png')] w-[100px] h-[40px]"></div>
          </div>
          <div className="w-[11%]">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-[40px] h-[40px] border border-lightBorderColor rounded-[12px] bg-lightBgColor mr-1">
                <MaleIcon />
              </div>
              <div className="flex items-center justify-center w-[40px] h-[40px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
                <FemaleIcon />
              </div>
            </div>
          </div>
          <div className="w-[10%]">452 000 сумара</div>
          <Link className="text-[18px] text-weatherWinterColor w-[15%] text-center">
            Подробнее
          </Link>
          <button className="active:translate-y-[2px] w-[9%] flex justify-center">
            <span>
              <AddLocationIcon width={30} />
            </span>
          </button>
          <button className="active:translate-y-[2px] w-[9%] flex justify-center">
            <span>
              <DeleteIcon width={30} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
