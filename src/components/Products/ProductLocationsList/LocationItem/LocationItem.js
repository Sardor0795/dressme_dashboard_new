import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import StoreListModal from "./StoreListModal";
import {
  AddIconsCircle,
  AddLocationIcon,
  BgNoImgIcon,
  CheckIcons,
  DeleteIcon,
} from "../../../../assets/icons";
import { Checkbox, List } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useHttp } from "../../../../hook/useHttp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LocationItem({ data, getProductOfCategory, handleGetCheckAll, checkIndex, onRefetch }) {
  const { request } = useHttp()
  const [openStoreList, setOpenStoreList] = useState(false);

  const storeToggle = React.useCallback(() => setOpenStoreList(false), []);

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
    navigate(`/products/location/add/:${`${locationId}` + `${shopId}`}`);
  };

  const [checked, setChecked] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setIndeterminate(checked.length && checked.length !== data?.products?.length);
    setCheckAll(checked.length === data?.products?.length);
    handleGetCheckAll(checked)
  }, [checked]);

  const onCheckAllChange = (e) => {
    setChecked(e.target.checked ? data?.products?.map((item) => item.id) : []);
    setCheckAll(e.target.checked);
  };


  // // ------------GET  Has Magazin ?-----------shops/locations/:id------
  const { mutate } = useMutation((id) => {
    return request({ url: `/products/${id}`, method: "DELETE", token: true });
  });

  function onProductDelete(id) {
    console.log(id, "BU--DEL--ID");
    mutate(id,
      {
        onSuccess: res => {
          onRefetch()
          console.log(res, "product delte");
          // toast.success(`${res?.message}`, {
          //   position: "top-right",
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
        },
        onError: err => {
          console.log(err);
        }
      })
  }

  // console.log("ishga tushdi");


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
        <section className="hidden md:flex items-center justify-between">
          <div className="w-fit flex items-center">
            <div className=" cursor-pointer bg-white flex items-center gap-x-2">
              <Checkbox
                defaultChecked={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                style={{ width: "26px", height: "26px" }}
                className={`idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center !min-w-[24px] !min-h-[24px] `}>
              </Checkbox>
              <p className="text-black text-base not-italic flex items-center font-AeonikProMedium mr-[20px]">{data?.address}
                {data?.products?.length > 1 && <span className="text-black text-base not-italic font-AeonikProMedium ml-1">({data?.products?.length})</span>}
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
        {checkIndex &&
          < div className="w-full hidden md:flex flex-col mb-5">
            <table className="w-full  my-3 hidden md:flex flex-col items-center text-tableTextTitle">
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
          </div>}

        <Checkbox.Group
          style={{ width: "100%" }}
          value={checked}
          onChange={(checkedValues) => {
            setChecked(checkedValues);
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data?.products}
            className="w-full">
            {data?.products?.map(data => {
              return (
                <List.Item className="w-full"
                >

                  <table className="w-full   hidden md:flex flex-col items-center text-tableTextTitle">
                    <tbody className="w-full flex flex-col gap-y-[10px]   items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                      <div className="flex flex-col w-full">
                        <div className="w-full flex h-[120px]  items-center">
                          {openStoreList && <StoreListModal onClick={storeToggle} />}
                          <Checkbox value={data?.id} />
                          <tr className="w-full h-full py-2 ml-2  flex items-center justify-between rounded-[8px] border  border-lightBorderColor">
                            <td className="w-[5%] h-full  flex items-center justify-center " >{data?.id}</td>
                            <td className="w-[14%] h-full  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                              <img src={data?.photos[0]?.url_photo || "nodate"} alt={"noImg"} className="w-full h-full object-cover" />
                            </td>
                            <td className="w-[15%] h-full  flex items-center  justify-center">
                              <p className="w-full  break-words text-center text-weatherWinterColor flex items-center justify-center  text-base not-italic font-AeonikProMedium">
                                {data?.name_ru || "namrRu"}
                              </p>
                            </td>
                            <td className="w-[15%] h-full  flex items-center justify-center ">
                              {data?.sku || "sku"}
                            </td>
                            {getProductOfCategory && getProductOfCategory?.filter(e => e?.id == data?.type_id)?.map(valueType => {
                              return (
                                <td className="w-[8%] h-full  flex items-center justify-center ">
                                  {valueType?.name_ru || "type_id"}
                                </td>
                              )
                            })}
                            <td className="w-[8%] h-full  flex items-center justify-center ">{data?.created_at || "created_at"}</td>
                            <td className="w-[10%] h-full  flex items-center justify-center ">
                              <div
                                className={`w-fit text-center text-white font-AeonikProRegular py-[5px] px-[15px] rounded-full bg-green-500 `}
                              >
                                {data?.status || "status"}
                              </div>
                            </td>
                            <td className="w-[10%] h-full  flex items-center justify-center ">
                              {data?.cost?.discount_price || data?.cost?.price}
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
                              <button type="button" onClick={() => onProductDelete(data?.id)} className="w-fit flex justify-center cursor-auto">
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
                  </table>

                </List.Item>
              )
            })}
          </List>
        </Checkbox.Group>
      </div>
      {/* )
      })} */}
    </div>
  );
}
export default React.memo(LocationItem)
