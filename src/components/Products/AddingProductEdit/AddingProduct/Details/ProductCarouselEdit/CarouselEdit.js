import React, { useState, useEffect, useRef } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { DeleteIcon, DownloadIcon, MenuCloseIcons, StarLabel } from "../../../../../../assets/icons";
import { img1, img2, img3, img4 } from "../../../../../../assets";
import { useMutation } from "@tanstack/react-query";
import { useHttp } from "../../../../../../hook/useHttp";

const CarouselEdit = (props) => {
  const { request } = useHttp()
  const { colorGroup, colorSelect, photos } = props
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [modalId, setModalId] = useState(null);
  const [deleteImg, setDeleteImg] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [state, setState] = useState({
    pictureBgFile1: null,
    pictureBgView1: null,
    pictureBgFile2: null,
    pictureBgView2: null,
    pictureBgFile3: null,
    pictureBgView3: null,
    pictureBgFile4: null,
    pictureBgView4: null,
  });

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const [modalOfCarsouel, setModalOfCarsouel] = useState(false)
  const handleClickCarosuel = (id) => {
    setModalId(id)
    setModalOfCarsouel(true)
  }
  const handleLocationImage2 = (e) => {
    setState({
      ...state,
      pictureBgFile2: e.target.files[0],
      pictureBgView2: URL.createObjectURL(e.target.files[0])
    })
  };
  const handleLocationImage3 = (e) => {
    setState({
      ...state,
      pictureBgFile3: e.target.files[0],
      pictureBgView3: URL.createObjectURL(e.target.files[0])
    })
  };
  const handleLocationImage4 = (e) => {
    setState({
      ...state,
      pictureBgFile4: e.target.files[0],
      pictureBgView4: URL.createObjectURL(e.target.files[0])
    })
  };
  console.log(modalId, "modalId");
  const [imgGroup, setImgGroup] = useState([
    {
      id: 1,
      action: true,
      img: img4,
      status: "approved",
      colors: "#f5f5dc",

    },
    {
      id: 2,
      action: false,
      img: img2,
      status: "declined",
      colors: "#78866b",
    },
    {
      id: 3,
      action: false,
      img: img3,
      status: "pending",
      colors: "#713f12",
    },
    {
      id: 4,
      action: false,
      img: img1,
      status: "pending",
      colors: "#ffd700",
    },
  ]);






  const { mutate } = useMutation(() => {
    return request({ url: `/seller/products/:${Number(deleteId)}/delete-product-photo`, method: "DELETE", token: true });
  });

  const onHandleDeleteImage = () => {
    mutate({},
      {
        onSuccess: res => {
          console.log(res, "location delte");

        },
        onError: err => {
          console.log(err);
        }
      })
  }


  return (
    <div className="max-w-[350px] w-full h-fit ">

      {/*------------------------- Modal Carosuel------------------------------------ */}
      {/* Open Clothing Types Bottom Mobile Modal Animation Section */}
      <div>
        <section
          onClick={() => setModalOfCarsouel(false)}
          className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 ${modalOfCarsouel ? "" : "hidden"
            }`}
        ></section>
        <section
          onClick={() => { setDeleteImg(false) }}
          className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${deleteImg ? "" : "hidden"}`}
        ></section>
        {/* Image Delete Of Pop Confirm   */}
        <section
          className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteImg ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          <button
            onClick={() => setDeleteImg(false)}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 ">
            <MenuCloseIcons
              className="w-full h-full"
              colors={"#a1a1a1"} />
          </button>

          <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
            <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
              <span className="cursor-pointer active:translate-y-[2px] text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                <DeleteIcon width={30} />
              </span>
            </span>

          </div>

          {/* } */}
          <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">

            <button
              onClick={() => setDeleteImg(false)}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
              Oтмена
            </button>
            <button
              onClick={onHandleDeleteImage}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
              Удалить </button>
          </div>

        </section>
        <section
          className={`fixed z-[201] rounded-lg bg-white   w-fit h-fit m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${modalOfCarsouel ? "" : "hidden"
            }`}
        >
          <button
            onClick={() => setModalOfCarsouel(false)}
            className="absolute top-0  z-[116] right-[-80px]  flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#808080]">
            <MenuCloseIcons colors="#fff" />
          </button>
          <div>
            <div
              className="w-[670px] h-fit bg-white rounded-lg mt-[-4px] p-0 m-0 "
            >
              {photos?.filter(e => e?.id === modalId)?.map((data) => {
                return (
                  <div className="flex flex-col items-start ">
                    <img
                      key={data?.id}
                      className="w-[670px] h-[80vh] 	object-contain cursor-pointer"
                      src={data?.url_photo}
                      alt=""
                    />
                    <div className="w-full flex items-center justify-between px-5 py-[15px]">
                      <button className="text-weatherWinterColor text-lg not-italic font-AeonikProMedium">Изменить фото</button>
                      <button
                        onClick={() => {
                          setDeleteImg(true)
                          setDeleteId(data?.id)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

      </div>
      {/*------------------------- Modal Carosuel------------------------------------ */}

      <div className="flex items-center justify-between">
        <div className="flex items-center text-[13px] md:text-base font-AeonikProRegular">
          <p>Фото</p>
          <span className="ml-[5px]">
            <StarLabel />
          </span>
        </div>

      </div>
      <section className="w-full flex flex-col flex-wrap h-full gap-x-[10px]">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-[404px]  flex items-center">
            <div
              className="w-full h-full rounded-[12px] border overflow-hidden"
            >
              {photos?.map((data, index) => {
                return (
                  <div className="">
                    {index == 0 &&
                      < article
                        key={data?.id}
                        onClick={() => handleClickCarosuel(data?.id)}
                        className="flex flex-col ">
                        {data?.status &&
                          <div className="w-fit gap-x-4 flex h-[22px] items-center justify-between  mb-[2px]">
                            {colorSelect?.map(item => {

                              return (
                                <div className="w-fit h-fit flex items-center">
                                  {Number(item?.pivot?.product_id) === Number(data?.product_color_id) && (
                                    colorGroup?.filter(e => e?.id == Number(item?.pivot?.color_id))?.map(value => {
                                      return (
                                        <button
                                          type="button"
                                          className={`w-[22px] h-[22px] rounded-full border `}
                                          style={{ background: `${value?.hex}` }}
                                        ></button>
                                      )
                                    })
                                  )}
                                </div>
                              )
                            })}
                            {data?.status === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[12px] rounded-[10px] ">
                              {data?.status || "status"}
                            </td>}
                            {data?.status === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[12px] rounded-[10px] ">
                              {data?.status || "status"}
                            </td>}
                            {data?.status === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[12px] rounded-[10px] ">
                              {data?.status || "status"}
                            </td>}
                          </div>}
                        <div className="w-[350px] h-[377px] flex items-center">
                          <img
                            className=" object-contain cursor-pointer"
                            src={data?.url_photo}
                            alt=""
                          />
                        </div>
                      </article>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full mt-[10px] ">
            <div
              className="grid grid-cols-3 gap-x-[6px]   rounded-lg"
            >
              {photos?.map((data, index) => {
                return (

                  <figure
                    key={data?.id}
                    onClick={() => handleClickCarosuel(data?.id)}
                    className={`w-full h-[124px] cursor-pointer bg-btnBgColor rounded-lg  ${index >= 1 ? "" : "hidden"}`}
                  >
                    <img
                      className="w-full h-full md:p-0 object-top	object-contain
                        md:h-[96px] flex items-center justify-center border border-searchBgColor rounded-lg"
                      src={data?.url_photo}
                      alt="img"
                    />
                    {data?.status &&
                      <div className="flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                        {colorSelect?.map(item => {

                          return (
                            <div className="w-fit h-fit flex items-center">
                              {item?.pivot?.product_id === data?.product_color_id && (
                                colorGroup?.filter(e => e?.id == Number(item?.pivot?.color_id))?.map(value => {
                                  return (
                                    <button
                                      type="button"
                                      className={`w-[22px] h-[22px] rounded-full border `}
                                      style={{ background: `${value?.hex}` }}
                                    ></button>
                                  )
                                })
                              )}
                            </div>
                          )
                        })}
                        {data?.status === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {data?.status || "status"}
                        </td>}
                        {data?.status === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {data?.status || "status"}
                        </td>}
                        {data?.status === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {data?.status || "status"}
                        </td>}
                      </div>}
                  </figure>
                );
              })}
              {photos?.length <= 1 && < div className="w-full h-[124px] flex flex-col items-center justify-start ">
                <button
                  type="button"
                  className="h-[96px] w-full flex items-center justify-center "
                >
                  <label
                    htmlFor="DataImg2"
                    className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                  >
                    <input
                      className="hidden"
                      id="DataImg2"
                      type="file"
                      onChange={handleLocationImage2}
                      accept=" image/*"
                    />


                    {!state?.pictureBgView2 && (
                      <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                        <DownloadIcon />
                        <div className="text-[11px] text-textLightColor mt-[5px]">
                          (необязательно)
                        </div>
                      </div>
                    )}
                    {state?.pictureBgView2 && (
                      <img
                        src={state?.pictureBgView2}
                        alt="backImg"
                        className="w-full h-full border border-searchBgColor object-contain rounded-lg"
                      />
                    )}

                  </label>
                </button>

                <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                  {colorSelect?.map(item => {

                    return (
                      <div className="w-fit h-fit flex items-center">
                        {
                          colorGroup?.filter(e => e?.id == Number(item?.pivot?.color_id))?.map(value => {
                            return (
                              <button
                                type="button"
                                className={`w-[22px] h-[22px] rounded-full border `}
                                style={{ background: `${value?.hex}` }}
                              ></button>
                            )
                          })
                        }
                      </div>
                    )
                  })}

                </div>
              </div>}
              {photos?.length <= 2 && <div className="w-full h-[124px] flex flex-col items-center justify-start ">
                <button
                  type="button"
                  className="h-[96px] w-full flex items-center justify-center "
                >
                  <label
                    htmlFor="DataImg3"
                    className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                  >
                    <input
                      className="hidden"
                      id="DataImg3"
                      type="file"
                      onChange={handleLocationImage3}
                      accept=" image/*"
                    />


                    {!state?.pictureBgView3 && (
                      <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                        <DownloadIcon />
                        <div className="text-[11px] text-textLightColor mt-[5px]">
                          (необязательно)
                        </div>
                      </div>
                    )}
                    {state?.pictureBgView3 && (
                      <img
                        src={state?.pictureBgView3}
                        alt="backImg"
                        className="w-full h-full border border-searchBgColor object-contain rounded-lg"
                      />
                    )}

                  </label>
                </button>
                <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                  {colorSelect?.map(item => {

                    return (
                      <div className="w-fit h-fit flex items-center">
                        {
                          colorGroup?.filter(e => e?.id == Number(item?.pivot?.color_id))?.map(value => {
                            return (
                              <button
                                type="button"
                                className={`w-[22px] h-[22px] rounded-full border `}
                                style={{ background: `${value?.hex}` }}
                              ></button>
                            )
                          })
                        }
                      </div>
                    )
                  })}

                </div>
              </div>}
              {photos?.length <= 3 && <div className="w-full h-[124px] flex flex-col items-center justify-start  ">
                <button
                  type="button"
                  className="h-[96px] w-full flex items-center justify-center "
                >
                  <label
                    htmlFor="DataImg4"
                    className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                  >
                    <input
                      className="hidden"
                      id="DataImg4"
                      type="file"
                      onChange={handleLocationImage4}
                      accept=" image/*"
                    />


                    {!state?.pictureBgView4 && (
                      <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                        <DownloadIcon />
                        <div className="text-[11px] text-textLightColor mt-[5px]">
                          (необязательно)
                        </div>
                      </div>
                    )}
                    {state?.pictureBgView4 && (
                      <img
                        src={state?.pictureBgView4}
                        alt="backImg"
                        className="w-full h-full border border-searchBgColor object-contain rounded-lg"
                      />
                    )}

                  </label>
                </button>

                <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                  {colorSelect?.map(item => {
                    return (
                      <div className="w-fit h-fit flex items-center">
                        {
                          colorGroup?.filter(e => e?.id == Number(item?.pivot?.color_id))?.map(value => {
                            return (
                              <button
                                type="button"
                                className={`w-[22px] h-[22px] rounded-full border `}
                                style={{ background: `${value?.hex}` }}
                              ></button>
                            )
                          })
                        }
                      </div>
                    )
                  })}
                </div>
              </div>}
            </div>

          </div>
        </div>
      </section >
    </div >
  );
};
export { CarouselEdit };
