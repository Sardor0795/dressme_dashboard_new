
import React from "react";
import { useNavigate } from "react-router-dom";
import { CloseAnswer } from "../../../../../assets/icons";

const CategoriesAnimationPage = ({ onClick, title }) => {
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/product/:${id}`);
  };
  const categoriesList = [
    
  ];

  return (
    <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
      <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
        <p className="text-xl font-AeonikProMedium">Выберите категорию</p>
        <button onClick={onClick}>
          <CloseAnswer colors={"#000"}/>
        </button>
      </section>
      <section className="h-[142px] w-full px-4 flex items-center">
        <figure className="w-full h-[110px] gap-x-2 flex items-center">
          {categoriesList.map((data) => {
            return (
              <div
                key={data?.id}
                className="h-full w-[74px] rounded-[12px]  border border-searchBgColor overflow-hidden"
              >
                <img
                  onClick={() => goDetail(data?.id)}
                  className="w-full h-full"
                  key={data?.id}
                  src={data?.img}
                  alt=""
                />
              </div>
            );
          })}
        </figure>
      </section>
    </div>
  );
};

export default React.memo(CategoriesAnimationPage);
