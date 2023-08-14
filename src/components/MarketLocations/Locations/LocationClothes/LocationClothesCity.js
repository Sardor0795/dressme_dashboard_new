import { Link, useParams } from "react-router-dom";
import {
  AddIconsCircle,
  AddLocationIcon,
  BgNoImgIcon,
  ColorsIcon,
  DeleteIcon,
  FemaleIcon,
  MaleIcon,
} from "../../../../assets/icons";

export default function LocationClothesCity() {
  const { id } = useParams();
  const NewId = id.replace(":", "");
  const arr = [
    { id: 1, name: "wear", isCheck: false },
    { id: 2, name: "wear", isCheck: false },
    { id: 3, name: "wear", isCheck: false },
    { id: 4, name: "wear", isCheck: false },
    { id: 5, name: "wear", isCheck: false },
    { id: 6, name: "wear", isCheck: false },
  ];
  return (
    <div>
      <div className="flex justify-end items-center md:justify-between max-w-[1540px] mx-auto pb-6 mt-10">
        <section className="hidden md:block md:flex gap-x-4">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            {NewId}
          </p>
          <p className="flex items-center gap-x-[4px]">
            <span>
              <AddIconsCircle />
            </span>
            <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
              Добавить одежду
            </span>
          </p>
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
          <div className="w-[24px] h-[24px] border border-checkboxBorder bg-white rounded mr-[8px]"></div>

          <div className="border-lightBorderColor border rounded-[12px] bg-lightBgColor px-[30px] py-[8px] flex justify-between items-center gap-x-[5px] w-full">
            <div>Фото</div>
            <div>Наименование товара</div>
            <div>Артикул</div>
            <div>Тип</div>
            <div>Цвет</div>
            <div>Сезон</div>
            <div>Пол</div>
            <div>Цена товара</div>
            <div className="w-[50px]"></div>
            <div className="text-right w-[60px]">Добавить</div>
            <div className="text-right w-[60px]">Удалить</div>
          </div>
        </div>

        <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
          {arr.map((data) => {
            return (
              <div className="flex items-center w-full">
                <button className="w-[24px] h-[24px] cursor-pointer border border-checkboxBorder bg-white rounded mr-[8px]"></button>
                <div className="border-lightBorderColor border rounded-[12px] bg-white px-[30px] py-[8px] flex justify-between items-center gap-x-[5px] w-full">
                  <div className="flex items-center justify-center w-[60px] h-[60px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
                    <BgNoImgIcon />
                  </div>
                  <div className="max-w-[169px] text-weatherWinterColor">
                    Спортивная мужская кроссовка Nike RUN
                  </div>
                  <div className="text-tableTextTitle2">BAA-00004</div>
                  <div className="text-tableTextTitle2">Футболка</div>
                  <div>
                    <div className="rounded-lg border border-lightBorderColor flex items-center py-[3px] px-[5px]">
                      <span className="mr-[5px]">
                        <ColorsIcon />
                      </span>
                      5
                    </div>
                  </div>
                  <div>
                    <div className="bg-[url('/src/assets/seasons.png')] w-[100px] h-[40px]"></div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-[40px] h-[40px] border border-lightBorderColor rounded-[12px] bg-lightBgColor mr-1">
                        <MaleIcon />
                      </div>
                      <div className="flex items-center justify-center w-[40px] h-[40px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
                        <FemaleIcon />
                      </div>
                    </div>
                  </div>
                  <div>452 000 сумара</div>
                  <Link className="text-[18px] text-weatherWinterColor w-[150px]">
                    Подробнее
                  </Link>
                  <button className="active:translate-y-[2px]">
                    <span>
                      <AddLocationIcon width={30} />
                    </span>
                  </button>
                  <button className="active:translate-y-[2px]">
                    <span>
                      <DeleteIcon width={30} />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
