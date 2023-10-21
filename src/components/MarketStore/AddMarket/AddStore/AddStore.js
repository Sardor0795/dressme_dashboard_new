import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BgSelectSkin, GoBackIcons, StarLabel } from "../../../../assets/icons";
import AddBtn from "../../../Products/AddingProductPageTwo/AddingProduct/AddBtn/AddBtn";
import { AiOutlineLeft } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStore({ onClick }) {
  const navigate = useNavigate();
  const [magazinName, setMagazinName] = useState();

  const [genderType, setGenderType] = useState();
  const [checkGender, setCheckGender] = useState(1);

  const [deliverList, setDeliverList] = useState();
  const [deliverCheck, setDeliverCheck] = useState(1);



  const [errorGroup, setErrorGroup] = useState();



  // img upload--------------
  const [file, setFile] = useState({
    pictureBgFile: "",
    pictureBgView: ""
  });
  const [fileBrand, setFileBrand] = useState({
    pictureLogoFile: "",
    pictureLogoView: ""
  });
  const handleChange = (e) => {
    setFile({
      ...fileBrand,
      pictureBgFile: e.target.files[0],
      pictureBgView: URL.createObjectURL(e.target.files[0])
    });
  }
  const handleChangeBrand = (e) => {
    setFileBrand({
      ...fileBrand,
      pictureLogoFile: e.target.files[0],
      pictureLogoView: URL.createObjectURL(e.target.files[0])
    });
  }


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);


  const url = "https://api.dressme.uz/api/seller"
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
        console.log(res, "genderlist");
        setGenderType(res?.genders)
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
        // console.log(res?.delivery_methods, "delivery-method");
        setDeliverList(res?.delivery_methods)
      },
      onError: (err) => {
        console.log(err, "err getDelivery-method");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
  const sendFunc = () => {
    let form = new FormData()
    form.append("name", magazinName);
    form.append("logo_photo", fileBrand?.pictureLogoFile);
    form.append("background_photo", file?.pictureBgFile);
    form.append("gender_id", checkGender);
    form.append("delivery_id", deliverCheck);
    return fetch(`${url}/shops/store`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('DressmeUserToken')}`,
      },
      body: form
    })
      .then((res) => res.json())
      .then(res => {
        if (res?.shop) {
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
        } else if (res?.errors && res?.message) {

          setErrorGroup(res?.errors)
        }
      })
      .catch(err => {
        toast.error(`${err}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })

  };


  return (
    <div className="w-full md:max-w-[1120px] md:mx-auto px-4 mt-6 md:mt-12">
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

      <div className="md:hidden flex ">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="  md:hidden flex items-center cursor-pointer justify-center "
        >
          <GoBackIcons />
        </button>
      </div>{" "}
      <div className="text-center text-tableTextTitle2 text-xl mb-3 md:mb-[50px] md:text-[35px] not-italic font-AeonikProMedium">
        {/* <div className="text-center mb-6 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium"> */}
        Создать магазин
      </div>
      <div className="mb-3">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
        >
          <AiOutlineLeft />
        </button>
      </div>
      <div className="relative w-full h-[200px] md:h-[360px] border-2 border-dashed flex items-center justify-center rounded-lg mb-[69px] md:mb-20">

        <button className="h-full w-full flex items-center justify-center ">
          <label
            htmlFor="DataImg"
            className="h-full w-full  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
          >
            <input
              className="hidden"
              id="DataImg"
              type="file"
              onChange={handleChange}
              accept=" image/*"
            />
            {
              !file?.pictureBgView && <>
                <span className="flex items-center flex-col justify-center">
                  выберите облошка
                  <BgSelectSkin />
                </span>
                {
                  errorGroup?.background_photo && !file?.pictureBgView &&
                  <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                    {errorGroup?.background_photo}
                  </p>
                }
              </>

            }
            {file?.pictureBgView && <img src={file?.pictureBgView} alt="backImg" className="w-full h-full object-contain rounded-lg" />}
          </label>
        </button>

        <div className="absolute -bottom-11 overflow-hidden md:bottom-[-64px] bg-white left-[30px] md:left-10 w-[90px] h-[90px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full border border-dashed">

          <button className="h-full w-full rounded-full flex items-center justify-center ">
            <label
              htmlFor="DataImgBrand"
              className="h-full w-full flex items-center flex-col justify-center  text-sm font-AeonikProMedium cursor-pointer  text-textBlueColor"
            >
              <input
                className="hidden"
                id="DataImgBrand"
                type="file"
                onChange={handleChangeBrand}
                accept=" image/*"
              />
              {
                !fileBrand?.pictureLogoView && <>
                  <span className="flex items-center flex-col justify-center px-2">
                    Выберите Логотип
                    <BgSelectSkin />
                  </span>
                  {
                    errorGroup?.logo_photo && !file?.pictureLogoView &&
                    <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                      {errorGroup?.logo_photo}
                    </p>
                  }
                </>
              }

              {fileBrand?.pictureLogoView && <img src={fileBrand?.pictureLogoView} alt="backImg" className="w-full h-full object-cover rounded-lg" />}
            </label>
          </button>
        </div>
      </div>
      {/* Form */}
      <div
        className="w-full flex flex-col items-center justify-between  "
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-center mb-10 md:mb-[60px] gap-x-10">
          <div className="w-full md:w-3/5 mb-[24px] md:mb-0 md:mt-7">
            <div className="w-full flex items-center justify-between gap-x-[8px] md:gap-x-[30px] ">
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
                value={magazinName}
                onChange={(e) => setMagazinName(e.target.value)}
                placeholder="Введите название магазина"
                className="w-[70%] border border-borderColor2 outline-none h-[32px] md:h-[42px] px-3  rounded-lg text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular"
              />

            </div>
            <div className="w-full flex items-center justify-end">
              {
                errorGroup?.delivery_id && !magazinName &&
                <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                  {errorGroup?.delivery_id}
                </p>
              }</div>
            <div className="w-full flex items-center justify-between gap-x-[8px] md:gap-x-[30px] my-5">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor mr-[5px] font-AeonikProRegular"
              >
                Пол
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />{" "}
                </span>
              </label>
              <div className="w-[70%] radio-toolbar md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                {genderType?.map((data) => {
                  return (
                    <>

                      <input
                        type="radio"
                        id={data?.id}
                        value={data?.id}
                        name="checkGender"
                        checked={data?.id === checkGender}
                        onChange={() => setCheckGender(data?.id)}
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
                        checked={data?.id === deliverCheck}
                        onChange={() => setDeliverCheck(data?.id)}
                      />
                      <label htmlFor={data?.name_uz} className={`cursor-pointer md:px-3 w-[200px] border border-searchBgColor flex items-center justify-center   text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular h-[32px] md:h-[42px] rounded-lg`}>
                        <span>{data?.name_ru}</span>
                      </label>
                    </>
                  );
                })}

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-10 md:mb-24">
        <button
          onClick={() => {
            // onClick;
            sendFunc();
          }}
          className="inline-block w-full md:w-fit text xs:px-[100px] flex items-center justify-center  md:w-fit w-full h-[42px] bg-textBlueColor text-white rounded-lg active:scale-95"
        >
          Создать магазин
        </button>
      </div>
    </div>
  );
}
export default React.memo(AddStore);
