import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import { FaCheck } from "react-icons/fa6";
import {

  CheckIcons,
  DeleteIcon,
  MenuCloseIcons,
} from "../../../../../assets/icons";
import { Checkbox, List } from "antd";
import { useMutation, } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHttp } from "../../../../../hook/useHttp";
import axios from "axios";
import { dressMainData } from "../../../../../hook/ContextTeam";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../language/LanguageItem";
const url = "https://api.dressme.uz/api/seller";
const { REACT_APP_BASE_URL } = process.env;

function LocationItem({ data, onRefetch, allCheckedList, searchName }) {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

    const { t } = useTranslation("locations");
    const [languageDetector] = useContext(LanguageDetectorDress);

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
  const [hideProductList, setHideProductList] = useState(false);

  // ------------
  const [statusModal, setStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  // ------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/products/get-product-info`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
          }
        });
        if (data?.status >= 200 && data?.status < 300) {
          setDressInfo({ ...dressInfo, getProductInfo: data?.data })
        }

      } catch (error) {

      }
    };
    if (!dressInfo?.getProductInfo) {
      fetchData();
    }
  }, []);

  const navigate = useNavigate();
  const goProductDetailEdit = (id, locationId) => {
    setDressInfo({ ...dressInfo, locationIdAddProduct: locationId })
    navigate(`/products/location/${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };

  const [checked, setChecked] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  useEffect(() => {
    data?.products?.map(item => {
      if (checked?.length >= 1) {
        if (checked.includes(item?.id)) {
          allCheckedList(checked, data?.id)
        }
      }
      if (checked?.length < 1) {
        allCheckedList(checked, null)
      }
    })
  }, [checked])

  useEffect(() => {
    if (data?.products?.length) {
      setIndeterminate(checked.length && checked.length !== data?.products?.length);
      setCheckAll(checked.length === data?.products?.length);
      // allCheckedList(checked)
    }
  }, [checked]);

  const onCheckAllChange = (e) => {
    setChecked(e.target.checked ? data?.products?.map((item) => item.id) : []);
    setCheckAll(e.target.checked);
  };
  // // ------------GET  Has Magazin ?-----------shops/locations/:id------
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
          throw new Error(err || "something wrong");
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

  function onHandleStatus(productId) {
    setStatusModal(true)
    data?.products?.map(item => {
      if (item?.id == productId) {
        setStatusMessage(item?.status_reason)
      }
    })

  }
  return (
    <div className="w-full">
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
            setDeleteModal(false);
            setOpenStoreList(false);
            setDeleteMessage(null);
            setSuccessMessage(null);
            setHideProductList(false);
            setStatusModal(false);
          }}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal || openStoreList || statusModal ? "" : "hidden"}`}
        ></section>
        {/* ---------------------------------------- */}
        {/*status Modal */}
        <section
          className={` max-w-[440px] md:max-w-[750px] w-full flex-col  h-fit  bg-white mx-auto fixed py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[201] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
            statusModal
              ? " bottom-0 md:flex"
              : "md:hidden bottom-[-800px] z-[-10]"
          }`}
        >
          <button
            onClick={() => setStatusModal(false)}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 "
          >
            <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
          </button>
          <div className="w-full h-fit flex items-center justify-center mb-2">
            <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
              {t("cause")}
            </p>
          </div>
          {statusMessage ? (
            <div className="w-full p-4 border border-borderColor rounded-lg flex flex-col gap-y-[10px] h-[300px]  overflow-hidden">
              {statusMessage}
            </div>
          ) : (
            <div className="w-full flex text-[#b5b5b5] items-center justify-center border border-borderColor rounded-lg  h-[300px]  overflow-hidden  ">
              {t("no_reason")}
            </div>
          )}
        </section>
        {/* Delete Product Of Pop Confirm */}
        <section
          className={` max-w-[440px] md:max-w-[550px] w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
            deleteModal
              ? " bottom-0 md:flex"
              : "md:hidden bottom-[-800px] z-[-10]"
          }`}
        >
          <button
            onClick={() => setDeleteModal(false)}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 "
          >
            <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
          </button>
          {hideDeleteIcons ? (
            <div className="w-full flex items-center justify-center">
              {loader && hideDeleteIcons ? (
                <PuffLoader
                  // className={styles.loader1}
                  color={"#007DCA"}
                  size={80}
                  loading={true}
                />
              ) : (
                <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                  <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                    <FaCheck size={30} color="#009B17" />
                  </span>
                  <span className="text-base not-italic font-AeonikProMedium">
                    {SuccessMessage}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
              <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                  <DeleteIcon width={30} />
                </span>
              </span>
              <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                {t("sure")}?
              </span>
            </div>
          )}
          <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
            <button
              onClick={() => setDeleteModal(false)}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[42px]  text-center text-base not-italic font-AeonikProMedium"
            >
              {t("cancel")}
            </button>
            <button
              onClick={() => onProductAddressDelete()}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor hover:text-white text-[#FF4747] bg-white hover:bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
            >
              {t("remove_from_address")}
            </button>
          </div>
        </section>
        <section className="hidden md:flex items-center justify-between"></section>
        {data?.products?.length !== 0 && (
          <div className="w-full hidden md:flex flex-col">
            <div className="w-full  my-3 hidden md:flex flex-col items-center text-tableTextTitle">
              <div className="w-full  h-[70px] flex items-center">
                <Checkbox
                  defaultChecked={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                  style={{ width: "26px", height: "26px" }}
                  className={`idCheck flex mr-[8px] items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center !min-w-[24px] !min-h-[24px] `}
                ></Checkbox>
                <tr className="w-full h-full flex items-center justify-between border rounded-[8px]  border-lightBorderColor">
                  <th className="w-[5%] h-full flex items-center justify-center">
                    No:
                  </th>
                  <th className="w-[14%] h-full flex items-center justify-center">
                    {t("photo")}
                  </th>
                  <th className="w-[15%] h-full flex items-center ">
                    {t("name_of_product")}
                  </th>
                  <th className="w-[15%] h-full flex items-center ">
                    {t("vendor_code")}
                  </th>
                  <th className="w-[8%] h-full flex items-center ">
                    {t("type")}
                  </th>
                  <th className="w-[8%] h-full flex items-center ">
                    {t("date")}
                  </th>
                  <th className="w-[10%] h-full flex items-center ">
                    {t("price_of_product")}
                  </th>
                  <th className="w-[10%] h-full flex items-center "></th>
                  <th className="w-[9%] h-full flex items-center justify-center">
                    {t("delete")}
                  </th>
                  <th className="w-[10%] h-full flex items-center justify-center">
                    {t("status")}
                  </th>
                </tr>
              </div>
            </div>
          </div>
        )}

        {data?.products?.length !== 0 ? (
          <Checkbox.Group
            style={{ width: "100%" }}
            // checked={AllSelectCheckedAction || checked}
            value={checked}
            onChange={(checkedValues) => {
              setChecked(checkedValues);
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data?.products}
              className="w-full"
            >
              {data?.products
                ?.filter((e) =>
                  e?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())
                )
                ?.map((itemValue, index) => {
                  return (
                    <List.Item key={index} className="w-full  mt-6">
                      <div className="w-full   hidden md:flex flex-col items-center text-tableTextTitle">
                        <div className="w-full flex flex-col  items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                          <div className="flex flex-col w-full">
                            <div className="w-full flex h-[100px]  items-center">
                              <Checkbox
                                value={itemValue?.id}
                                checked={checked}
                              />
                              <tr className="w-full h-full py-2 ml-2  flex items-center justify-between rounded-[8px] border  border-lightBorderColor">
                                <td className="w-[5%]  h-full  flex items-center justify-center">
                                  {index + 1}
                                </td>
                                <td className="w-[14%]  h-full bg-white flex items-center justify-center  rounded-[12px]">
                                  <span className="w-[110px] h-[140px] border border-borderColor rounded-lg overflow-hidden">
                                    <img
                                      src={
                                        itemValue?.photos[0]?.url_photo ||
                                        "nodate"
                                      }
                                      alt={"noImg"}
                                      className=" w-[110px] h-full object-cover"
                                    />
                                  </span>
                                </td>
                                <td className="w-[15%] h-full flex items-center ">
                                  <p className="w-full  break-words text-center text-weatherWinterColor flex items-center  text-base not-italic font-AeonikProMedium">
                                    {languageDetector?.typeLang === "ru" &&
                                      itemValue?.name_ru}
                                    {languageDetector?.typeLang === "uz" &&
                                      itemValue?.name_uz}
                                  </p>
                                </td>
                                <td className="w-[15%] h-full flex items-center ">
                                  {itemValue?.sku || "sku"}
                                </td>
                                {dressInfo?.getProductInfo?.types &&
                                  dressInfo?.getProductInfo?.types
                                    ?.filter((e) => e?.id == itemValue?.type_id)
                                    ?.map((valueType, index) => {
                                      return (
                                        <td
                                          key={index}
                                          className="w-[8%] h-full flex items-center "
                                        >
                                          {languageDetector?.typeLang ===
                                            "ru" && valueType?.name_ru}
                                          {languageDetector?.typeLang ===
                                            "uz" && valueType?.name_uz}
                                        </td>
                                      );
                                    })}
                                <td className="w-[8%] h-full flex items-center ">
                                  {itemValue?.created_at || "created_at"}
                                </td>

                                <td className="w-[10%] h-full   flex items-center ">
                                  {itemValue?.cost?.discount_price > 999
                                    ? Number(itemValue?.cost?.discount_price)
                                        ?.toLocaleString()
                                        ?.split(",")
                                        .join(" ")
                                    : itemValue?.cost?.discount_price ||
                                      itemValue?.cost?.price > 999
                                    ? Number(itemValue?.cost?.price)
                                        ?.toLocaleString()
                                        ?.split(",")
                                        .join(" ")
                                    : itemValue?.cost?.price}
                                  <span className="ml-[6px] text-[14px]">
                                    {t("currency")}
                                  </span>
                                </td>
                                <td className="w-[10%] h-full  flex items-center ">
                                  <button
                                    onClick={() =>
                                      goProductDetailEdit(
                                        itemValue?.id,
                                        data?.id
                                      )
                                    }
                                    className="text-[18px]  text-weatherWinterColor w-full text-center"
                                  >
                                    {t("more_details")}
                                  </button>
                                </td>

                                <td className="w-[9%] h-full  flex items-center  justify-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteModal(true);
                                      setDeleteId(itemValue?.id);
                                      setGetIdShopLocation(data?.id);
                                    }}
                                    className="w-fit flex justify-center cursor-auto"
                                  >
                                    <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                                      <DeleteIcon width={30} />
                                    </span>
                                  </button>
                                </td>
                                {itemValue?.status === "approved" && (
                                  <td className="w-[10%] h-fit  flex items-center justify-center  ">
                                    <span className="w-[100px]  text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px] px-[10px] rounded-full">
                                      {itemValue?.status || "status"}
                                    </span>
                                  </td>
                                )}
                                {itemValue?.status === "declined" && (
                                  <td
                                    onClick={() =>
                                      onHandleStatus(itemValue?.id)
                                    }
                                    className="w-[10%] h-fit cursor-pointer flex items-center justify-center  "
                                  >
                                    <span className="w-[100px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px] px-[10px] rounded-full">
                                      {itemValue?.status || "status"}
                                    </span>
                                  </td>
                                )}
                                {itemValue?.status === "pending" && (
                                  <td className="w-[10%] h-fit  flex items-center justify-center  ">
                                    <span className="w-[100px]  text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px] px-[10px] rounded-full">
                                      {itemValue?.status || "status"}
                                    </span>
                                  </td>
                                )}
                                {itemValue?.status === "updated" && (
                                  <td className="w-[10%] h-fit flex items-center justify-center">
                                    <span className="w-[100px] text-center text-[#007DCA] bg-bgUpdate font-AeonikProRegular py-[3px]  rounded-full">
                                      {itemValue?.status || "status"}
                                    </span>
                                  </td>
                                )}
                              </tr>
                            </div>
                            {/* For Mobile Device */}
                            <div
                              key={itemValue?.id}
                              className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full"
                            >
                              <div className="mb-2">
                                <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                                  <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                  <span className="text-checkboxBorder">
                                    0{itemValue?.id}
                                  </span>
                                  <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                </div>
                              </div>

                              <div className="mb-3 h-[148px]">
                                <figure className="w-full h-full rounded-lg overflow-hidden"></figure>
                              </div>

                              <div className="mb-6">
                                <div className="w-full flex items-center  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] gap-x-[10px] mb-[8px]">
                                  <div className="w-[40%] flex items-center">
                                    {t("name_product")}
                                  </div>
                                  <div className="w-[30%] flex items-center">
                                    {t("status")}
                                  </div>
                                  <div className="w-[30%] flex items-center">
                                    {t("price_of_product")}
                                  </div>
                                </div>

                                <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">
                                  <div className="w-[40%]">
                                    {" "}
                                    {itemValue?.name_product}
                                  </div>
                                  <div className=" w-[30%] flex items-center justify-center text-white bg-green-500 rounded-lg px-[5px] py-[2px]">
                                    {itemValue?.status}
                                  </div>
                                  <div className="w-[30%]">
                                    {" "}
                                    {itemValue?.money} {t("currency_two")}{" "}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => goMapWear(itemValue?.city)}
                                  className="text-[#ED7925] bg-[#FDF1E8] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                >
                                  {t("Joyga qo'shish")}
                                </button>
                                <button
                                  onClick={() => goMapCity(itemValue?.city)}
                                  className="text-[#007DCA] bg-[#E8F5FD] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                >
                                  {t("more_details")}
                                </button>
                              </div>

                              <div className="w-full flex items-center justify-between mt-[18px]">
                                <div
                                  // onClick={() => {
                                  //   click(itemValue?.id);
                                  // }}
                                  className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
                                    itemValue?.isCheck
                                      ? "bg-[#007DCA] border-[#007DCA]"
                                      : "bg-white border-checkboxBorder"
                                  } flex items-center justify-center rounded mr-[8px]`}
                                >
                                  <div
                                    className={`${
                                      itemValue?.isCheck
                                        ? "flex items-center justify-center"
                                        : "hidden"
                                    }`}
                                  >
                                    <CheckIcons />
                                  </div>
                                </div>
                                <button
                                  to="#"
                                  className="text-textBlueColor text-[13px] font-AeonikProMedium"
                                >
                                  {t("more")}...
                                </button>
                                <button className="text-red-600 text-[11px] font-AeonikProMedium">
                                  {t("delete")}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  );
                })}
            </List>
          </Checkbox.Group>
        ) : (
          <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-5">
            <span className="text-[#D2D2D2] font-AeonikProRegular text-xl">
              {t("no_product")}
            </span>
          </div>
        )}
      </div>
      {/* )
      })} */}
    </div>
  );
}
export default React.memo(LocationItem)
