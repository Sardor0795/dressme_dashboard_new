import { Link, useParams } from "react-router-dom";
import {
  AddIconsCircle,
  AddLocationIcon,
  BgNoImgIcon,
  ColorsIcon,
  DeleteIcon,
  FemaleIcon,
  MaleIcon,
} from "../../../assets/icons";
import { useEffect, useState } from "react";

export default function LocationClothesCity() {
  const arr = [
    { id: 1, name: "wear", isCheck: false },
    { id: 2, name: "wear", isCheck: false },
    { id: 3, name: "wear", isCheck: false },
    { id: 4, name: "wear", isCheck: false },
    { id: 5, name: "wear", isCheck: false },
    { id: 6, name: "wear", isCheck: false },
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const [allChecked, setallChecked] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center pt-7">
        <p className="text-black text-2xl not-italic font-AeonikProMedium">
          Nike Store Official Dealer
        </p>
      </div>
      <div className="flex justify-end items-center md:justify-between max-w-[1540px] mx-auto pb-6 mt-10">
        <section className="hidden md:flex gap-x-4">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            Юнусабад{" "}
          </p>
          <Link
            to="/products/add-wear"
            className=" flex items-center gap-x-[4px]"
          >
            <span>
              <AddIconsCircle />
            </span>
            <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
              Добавить одежду
            </span>
          </Link>
        </section>
        <div className="w-fit flex items-center">
          <div className="mr-6 font-AeonikProRegular text-lg text-mobileTextColor">
            Выбранные
          </div>
          <button className="active:translate-y-[2px] pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-lg text-addLocationTextcolor">
            <span className="mr-[5px]">
              <AddLocationIcon width={20} />
            </span>
            Добавить в локацию
          </button>
          <button className="active:translate-y-[2px] pl-3 flex items-center font-AeonikProRegular text-lg text-deleteColor">
            <span className="mr-[5px]">
              <DeleteIcon width={20} />
            </span>
            Удалить
          </button>
        </div>
      </div>

      <div className="max-w-[1572px] mx-auto font-AeonikProRegular text-[16px]">
        <div className="mb-[10px] flex items-center text-tableTextTitle">
          <div
            onClick={() => setallChecked(!allChecked)}
            className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
              allChecked
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } flex items-center justify-center rounded mr-[8px]`}
          >
            <span
              className={`${
                allChecked ? "flex items-center justify-center" : "hidden"
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

          <div className="border-lightBorderColor border rounded-[12px] bg-lightBgColor pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
            <div className="mr-[75px]">Фото</div>
            <div className="flex w-full">
              <div className="w-[16%]">Наименование товара</div>
              <div className="w-[10%]">Артикул</div>
              <div className="w-[10%]">Тип</div>
              <div className="w-[10%]">Цвет</div>
              <div className="w-[10%]">Сезон</div>
              <div className="w-[11%]">Пол</div>
              <div className="w-[10%]">Цена товара</div>
              <div className="w-[15%]"></div>
              <div className="w-[9%] text-center">Добавить</div>
              <div className="w-[9%] text-center">Удалить</div>
            </div>
          </div>
        </div>

        <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
          {arr.map((data) => {
            return (
              <div className="flex items-center w-full">
                <button className="min-w-[24px] min-h-[24px] cursor-pointer border border-checkboxBorder bg-white rounded mr-[8px]"></button>
                <div className="border-lightBorderColor border rounded-[12px] bg-white pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
                  <div className="mr-[55px] flex items-center justify-center min-w-[60px] min-h-[60px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
                    <BgNoImgIcon />
                  </div>
                  <div className="flex w-full items-center">
                    <div className="w-[16%] text-weatherWinterColor">
                      Спортивная мужская кроссовка Nike RUN
                    </div>
                    <div className="text-tableTextTitle2 w-[10%]">
                      BAA-00004
                    </div>
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
                    <Link className="text-[18px] hover:underline text-weatherWinterColor w-[15%] text-center">
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
          })}
        </div>
        <div className="flex items-center justify-start my-5">
          {" "}
          <section className="hidden md:flex gap-x-4">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Мирзо улугбек{" "}
            </p>
            <Link
              to="/products/add-wear"
              className=" flex items-center gap-x-[4px]"
            >
              <span>
                <AddIconsCircle />
              </span>
              <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
                Добавить одежду
              </span>
            </Link>
          </section>
        </div>
        <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
          {arr.map((data) => {
            return (
              <div className="flex items-center w-full">
                <button className="min-w-[24px] min-h-[24px] cursor-pointer border border-checkboxBorder bg-white rounded mr-[8px]"></button>
                <div className="border-lightBorderColor border rounded-[12px] bg-white pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
                  <div className="mr-[55px] flex items-center justify-center min-w-[60px] min-h-[60px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
                    <BgNoImgIcon />
                  </div>
                  <div className="flex w-full items-center">
                    <div className="w-[16%] text-weatherWinterColor">
                      Спортивная мужская кроссовка Nike RUN
                    </div>
                    <div className="text-tableTextTitle2 w-[10%]">
                      BAA-00004
                    </div>
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
                    <Link className="text-[18px] hover:underline text-weatherWinterColor w-[15%] text-center">
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
          })}
        </div>
      </div>
    </div>
  );
}
