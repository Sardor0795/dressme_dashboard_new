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
  const [modalId, setModalId] = useState(null);
  const [deleteImg, setDeleteImg] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [imageOne, setImageOne] = useState({
    id1: 1,
    product_color_id1: null,
    product_id1: null,
    status1: null,
    status_reason1: null,
    status_update1: null,
    url_photo1: null,
    url_File1: null
  });
  const [imageTwo, setImageTwo] = useState({
    id2: 2,
    product_color_id2: null,
    product_id2: null,
    status2: null,
    status_reason2: null,
    status_update2: null,
    url_photo2: null,
    url_File2: null
  });
  const [imageThree, setImageThree] = useState({
    id3: 3,
    product_color_id3: null,
    product_id3: null,
    status3: null,
    status_reason3: null,
    status_update3: null,
    url_photo3: null,
    url_File3: null
  });
  const [imageFour, setImageFour] = useState({
    id4: 4,
    product_color_id4: null,
    product_id4: null,
    status4: null,
    status_reason4: null,
    status_update4: null,
    url_photo4: null,
    url_File4: null
  });


  const [modalOfCarsouel, setModalOfCarsouel] = useState(false)
  function handleClickCarosuel() {
    setModalOfCarsouel(true)
  }


  useEffect(() => {
    if (photos?.length) {
      if (photos?.length >= 1) {
        setImageOne({
          id1: photos && photos[0]?.id || 1,
          product_color_id1: photos && photos[0]?.product_color_id,
          product_id1: photos && photos[0]?.product_id,
          status1: photos && photos[0]?.status,
          status_reason1: photos && photos[0]?.status_reason,
          status_update1: photos && photos[0]?.status_update,
          url_photo1: photos && photos[0]?.url_photo,
        })
      }
      if (photos?.length === 4) {
        setImageFour({
          id4: photos && photos[3]?.id || 4,
          product_color_id4: photos && photos[3]?.product_color_id,
          product_id4: photos && photos[3]?.product_id,
          status4: photos && photos[3]?.status,
          status_reason4: photos && photos[3]?.status_reason,
          status_update4: photos && photos[3]?.status_update,
          url_photo4: photos && photos[3]?.url_photo,
        })
      }
      if (photos?.length >= 3) {
        setImageThree({
          id3: photos && photos[2]?.id || 3,
          product_color_id3: photos && photos[2]?.product_color_id,
          product_id3: photos && photos[2]?.product_id,
          status3: photos && photos[2]?.status,
          status_reason3: photos && photos[2]?.status_reason,
          status_update3: photos && photos[2]?.status_update,
          url_photo3: photos && photos[2]?.url_photo,
        })
      }
      if (photos?.length >= 2) {

        setImageTwo({
          id2: photos && photos[1]?.id || 2,
          product_color_id2: photos && photos[1]?.product_color_id,
          product_id2: photos && photos[1]?.product_id,
          status2: photos && photos[1]?.status,
          status_reason2: photos && photos[1]?.status_reason,
          status_update2: photos && photos[1]?.status_update,
          url_photo2: photos && photos[1]?.url_photo,
        })
      }
    }
  }, [photos])

  const handleLocationImage1 = (e) => {
    setImageOne({
      ...imageOne,
      url_File1: e.target.files[0],
      url_photo1: URL.createObjectURL(e.target.files[0])
    })

  };
  const handleLocationImage2 = (e) => {
    setImageTwo({
      ...imageTwo,
      url_File2: e.target.files[0],
      url_photo2: URL.createObjectURL(e.target.files[0])
    })
  };
  const handleLocationImage3 = (e) => {
    setImageThree({
      ...imageThree,
      url_File3: e.target.files[0],
      url_photo3: URL.createObjectURL(e.target.files[0])
    })
  };
  const handleLocationImage4 = (e) => {
    setImageFour({
      ...imageFour,
      url_File4: e.target.files[0],
      url_photo4: URL.createObjectURL(e.target.files[0])
    })

  };

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
  console.log(modalId, "modalId");

  console.log(imageOne, "image?.one");
  console.log(imageTwo, "image?.two");
  console.log(imageThree, "image?.three----3");
  console.log(imageFour, "image?.four");
  console.log(' ----------------------------');
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
              < div className="w-full  flex flex-col items-center justify-start ">
                {modalId == imageOne?.id1 &&
                  <div>
                    <img
                      src={imageOne?.url_photo1}
                      alt="backImg"
                      className=" w-[670px]  h-[80vh]	 border border-searchBgColor object-contain rounded-lg"
                    />


                    <label
                      htmlFor={"imageOne?.id"}
                      className="h-full w-full cursor-pointer px-5  py-[15px] text-weatherWinterColor text-lg not-italic font-AeonikProMedium flex items-center  justify-between  "
                    >
                      <input
                        className="hidden"
                        id={"imageOne?.id"}
                        type="file"
                        onChange={handleLocationImage1}
                        accept=" image/*"
                      />
                      Изменить фото
                      <button
                        onClick={() => {
                          setDeleteImg(true)
                          // setDeleteId(data?.id)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </label>
                  </div>
                }
                {modalId == imageTwo?.id2 &&
                  <div>

                    <img
                      src={imageTwo?.url_photo2}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />

                    <label
                      htmlFor={"imageTwo?.id"}
                      className="h-full w-full cursor-pointer px-5  py-[15px] text-weatherWinterColor text-lg not-italic font-AeonikProMedium flex items-center  justify-between  "
                    >
                      <input
                        className="hidden"
                        id={"imageTwo?.id"}
                        type="file"
                        onChange={handleLocationImage2}
                        accept=" image/*"
                      />
                      Изменить фото
                      <button
                        onClick={() => {
                          setDeleteImg(true)
                          // setDeleteId(data?.id)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </label>
                  </div>
                }
                {modalId == imageThree?.id3 &&
                  <div>

                    <img
                      src={imageThree?.url_photo3}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />

                    <label
                      htmlFor={"imageThree?.id"}
                      className="h-full w-full cursor-pointer px-5  py-[15px] text-weatherWinterColor text-lg not-italic font-AeonikProMedium flex items-center  justify-between  "
                    >
                      <input
                        className="hidden"
                        id={"imageThree?.id"}
                        type="file"
                        onChange={handleLocationImage3}
                        accept=" image/*"
                      />
                      Изменить фото
                      <button
                        onClick={() => {
                          setDeleteImg(true)
                          // setDeleteId(data?.id)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </label>
                  </div>
                }
                {modalId == imageFour?.id4 &&
                  <div>
                    <img
                      src={imageFour?.url_photo4}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />
                    <label
                      htmlFor={"imageFour?.id"}
                      className="h-full w-full cursor-pointer px-5  py-[15px] text-weatherWinterColor text-lg not-italic font-AeonikProMedium flex items-center  justify-between  "
                    >
                      <input
                        className="hidden"
                        id={"imageFour?.id"}
                        type="file"
                        onChange={handleLocationImage4}
                        accept=" image/*"
                      />
                      Изменить фото
                      <button
                        onClick={() => {
                          setDeleteImg(true)
                          // setDeleteId(data?.id)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </label>
                  </div>
                }
              </div>

              {/* <div className="w-full flex items-center justify-between px-5 py-[15px]">
                <button className="text-weatherWinterColor text-lg not-italic font-AeonikProMedium">Изменить фото</button>
                <button
                  onClick={() => {
                    setDeleteImg(true)
                    // setDeleteId(data?.id) border-2
                  }}
                  className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить</button>
              </div> */}
            </div>
          </div>

        </section>

      </div >
      {/*------------------------- Modal Carosuel------------------------------------ */}

      < div className="flex items-center justify-between" >
        <div className="flex items-center text-[13px] md:text-base font-AeonikProRegular">
          <p>Фото</p>
          <span className="ml-[5px]">
            <StarLabel />
          </span>
        </div>

      </div >
      <section className="w-full flex flex-col flex-wrap h-full gap-x-[10px]">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-[404px]  flex items-center">
            <div
              className="w-full h-full rounded-[12px] border overflow-hidden"
            >
              <div className="h-full">
                < article
                  onClick={() => {
                    handleClickCarosuel()
                    setModalId(imageOne?.id1)
                  }}
                  className="w-full flex flex-col h-full ">
                  {imageOne?.status1 &&
                    <div className="w-fit flex h-[22px] items-center mb-[6px]  border rounded-[12px]">
                      {colorSelect?.map(item => {

                        return (
                          <div className="w-fit h-fit flex items-center gap-x-3">
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
                            {imageOne?.status1 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                              {imageOne?.status1 || "status"}
                            </td>}
                            {imageOne?.status1 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                              {imageOne?.status1 || "status"}
                            </td>}
                            {imageOne?.status1 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                              {imageOne?.status1 || "status"}
                            </td>}
                          </div>
                        )
                      })}

                    </div>}
                  {/* <div class="image-frame-wrapper-_NvbY" data-title="Пуховик" data-url="https://70.img.avito.st/image/1/1.w2ct7La4b44bRa2LJ6vHZDxObYiTTe2GW0htjJ1FZ4Sb.m3Z0PMuAMD16devVYDgoRb9LjW_kfqTjCgRkMmY6gLs" data-image-id="3" data-marker="image-frame/image-wrapper">
                    <span
                      class="image-frame-cover-lQG1h"
                      style="background-image: url(&quot;https://70.img.avito.st/image/1/1.w2ct7La4b44bRa2LJ6vHZDxObYiTTe2GW0htjJ1FZ4Sb.m3Z0PMuAMD16devVYDgoRb9LjW_kfqTjCgRkMmY6gLs&quot;);">
                    </span>
                    <img src="https://70.img.avito.st/image/1/1.w2ct7La4b44bRa2LJ6vHZDxObYiTTe2GW0htjJ1FZ4Sb.m3Z0PMuAMD16devVYDgoRb9LjW_kfqTjCgRkMmY6gLs" alt="Пуховик" class="desktop-1ky5g7j" />
                  </div> */}
                  {/* <div
                    className="image-frame-wrapper-_NvbY"
                    data-title="Пуховик"
                    data-url={imageOne?.url_photo1}
                    data-image-id="3"
                    data-marker="image-frame/image-wrapper">
                    <span
                      className="image-frame-cover-lQG1h"
                      style={{
                        backgroundImage: `url("${imageOne?.url_photo1}")`
                      }}
                    >
                    </span>
                    <img
                      className="desktop-1ky5g7j border border-red-500 "
                      src={imageOne?.url_photo1}
                      alt=""
                    />
                  </div> */}
                  <div
                    style={{
                      background: `rgba(0,0,0,0.6) url("${imageOne?.url_photo1}")`,
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                      // filter: "blur(1px)"
                    }}
                    className="BackgImageBLur  h-full  flex items-center justify-center ">
                    <div className="flex items-center justify-center w-[350px] h-[377px]  backdrop-blur-md">
                      <img
                        className="
                        h-full
                        w-full
                        mx-auto 
                        align-middle object-contain cursor-pointer "
                        src={imageOne?.url_photo1}

                        alt=""
                      />
                    </div>
                  </div>
                </article>
              </div>

            </div>
          </div>

          <div className="w-full mt-[10px] h-[124px] flex justify-between gap-x-[6px]   rounded-lg">
            < div className="w-[30%] h-full flex flex-col items-center justify-start ">
              <button
                type="button"

                className="h-[96px] w-full flex items-center justify-center "
              >
                {!imageTwo?.url_photo2 ? <label
                  htmlFor={"imageTwo"}
                  className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                >
                  <input
                    className="hidden"
                    id={"imageTwo"}
                    type="file"
                    onChange={handleLocationImage2}
                    accept=" image/*"
                  />

                  <div
                    onClick={() => setModalId(null)}
                    className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                    <DownloadIcon />
                    <div className="text-[11px] text-textLightColor mt-[5px]">
                      (необязательно)
                    </div>
                  </div>
                </label>
                  :
                  <img
                    onClick={() => {
                      handleClickCarosuel()
                      setModalId(imageTwo?.id2)
                    }}
                    src={imageTwo?.url_photo2}
                    alt="backImg"
                    className="w-full h-full border border-searchBgColor object-contain rounded-lg border border-red-500"
                  />
                }
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
                      {imageTwo?.status2 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageTwo?.status2 || "status"}
                      </td>}
                      {imageTwo?.status2 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageTwo?.status2 || "status"}
                      </td>}
                      {imageTwo?.status2 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageTwo?.status2 || "status"}
                      </td>}
                    </div>
                  )
                })}

              </div>
            </div>
            <div className="w-[30%] h-full flex flex-col items-center justify-start ">
              <button
                type="button"
                className="h-[96px] w-full flex items-center justify-center "
              >
                {!imageThree?.url_photo3 ? <label
                  htmlFor={"imageThree"}
                  className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                >
                  <input
                    className="hidden"
                    id={"imageThree"}
                    type="file"
                    onChange={handleLocationImage3}
                    accept=" image/*"
                  />
                  <div onClick={() => setModalId(null)}
                    className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                    <DownloadIcon />
                    <div className="text-[11px] text-textLightColor mt-[5px]">
                      (необязательно)
                    </div>
                  </div>
                </label>
                  :
                  <img
                    onClick={() => {
                      handleClickCarosuel()
                      setModalId(imageThree?.id3)
                    }}
                    src={imageThree?.url_photo3}
                    alt="backImg"
                    className="w-full h-full border border-searchBgColor object-contain rounded-lg border border-red-500"
                  />
                }

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
                      {imageThree?.status3 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageThree?.status3 || "status"}
                      </td>}
                      {imageThree?.status3 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageThree?.status3 || "status"}
                      </td>}
                      {imageThree?.status3 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageThree?.status3 || "status"}
                      </td>}
                    </div>
                  )
                })}

              </div>
            </div>
            <div className="w-[30%] h-full flex flex-col items-center justify-start  ">
              <button
                type="button"

                className="h-[96px] w-full flex items-center justify-center "
              >
                {!imageFour?.url_photo4 ? <label
                  htmlFor={"imageFour"}
                  className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                >
                  <input
                    className="hidden"
                    id={"imageFour"}
                    type="file"
                    onChange={handleLocationImage4}
                    accept=" image/*"
                  />
                  <div onClick={() => setModalId(null)}
                    className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                    <DownloadIcon />
                    <div className="text-[11px] text-textLightColor mt-[5px]">
                      (необязательно)
                    </div>
                  </div>
                </label>
                  :
                  <img
                    onClick={() => {
                      handleClickCarosuel()
                      setModalId(imageFour?.id4)
                    }}
                    src={imageFour?.url_photo4}
                    alt="backImg"
                    className="w-full h-full border border-searchBgColor object-contain rounded-lg border border-red-500"
                  />
                }

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
                      {imageFour?.status4 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageFour?.status4 || "status"}
                      </td>}
                      {imageFour?.status4 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageFour?.status4 || "status"}
                      </td>}
                      {imageFour?.status4 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                        {imageFour?.status4 || "status"}
                      </td>}
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </section >
    </div >
  );
};
export { CarouselEdit };
