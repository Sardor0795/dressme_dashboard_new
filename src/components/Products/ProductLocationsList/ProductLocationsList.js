import React, { useState, useEffect, useCallback, memo, useContext } from "react";
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
import { Space, DatePicker, Checkbox, message } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import LoadingForSeller from "../../Loading/LoadingFor";
import PuffLoader from "react-spinners/PuffLoader";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { dressMainData } from "../../../hook/ContextTeam";
import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;
const url = "https://api.dressme.uz/api/seller";

export default function ProductLocationsList() {
  const { request } = useHttp()

  const [searchName, setSearchName] = useState('')
  const [state, setState] = useState({
    getProductList: null,
    getProductCategory: null,
    onSuccessMessaage: null,
    onErrorMessage: null,
    onErrorTitle: null,
    getShopLocationId: null,
    getCheckListItem: null,
    loader: false,
    openSelectModal: false,
    hideProductList: false,
    // -----------
    openDeleteModal: false,
    shopId: null,
    shopMarketId: ""
  });
  // ------------

  const [hideProductList, setHideProductList] = useState(false);


  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const fetchData = async (customHeaders) => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/products/locations`, {
        headers: customHeaders,
      });
      const status = response.status;
      const data = response.data;

      return { data, status };
    } catch (error) {
      const status = error.response ? error.response.status : null;
      return { error, status };
    }
  };

  const customHeaders = {
    'Content-type': 'application/json; charset=UTF-8',
    "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,    // Add other headers as needed
  };
  const { isLoading, refetch } = useQuery(['seller_getProductList_list'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      console.log(data, "data");
      if (data?.status >= 200 && data?.status < 300) {
        setDressInfo({ ...dressInfo, getProductList: data?.data })

      }
      if (data?.status === 401) {

      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {

      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  function handleChekListItem(childData, shopId, shopMarketId) {
    setState({ ...state, getCheckListItem: childData, shopId: shopId, shopMarketId: shopMarketId })
  }

  function handleAllCheckList(childData) {
    console.log(childData, "childData");
  }

  const onSendPeoductSeveralSelect = () => {
    setState({ ...state, loader: true, hideProductList: true })
    setHideProductList(true)
    let form = new FormData();
    form.append("location_id", state?.getShopLocationId);
    state?.getCheckListItem?.map((e, index) => {
      form.append("product_ids[]", state?.getCheckListItem[index]);
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
        console.log(res?.problems?.length);
        if (res?.problems?.length !== 0 && res?.message) {
          setState({ ...state, onErrorMessage: res, onErrorTitle: res?.message, loader: false })
        } else if (res?.errors && res?.message) {
          setState({ ...state, onErrorMessage: res?.errors?.location_id, loader: false })
        } else if (res?.problems?.length == 0 && res?.message) {
          setState({ ...state, onSuccessMessaage: res?.message, getShopLocationId: null, loader: false })
          setTimeout(() => {
            refetch()
            setState({ ...state, openSelectModal: false, })
          }, 2000);
        }
        console.log(res, "Success - ThisIsSeveralSelected");
      })
      .catch((err) => console.log(err, "Error ThisIsSeveralSelected"));
  };
  const onDeleteSeveralSelect = () => {
    setState({ ...state, loader: true, hideProductList: true })
    setHideProductList(true)
    let form = new FormData();
    form.append("location_ids[]", state?.shopId);
    state?.getCheckListItem?.map((e, index) => {
      form.append("product_ids[]", state?.getCheckListItem[index]);
    })
    return fetch(`${url}/products/massive-delete-products`, {
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
          setState({ ...state, onErrorMessage: res?.errors, loader: false })
        } else if (res?.message) {
          setState({ ...state, onSuccessMessaage: res?.message, loader: false })
          setTimeout(() => {
            refetch()
            setState({ ...state, openDeleteModal: false, })
            setHideProductList(false)
          }, 2000);
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


  const [locationAllId, setLocationAllId] = useState([]);
  const [productAllId, setProductAllId] = useState([]);
  const [allCheckedAction, setAllCheckedAction] = useState(null);

  // const handleGetValueAll = (e) => {
  //   setAllCheckedAction(e.target.checked)
  //   if (e.target.checked) {
  //     dressInfo?.getProductList?.products_locations?.map(item => {
  //       return item?.shop_locations?.map(value => {
  //         setLocationAllId(locationAllId => [...locationAllId, value?.id]);
  //         return value?.products?.map(data => {
  //           setProductAllId(productAllId => [...productAllId, data?.id]);
  //         })
  //       })
  //     })

  //   } else {
  //     setLocationAllId([])
  //     setProductAllId([])
  //   }
  // }
  console.log(dressInfo?.getProductList, "dressInfo?.getProductList");
  return (
    <div className="w-full px-4 md:px-10">
      <section
        onClick={() => {
          setState({
            ...state,
            onSuccessMessaage: null,
            onErrorTitle: null,
            onErrorMessage: null,
            openSelectModal: false,
            hideProductList: false,
            openDeleteModal: false
          })
          setHideProductList(false)
        }}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.openSelectModal || state?.openDeleteModal ? "" : "hidden"}`}
      ></section>

      {/* Add the Several selected products to the new one */}
      <section
        className={` max-w-[440px] md:max-w-[750px] mx-auto w-full flex-col  h-fit  bg-white mx-auto fixed px-2 py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[115] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openSelectModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => {
            setHideProductList(false)
            setState({ ...state, onSuccessMessaage: null, onErrorTitle: null, onErrorMessage: null, openSelectModal: false, hideProductList: false })
          }
          }
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a1a1a1"} />
        </button>
        <div className="w-full h-fit flex items-center justify-center py-4 mb-1 border-b border-borderColor2">
          <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
            Добавить в локацию
          </p>
        </div>
        <div className="w-full  flex flex-col gap-y-[10px] h-[300px]  overflow-hidden  ">
          {hideProductList ?
            <div className="w-full h-full flex items-center justify-center">
              {state?.loader && hideProductList ?
                <PuffLoader
                  color={"#007DCA"}
                  size={80}
                  loading={true}
                />
                :
                <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                  {state?.onErrorMessage ?
                    <span className="flex flex-col items-center justify-center p-2">
                      <span className="text-2xl not-italic font-AeonikProMedium">{state?.onErrorMessage?.message}</span>
                      <MdError size={45} color="#FF4343" />
                    </span>
                    :
                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                      <FaCheck size={30} color="#009B17" />
                    </span>}
                  {state?.onErrorMessage ?
                    <div className="w-fit flex flex-col overflow-hidden item-center justify-center gap-y-2">
                      <span className="text-[18px] not-italic font-AeonikProMedium">{state?.onErrorMessage?.problems?.message?.ru}</span>
                      <div className="w-full overflow-auto flex flex-col VerticelScroll item-center justify-center gap-y-2  h-[170px]">

                        {state?.onErrorMessage?.problems?.products?.map((item, index) => {
                          return (
                            <div key={index} className={`w-min-[200px] w-full  mx-auto my-1 flex items-center p-[2px] rounded-[4px]  justify-start gap-x-1   `}>
                              <span className="text-[16px]">{index + 1}</span>)
                              <p className="text-black text-[16px] not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                {item?.name_ru}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    :
                    <div className="w-full flex items-center justify-center">
                      {/* <span className="text-2xl not-italic font-AeonikProMedium">{state?.onErrorTitle}</span> */}
                      <span className="text-2xl not-italic font-AeonikProMedium">{state?.onSuccessMessaage}</span>
                    </div>
                  }

                </div>
              }
            </div>
            :
            <div className="w-full h-full overflow-y-auto VerticelScroll">
              {dressInfo?.getProductList?.products_locations?.map((item, index) => {
                return (
                  <div key={index}>
                    {state?.getCheckListItem?.length > 0 ?
                      state?.shopMarketId == item?.id &&
                      <div className="w-full cursor-pointer mt-2">
                        {item?.shop_locations?.length >= 1 && <div className="w-full py-[10px] flex items-center flex-col justify-center rounded-[5px]">
                          <span className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                            {" "}
                            {item?.name}
                          </span>
                          {item?.shop_locations?.map((data, index) => {
                            return (
                              <div key={index}>
                                {data?.id !== state?.shopId && <div
                                  onClick={() => setState({ ...state, getShopLocationId: data?.id })}
                                  className={`w-full my-1 flex items-center p-[2px] rounded-[4px]  justify-center gap-x-1  ${state?.getShopLocationId == data?.id ? "bg-LocationSelectBg bg-LocationSelectBg" : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"}  `}>
                                  <span className="text-[17px]">{index + 1}</span>)
                                  <p className="text-black text-[17px] not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                    {data?.address}
                                  </p>
                                </div>}
                              </div>
                            )
                          })}
                        </div>}
                      </div>
                      :
                      <div className="w-full cursor-pointer mt-2">
                        {item?.shop_locations?.length >= 1 && <div className="w-full py-[10px] flex items-center flex-col justify-center rounded-[5px]">
                          <span className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                            {" "}
                            {item?.name}
                          </span>
                          {item?.shop_locations?.map((data, index) => {
                            return (
                              <div key={index} onClick={() => setState({ ...state, getShopLocationId: data?.id })
                              } className={`w-full my-1 flex items-center p-[2px] rounded-[4px]  justify-center gap-x-1  ${state?.getShopLocationId == data?.id ? "bg-LocationSelectBg bg-LocationSelectBg" : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"}  `}>
                                <span className="text-[17px]">{index + 1}</span>)
                                <p className="text-black text-[17px] not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                  {data?.address}
                                </p>
                              </div>
                            )
                          })}
                        </div>}
                      </div>}
                  </div>
                )
              })}
            </div>}
        </div>
        {!state?.onErrorMessage && !state?.onSuccessMessaage && !state?.onErrorTitle && <div className="w-full flex items-center justify-between mt-5 gap-x-2">
          <button
            onClick={() => setState({ ...state, openSelectModal: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[42px] px-4  text-center text-xl not-italic font-AeonikProMedium">
            Oтмена
          </button>
          <button
            onClick={onSendPeoductSeveralSelect}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[42px] px-4  text-center text-xl not-italic font-AeonikProMedium">
            Готово
          </button>

        </div>}
      </section>
      {/* Delete Product Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openDeleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => setState({ ...state, openDeleteModal: false })}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a1a1a1"} />
        </button>
        {hideProductList ?
          <div className="w-full flex items-center justify-center">
            {state?.loader && hideProductList ?
              <PuffLoader
                color={"#007DCA"}
                size={80}
                loading={true}
              />
              :
              <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                  <FaCheck size={30} color="#009B17" /></span>
                <span className="text-base not-italic font-AeonikProMedium">{state?.onSuccessMessaage}</span>
              </div>
            }
          </div>
          :
          <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
            <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
              <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                <DeleteIcon width={30} />
              </span>
            </span>
            <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
              Вы уверены?
            </span>
          </div>

        }
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">


          <button
            onClick={() => setState({ ...state, openDeleteModal: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[42px] px-4  text-center text-xl not-italic font-AeonikProMedium">
            Oтмена
          </button>
          <button
            onClick={onDeleteSeveralSelect}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            Удалить из адреса</button>
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
        <section className="w-full md:w-fit flex items-center justify-between md:justify-static ">
          <div className="w-full md:w-[400px] flex items-center justify-between md:justify-static gap-x-[15px]">
            <label
              htmlFor="searchStore"
              className=" w-full h-10 overflow-hidden border cursor-pointer  border-lightBorderColor flex items-center rounded-lg"
            >
              <input
                type="text"
                name="s"
                id="searchStore"
                value={searchName}
                onChange={(e) => setSearchName(e?.target?.value)}
                className="w-full h-full outline-0 px-[10px]"
                placeholder="Поиск"
              />
              <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                <SearchIcon />
              </span>
            </label>
          </div>
        </section>
      </div>
      {/* ------- */}


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

        </section>
      </div>
      {isLoading ? <LoadingForSeller /> :
        <div className=" w-full">
          {/* Up Title */}
          <div className="flex items-center justify-center py-7 relative w-full border-b border-borderColor md:border-none">
            <p className="hidden md:block text-xl font-AeonikProMedium absolute left-0">
              Общее количество: ({dressInfo?.getProductList?.products_locations?.length})
            </p>

            <div className="w-full md:w-fit flex items-center justify-between absolute right-0">
              <div className="flex items-center md:mr-6 font-AeonikProRegular text-sm md:text-lg text-mobileTextColor">
                Выбранные <span className="block md:hidden font-AeonikProMedium">:</span>
              </div>
              <button
                type="button"
                onClick={() => setState({ ...state, openSelectModal: true })}
                className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg ${state?.getCheckListItem?.length >= 1
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
                type="button"
                onClick={() => setState({ ...state, openDeleteModal: true })}
                className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg  ${state?.getCheckListItem?.length >= 1
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
          {/* <div className="w-full justify-end  cursor-pointer bg-white flex items-center gap-x-2"
          >
            <span className="md:mr-[10px] select-none text-sm md:text-base font-AeonikProMedium md:font-AeonikProMedium text-mobileTextColor">
              Выбрать все
            </span>
            <Checkbox onChange={handleGetValueAll} />
          </div> */}
          <div className="w-full my-4">

          </div>
          {dressInfo?.getProductList?.products_locations?.map((item, index) => {
            return (
              <div key={index}>
                {state?.getCheckListItem?.length > 0 ?
                  Number(state?.shopMarketId) === Number(item?.id) &&
                  <div className="flex items-center w-full">
                    {item?.shop_locations?.length !== 0 && < div className="w-full  my-6">
                      <button
                        type="button"
                        onClick={() => openMarketEditPage(item?.id)}
                        className="w-fit mx-auto   flex items-center justify-center mb-6 cursor-pointer">
                        <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                          {item?.name}                    </p>
                      </button>
                      {item?.shop_locations?.map((resData, index) => {
                        return (
                          <div key={index} className="w-full">
                            <div className="w-full  mt-5">
                              <div className="flex justify-end items-center md:justify-between mx-auto ">
                                <div className="w-full md:w-fit flex items-center justify-between md:justify-normal mt-4 md:mt-0 ">
                                  <p className="flex md:hidden text-sm font-AeonikProMedium">
                                    Общее количество: ({dressInfo?.getProductList?.products_locations?.length})
                                  </p>
                                </div>
                              </div>
                              <div className="flex md:hidden text-textBlueColor text-xl not-italic font-AeonikProMedium mb-6 ">
                                {item?.name}
                              </div>
                              <div className="mx-auto font-AeonikProRegular text-[16px] ">
                                {item?.shop_locations?.length !== 0 ?

                                  <LocationItem
                                    allProductLocationList={dressInfo?.getProductList?.products_locations}
                                    handleGetCheckAll={handleChekListItem}
                                    handleCheckAllBtn={handleAllCheckList}
                                    onRefetch={refetch}
                                    data={resData}
                                    // AllSelectCheckedAction={allCheckedAction}
                                    searchName={searchName}
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
                  :
                  <div className="flex items-center w-full ">
                    {item?.shop_locations?.length !== 0 && < div className="w-full  my-6">
                      <button
                        type="button"
                        onClick={() => openMarketEditPage(item?.id)}
                        className="w-fit mx-auto   flex items-center justify-center mb-6 cursor-pointer">
                        <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                          {item?.name}                    </p>
                      </button>
                      {item?.shop_locations?.map((resData, index) => {
                        return (
                          <div key={index} className="w-full">
                            <div className="w-full  mt-5">
                              <div className="flex justify-end items-center md:justify-between mx-auto ">
                                <div className="w-full md:w-fit flex items-center justify-between md:justify-normal mt-4 md:mt-0 ">
                                  <p className="flex md:hidden text-sm font-AeonikProMedium">
                                    Общее количество: ({dressInfo?.getProductList?.products_locations?.length})
                                  </p>
                                </div>
                              </div>
                              <div className="flex md:hidden text-textBlueColor text-xl not-italic font-AeonikProMedium mb-6 ">
                                {item?.name}
                              </div>
                              <div className="mx-auto font-AeonikProRegular text-[16px] ">
                                {item?.shop_locations?.length !== 0 ?
                                  <LocationItem
                                    allProductLocationList={dressInfo?.getProductList?.products_locations}
                                    handleGetCheckAll={handleChekListItem}
                                    handleCheckAllBtn={handleAllCheckList}
                                    onRefetch={refetch}
                                    data={resData}
                                    AllSelectCheckedAction={allCheckedAction}
                                    searchName={searchName}
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
                  </div>}
              </div>
            )
          })
          }
        </div>}
    </div >
  );
}
