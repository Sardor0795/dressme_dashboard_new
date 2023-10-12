import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BgSelectSkin, GoBackIcons, StarLabel } from "../../../../assets/icons";
import AddBtn from "../../../Products/AddingProductPageTwo/AddingProduct/AddBtn/AddBtn";
import { AiOutlineLeft } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";


function AddStore({ onClick }) {
  const navigate = useNavigate();
  const [uploadImg, setUploadImg] = useState(null);

  const [methodDeliv, setMethodDeliv] = useState(null);

  const [genderCategory, setGenderCategory] = useState([
    {
      id: 1,
      action: true,
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


  // -------------------------

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

  // -------- ref

  const nameRef = useRef(null);

  const url = "https://api.dressme.uz/api/seller"



  let [filt] = genderCategory.filter((v) => v.action === true);

  const sendFunc = () => {
    // console.log(nameRef?.current.value, "name");
    // console.log(file?.pictureAsFile?.name, "background_photo");
    // console.log(fileBrand?.pictureAsFile?.name, "logo_photo");
    // console.log(filt?.gender, "filt?.gender");
    // console.log(methodDeliv, "delivery_method");
    let form = new FormData()
    form.append("name", nameRef?.current.value);
    form.append("logo_photo", fileBrand?.pictureLogoFile);
    form.append("background_photo", file?.pictureBgFile);
    form.append("gender", "female");
    form.append("delivery_method", "Taxi");
    return fetch(`${url}/shops/store`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('DressmeUserToken')}`,
      },
      body: form
    })
      .then((res) => res.json())
      .then(res => console.log(res, "resImages"))
      .catch(err => console.log(err, "errImage"))


  };
  return (
    <div className="w-full md:max-w-[1120px] md:mx-auto px-4 mt-6 md:mt-12">
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
              !file?.pictureBgView &&
              <span className="flex items-center flex-col justify-center">
                выберите облошка
                <BgSelectSkin />
              </span>
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
                !fileBrand?.pictureLogoView &&
                <span className="flex items-center flex-col justify-center">
                  Выберите Логотип
                  <BgSelectSkin />
                </span>
              }

              {fileBrand?.pictureLogoView && <img src={fileBrand?.pictureLogoView} alt="backImg" className="w-full h-full object-cover rounded-lg" />}
            </label>
          </button>
        </div>
      </div>
      {/* Form */}
      <form
        action="#"
        className="w-full flex flex-col items-center justify-between  "
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-center mb-10 md:mb-[60px] gap-x-10">
          <div className="w-full md:w-3/5 mb-[24px] md:mb-0 md:mt-7">
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
                ref={nameRef}
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
                      className={`w-1/3 md:w-full flex items-center justify-center   border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular flex items-center justify-center h-[32px] md:h-[42px] rounded-lg
                                                    ${data.action
                          ? " h-full border-none  h-[32px] md:h-[42px] bg-textBlueColor md:bg-btnLightBlueColor text-white md:text-textBlueColor my-auto mx-auto border-searchBgColor rounded-lg"
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
                  onClick={() => setMethodDeliv("Такси")}
                  className="group w-[28%] md:w-1/4  focus:bg-textBlueColor font-AeonikProRegular border border-borderColor2 rounded-lg h-[32px] md:h-[42px] flex items-center justify-center"
                >
                  <span className="group-focus:text-white text-[10px] ls:text-[12px] md:text-base">
                    Такси
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethodDeliv("Собственная доставка")}
                  className="group w-[72%] md:w-3/4  group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg h-[32px] md:h-[42px] flex items-center justify-center"
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
