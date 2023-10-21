import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { GoBackIcons, LocationIcon, StarLabel } from "../../../assets/icons";
import { adidas, backImg } from "../../../assets";
import { message } from "antd";
import { AiOutlineLeft } from "react-icons/ai";
import { dressMainData } from "../../../hook/ContextTeam";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MarketEdit() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [getIdShops, setGetIdShops] = useState(null);
  const [state, setState] = useState({
    marketName: "",
    marketDeliverId: "",
    marketGenderId: "",
    marketId: "",
    pictureBgFile1: "",
    pictureBgView1: "",
    picturelogoFile2: "",
    picturelogoView2: "",
    checkGender: "",
    deliverCheck: "",


  });
  const [genderList, setGenderList] = useState();

  const [deliverList, setDeliverList] = useState();
  const handleLocationImageOne = (e) => {
    setState({
      ...state,
      pictureBgFile1: e.target.files[0],
      pictureBgView1: URL.createObjectURL(e.target.files[0])
    });
  }
  const handleLocationImageTwo = (e) => {
    setState({
      ...state,
      picturelogoFile2: e.target.files[0],
      picturelogoView2: URL.createObjectURL(e.target.files[0])
    });
  }

  const navigate = useNavigate();

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
        setState({
          ...state,
          marketName: res?.shop?.name,
          deliverCheck: res?.shop?.delivery_id,
          checkGender: res?.shop?.gender_id,
          marketId: res?.shop?.id,
          pictureBgView1: res?.shop?.url_background_photo,
          picturelogoView2: res?.shop?.url_logo_photo,
        })
      },
      onError: (err) => {
        console.log(err, "err magazin");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // ------------GET METHOD Gender-type-----------------
  useQuery(["get genders"], () => {
    return fetch(`${url}/genders`, {
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setGenderList(res?.genders)
      },
      onError: (err) => {
        console.log(err, "err getGenderlist");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
  // ------------GET METHOD delivery-method-----------------
  useQuery(["get delivery-method"], () => {
    return fetch(`${url}/delivery-method`, {
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setDeliverList(res?.delivery_methods)

      },
      onError: (err) => {
        console.log(err, "err getDelivery-method");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  // Delete ----
  const { mutate } = useMutation(() => {
    return fetch(`${url}/shops/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
    }).then((res) => res.json());
  });

  const onUserDelete = () => {
    mutate(
      {},
      {
        onSuccess: (res) => {
          // console.log(res, "delete");
          if (res?.message) {
            toast.success(`${res?.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/store");
          }
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };


  // ---------Handle Edit---------
  const handleEditShops = () => {
    let form = new FormData()
    form.append("name", state?.marketName);
    form.append("gender_id", state?.checkGender);
    form.append("delivery_id", state?.deliverCheck);


    state?.pictureBgFile1 && form.append("background_photo", state?.pictureBgFile1);
    state?.picturelogoFile2 && form.append("logo_photo", state?.picturelogoFile2);

    return fetch(`${url}/shops/edit/${id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('DressmeUserToken')}`,
      },
      body: form
    })
      .then((res) => res.json())
      .then(res => {
        // console.log(res, "Edit - message ");
        if (res?.fields || res?.message) {
          toast.success(`${res?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate('/store')

        }

      })
      .catch(err => console.log(err, "errImage"))
  }


  const goLocation = (id) => {
    navigate(`/locations-store`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full mx-auto md:max-w-[1120px]   md:mt-12  px-4 md:px-0">
      <ToastContainer
        style={{ zIndex: "1000", top: "80px" }}
        position="top-right"
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

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
            onClick={onUserDelete
            }
            className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[10px] ls:text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
          >
            Удалить
          </button>
        </div>
      </div>
      <div className="relative w-full md:h-[360px] h-[200px] flex items-center  border border-[#f2f2f2]  justify-center rounded-lg ">
        <button className="h-full w-full  rounded-lg overflow-hidden flex items-center justify-center ">
          <label
            htmlFor="DataImg1"
            className="h-full w-full  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
          >
            <input
              className="hidden"
              id="DataImg1"
              type="file"
              onChange={handleLocationImageOne}
              accept=" image/*"
            />
            {
              !state?.pictureBgView1 &&
              <div className="w-fit h-fit flex items-center">
                <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                  Фото локации
                </span>
                <span className=" ml-[2px] md:ml-[5px]">
                  <StarLabel />
                </span>
              </div>
            }
            {state?.pictureBgView1 &&
              <img src={state?.pictureBgView1} alt="backImg" className="w-full h-full object-contain rounded-lg" />}
          </label>
        </button>
        <div className="absolute bottom-[-30px] ll:-bottom-11 overflow-hidden border border-searchBgColor md:bottom-[-60px] z-[20] bg-white overflow-hidden left-[15px] ll:left-[30px] md:left-10 w-[60px] h-[60px] ll:w-[80px] ll:h-[80px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full ">
          <button className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center">
            <label
              htmlFor="DataImg2"
              className="h-full w-full text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
            >
              <input
                className="hidden"
                id="DataImg2"
                type="file"
                onChange={handleLocationImageTwo}
                accept=" image/*"
              />
              {
                !state?.picturelogoView2 &&
                <div className="w-fit h-fit flex items-center">
                  <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                    фото локации
                  </span>
                </div>
              }
              {state?.picturelogoView2 &&
                <img src={state?.picturelogoView2} alt="backImg" className="w-full h-full object-cover rounded-lg" />}
            </label>
          </button>
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
                value={state?.marketName}
                onChange={(e) => setState({ ...state, marketName: e.target.value })}
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
              <div className="w-[70%] radio-toolbar  md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                {genderList?.map((data) => {
                  return (
                    <>
                      <input
                        type="radio"
                        id={data?.id}
                        value={data?.id}
                        name="checkGender"
                        checked={data?.id == state?.checkGender}
                        onChange={() => setState({ ...state, checkGender: data?.id })}
                      // id={answer.answer_ID}
                      />
                      <label htmlFor={data?.id} className={`w-1/3 cursor-pointer md:w-full flex items-center justify-center   border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular h-[32px] md:h-[42px] rounded-lg`}>
                        <span>{data?.name_ru}</span>
                      </label>
                    </>
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
              <div className="w-[70%] radio-toolbar  flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                {deliverList?.map((data) => {
                  return (
                    <>
                      <input
                        type="radio"
                        id={data?.name_uz}
                        value={data?.id}
                        name="checkDeliver"
                        checked={data?.id == state?.deliverCheck}
                        onChange={() => setState({ ...state, deliverCheck: data?.id })}
                      />
                      <label htmlFor={data?.name_uz} className={` cursor-pointer md:px-3 w-[200px] border border-searchBgColor flex items-center justify-center   text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular h-[32px] md:h-[42px] rounded-lg`}>
                        <span>{data?.name_ru}</span>
                      </label>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-center mb-10 md:mb-24">
        <button
          onClick={handleEditShops}
          className="inline-block px-[100px] flex items-center justify-center  md:w-fit w-full h-[42px] bg-textBlueColor text-white rounded-lg active:scale-95"
        >
          Сохранить{" "}
        </button>
      </div>
    </div>
  );
}
export default React.memo(MarketEdit);
