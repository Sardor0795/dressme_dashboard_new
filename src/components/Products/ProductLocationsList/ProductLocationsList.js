import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  AddLocationIcon,
  CalendarIcons,
  CheckIcons,
  DeleteIcon,
  GoBackIcons,
  SearchIcon,
} from "../../../assets/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Space, DatePicker } from "antd";
// import { SearchIcon } from "../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import { wearImg } from "../../../assets";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import StoreListModal from "./LocationItem/StoreListModal";

const { RangePicker } = DatePicker;

export default function ProductLocationsList() {
  const { request } = useHttp()
  const [openStoreList, setOpenStoreList] = useState(false);

  const storeToggle = React.useCallback(() => setOpenStoreList(false), []);

  const [productList, setProductList] = useState('')

  useQuery(["products"], () => {
    return request({ url: "/products/locations", token: true });
  },
    {
      onSuccess: (res) => {
        setProductList(res)
        // setState({ ...state, productList: res?.products_locations })
        // console.log(res, "nbuRes");
        // res?.products_locations?.map(item => {
        //   console.log(item, "BuResItem");
        // })
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  // console.log(productList, " productList");
  console.log(productList?.products_locations, "products_locations");
  // console.log(state?.productList?.products_locations[0]);
  const [city1, setCity1] = useState([
    {
      id: 1,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
    },
    {
      id: 2,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 3,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
    },
    {
      id: 4,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
    {
      id: 5,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 6,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
  ]);
  const [city1all, setCity1all] = useState(false);

  const [city2, setCity2] = useState([
    {
      id: 1,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
    },
    {
      id: 2,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Одобренный",
    },
    {
      id: 3,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
    },
    {
      id: 4,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Отказанный",
    },
    {
      id: 5,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 6,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
  ]);
  const [city2all, setCity2all] = useState(false);

  const [arrayAllChecked, setArrayAllChecked] = useState(false);

  const [someChecked, setSomeChecked] = useState(false);

  // ---------------------------------------
  // Alohida alohida checked qilish
  const onCheck1 = (id) => {
    let newArr = city1.map((item) => {
      return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
    });
    setCity1(newArr);
    setSomeChecked(true);
  };
  const onCheck2 = (id) => {
    let newArr = city2.map((item) => {
      return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
    });
    setCity2(newArr);
    setSomeChecked(true);
  };

  // ------------------------------------
  // City buyicha checked qilish
  const City1Checked = () => {
    if (!city1all) {
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity1(city1Array);
      setSomeChecked(true);
    } else if (city1all) {
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity1(city1Array);
    }
  };
  const City2Checked = () => {
    if (!city2all) {
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity2(city2Array);
      setSomeChecked(true);
    } else if (city2all) {
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity2(city2Array);
    }
  };

  // this effect for all check
  useEffect(() => {
    if (arrayAllChecked) {
      setCity1all(true);
      setCity2all(true);
      // array1
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity2(city2Array);
      // array2
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity1(city1Array);
      setSomeChecked(true);
    }
    if (!arrayAllChecked) {
      setCity1all(false);
      setCity2all(false);
      // array1
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity2(city2Array);
      // array2
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity1(city1Array);
      setSomeChecked(false);
    }
  }, [arrayAllChecked]);


  // products
  const navigate = useNavigate();
  const goProductDetailEdit = (id) => {
    navigate(`/locations-store/edit-detail/:${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };
  function addNewProductId(locationId, shopId) {
    console.log("RuN");
    console.log(locationId, shopId, "locationId, shopId");
    navigate(`/products/location/add/:${`${locationId}` + `${shopId}`}`);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-start items-center md:justify-between md:border-b border-borderColor py-4">
        <section className="hidden md:flex">
          <button
            button
            onClick={() => {
              navigate(-1);
            }}
            className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
          >
            <AiOutlineLeft />
          </button>
          <p className="text-black text-2xl not-italic font-AeonikProMedium ml-[30px]">
            Одежда{" "}
          </p>
        </section>
        <section className="w-full flex md:hidden">
          <div className="w-full flex items-center">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="absolute flex items-center justify-start cursor-pointer "
            >
              <GoBackIcons />
            </button>
            <p className="w-full text-center text-black text-2xl not-italic font-AeonikProMedium">
              Одежда
            </p>
          </div>
        </section>
        <section className="w-fit hidden md:flex items-center gap-x-[15px]">
          <form className="max-w-[400px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
            <input
              type="text"
              name="s"
              className="w-full h-full  outline-0	"
              placeholder="Поиск"
            />
            <button>
              <SearchIcon />
            </button>
          </form>
          <section className="mobileDate flex items-center gap-x-[30px]">
            <Space direction="vertical" size={12}>
              <RangePicker placeholder={["от", "до"]} />
            </Space>
          </section>
        </section>
      </div>

      {/* Search Section For Mobile */}
      <div className="flex md:hidden items-center justify-between border-t md:border-0 border-borderColor pt-3 md:pt-0 md:mt-3">
        <section className="w-full md:w-fit flex items-center justify-between md:justify-static gap-x-6 md:gap-x-[15px]">
          <label
            htmlFor="searchStore"
            className="w-full md:max-w-[400px] h-10 overflow-hidden border  border-lightBorderColor flex items-center rounded-lg"
          >
            <input
              type="text"
              name="s"
              id="searchStore"
              className="w-full h-full outline-0 	pl-[10px]"
              placeholder="Поиск"
            />
            <span className="pr-[10px]">
              <SearchIcon />
            </span>
          </label>
          <section className=" flex items-center gap-x-[30px] ">
            <span>
              <CalendarIcons />
            </span>
            <span className="hidden md:flex items-center">
              <Space direction="vertical" size={12}>
                <RangePicker className="" placeholder={["от", "до"]} />
              </Space>
            </span>
          </section>
        </section>
      </div>

      <div className="border border-blue-500 w-full">
        {/* Up Title */}
        <div className="flex items-center justify-center py-7 relative w-full border-b border-borderColor md:border-none">
          <p className="hidden md:block text-xl font-AeonikProMedium absolute left-0">
            Общее количество: {productList?.products_locations?.length}
          </p>
          {/* <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
            Nike Store Official Dealer
          </p> */}
          <div className="w-full md:w-fit flex items-center justify-between absolute right-0">
            <div className="flex items-center md:mr-6 font-AeonikProRegular text-sm md:text-lg text-mobileTextColor">
              Выбранные <span className="block md:hidden font-AeonikProMedium">:</span>
            </div>
            <button
              className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg ${someChecked
                ? "text-addLocationTextcolor  active:translate-y-[2px]"
                : "text-[#D2D2D2] cursor-not-allowed"
                }`}
            >
              <span className="mr-[5px]">
                <AddLocationIcon width={20} />
              </span>
              Добавить в локацию
            </button>
            <button
              className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg  ${someChecked
                ? "text-deleteColor active:translate-y-[2px]"
                : "text-[#D2D2D2] cursor-not-allowed"
                }`}
            >
              <span className="mr-[5px]">
                <DeleteIcon width={20} />
              </span>
              Удалить
            </button>
          </div>
        </div>
        <div className="w-full mb-4">
          <table className="w-full  mb-[10px] hidden md:flex flex-col items-center text-tableTextTitle">
            <thead className="w-full  h-[70px] flex items-center">
              <div className="min-w-[24px] min-h-[24px] bg-white mr-[8px]"></div>
              <tr className="w-full h-full flex items-center justify-between border rounded-[8px]  border-lightBorderColor">
                <th className="w-[5%] h-full flex items-center justify-center" >No:</th>
                <th className="w-[14%] h-full flex items-center justify-center">Фото</th>
                <th className="w-[15%] h-full flex items-center justify-center">Наименование товара</th>
                <th className="w-[15%] h-full flex items-center justify-center">Артикул</th>
                <th className="w-[8%] h-full flex items-center justify-center">Тип</th>
                <th className="w-[8%] h-full flex items-center justify-center">Дата</th>
                <th className="w-[10%] h-full flex items-center justify-center">Статус</th>
                <th className="w-[10%] h-full flex items-center justify-center">Цена товара</th>
                <th className="w-[10%] h-full flex items-center justify-center"></th>
                <th className="w-[9%] h-full flex items-center justify-center">Добавить</th>
                <th className="w-[9%] h-full flex items-center justify-center">Удалить</th>
              </tr>
            </thead>
          </table>
          <div
            onClick={() => {
              setArrayAllChecked(!arrayAllChecked);
            }}
            className="w-full justify-end cursor-pointer bg-white flex items-center gap-x-2"
          >
            <span className="md:mr-[10px] select-none text-sm md:text-base font-AeonikProMedium md:font-AeonikProMedium text-mobileTextColor">
              Выбрать все
            </span>
            <button
              type="button"
              className={`flex items-center rounded-[6px] md:rounded-lg justify-center min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px]  ${arrayAllChecked
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border border-checkboxBorder"
                }`}
            >
              {arrayAllChecked && <CheckIcons />}
            </button>
          </div>
        </div>
        {productList?.products_locations?.map(item => {
          return (
            <div className="flex items-center w-full">
              {item?.shop_locations?.length !== 0 && < div className="w-full border border-black my-6">
                <div className="w-full  flex items-center justify-center mb-6">
                  <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                    {item?.name}
                  </p>
                </div>
                {item?.shop_locations?.map(resData => {
                  // console.log(resData, "resData");
                  return (
                    <div className="w-full">
                      {
                        <div className="w-full  mt-10">
                          <div className="flex justify-end items-center md:justify-between mx-auto ">
                            <section className="hidden md:flex items-center">
                              <div
                                onClick={() => {
                                  setCity1all(!city1all);
                                  City1Checked();
                                }}
                                className=" cursor-pointer bg-white flex items-center gap-x-2"
                              >
                                <button
                                  type="button"
                                  className={`flex items-center rounded-[6px] md:rounded-lg justify-center min-w-[24px] min-h-[24px]  ${city1all
                                    ? "bg-[#007DCA] border-[#007DCA]"
                                    : "bg-white border border-[#f4a622]"
                                    }`}
                                >
                                  <CheckIcons />
                                </button>

                                <p className="text-black text-base not-italic font-AeonikProMedium mr-[20px]">
                                  {resData?.address}
                                </p>
                              </div>
                              <button
                                onClick={() => addNewProductId(resData?.id, resData?.shop_id)}
                                className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
                              >
                                <span>
                                  <AddIconsCircle />
                                </span>
                                <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
                                  Добавить одежду
                                </span>
                              </button>
                            </section>

                            <div className="w-full md:w-fit flex items-center justify-between md:justify-normal mt-4 md:mt-0 ">
                              <p className="flex md:hidden text-sm font-AeonikProMedium">
                                Общее количество: 6
                              </p>

                            </div>
                          </div>
                          <div className="flex md:hidden text-textBlueColor text-xl not-italic font-AeonikProMedium mb-6 ">
                            {item?.name}
                          </div>
                          <div className="mx-auto font-AeonikProRegular text-[16px]">
                            <table className="w-full  mb-[10px] hidden md:flex flex-col items-center text-tableTextTitle">
                              {item?.shop_locations?.length !== 0 && resData?.products?.length !== 0 ?
                                resData?.products?.map(data => {
                                  return (
                                    <tbody className="w-full flex flex-col gap-y-[10px] mt-5  items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                                      <div className="flex flex-col w-full">
                                        <div className="w-full flex h-[120px]  items-center">
                                          {openStoreList && <StoreListModal onClick={storeToggle} />}
                                          <div
                                            className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${data?.isCheck
                                              ? "bg-[#007DCA] border-[#007DCA]"
                                              : "bg-white border-checkboxBorder"
                                              } flex items-center justify-center rounded-[6px] md:rounded-lg mr-[8px]`}
                                          >
                                            <div
                                              className={`${data?.isCheck ? "flex items-center justify-center" : "hidden"
                                                }`}
                                            >
                                              <CheckIcons />
                                            </div>
                                          </div>
                                          <tr className="w-full h-full py-2  flex items-center justify-between rounded-[8px] border  border-lightBorderColor">
                                            <td className="w-[5%] h-full  flex items-center justify-center " >{data?.id}</td>
                                            <td className="w-[14%] h-full  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                                              <img src={item?.url_logo_photo} alt={"red"} className="w-full h-full object-cover" />
                                            </td>
                                            <td className="w-[15%] h-full  flex items-center  ">
                                              <p className="w-full  break-words text-center text-weatherWinterColor flex items-center  text-base not-italic font-AeonikProMedium">
                                                {data?.name_ru || "namrRu"}
                                              </p>
                                            </td>
                                            <td className="w-[15%] h-full  flex items-center justify-center ">
                                              {data?.sku || "sku"}
                                            </td>
                                            <td className="w-[8%] h-full  flex items-center justify-center ">
                                              {data?.type_id || "type_id"}
                                            </td>
                                            <td className="w-[8%] h-full  flex items-center justify-center ">{data?.created_at || "created_at"}</td>
                                            <td className="w-[10%] h-full  flex items-center justify-center ">
                                              <div
                                                className={`w-fit text-center text-white font-AeonikProRegular py-[5px] px-[15px] rounded-full bg-green-500 `}
                                              >
                                                {data?.status || "status"}
                                              </div>
                                            </td>
                                            <td className="w-[10%] h-full  flex items-center justify-center ">
                                              {data?.sizes?.map(itemValue => {
                                                return (
                                                  <div className="w-full flex items-center justify-center gap-x-1">

                                                    <span className=""> {itemValue?.discount_price || itemValue?.price}</span>
                                                    <span className=""> {itemValue?.currency}</span>
                                                  </div>
                                                )
                                              })}
                                              {/* {data?.accessory_price && data?.accessory_price} */}
                                              {/* {data?.headwear_price && (data?.headwear_price?.discount_price || data?.headwear_price?.price)}
                                              {data?.outwear_price && (data?.outwear_price?.discount_price || data?.outwear_price?.price)}
                                              {data?.underwear_price && (data?.underwear_price?.discount_price || data?.underwear_price?.price)}
                                              {data?.accessory_price && (data?.accessory_price?.discount_price || data?.accessory_price?.price)}
                                              {data?.footwear_price && (data?.footwear_price?.discount_price || data?.footwear_price?.price)} */}
                                            </td>
                                            <td className="w-[10%] h-full  flex items-center justify-center ">
                                              <button
                                                onClick={() => goProductDetailEdit(data?.id)}
                                                className="text-[18px] text-weatherWinterColor w-full text-center"
                                              >
                                                Подробнее
                                              </button>
                                            </td>
                                            <td className="w-[9%] h-full  flex items-center justify-center ">
                                              <button className="w-full flex justify-center cursor-auto">
                                                <span
                                                  onClick={() => setOpenStoreList(true)}
                                                  className="cursor-pointer active:translate-y-[2px] text-[#D2D2D2] hover:text-[#F4A622] transition-colors duration-[0.2s] ease-linear"
                                                >
                                                  <AddLocationIcon width={30} />
                                                </span>
                                              </button>
                                            </td>
                                            <td className="w-[9%] h-full  flex items-center justify-center ">
                                              <button className="w-full flex justify-center cursor-auto">
                                                <span className="cursor-pointer active:translate-y-[2px] text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                                                  <DeleteIcon width={30} />
                                                </span>
                                              </button>
                                            </td>
                                          </tr>
                                        </div>
                                        {/* For Mobile Device */}
                                        <div key={data?.id} className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full">
                                          <div className="mb-2">
                                            <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                                              <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                              <span className="text-checkboxBorder">0{data?.id}</span>
                                              <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                            </div>
                                          </div>

                                          <div className="mb-3 h-[148px]">
                                            <figure className="w-full h-full rounded-lg overflow-hidden">
                                              {/* <img className="w-[100%] h-[100%]" src={data?.photos[0]?.url_photo} alt="" /> */}
                                            </figure>
                                          </div>

                                          <div className="mb-6">
                                            <div className="w-full flex items-center  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] gap-x-[10px] mb-[8px]">
                                              <div className="w-[40%] flex items-center">Имя товара</div>
                                              <div className="w-[30%] flex items-center">Статус</div>
                                              <div className="w-[30%] flex items-center">Цена товара</div>
                                            </div>

                                            <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">
                                              <div className="w-[40%]"> {data?.name_product}</div>
                                              <div className=" w-[30%] flex items-center justify-center text-white bg-green-500 rounded-lg px-[5px] py-[2px]">{data?.status}</div>
                                              <div className="w-[30%]"> {data?.money} сум </div>
                                            </div>
                                          </div>

                                          <div className="flex items-center justify-between">
                                            <button
                                              onClick={() => goMapWear(data?.city)}
                                              className="text-[#ED7925] bg-[#FDF1E8] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                            >
                                              Добавить в локацию
                                            </button>
                                            <button
                                              onClick={() => goMapCity(data?.city)}
                                              className="text-[#007DCA] bg-[#E8F5FD] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                            >
                                              Подробнее
                                            </button>
                                          </div>

                                          <div className="w-full flex items-center justify-between mt-[18px]">
                                            <div
                                              // onClick={() => {
                                              //   click(data?.id);
                                              // }}
                                              className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${data?.isCheck
                                                ? "bg-[#007DCA] border-[#007DCA]"
                                                : "bg-white border-checkboxBorder"
                                                } flex items-center justify-center rounded mr-[8px]`}
                                            >
                                              <div
                                                className={`${data?.isCheck ? "flex items-center justify-center" : "hidden"
                                                  }`}
                                              >
                                                <CheckIcons />
                                              </div>
                                            </div>
                                            <button to="#" className="text-textBlueColor text-[13px] font-AeonikProMedium">
                                              Больше...
                                            </button>
                                            <button className="text-red-600 text-[11px] font-AeonikProMedium">Удалить</button>
                                          </div>
                                        </div>
                                      </div>

                                    </tbody>
                                  )
                                }) :
                                <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-5">
                                  <span className="text-[#D2D2D2] font-AeonikProRegular text-xl">Tовара нет</span>
                                </div>
                              }

                            </table>

                          </div>
                        </div>
                      }
                    </div>
                  )
                })}
              </div>
              }
            </div>
          )
        })
        }
      </div>
    </div >
  );
}
