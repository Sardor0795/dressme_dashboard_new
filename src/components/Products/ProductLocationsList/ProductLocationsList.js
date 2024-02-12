import React, { useState, useContext, useEffect } from "react";
import {
  AddIconsCircle,
  AddLocationIcon,
  DeleteIcon,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
} from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import LoadingForSeller from "../../Loading/LoadingFor";
import PuffLoader from "react-spinners/PuffLoader";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { dressMainData } from "../../../hook/ContextTeam";
import axios from "axios";
import { FiCheck } from "react-icons/fi";

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
  const [deleteModal, setDeleteModal] = useState(false);
  const [hideDeleteIcons, setHideDeleteIcons] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // --------------
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const [getIdShopLocation, setGetIdShopLocation] = useState(null);
  const [loader, setLoader] = useState(false);
  // ------------
  const [openStoreList, setOpenStoreList] = useState(false);
  const [getIdProduct, setGetIdProduct] = useState(null);
  const [hideProductList, setHideProductList] = useState(false);
  // ------------
  // const [hideProductList, setHideProductList] = useState(false);

  const [checkedList, setCheckedList] = useState([]);
  const [addresNewId, setAddresNewId] = useState();

  function allCheckedList(addressId, productId, marketId) {
    setState({ ...state, shopId: productId, shopMarketId: marketId })
    setCheckedList([])
    setAddresNewId(addressId)
    dressInfo?.getProductList?.products_locations?.map(item => {
      item?.shop_locations?.map(data => {
        if (Number(data?.id) === Number(addressId)) {
          data?.products?.map(value => {
            setCheckedList(checkedList => [...checkedList, value?.id])
          })
        }
      })
    })
  }

  const allUnCheckedList = () => {
    setAddresNewId()
    setCheckedList([])
  }

  const checkListItem = (itemId, addId, marketId, productId) => {
    setState({ ...state, shopMarketId: marketId })

    if (!addresNewId) {
      // console.log('addressId--1');
      setAddresNewId(addId)
      if (!checkedList.includes(itemId)) {
        setCheckedList(checkedList => [...checkedList, itemId])
      }
      if (checkedList.includes(itemId)) {
        setCheckedList(checkedList?.filter(e => e !== (itemId)))
      }
    }
    if (addresNewId === addId) {
      // console.log('addressId--2');
      if (!checkedList.includes(itemId)) {
        setCheckedList(checkedList => [...checkedList, itemId])
      }
      if (checkedList.includes(itemId)) {
        setCheckedList(checkedList?.filter(e => e !== (itemId)))
      }
    }
    if (addresNewId > 0 && addresNewId !== addId) {
      // console.log('addressId--3');
      setCheckedList([])
      setAddresNewId(addId)
      if (!checkedList.includes(itemId)) {
        setCheckedList(checkedList => [...checkedList, itemId])
      }
      if (checkedList.includes(itemId)) {
        setCheckedList(checkedList?.filter(e => e !== (itemId)))
      }
    }
  }

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
  const { isLoading, refetch } = useQuery(['seller_getProductList_list1'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      // console.log(data, "data");
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

  function addByLocation(itemId, locationId, shopId) {
    setState({ ...state, shopMarketId: shopId })
    setAddresNewId(locationId)
    setGetIdProduct(itemId)
  }

  const onSendPeoductSeveralSelect = () => {
    setState({ ...state, loader: true, hideProductList: true })
    setHideProductList(true)
    let form = new FormData();
    form.append("location_id", state?.getShopLocationId);
    checkedList?.map((e, index) => {
      form.append("product_ids[]", checkedList[index]);
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
        // console.log(res?.problems?.length);
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
        // console.log(res, "Success - ThisIsSeveralSelected");
      })
      .catch((err) => console.log(err, "Error ThisIsSeveralSelected"));
  };
  const onDeleteSeveralSelect = () => {
    setState({ ...state, loader: true, hideProductList: true })
    setHideProductList(true)
    let form = new FormData();
    form.append("location_ids[]", addresNewId);
    checkedList?.map((e, index) => {
      form.append("product_ids[]", checkedList[index]);
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
        // console.log(res, "Success - ThisIsSeveralSelected");
      })
      .catch((err) => console.log(err, "Error ThisIsSeveralSelected"));
  };
  // ----------------------ListItem--------
  const deleteProductById = useMutation(() => {
    return request({ url: `/products/${deleteId}/${0}`, method: "DELETE", token: true });
  });

  function onProductDelete() {
    setLoader(true)
    setHideDeleteIcons(true)
    deleteProductById.mutate({},
      {
        onSuccess: res => {
          if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            refetch()
            setTimeout(() => {
              setDeleteModal(false)
            }, 1000);

          }
        },
        onError: err => {
          console.log(err);
        }
      })
  }
  const deleteProductByAddress = useMutation(() => {
    return request({ url: `/products/${deleteId}/${getIdShopLocation}`, method: "DELETE", token: true });
  });

  function onProductAddressDelete() {
    setLoader(true)
    setHideDeleteIcons(true)
    deleteProductByAddress.mutate({},
      {
        onSuccess: res => {
          if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            refetch()
            setTimeout(() => {
              setDeleteModal(false)
            }, 1000);

          }
        },
        onError: err => {
          console.log(err);
        }
      })
  }

  const postAddProductId = useMutation(() => {
    return request({
      url: `/shops/locations/products/add`,
      method: "POST",
      token: true,
      body: {
        product_id: getIdProduct,
        shop_location_id: getIdShopLocation,
      }
    });
  });

  const sendAddProductById = () => {
    setLoader(true)
    setHideProductList(true)
    postAddProductId?.mutate({}, {
      onSuccess: (res) => {
        if (res?.message && res?.errors) {
          setDeleteMessage(res?.message)
          setLoader(false)

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
      },
      onError: err => {
        console.log(err, "POSTID");
      }
    })
  }
  // products
  const navigate = useNavigate();
  function openMarketEditPage(id) {
    navigate(`/store/market-list/:${id}`);
  };

  function addNewProductId(locationId, shopId) {
    setDressInfo({ ...dressInfo, locationIdAddProduct: locationId })
    navigate(`/products/location/add/:${shopId}`);

  };
  const goProductDetailEdit = (id) => {
    navigate(`/products/location/${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };
  useEffect(() => {
    if (!openStoreList) {
      setDeleteMessage(null)
      setSuccessMessage(null)
    }
  }, [openStoreList])
  useEffect(() => {
    if (!state?.openSelectModal) {
      setState({ ...state, onSuccessMessaage: null, onErrorTitle: null, onErrorMessage: null, })
      setHideProductList(false)
    }
  }, [state?.openSelectModal])

  useEffect(() => {
    if (!deleteModal) {
      setHideDeleteIcons(false)
    }
  }, [deleteModal])

  const [shopIdList, setShopIdList] = useState([])
  useEffect(() => {
    setShopIdList([])
    dressInfo?.getProductList?.products_locations?.map(value1 => {
      value1?.shop_locations?.map(value2 => {
        if (searchName) {
          value2?.products?.filter(e => e?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase()))?.map(value3 => {
            if (searchName) {
              if (!shopIdList?.includes(value3?.shop_id)) {
                setShopIdList(shopIdList => [...shopIdList, Number(value3?.shop_id)])
              }
            }
          })
        } else if (!searchName) {
          setShopIdList(shopIdList => [...shopIdList, Number(value1?.id)])
        }
      })
    })


  }, [dressInfo?.getProductList?.products_locations, searchName])
  console.log(shopIdList, "shopIdList");

  // console.log(!state?.onErrorMessage, !state?.onSuccessMessaage, !state?.onErrorTitle, "!state?.onErrorMessage , !state?.onSuccessMessaage ,!state?.onErrorTitle ");
  // Общее количество:
  return (
    <div className="w-full px-4 md:px-10">
      <section
        onClick={() => {
          setDeleteModal(false)
          setOpenStoreList(false)
          setDeleteMessage(null)
          setSuccessMessage(null)
          setHideProductList(false)
          setState({
            ...state,
            onSuccessMessaage: null,
            onErrorTitle: null,
            onErrorMessage: null,
            openSelectModal: false,
            hideProductList: false,
            openDeleteModal: false
          })
          // setHideProductList(false)
        }}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal || openStoreList || state?.openSelectModal || state?.openDeleteModal ? "" : "hidden"}`}
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
                    {checkedList?.length > 0 ?
                      Number(state?.shopMarketId) === Number(item?.id) &&
                      <div className="w-full cursor-pointer mt-2">
                        {item?.shop_locations?.length >= 1 && <div className="w-full py-[10px] flex items-center flex-col justify-center rounded-[5px]">
                          <span className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                            {" "}
                            {item?.name}
                          </span>
                          {item?.shop_locations?.map((data, index) => {
                            return (
                              <div key={index}>
                                {data?.id !== addresNewId && <div
                                  onClick={() => setState({ ...state, getShopLocationId: data?.id })}
                                  className={`w-full my-1 flex items-center p-[2px] rounded-[4px]  justify-center gap-x-1  ${state?.getShopLocationId == data?.id ? "bg-LocationSelectBg bg-LocationSelectBg" : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"}  `}>
                                  <span className="text-[17px] mr-1">{index + 1}</span>)
                                  <span className="text-black text-[17px] not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                    {data?.address}
                                  </span>
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
      {/* ---------------------------------------- */}
      {/* Delete Product Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => setDeleteModal(false)}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a1a1a1"} />
        </button>
        {hideDeleteIcons ?
          <div className="w-full flex items-center justify-center">
            {loader && hideDeleteIcons ?
              <PuffLoader
                // className={styles.loader1}
                color={"#007DCA"}
                size={80}
                loading={true}
              />
              :
              <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2"><FaCheck size={30} color="#009B17" /></span>
                <span className="text-base not-italic font-AeonikProMedium">{SuccessMessage}</span>
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
            onClick={() => onProductDelete()}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            Удалить везде</button>
          <button
            onClick={() => onProductAddressDelete()}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            Удалить из адреса</button>
        </div>

      </section>
      {/* Add the selected products to the new one */}
      <section
        className={` max-w-[440px] md:max-w-[750px] mx-auto w-full flex-col  h-fit  bg-white mx-auto fixed px-2 py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[114] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openStoreList ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => {
            setOpenStoreList(false)
            setDeleteMessage(null)
            setSuccessMessage(null)
          }}
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
                    </span> :
                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                      <FaCheck size={30} color="#009B17" />
                    </span>}
                  <span className="text-2xl not-italic font-AeonikProMedium">{deleteMessage ? deleteMessage : SuccessMessage}</span>
                </div>
              }
            </div> :
            <div className="w-full h-full overflow-y-auto VerticelScroll">
              {dressInfo?.getProductList?.products_locations?.map((item, index) => {
                return (
                  <div key={index} className="w-full cursor-pointer mt-2">
                    {item?.shop_locations?.length >= 1 &&
                      Number(state?.shopMarketId) === Number(item?.id) && <div className="w-full py-[10px] flex items-center flex-col justify-center rounded-[5px]">
                        <span className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                          {" "}
                          {item?.name}
                        </span>
                        {item?.shop_locations?.map((data, index) => {
                          return (
                            <div key={index} onClick={() => setGetIdShopLocation(data?.id)} className={`w-full my-1 flex items-center p-[2px] rounded-[4px]  justify-center gap-x-1  ${getIdShopLocation == data?.id ? "bg-LocationSelectBg bg-LocationSelectBg" : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"}  `}>
                              {data?.id !== addresNewId && <div className="flex items-center gap-x-1 ">
                                <span className="text-[17px]">{index + 1}</span>)
                                <span className="text-black text-[17px] not-italic leading-4 flex items-center font-AeonikProMedium mr-[20px]">
                                  {data?.address}
                                </span>
                              </div>}
                            </div>
                          )
                        })}
                      </div>}
                  </div>
                )
              })}
            </div>}
        </div>
        {!deleteMessage && !SuccessMessage &&
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

          </div>}
      </section>

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
      {isLoading ?
        <LoadingForSeller />
        :
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
                className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg ${checkedList?.length >= 1
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
                className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg  ${checkedList?.length >= 1
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
          <div className="w-full my-4">
          </div>
          {/* filter(e =>e?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())) */}

          {dressInfo?.getProductList?.products_locations?.filter(e => shopIdList?.includes(e?.id))?.map((item, index) => {
            // console.log(item, "item");
            return (
              <div key={index}>
                <div >
                  {checkedList?.length > 0 ?
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
                        {item?.shop_locations?.filter((location) =>
                          searchName ?
                            location?.products?.some(item =>
                              item?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())
                            ) : location)?.map((resData, index) => {
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
                                      <section className="hidden md:flex items-center justify-between">
                                        <div className="w-fit flex items-center">
                                          <div className=" cursor-pointer bg-white flex items-center gap-x-2">
                                            {
                                              checkedList?.length === resData?.products?.length && addresNewId === resData?.id ?
                                                <button onClick={() => allUnCheckedList()}
                                                  className="w-[25px] h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622] bg-fullBlue  justify-center">
                                                  <FiCheck color={'#ffffff'} />
                                                </button>
                                                :
                                                <button onClick={() => {
                                                  setCheckedList([])
                                                  allCheckedList(resData?.id, item?.id, resData?.shop_id)
                                                }}
                                                  className="w-[25px] h-[25px]  idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center">
                                                </button>
                                            }
                                            <p className="text-black text-base not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                              {dressInfo?.regionList?.regions?.filter(e => e?.id == resData?.region_id)?.map((values, index) => {
                                                return (
                                                  <div>
                                                    {values?.name_uz},
                                                    {values?.sub_regions?.filter(e => e?.id == resData?.sub_region_id)?.map(valueSub => {
                                                      return (
                                                        <span className="px-1">
                                                          {valueSub?.name_uz},
                                                        </span>
                                                      )
                                                    })}
                                                  </div>
                                                )
                                              })}
                                              {resData?.address}
                                              {resData?.products?.length > 1 &&
                                                <span className="text-black text-base not-italic font-AeonikProMedium ml-1">
                                                  ({resData?.products?.length})
                                                </span>}
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
                                        </div>

                                      </section>
                                      {resData?.products?.length !== 0 &&
                                        < div className="w-full hidden md:flex flex-col">
                                          <div className="w-full  my-3 hidden md:flex flex-col items-center text-tableTextTitle">
                                            <div className="w-full  h-[70px] flex items-center">
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
                                            </div>
                                          </div>
                                        </div>}

                                      {resData?.products?.length > 0 ?
                                        resData?.products?.filter(e =>
                                          e?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())
                                        )?.map((itemValue, index) => {
                                          return (
                                            <div key={index} className="w-full " >
                                              <div className="w-full   hidden md:flex flex-col items-center text-tableTextTitle">
                                                <div className="w-full flex flex-col  items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                                                  <div className="flex flex-col w-full">
                                                    <table className="w-full flex h-[120px]  items-center">
                                                      <tbody className="w-full h-full flex items-center">
                                                        <tr>
                                                          <td onClick={() => checkListItem(itemValue?.id, resData?.id, resData?.shop_id,)}>
                                                            {
                                                              checkedList?.includes(itemValue?.id) && addresNewId === Number(resData?.id) ?
                                                                <button
                                                                  className="w-[25px] h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-lightBorderColor bg-fullBlue  justify-center">
                                                                  <FiCheck color={'#ffffff'} />
                                                                </button>
                                                                :
                                                                <button
                                                                  className="w-[25px] h-[25px]  idCheck flex items-center rounded-[6px] overflow-hidden border border-lightBorderColor   justify-center">
                                                                </button>
                                                            }
                                                          </td>
                                                        </tr>
                                                        <tr className="w-full h-full py-2 ml-2  flex items-center justify-between rounded-[8px] border  border-lightBorderColor">
                                                          <td className="w-[5%] h-full  flex items-center justify-center " >{index + 1}</td>
                                                          <td className="w-[14%] h-full  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                                                            <img src={itemValue?.photos[0]?.url_photo || "nodate"} alt={"noImg"} className="w-full h-full object-contain" />
                                                          </td>
                                                          <td className="w-[15%] h-full  flex items-center  justify-center">
                                                            <p className="w-full  break-words text-center text-weatherWinterColor flex items-center justify-center  text-base not-italic font-AeonikProMedium">
                                                              {itemValue?.name_ru || "namrRu"}
                                                            </p>
                                                          </td>
                                                          <td className="w-[15%] h-full  flex items-center justify-center ">
                                                            {itemValue?.sku || "sku"}
                                                          </td>
                                                          {dressInfo?.getProductInfo?.types && dressInfo?.getProductInfo?.types?.filter(e => e?.id == itemValue?.type_id)?.map((valueType, index) => {
                                                            return (
                                                              <td key={index} className="w-[8%] h-full  flex items-center justify-center ">
                                                                {valueType?.name_ru || "type_id"}
                                                              </td>
                                                            )
                                                          })}
                                                          <td className="w-[8%] h-full  flex items-center justify-center ">{itemValue?.created_at || "created_at"}</td>

                                                          {itemValue?.status === "approved" && <td className="w-[7%] h-fit  flex items-center justify-center  text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px]  rounded-full ">
                                                            {itemValue?.status || "status"}
                                                          </td>}
                                                          {itemValue?.status === "declined" && <td className="w-[7%] h-fit  flex items-center justify-center  text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px]  rounded-full ">
                                                            {itemValue?.status || "status"}
                                                          </td>}
                                                          {itemValue?.status === "pending" && <td className="w-[7%] h-fit  flex items-center justify-center  text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px]  rounded-full ">
                                                            {itemValue?.status || "status"}
                                                          </td>}
                                                          <td className="w-[10%] h-full  flex items-center justify-center ">
                                                            {itemValue?.cost?.discount_price > 999 ?
                                                              Number(itemValue?.cost?.discount_price)?.toLocaleString()?.split(",").join(" ") :
                                                              itemValue?.cost?.discount_price
                                                                ||
                                                                itemValue?.cost?.price > 999 ?
                                                                Number(itemValue?.cost?.price)?.toLocaleString()?.split(",").join(" ")
                                                                : itemValue?.cost?.price
                                                            }
                                                            <span className="ml-[6px] text-[14px]">Сум</span>
                                                          </td>
                                                          <td className="w-[10%] h-full  flex items-center justify-center ">

                                                            <button
                                                              onClick={() => goProductDetailEdit(itemValue?.id)}
                                                              className="text-[18px] text-weatherWinterColor w-full text-center"
                                                            >
                                                              Подробнее
                                                            </button>
                                                          </td>
                                                          <td className="w-[9%] h-full  flex items-center justify-center ">
                                                            <button
                                                              onClick={() => {
                                                                addByLocation(itemValue?.id, resData?.id, resData?.shop_id)

                                                              }
                                                              }
                                                              type="button" className="w-full flex justify-center cursor-auto">
                                                              <span
                                                                onClick={() => setOpenStoreList(true)}
                                                                className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#F4A622] transition-colors duration-[0.2s] ease-linear"
                                                              >
                                                                <AddLocationIcon width={30} />
                                                              </span>
                                                            </button>
                                                          </td>
                                                          <td className="w-[9%] h-full  flex items-center justify-center ">
                                                            <button type="button"
                                                              onClick={() => {
                                                                setDeleteModal(true)
                                                                setDeleteId(itemValue?.id)
                                                                setGetIdShopLocation(resData?.id)
                                                              }}
                                                              className="w-fit flex justify-center cursor-auto">
                                                              <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                                                                <DeleteIcon width={30} />
                                                              </span>
                                                            </button>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    {/* For Mobile Device */}
                                                    <div key={itemValue?.id} className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full">
                                                      <div className="mb-2">
                                                        <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                                                          <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                                          <span className="text-checkboxBorder">{index + 1}</span>
                                                          <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                                        </div>
                                                      </div>

                                                      <div className="mb-3 h-[148px]">
                                                        <figure className="w-full h-full rounded-lg overflow-hidden">
                                                          {/* <img className="w-[100%] h-[100%]" src={itemValue?.photos[0]?.url_photo} alt="" /> */}
                                                        </figure>
                                                      </div>

                                                      <div className="mb-6">
                                                        <div className="w-full flex items-center  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] gap-x-[10px] mb-[8px]">
                                                          <div className="w-[40%] flex items-center">Имя товара</div>
                                                          <div className="w-[30%] flex items-center">Статус</div>
                                                          <div className="w-[30%] flex items-center">Цена товара</div>
                                                        </div>

                                                        <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">
                                                          <div className="w-[40%]"> {itemValue?.name_product}</div>
                                                          <div className=" w-[30%] flex items-center justify-center text-white bg-green-500 rounded-lg px-[5px] py-[2px]">{itemValue?.status}</div>
                                                          <div className="w-[30%]"> {itemValue?.money} сум </div>
                                                        </div>
                                                      </div>

                                                      <div className="flex items-center justify-between">
                                                        <button
                                                          onClick={() => goMapWear(itemValue?.city)}
                                                          className="text-[#ED7925] bg-[#FDF1E8] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                                        >
                                                          Добавить в локацию
                                                        </button>
                                                        <button
                                                          onClick={() => goMapCity(itemValue?.city)}
                                                          className="text-[#007DCA] bg-[#E8F5FD] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                                        >
                                                          Подробнее
                                                        </button>
                                                      </div>

                                                      <div className="w-full flex items-center justify-between mt-[18px]">
                                                        <div

                                                          className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${itemValue?.isCheck
                                                            ? "bg-[#007DCA] border-[#007DCA]"
                                                            : "bg-white border-checkboxBorder"
                                                            } flex items-center justify-center rounded mr-[8px]`}
                                                        >
                                                          <div
                                                            className={`${itemValue?.isCheck ? "flex items-center justify-center" : "hidden"
                                                              }`}
                                                          >
                                                            {/* <CheckIcons /> */}
                                                          </div>
                                                        </div>
                                                        <button to="#" className="text-textBlueColor text-[13px] font-AeonikProMedium">
                                                          Больше...
                                                        </button>
                                                        <button className="text-red-600 text-[11px] font-AeonikProMedium">Удалить</button>
                                                      </div>
                                                    </div>
                                                  </div>

                                                </div>
                                              </div>

                                            </div>
                                          )
                                        })

                                        :
                                        <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-5">
                                          <span className="text-[#D2D2D2] font-AeonikProRegular text-xl">Tовара нет</span>
                                        </div>}
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                        }
                      </div>
                      }
                    </div>
                    :
                    <div className="flex items-center w-full ">
                      {item?.shop_locations?.length !== 0 &&
                        < div className="w-full  my-6">
                          <button
                            type="button"
                            onClick={() => openMarketEditPage(item?.id)}
                            className="w-fit mx-auto   flex items-center justify-center mb-6 cursor-pointer">
                            <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                              {item?.name}                    </p>
                          </button>
                          {item?.shop_locations?.filter((location) =>
                            searchName ? location?.products?.some(item =>
                              item?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())
                            ) : location
                          )?.map((resData, index) => {
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
                                    <section className="hidden md:flex items-center justify-between">
                                      <div className="w-fit flex items-center">
                                        <div className=" cursor-pointer bg-white flex items-center gap-x-2">
                                          {
                                            checkedList?.length === resData?.products?.length && addresNewId === resData?.id ?
                                              <button onClick={() => allUnCheckedList()}
                                                className="w-[25px] h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622] bg-fullBlue  justify-center">
                                                <FiCheck color={'#ffffff'} />
                                              </button>
                                              :
                                              <button onClick={() => {
                                                setCheckedList([])
                                                allCheckedList(resData?.id, item?.id, resData?.shop_id)
                                              }}
                                                className="w-[25px] h-[25px]  idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center">
                                              </button>
                                          }
                                          <p className="text-black text-base not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                            {dressInfo?.regionList?.regions?.filter(e => e?.id == resData?.region_id)?.map((values, index) => {
                                              return (
                                                <div>
                                                  {values?.name_uz},
                                                  {values?.sub_regions?.filter(e => e?.id == resData?.sub_region_id)?.map(valueSub => {
                                                    return (
                                                      <span className="px-1">
                                                        {valueSub?.name_uz},
                                                      </span>
                                                    )
                                                  })}
                                                </div>
                                              )
                                            })}
                                            {resData?.address}
                                            {resData?.products?.length > 1 &&
                                              <span className="text-black text-base not-italic font-AeonikProMedium ml-1">({resData?.products?.length})</span>}
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
                                      </div>

                                    </section>
                                    {resData?.products?.length !== 0 &&
                                      < div className="w-full hidden md:flex flex-col">
                                        <div className="w-full  my-3 hidden md:flex flex-col items-center text-tableTextTitle">
                                          <div className="w-full  h-[70px] flex items-center">
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
                                          </div>
                                        </div>
                                      </div>}

                                    {resData?.products?.length > 0 ?
                                      resData?.products?.filter(e =>
                                        e?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())
                                      )?.map((itemValue, index) => {

                                        return (
                                          <div key={index} className="w-full "
                                          >

                                            <div className="w-full   hidden md:flex flex-col items-center text-tableTextTitle">
                                              <div className="w-full flex flex-col  items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                                                <div className="flex flex-col w-full">
                                                  <table className="w-full flex h-[120px]  items-center">
                                                    <tbody className="w-full h-full flex items-center">
                                                      <tr>
                                                        <td onClick={() => checkListItem(itemValue?.id, resData?.id, resData?.shop_id)}>
                                                          {
                                                            checkedList?.includes(itemValue?.id) && addresNewId === Number(resData?.id) ?
                                                              <button
                                                                className="w-[25px] h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-lightBorderColor bg-fullBlue  justify-center">
                                                                <FiCheck color={'#ffffff'} />
                                                              </button>
                                                              :
                                                              <button
                                                                className="w-[25px] h-[25px]  idCheck flex items-center rounded-[6px] overflow-hidden border border-lightBorderColor   justify-center">
                                                              </button>
                                                          }
                                                        </td>
                                                      </tr>
                                                      <tr className="w-full h-full py-2 ml-2  flex items-center justify-between rounded-[8px] border  border-lightBorderColor">
                                                        <td className="w-[5%] h-full  flex items-center justify-center " >{index + 1}</td>
                                                        <td className="w-[14%] h-full  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                                                          <img src={itemValue?.photos[0]?.url_photo || "nodate"} alt={"noImg"} className="w-full h-full object-contain" />
                                                        </td>
                                                        <td className="w-[15%] h-full  flex items-center  justify-center">
                                                          <p className="w-full  break-words text-center text-weatherWinterColor flex items-center justify-center  text-base not-italic font-AeonikProMedium">
                                                            {itemValue?.name_ru || "namrRu"}
                                                          </p>
                                                        </td>
                                                        <td className="w-[15%] h-full  flex items-center justify-center ">
                                                          {itemValue?.sku || "sku"}
                                                        </td>
                                                        {dressInfo?.getProductInfo?.types && dressInfo?.getProductInfo?.types?.filter(e => e?.id == itemValue?.type_id)?.map((valueType, index) => {
                                                          return (
                                                            <td key={index} className="w-[8%] h-full  flex items-center justify-center ">
                                                              {valueType?.name_ru || "type_id"}
                                                            </td>
                                                          )
                                                        })}
                                                        <td className="w-[8%] h-full  flex items-center justify-center ">{itemValue?.created_at || "created_at"}</td>

                                                        {itemValue?.status === "approved" && <td className="w-[7%] h-fit  flex items-center justify-center  text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px]  rounded-full ">
                                                          {itemValue?.status || "status"}
                                                        </td>}
                                                        {itemValue?.status === "declined" && <td className="w-[7%] h-fit  flex items-center justify-center  text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px]  rounded-full ">
                                                          {itemValue?.status || "status"}
                                                        </td>}
                                                        {itemValue?.status === "pending" && <td className="w-[7%] h-fit  flex items-center justify-center  text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px]  rounded-full ">
                                                          {itemValue?.status || "status"}
                                                        </td>}
                                                        <td className="w-[10%] h-full  flex items-center justify-center ">
                                                          {itemValue?.cost?.discount_price > 999 ?
                                                            Number(itemValue?.cost?.discount_price)?.toLocaleString()?.split(",").join(" ") :
                                                            itemValue?.cost?.discount_price
                                                              ||
                                                              itemValue?.cost?.price > 999 ?
                                                              Number(itemValue?.cost?.price)?.toLocaleString()?.split(",").join(" ")
                                                              : itemValue?.cost?.price
                                                          }
                                                          <span className="ml-[6px] text-[14px]">Сум</span>
                                                        </td>
                                                        <td className="w-[10%] h-full  flex items-center justify-center ">

                                                          <button
                                                            onClick={() => goProductDetailEdit(itemValue?.id)}
                                                            className="text-[18px] text-weatherWinterColor w-full text-center"
                                                          >
                                                            Подробнее
                                                          </button>
                                                        </td>
                                                        <td className="w-[9%] h-full  flex items-center justify-center ">
                                                          <button
                                                            onClick={() => addByLocation(itemValue?.id, resData?.id, resData?.shop_id)}
                                                            type="button" className="w-full flex justify-center cursor-auto">
                                                            <span
                                                              onClick={() => setOpenStoreList(true)}
                                                              className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#F4A622] transition-colors duration-[0.2s] ease-linear"
                                                            >
                                                              <AddLocationIcon width={30} />
                                                            </span>
                                                          </button>
                                                        </td>
                                                        <td className="w-[9%] h-full  flex items-center justify-center ">
                                                          <button type="button"
                                                            onClick={() => {
                                                              setDeleteModal(true)
                                                              setDeleteId(itemValue?.id)
                                                              setGetIdShopLocation(resData?.id)
                                                            }}
                                                            className="w-fit flex justify-center cursor-auto">
                                                            <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                                                              <DeleteIcon width={30} />
                                                            </span>
                                                          </button>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  {/* For Mobile Device */}
                                                  <div key={itemValue?.id} className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full">
                                                    <div className="mb-2">
                                                      <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                                                        <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                                        <span className="text-checkboxBorder">{index + 1}</span>
                                                        <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                                      </div>
                                                    </div>

                                                    <div className="mb-3 h-[148px]">
                                                      <figure className="w-full h-full rounded-lg overflow-hidden">
                                                        {/* <img className="w-[100%] h-[100%]" src={itemValue?.photos[0]?.url_photo} alt="" /> */}
                                                      </figure>
                                                    </div>

                                                    <div className="mb-6">
                                                      <div className="w-full flex items-center  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] gap-x-[10px] mb-[8px]">
                                                        <div className="w-[40%] flex items-center">Имя товара</div>
                                                        <div className="w-[30%] flex items-center">Статус</div>
                                                        <div className="w-[30%] flex items-center">Цена товара</div>
                                                      </div>

                                                      <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">
                                                        <div className="w-[40%]"> {itemValue?.name_product}</div>
                                                        <div className=" w-[30%] flex items-center justify-center text-white bg-green-500 rounded-lg px-[5px] py-[2px]">{itemValue?.status}</div>
                                                        <div className="w-[30%]"> {itemValue?.money} сум </div>
                                                      </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                      <button
                                                        onClick={() => goMapWear(itemValue?.city)}
                                                        className="text-[#ED7925] bg-[#FDF1E8] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                                      >
                                                        Добавить в локацию
                                                      </button>
                                                      <button
                                                        onClick={() => goMapCity(itemValue?.city)}
                                                        className="text-[#007DCA] bg-[#E8F5FD] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                                      >
                                                        Подробнее
                                                      </button>
                                                    </div>

                                                    <div className="w-full flex items-center justify-between mt-[18px]">
                                                      <div

                                                        className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${itemValue?.isCheck
                                                          ? "bg-[#007DCA] border-[#007DCA]"
                                                          : "bg-white border-checkboxBorder"
                                                          } flex items-center justify-center rounded mr-[8px]`}
                                                      >
                                                        <div
                                                          className={`${itemValue?.isCheck ? "flex items-center justify-center" : "hidden"
                                                            }`}
                                                        >
                                                          {/* <CheckIcons /> */}
                                                        </div>
                                                      </div>
                                                      <button to="#" className="text-textBlueColor text-[13px] font-AeonikProMedium">
                                                        Больше...
                                                      </button>
                                                      <button className="text-red-600 text-[11px] font-AeonikProMedium">Удалить</button>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>
                                            </div>

                                          </div>
                                        )
                                      })

                                      :
                                      <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-5">
                                        <span className="text-[#D2D2D2] font-AeonikProRegular text-xl">Tовара нет</span>
                                      </div>}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      }
                    </div>}
                </div>

              </div>
            )
          })
          }
        </div>}
    </div >
  );
}
