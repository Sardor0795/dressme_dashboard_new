import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { GoBackIcons, LocationIcon, StarLabel } from "../../../assets/icons";
import { adidas, backImg } from "../../../assets";
import { message } from "antd";
import { AiOutlineLeft } from "react-icons/ai";
import { dressMainData } from "../../../hook/ContextTeam";
import { useMutation, useQuery } from "@tanstack/react-query";

function MarketEdit() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [getIdShops, setGetIdShops] = useState(null);
  const pathname = window.location.pathname;

  let id = pathname.replace("/store/market-list/:", "");

  const url = "https://api.dressme.uz/api/seller";

  // // ------------GET  Has Magazin ?-----------------
  useQuery(
    ["magazin"],
    () => {
      return fetch(`${url}/shops/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",

          Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: (res) => {
        console.log(res, "resShopRouteID");
        setGetIdShops(res);
      },
      onError: (err) => {
        console.log(err, "err magazin");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // Delete ----

  const { mutate } = useMutation(() => {
    return fetch(`${url}/shops/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
    }).then((res) => res.json());
  });

  const onUserDelete = () => {
    // setState({ ...state, popConfirmDelete: false });
    mutate(
      {},
      {
        onSuccess: (res) => {
          console.log(res);
          navigate("/store/market-list");
          window.location.reload();
          // if (res?.message) {
          //   // localStorage.clear();
          //   // navigate("/signup-seller");
          //   // window.location.reload();
          //   // setState({ ...state, popConfirmDelete: false });
          //   console.log(res, "Delete");
          //   // toast.warn(`${res?.message}`, {
          //   //   position: "top-right",
          //   //   autoClose: 5000,
          //   //   hideProgressBar: false,
          //   //   closeOnClick: true,
          //   //   pauseOnHover: true,
          //   //   draggable: true,
          //   //   progress: undefined,
          //   //   theme: "light",
          //   // });
          // }
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Сохранить",
    });
  };

  const success2 = () => {
    onUserDelete();
    messageApi.open({
      type: "success",
      content: "Удалить",
    });
  };
  // const warning = () => {
  //   messageApi.open({
  //     type: "warning",
  //     content: "Delete",
  //   });
  // };
  const navigate = useNavigate();
  const goStore = (id) => {
    navigate(`/store`);
  };
  const goLocation = (id) => {
    navigate(`/locations-store`);
  };
  const [genderCategory, setGenderCategory] = useState([
    {
      id: 1,
      action: false,
      gender: "Мужской",
    },
    {
      id: 2,
      action: false,
      gender: "Женский",
    },
    {
      id: 3,
      action: false,
      gender: "Унисекс",
    },
  ]);

  useEffect(() => {
    setGenderCategory((current) => {
      return current?.map((item) => {
        if (item?.gender == getIdShops?.shop?.gender) {
          return { ...item, action: true };
        } else {
          return { ...item, action: false };
        }
      });
    });
  }, [getIdShops?.shop?.gender]);

  const handleGenderCheck = (value) => {
    setGenderCategory((data) => {
      return data.map((e) => {
        if (e.id == value) {
          return { ...e, action: true };
        } else return { ...e, action: false };
      });
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  
  console.log(getIdShops?.shop?.delivery_method, "delivery_method");
  return (
    <div className="w-full mx-auto md:max-w-[1120px]   md:mt-12  px-4 md:px-0">
      <div className="text-center mb-6 text-5 md:text-[35px] font-AeonikProMedium">
        <div className="mt-6 flex items-center justify-center  ">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="  md:hidden absolute left-2 flex items-center cursor-pointer justify-center "
          >
            <GoBackIcons />
          </button>
          <div className="w-fit">
            <span className="md:hidden block text-tableTextTitle2 text-xl not-italic font-AeonikProMedium">
              Создать магазин
            </span>{" "}
            <span className="md:block hidden">Магазины </span>
          </div>
        </div>{" "}
      </div>
      <div className="w-full flex items-center justify-end md:justify-between mb-2 md:mb-3 md:pb-0 pb-2 md:border-0 border-borderColor">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
        >
          <AiOutlineLeft />
        </button>
        <div className="flex items-center gap-x-[8px] xs:gap-x-[15px]">
          <button
            onClick={success2}
            className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[10px] ls:text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
          >
            Удалить
          </button>
        </div>
      </div>
      <div className="relative w-full md:h-[360px] h-[200px] flex items-center border border-[#f2f2f2]  justify-center rounded-lg ">
        <img
          src={getIdShops?.shop?.url_background_photo}
          className="w-full h-full object-contain rounded-lg"
          alt=""
        />
        <div className="absolute bottom-[-30px] ll:-bottom-11  md:bottom-[-60px] z-[20] bg-white overflow-hidden left-[15px] ll:left-[30px] md:left-10 w-[60px] h-[60px] ll:w-[80px] ll:h-[80px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full ">
          <img
            src={getIdShops?.shop?.url_logo_photo}
            className="w-full h-full "
            alt=""
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-end mb-[24px] md:mb-20 mt-4">
        <div className="flex items-center">
          <button onClick={goLocation} className="flex items-end gap-x-2">
            <span>
              <LocationIcon colors="#007dca" />
            </span>
            <span className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] ll:text-sm not-italic font-AeonikProMedium">
              Все локации
            </span>
          </button>
        </div>
      </div>
      {/* Form */}
      <form className="w-full flex flex-col items-center justify-between  ">
        <div className="w-full flex flex-col md:flex-row items-center justify-center mb-10 md:mb-[60px] gap-x-10 ">
          <div className="w-full md:w-3/5 mb-[24px] md:mb-0 md:mt-7 ">
            <div className="w-full flex items-center justify-between gap-x-[8px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular
                                        "
              >
                Название магазина
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />{" "}
                </span>
              </label>
              <input
                type="text"
                name="shopName"
                id="shopName"
                value={getIdShops?.shop?.name}
                placeholder="Введите название магазина"
                className="w-[70%] border border-borderColor2 outline-none h-[32px] md:h-[42px] px-3  rounded-lg text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular"
              />
            </div>
            <div className="w-full flex items-center justify-between gap-x-[8px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor mr-[5px] font-AeonikProRegular"
              >
                Пол
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />{" "}
                </span>
              </label>
              <div className="w-[70%] md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                {genderCategory.map((data) => {
                  return (
                    <button
                      type="button"
                      key={data.id}
                      onClick={() => handleGenderCheck(data.id)}
                      className={`w-1/3 md:w-full flex items-center justify-center   border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular h-[32px] md:h-[42px] rounded-lg
                        ${
                          data.action
                            ? " md:h-full border-none h-[32px] md:py-[10px] bg-textBlueColor md:bg-btnLightBlueColor text-white md:text-textBlueColor my-auto mx-auto border-searchBgColor rounded-lg"
                            : ""
                        }
                        `}
                    >
                      {data.gender}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-[8px] md:gap-x-[30px] ">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Метод доставки
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />
                </span>
              </label>
              <div className="w-[70%] flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                <button
                  type="button"
                  className="group w-[28%] md:w-1/4 active:scale-95 focus:bg-textBlueColor font-AeonikProRegular border border-borderColor2 rounded-lg h-[32px] md:h-[42px] flex items-center justify-center"
                >
                  <span className="group-focus:text-white text-[10px] ls:text-[12px] md:text-base">
                    Такси
                  </span>
                </button>
                <button
                  type="button"
                  className="group w-[72%] md:w-3/4 active:scale-95 group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg h-[32px] md:h-[42px] flex items-center justify-center"
                >
                  <span className="group-focus:text-white text-[10px] ls:text-[12px] md:text-base">
                    Собственная доставка
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-center mb-10 md:mb-24">
        <button
          onClick={() => {
            goStore();
            success();
          }}
          className="inline-block px-[100px] flex items-center justify-center  md:w-fit w-full h-[42px] bg-textBlueColor text-white rounded-lg active:scale-95"
        >
          Сохранить{" "}
        </button>
        {contextHolder}
      </div>
    </div>
  );
}
export default React.memo(MarketEdit);
