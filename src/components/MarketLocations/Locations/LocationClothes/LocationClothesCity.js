import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  AddLocationIcon,
  DeleteIcon,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
} from "../../../../assets/icons";
import { useQuery } from '@tanstack/react-query'

import { useHttp } from "../../../../hook/useHttp";
import { PuffLoader } from "react-spinners";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const url = "https://api.dressme.uz/api/seller";
export default function LocationClothesCity() {
  const { request } = useHttp()
  const navigate = useNavigate();
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
    shopId: null


  });


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  function handleAllCheckList(childData) {
    setState({ ...state, getCheckListItem: childData })
  }
  const { id } = useParams();
  const NewId = id.replace(":", "");
  // ------------GET  Has Magazin ?-----------------
  const [getListItem, setGetListItem] = useState()
  const { refetch } = useQuery(["location_store_id"], () => {
    return request({ url: `/shops/locations/${NewId}/show-products-by-location`, token: true });
  },
    {
      onSuccess: (res) => {
        setGetListItem(res?.location)
        // console.log(res?.location, "BURES");
      },
      onError: (err) => {
        console.log(err, "BU -- HOC -- Error");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const [hideProductList, setHideProductList] = useState(false);


  useQuery(["productList_store"], () => { return request({ url: "/products/locations", token: true }) },
    {
      onSuccess: (res) => {
        setState({ ...state, getProductList: res })
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  // console.log(state?.getProductList, "buDate---state?.getProductList,");
  // console.log(getListItem, "buDate---getListItem,");
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
    form.append("location_ids[]", state?.shopId?.shopId);
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

  // console.log(state?.getCheckListItem, "getCheckListItem");
  return (
    <div className=" px-4 md:px-10  ">
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
                            <div className={`w-min-[200px] w-full  mx-auto my-1 flex items-center p-[2px] rounded-[4px]  justify-start gap-x-1   `}>
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
              {state?.getProductList?.products_locations?.map(item => {
                return (
                  <div className="w-full cursor-pointer mt-2">
                    {item?.shop_locations?.length >= 1 && <div className="w-full py-[10px] flex items-center flex-col justify-center rounded-[5px]">
                      <span className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                        {" "}
                        {item?.name}
                      </span>
                      {item?.shop_locations?.map((data, index) => {
                        return (
                          <div onClick={() => setState({ ...state, getShopLocationId: data?.id })
                          } className={`w-full my-1 flex items-center p-[2px] rounded-[4px]  justify-center gap-x-1  ${state?.getShopLocationId == data?.id ? "bg-LocationSelectBg bg-LocationSelectBg" : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"}  `}>
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
                // className={styles.loader1}
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
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[42px]  text-center text-base not-italic font-AeonikProMedium">
            Oтмена
          </button>
          <button
            onClick={() => onDeleteSeveralSelect()}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor hover:text-white text-[#FF4747] bg-white hover:bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            Удалить из адреса</button>

        </div>

      </section>
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block ">
        <div className="block md:flex justify-start items-center md:justify-between ">
          <div className=" flex items-center justify-center gap-x-2 ">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="h-8 w-8 md:static absolute left-0 flex items-center cursor-pointer justify-center rounded-lg md:border border-borderColor"
            >
              <GoBackIcons />
            </button>
            <div className="text-center flex items-center text-xl md:text-[24px] font-AeonikProMedium   md:ml-[30px]">
              Одежда
            </div>
          </div>{" "}


          <section className="mt-[25px] pt-[25px] md:mt-0 md:pt-0 md:border-0 border-t border-[#F2F2F2]  w-full md:w-fit  flex items-center md:justify-start justify-between  gap-x-[15px]">
            <label
              htmlFor="searchStore"
              className="w-full md:w-[400px] h-10 overflow-hidden border  border-lightBorderColor flex items-center rounded-lg"
            >
              <input
                type="text"
                name="s"
                id="searchStore"
                className="w-full h-full   outline-0 	pl-[10px]"
                placeholder="Поиск"
              />
              <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                <SearchIcon />
              </span>
            </label>
          </section>
        </div>
      </div>

      <div className="mt-[10px] md:mt-[35px] flex justify-end items-center md:justify-between mx-auto pb-6">
        <section className="hidden md:flex gap-x-4">
          <p className="text-black text-xl not-italic font-AeonikProMedium">
            {getListItem?.address}
            {getListItem?.products?.length > 1 &&
              <span className="ml-2">({getListItem?.products?.length})</span>}
          </p>
          <Link
            to="/products/add-wear"
            className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
          >
            <span>
              <AddIconsCircle />
            </span>
            <span className="text-addWearColorText text-[13px] not-italic font-AeonikProMedium">
              Добавить одежду
            </span>
          </Link>
        </section>
        <div className="w-full md:w-fit flex items-center border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
          <div className="mr-auto md:mr-6 font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
            Выбранные:
          </div>
          {state?.getCheckListItem?.length >= 2 ?

            <button
              type="button"
              onClick={() => setState({ ...state, openSelectModal: true })}
              className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg text-addLocationTextcolor  active:scale-95  active:opacity-70`}
            >
              <span className="mr-[3px] ll:mr-[5px] hidden md:block">
                <AddLocationIcon width={20} />
              </span>
              <span className="mr-[3px] ll:mr-[5px] block md:hidden">
                <AddLocationIcon width={16} />
              </span>
              Добавить в локацию
            </button>
            :
            <button
              type="button"
              className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg text-[#D2D2D2] cursor-not-allowed`}
            >
              <span className="mr-[3px] ll:mr-[5px] hidden md:block">
                <AddLocationIcon width={20} />
              </span>
              <span className="mr-[3px] ll:mr-[5px] block md:hidden">
                <AddLocationIcon width={16} />
              </span>
              Добавить в локацию
            </button>
          }
          {state?.getCheckListItem?.length >= 2 ?
            <button
              type="button"
              onClick={() => setState({ ...state, openDeleteModal: true })}
              className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg  text-deleteColor active:scale-95  active:opacity-70`}
            >
              <span className="mr-[5px]">
                <DeleteIcon width={20} />
              </span>
              Удалить
            </button>
            :
            <button
              type="button"
              onClick={() => setState({ ...state, openDeleteModal: true })}
              className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg text-[#D2D2D2] cursor-not-allowed`}
            >
              <span className="mr-[5px]">
                <DeleteIcon width={20} />
              </span>
              Удалить
            </button>
          }
        </div>
      </div>

      <div className="mx-auto font-AeonikProRegular text-[16px]">
        <div className="mb-[10px] flex items-center text-tableTextTitle">

          <div className="w-full block  md:hidden ">
            <div className="flex items-center md:hidden justify-end w-full mb-[25px]">
              Выбрать все
              <div
                onClick={() => {
                  // onCheck(checkIndicator);
                  setAllChecked(!allChecked);
                }}
                className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${allChecked
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
                  } flex items-center justify-center rounded ml-[8px]`}
              >
                <span
                  className={`${allChecked ? "flex items-center justify-center" : "hidden"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="10"
                    viewBox="0 0 11 13"
                    fill="none"
                  >
                    <path
                      d="M1 9.5L5.88235 11L10 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="w-full ">
              <section className="flex md:hidden gap-x-4">
                <p className="text-black text-[18px] not-italic font-AeonikProMedium mr-auto">
                  Юнусабад (6)
                </p>
                <Link
                  to="/products/add-wear"
                  className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
                >
                  <span className="text-addWearColorText text-[13px] not-italic font-AeonikProMedium">
                    Добавить одежду
                  </span>
                  <span>
                    <AddIconsCircle size={16} />
                  </span>
                </Link>
              </section>
            </div>
          </div>
        </div>

        <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
          <LocationItem
            data={getListItem}
            onRefetch={refetch}
            allCheckedList={handleAllCheckList}
            allProductLocationList={state?.getProductList?.products_locations} />;

        </div>
      </div>
    </div>
  );
}
