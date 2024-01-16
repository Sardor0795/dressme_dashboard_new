import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import { FaCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";

// import StoreListModal from "./StoreListModal";
import {
  AddIconsCircle,
  AddLocationIcon,
  BgNoImgIcon,
  CheckIcons,
  CheckTrue,
  DeleteIcon,
  MenuCloseIcons,
} from "../../../../assets/icons";
import { Checkbox, List } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../../hook/useHttp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingForSeller from "../../../Loading/LoadingFor";
const url = "https://api.dressme.uz/api/seller";

function LocationItem({ allProductLocationList, data, handleGetCheckAll, AllSelectCheckedAction, onRefetch }) {
  const { request } = useHttp()
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

  // console.log(data, "data--LocationItem");
  const [getProductCategory, setGetProductCategory] = useState(null);
  useQuery(["getProductOfCategory"], () => { return request({ url: "/products/get-product-info", token: true }) },
    {
      onSuccess: (res) => {
        setGetProductCategory(res?.types)
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  // const storeToggle = React.useCallback(() => setOpenStoreList(false), []);
  // console.log(AllSelectCheckedAction, "AllSelectCheckedAction");
  const navigate = useNavigate();
  // const goProductDetailEdit = (id) => {
  //   // navigate(`/locations-store/edit-detail/:${id}`);
  // };
  const goProductDetailEdit = (id) => {
    navigate(`/products/location/:${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };
  function addNewProductId(locationId, shopId) {
    navigate(`/products/location/add/:${`${locationId}` + `${shopId}`}`);
  };
  // const [locationId, setLocationId] = useState();
  const [shopId, setShopId] = useState();
  const [checked, setChecked] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  // data?.map(item => {
  //   console.log(item, "BU_data_item");
  // })
  // console.log(data, "BU_data_item");
  // console.log(locationId?.some(e => e == data?.id), "some")
  // setLocationId(locationId => [...locationId, data?.id]);
  // if (true) {
  //   // console.log(locationId && locationId?.indexof(3), "locationId.indexof(data?.id)")
  //   console.log(data?.id, "buFilterId");
  //   // setBooks(books => [....books, ...x]);
  // }
  useEffect(() => {
    data?.products?.map(item => {
      if (checked?.length >= 1) {
        if (checked.includes(item?.id)) {
          // setLocationId(data?.id);
          handleGetCheckAll(checked, data?.id)
          // console.log("log-1");

        } else {
          // console.log("log-2");
          // setLocationId(-data?.id);
        }
      } else {
        handleGetCheckAll(checked, -data?.id)
        // setLocationId()
      }
    })

  }, [checked])
  // console.log(locationId, "locationIdChikldz");
  useEffect(() => {
    if (AllSelectCheckedAction) {

      setChecked(AllSelectCheckedAction ? data?.products?.map((item) => item.id) : []);
      setCheckAll(AllSelectCheckedAction);
    } else {
      setChecked(AllSelectCheckedAction ? data?.products?.map((item) => item.id) : []);
      setCheckAll(AllSelectCheckedAction);
    }
  }, [AllSelectCheckedAction]);

  useEffect(() => {
    if (data?.products?.length) {
      setIndeterminate(checked.length && checked.length !== data?.products?.length);
      setCheckAll(checked.length === data?.products?.length);
      // handleGetCheckAll(checked, locationId)
    }
  }, [checked]);

  const onCheckAllChange = (e) => {
    setChecked(e.target.checked ? data?.products?.map((item) => item.id) : []);
    setCheckAll(e.target.checked);
  };
  // console.log(checked, "checked");



  // // ------------GET  Has Magazin ?-----------shops/locations/:id------
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
            onRefetch()
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
            onRefetch()
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
          onRefetch()
          setTimeout(() => {
            setOpenStoreList(false)
            setHideProductList(false)

          }, 1000);
          console.log(res, "getIdShopLocation -----POST");
        }
      },
      onError: err => {
        console.log(err, "POSTID");
      }
    })
  }

  // ---------Callback----
  useEffect(() => {
    if (deleteModal || openStoreList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [deleteModal, openStoreList]);
  useEffect(() => {
    setHideDeleteIcons(false)
    setHideProductList(false)
  }, [deleteModal, openStoreList]);

  // console.log(ProductToggleState, "ProductToggleState");
  // console.log(checked?.length, "checkedlength");
  // console.log(getIdProduct, "getIdProduct");
  // console.log(getIdShopLocation, "getIdShopLocation");
  // console.log("------------------------------");
  // const num = 1000000
  return (
    <div className="w-full">
      {/* <button onClick={ProductToggleOnclick}>ProductToggleOnclick {ProductToggleState}</button> */}
      <ToastContainer
        style={{ zIndex: "1000", top: "80px" }}
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"

      />
      <div className="w-full">
        <section
          onClick={() => {
            setDeleteModal(false)
            setOpenStoreList(false)
            setDeleteMessage(null)
            setSuccessMessage(null)
            setHideProductList(false)

          }}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal || openStoreList ? "" : "hidden"}`}
        ></section>
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
                {allProductLocationList?.map(item => {
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

        <section className="hidden md:flex items-center justify-between">
          <div className="w-fit flex items-center">
            <div className=" cursor-pointer bg-white flex items-center gap-x-2">
              <Checkbox
                defaultChecked={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                style={{ width: "26px", height: "26px" }}
                onClick={() => setShopId(data?.id)}
                className={`idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center !min-w-[24px] !min-h-[24px] `}>
              </Checkbox>
              <p className="text-black text-base not-italic flex items-center font-AeonikProMedium mr-[20px]">{data?.address}
                {data?.products?.length > 1 &&
                  <span className="text-black text-base not-italic font-AeonikProMedium ml-1">({data?.products?.length})</span>}
              </p>
            </div>
            <button
              onClick={() => addNewProductId(data?.id, data?.shop_id)}
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
        {data?.products?.length !== 0 &&
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

        {data?.products?.length !== 0 ?
          <Checkbox.Group
            style={{ width: "100%" }}
            // checked={AllSelectCheckedAction || checked}
            value={checked}
            onChange={(checkedValues) => {
              setChecked(checkedValues);
            }} >
            <List
              itemLayout="horizontal"
              dataSource={data?.products}
              className="w-full">
              {data?.products?.map((itemValue, index) => {

                return (
                  <List.Item className="w-full "
                  >

                    <div className="w-full   hidden md:flex flex-col items-center text-tableTextTitle">
                      <div className="w-full flex flex-col  items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                        <div className="flex flex-col w-full">
                          <div className="w-full flex h-[120px]  items-center">
                            <Checkbox value={itemValue?.id} checked={AllSelectCheckedAction || checked}
                              onClick={() => setShopId(data?.id)} />
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
                              {getProductCategory && getProductCategory?.filter(e => e?.id == itemValue?.type_id)?.map(valueType => {
                                return (
                                  <td className="w-[8%] h-full  flex items-center justify-center ">
                                    {valueType?.name_ru || "type_id"}
                                  </td>
                                )
                              })}
                              <td className="w-[8%] h-full  flex items-center justify-center ">{itemValue?.created_at || "created_at"}</td>

                              {itemValue?.status === "approved" && <td className="w-[10%] h-fit  flex items-center justify-center  text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px] px-[10px] rounded-full ">
                                {itemValue?.status || "status"}
                              </td>}
                              {itemValue?.status === "declined" && <td className="w-[10%] h-fit  flex items-center justify-center  text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px] px-[10px] rounded-full ">
                                {itemValue?.status || "status"}
                              </td>}
                              {itemValue?.status === "pending" && <td className="w-[10%] h-fit  flex items-center justify-center  text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px] px-[10px] rounded-full ">
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
                                {/* <button
                                  onClick={() => goProductDetailEdit(itemValue?.id)}
                                  className="text-[18px] text-weatherWinterColor w-full text-center"
                                >
                                  Подробнее
                                </button> */}
                                <button
                                  onClick={() => goProductDetailEdit(itemValue?.id)}
                                  className="text-[18px] text-weatherWinterColor w-full text-center"
                                >
                                  Подробнее
                                </button>
                              </td>
                              <td className="w-[9%] h-full  flex items-center justify-center ">
                                <button
                                  onClick={() => setGetIdProduct(itemValue?.id)}
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
                                    setGetIdShopLocation(data?.id)
                                  }}
                                  className="w-fit flex justify-center cursor-auto">
                                  <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                                    <DeleteIcon width={30} />
                                  </span>
                                </button>
                              </td>
                            </tr>
                          </div>
                          {/* For Mobile Device */}
                          <div key={itemValue?.id} className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full">
                            <div className="mb-2">
                              <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                                <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                <span className="text-checkboxBorder">0{itemValue?.id}</span>
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
                                // onClick={() => {
                                //   click(itemValue?.id);
                                // }}
                                className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${itemValue?.isCheck
                                  ? "bg-[#007DCA] border-[#007DCA]"
                                  : "bg-white border-checkboxBorder"
                                  } flex items-center justify-center rounded mr-[8px]`}
                              >
                                <div
                                  className={`${itemValue?.isCheck ? "flex items-center justify-center" : "hidden"
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

                      </div>
                    </div>

                  </List.Item>
                )
              })}
            </List>
          </Checkbox.Group>
          : <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-5">
            <span className="text-[#D2D2D2] font-AeonikProRegular text-xl">Tовара нет</span>
          </div>}
      </div>
      {/* )
      })} */}
    </div >
  );
}
export default React.memo(LocationItem)
