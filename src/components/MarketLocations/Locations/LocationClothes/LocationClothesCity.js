import { Link, useNavigate, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  DeleteIcon,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
} from "../../../../assets/icons";
import { useQuery } from "@tanstack/react-query";

import { useHttp } from "../../../../hook/useHttp";
import { PuffLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa6";
import { dressMainData } from "../../../../hook/ContextTeam";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
import LoadingForSeller from "../../../Loading/LoadingFor";
import { BackBtn } from "../../../backBtn/backBtn";
import { dressRegionList } from "../../../../hook/RegionList";

const url = "https://api.dressme.uz/api/seller";
export default function LocationClothesCity() {
  const { request } = useHttp();
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const { t } = useTranslation("locations");
  const [languageDetector] = useContext(LanguageDetectorDress);
  const [regionList, setRegionList] = useContext(dressRegionList)

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
    shopId: null,
    // ---SearchName
    searchName: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const [loading, setLoading] = useState(false);

  function handleAllCheckList(childData, shopId) {
    setState({ ...state, getCheckListItem: childData, shopId: shopId });
  }
  const { id } = useParams();
  const NewId = id.replace(":", "");
  // ------------GET  Has Magazin ?-----------------
  const [getListItem, setGetListItem] = useState();
  const { refetch, isLoading } = useQuery(
    ["location_store_id"],
    () => {
      setLoading(true);
      return request({
        url: `/shops/locations/${NewId}/show-products-by-location`,
        token: true,
      });
    },
    {
      onSuccess: (res) => {
        setGetListItem(res?.location);
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);

        throw new Error(err || "something wrong");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const [hideProductList, setHideProductList] = useState(false);

  const onDeleteSeveralSelect = () => {
    setState({ ...state, loader: true, hideProductList: true });
    setHideProductList(true);
    let form = new FormData();
    form.append("location_ids[]", state?.shopId);
    state?.getCheckListItem?.map((e, index) => {
      form.append("product_ids[]", state?.getCheckListItem[index]);
    });
    return fetch(`${url}/products/massive-delete-products`, {
      method: "POST",
      "Accept-Language": languageDetector?.typeLang,

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.errors && res?.message) {
          setState({ ...state, onErrorMessage: res?.errors, loader: false });
        } else if (res?.message) {
          setState({
            ...state,
            onSuccessMessaage: res?.message,
            loader: false,
          });
          setTimeout(() => {
            refetch();
            setState({ ...state, openDeleteModal: false });
            setHideProductList(false);
          }, 2000);
        }
      })
      .catch((err) => {
        throw new Error(err || "something wrong");
      });
  };

  function addNewProductId() {
    setDressInfo({ ...dressInfo, locationIdAddProduct: getListItem?.id });
    navigate(`/products/location/add/${Number(getListItem?.shop_id)}`);
  }
  // console.log(isLoading, "isFetched");
  return (
    <div className="px-4 md:px-10 ">
      <section
        onClick={() => {
          setState({
            ...state,
            onSuccessMessaage: null,
            onErrorTitle: null,
            onErrorMessage: null,
            openSelectModal: false,
            hideProductList: false,
            openDeleteModal: false,
          });
          setHideProductList(false);
        }}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.openSelectModal || state?.openDeleteModal ? "" : "hidden"}`}
      ></section>
      {/* Add the Several selected products to the new one */}

      {/* Delete Product Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openDeleteModal
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => setState({ ...state, openDeleteModal: false })}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 "
        >
          <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
        </button>
        {hideProductList ? (
          <div className="w-full flex items-center justify-center">
            {state?.loader && hideProductList ? (
              <PuffLoader
                // className={styles.loader1}
                color={"#007DCA"}
                size={80}
                loading={true}
              />
            ) : (
              <>
                <div className="w-full hidden md:flex gap-y-2 flex-col items-center justify-center ">
                  <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                    <FaCheck size={30} color="#009B17" />
                  </span>
                  <span className="text-base not-italic font-AeonikProMedium">
                    {state?.onSuccessMessaage}
                  </span>
                </div>
                <div className="w-full md:hidden flex gap-y-2 flex-col items-center justify-center ">
                  <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                    <FaCheck size={20} color="#009B17" />
                  </span>
                  <span className="text-[14px] not-italic font-AeonikProMedium">
                    {state?.onSuccessMessaage}
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="hidden md:flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
              <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                  <DeleteIcon width={30} />
                </span>
              </span>
              <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                {t("sure")}?
              </span>
            </div>
            <div className="md:hidden flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
              <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                  <DeleteIcon width={20} />
                </span>
              </span>
              <span className=" text-black text-[14px] not-italic font-AeonikProMedium text-center">
                {t("sure")}?
              </span>
            </div>
          </>
        )}
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setState({ ...state, openDeleteModal: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[38px] md:h-[42px]  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => onDeleteSeveralSelect()}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor hover:text-white text-[#FF4747] bg-white hover:bg-[#FF4747]  h-[38px] md:h-[42px] px-4  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
          >
            {t("remove_from_address")}
          </button>
        </div>
      </section>
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block ">
        <div className="block md:flex justify-start items-center md:justify-between ">
          <div className=" flex items-center justify-center gap-x-2 ">
            <div className="md:hidden absolute left-[16px]">
              <BackBtn />
            </div>
            <div className="hidden md:block">
              <BackBtn />
            </div>
            <div className="text-center flex items-center text-xl md:text-[24px] font-AeonikProMedium   md:ml-[30px]">
              {t("cloth")}
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
                value={state?.searchName || ""}
                onChange={(e) =>
                  setState({ ...state, searchName: e?.target?.value })
                }
                className="w-full h-full   outline-0 	pl-[10px]"
                placeholder={t("search")}
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
          <div className="text-black text-xl not-italic font-AeonikProMedium mr-[20px]">
            <div className="text-black text-[13px] md:text-lg not-italic flex items-center font-AeonikProMedium mr-[20px]">
              {regionList?.regions
                ?.filter((e) => e?.id == getListItem?.region_id)
                ?.map((values, index) => {
                  return (
                    <div key={values?.id}>
                      {values?.name_ru},
                      {values?.sub_regions
                        ?.filter((e) => e?.id == getListItem?.sub_region_id)
                        ?.map((valueSub) => {
                          return (
                            <span key={valueSub?.id} className="px-1">{valueSub?.name_ru},</span>
                          );
                        })}
                    </div>
                  );
                })}
              <span className="hidden md:flex items-center ml-1   ">
                ({getListItem?.address})
              </span>
              {getListItem?.products?.length > 1 && (
                <span className="text-black text-base not-italic font-AeonikProMedium ml-1   ">
                  ({getListItem?.products?.length})
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => addNewProductId()}
            className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
          >
            <span className="  xs:hidden flex">
              <AddIconsCircle size={25} />
            </span>
            <span className="hidden xs:flex">
              <AddIconsCircle />
            </span>
            <span className="hidden xs:flex text-addWearColorText md:text-base not-italic font-AeonikProMedium">
              {t("add_cloth")}
            </span>
          </button>
        </section>
        <div className=" w-fit flex items-center border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0  ">
          <div className="mr-auto md:mr-4 font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
            {t("selected")}:
          </div>

          {state?.getCheckListItem?.length >= 2 ? (
            <button
              type="button"
              onClick={() => setState({ ...state, openDeleteModal: true })}
              className={`pl-[6px] flex items-center font-AeonikProRegular text-sm md:text-lg  text-deleteColor active:scale-95  active:opacity-70`}
            >
              <span className="mr-[5px]">
                <DeleteIcon width={20} />
              </span>
              {t("delete")}
            </button>
          ) : (
            <button
              type="button"
              className={`pl-[6px]  flex items-center font-AeonikProRegular text-sm md:text-lg text-[#D2D2D2] cursor-not-allowed`}
            >
              <span className="mr-[5px]">
                <DeleteIcon width={20} />
              </span>
              {t("delete")}
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto font-AeonikProRegular text-[16px]">
        {loading ? (
          <LoadingForSeller />
        ) : (
          <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]  ">
            <LocationItem
              data={getListItem}
              onRefetch={refetch}
              searchName={state?.searchName}
              allCheckedList={handleAllCheckList}
            />
          </div>
        )}
      </div>
    </div>
  );
}
