import React, { useState, useEffect, useCallback, memo } from "react";
import LocationItem from "./LocationItem/LocationItem";
import {
  AddLocationIcon,
  CalendarIcons,
  DeleteIcon,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
} from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { Space, DatePicker, Checkbox } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import LoadingForSeller from "../../Loading/LoadingFor";
import PuffLoader from "react-spinners/PuffLoader";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const { RangePicker } = DatePicker;
const url = "https://api.dressme.uz/api/seller";

export default function ProductLocationsList() {
  const { request } = useHttp()
  const [getIdShopLocation, setGetIdShopLocation] = useState(null);
  const [loader, setLoader] = useState(false);
  // ------------
  const [openStoreList, setOpenStoreList] = useState(false);
  const [hideProductList, setHideProductList] = useState(false);

  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const [getCheckListItem, setGetCheckListItem] = useState(false)
  const [addLocationAllProductToggle, setAddLocationAllProductToggle] = useState(false)
  const ProductToggleAllItems = React.useCallback(() => setAddLocationAllProductToggle(false), []);
  console.log(addLocationAllProductToggle, "addLocationAllProductToggle----------");

  const [productList, setProductList] = useState('')
  const [getProductOfCategory, setGetProductOfCategory] = useState('')

  useQuery(["getProductOfCategory"], () => { return request({ url: "/products/get-product-info", token: true }) },
    {
      onSuccess: (res) => {
        setGetProductOfCategory(res?.types);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const { isLoading, refetch } = useQuery(["productList"], () => { return request({ url: "/products/locations", token: true }) },
    {
      onSuccess: (res) => {
        setProductList(res)
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  function handleChekListItem(childData) { setGetCheckListItem({ childData }) }

  const sendAddProductById = () => {
    setLoader(true)
    setHideProductList(true)
    let form = new FormData();
    form.append("location_id", getIdShopLocation);
    getCheckListItem?.childData?.map((e, index) => {
      form.append("product_ids[]", getCheckListItem?.childData[index]);
    })
    return fetch(`${url}/shops/locations/products/add-selected`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.errors && res?.message) {
          setDeleteMessage(res?.message)
          setLoader(false)
          refetch()
          setTimeout(() => {
            setOpenStoreList(false)
            setHideProductList(false)
          }, 5000);
        } else if (res?.message) {
          setSuccessMessage(res?.message)
          setGetIdShopLocation('')
          setLoader(false)
          refetch()
          setTimeout(() => {
            setOpenStoreList(false)
            setHideProductList(false)
          }, 1000);
        }
        console.log(res, "Success - ThisIsSeveralSelected");
      })
      .catch((err) => console.log(err, "Error ThisIsSeveralSelected"));
  };

  // products
  const navigate = useNavigate();
  function openMarketEditPage(id) {
    navigate(`/store/market-list/:${id}`);
  };


  // console.log(getCheckListItem?.childData?.length, "Parent---getCheckListItem");

  return (
    <div>
      <section
        onClick={() => {
          setOpenStoreList(false)
        }}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${openStoreList ? "" : "hidden"}`}
      ></section>
      {/* Add the Several selected products to the new one */}
      <section
        className={` max-w-[440px] md:max-w-[750px] mx-auto w-full flex-col  h-fit  bg-white mx-auto fixed px-2 py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[115] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openStoreList ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => setOpenStoreList(false)
          }
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a1a1a1"} />
        </button>
        <div className="w-full h-fit flex items-center justify-center py-4 mb-1 border-b border-borderColor2">
          <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
            Добавить локацию
          </p>
        </div>
        <div className="w-full  flex flex-col gap-y-[10px] h-[300px]  overflow-hidden  ">
          {hideProductList ?
            <div className="w-full h-full flex items-center justify-center">
              {loader && hideProductList ?
                <PuffLoader
                  // className={styles.loader1}
                  color={"#007DCA"}
                  size={80}
                  loading={true}
                />
                :
                <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                  {deleteMessage ?
                    <span className="flex items-center justify-center p-2">
                      <MdError size={35} color="#FF4343" />
                    </span>
                    :
                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                      <FaCheck size={30} color="#009B17" />
                    </span>}
                  <span className="text-2xl not-italic font-AeonikProMedium">{deleteMessage ? deleteMessage : SuccessMessage}</span>
                </div>
              }
            </div> :
            <div className="w-full h-full overflow-y-auto VerticelScroll">
              {productList?.products_locations?.map(item => {
                return (
                  <div className="w-full cursor-pointer mt-2">
                    {item?.shop_locations?.length >= 1 && <div className="w-full py-[10px] flex items-center flex-col justify-center rounded-[5px]">
                      <span className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                        {" "}
                        {item?.name}
                      </span>
                      {item?.shop_locations?.map((data, index) => {
                        return (
                          <div onClick={() => setGetIdShopLocation(data?.id)} className={`w-full my-1 flex items-center p-[2px] rounded-[4px]  justify-center gap-x-1  ${getIdShopLocation == data?.id ? "bg-LocationSelectBg bg-LocationSelectBg" : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"}  `}>
                            <span className="text-[17px]">{index + 1}</span>)
                            <p className="text-black text-[17px] not-italic flex items-center font-AeonikProMedium mr-[20px]">
                              {data?.address}
                            </p>
                          </div>
                        )
                      })}
                    </div>}
                  </div>
                )
              })}
            </div>}
        </div>
        <div className="w-full flex items-center justify-between mt-5 gap-x-2">
          <button
            onClick={() => setOpenStoreList(false)}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[42px] px-4  text-center text-xl not-italic font-AeonikProMedium">
            Oтмена
          </button>
          <button
            onClick={sendAddProductById}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[42px] px-4  text-center text-xl not-italic font-AeonikProMedium">
            Готово
          </button>

        </div>
      </section>
      {/* Navbar */}
      <div className="flex justify-start items-center md:justify-between md:border-b border-borderColor py-4">
        <section className="hidden md:flex">
          <p className="text-black text-2xl not-italic font-AeonikProMedium ">
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
      {isLoading ? <LoadingForSeller /> :
        <div className=" w-full">
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
                type="button"
                onClick={() => setOpenStoreList(true)}
                className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg ${getCheckListItem?.childData?.length >= 2
                  ? "text-addLocationTextcolor  active:scale-95  active:opacity-70"
                  : "text-[#D2D2D2] cursor-not-allowed"
                  }`}
              >
                <span className="mr-[5px]">
                  <AddLocationIcon width={20} />
                </span>
                Добавить в локацию
              </button>
              <button
                className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg  ${getCheckListItem?.childData?.length >= 2
                  ? "text-deleteColor active:scale-95  active:opacity-70"
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
          <div className="w-full justify-end  cursor-pointer bg-white flex items-center gap-x-2"
          >
            <span className="md:mr-[10px] select-none text-sm md:text-base font-AeonikProMedium md:font-AeonikProMedium text-mobileTextColor">
              Выбрать все
            </span>
            <Checkbox value={"all"} />
          </div>
          <div className="w-full my-4">
            {/* <table className="w-full  mb-[10px] hidden md:flex flex-col items-center text-tableTextTitle">
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
            </table> */}

          </div>
          {productList?.products_locations?.map((item, index1) => {
            return (
              <div className="flex items-center w-full">
                {item?.shop_locations?.length !== 0 && < div className="w-full  my-6">
                  <button
                    type="button"
                    onClick={() => openMarketEditPage(item?.id)}
                    className="w-full  flex items-center justify-center mb-6 cursor-pointer">
                    <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                      {item?.name}
                    </p>
                  </button>
                  {item?.shop_locations?.map((resData, index) => {
                    return (
                      <div className="w-full">
                        <div className="w-full  mt-5">
                          <div className="flex justify-end items-center md:justify-between mx-auto ">
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
                            {item?.shop_locations?.length !== 0 ?
                              <LocationItem
                                allProductLocationList={productList?.products_locations}
                                handleGetCheckAll={handleChekListItem}
                                onRefetch={refetch}
                                data={resData}
                                getProductOfCategory={getProductOfCategory}
                                ProductToggleOnclick={ProductToggleAllItems}
                                ProductToggleState={addLocationAllProductToggle}
                              />
                              :
                              ""
                            }
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                }
              </div>
            )
          })
          }
        </div>}
    </div >
  );
}
