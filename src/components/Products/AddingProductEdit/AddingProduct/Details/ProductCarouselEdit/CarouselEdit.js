import React, { useState, useEffect, useRef } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { DeleteIcon, DownloadIcon, MenuCloseIcons, StarLabel } from "../../../../../../assets/icons";
import { img1, img2, img3, img4 } from "../../../../../../assets";
import { useMutation } from "@tanstack/react-query";
import { useHttp } from "../../../../../../hook/useHttp";
import { PuffLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiDownload } from "react-icons/fi";

const url = "https://api.dressme.uz/api/seller";

const CarouselEdit = ({ onHandleImage, colorGroup, colorSelect, photos, onRefetch, productId }) => {
  const { request } = useHttp()
  const [modalId, setModalId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  // --------------
  const [deleteModal, setDeleteModal] = useState(false);
  const [hideDeleteIcons, setHideDeleteIcons] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const [loader, setLoader] = useState(false);
  const [openStoreList, setOpenStoreList] = useState(false);
  // --------------
  // -----OnCHange Changed
  const [editChanged, setEditChanged] = useState(false)

  const [imageOne, setImageOne] = useState({
    id1: 1,
    product_color_id1: null,
    product_id1: null,
    status1: null,
    status_reason1: null,
    status_update1: null,
    url_photo1: null,
    url_photo_change1: null,
    url_File1: null,
    changed1: false
  });
  const [imageTwo, setImageTwo] = useState({
    id2: 2,
    product_color_id2: null,
    product_id2: null,
    status2: null,
    status_reason2: null,
    status_update2: null,
    url_photo2: null,
    url_photo_change2: null,
    url_File2: null,
    changed2: false

  });
  const [imageThree, setImageThree] = useState({
    id3: 3,
    product_color_id3: null,
    product_id3: null,
    status3: null,
    status_reason3: null,
    status_update3: null,
    url_photo3: null,
    url_photo_change3: null,
    url_File3: null,
    changed3: false

  });
  const [imageFour, setImageFour] = useState({
    id4: 4,
    product_color_id4: null,
    product_id4: null,
    status4: null,
    status_reason4: null,
    status_update4: null,
    url_photo4: null,
    url_photo_change4: null,
    url_File4: null,
    changed4: false

  });


  const [modalOfCarsouel, setModalOfCarsouel] = useState(false)
  const [freeModalUploadImg, setFreeModalUploadImg] = useState(false)
  function handleFreeModalUploadImg(id) {
    setFreeModalUploadImg(true)
    setModalId(id)
  }
  function handleClickCarosuel() {
    setModalOfCarsouel(true)
  }




  useEffect(() => {

    if (photos?.length) {
      setImageOne({
        id1: photos && photos[0]?.id || 1,
        product_color_id1: photos && photos[0]?.product_color_id,
        product_id1: photos && photos[0]?.product_id,
        status1: photos && photos[0]?.status,
        status_reason1: photos && photos[0]?.status_reason,
        status_update1: photos && photos[0]?.status_update,
        url_photo1: photos && photos[0]?.url_photo,
        url_photo_change1: photos && photos[0]?.url_photo,
      })

      setImageFour({
        id4: photos && photos[3]?.id || 4,
        product_color_id4: photos && photos[3]?.product_color_id,
        product_id4: photos && photos[3]?.product_id,
        status4: photos && photos[3]?.status,
        status_reason4: photos && photos[3]?.status_reason,
        status_update4: photos && photos[3]?.status_update,
        url_photo4: photos && photos[3]?.url_photo,
        url_photo_change4: photos && photos[3]?.url_photo,
      })

      setImageThree({
        id3: photos && photos[2]?.id || 3,
        product_color_id3: photos && photos[2]?.product_color_id,
        product_id3: photos && photos[2]?.product_id,
        status3: photos && photos[2]?.status,
        status_reason3: photos && photos[2]?.status_reason,
        status_update3: photos && photos[2]?.status_update,
        url_photo3: photos && photos[2]?.url_photo,
        url_photo_change3: photos && photos[2]?.url_photo,
      })

      setImageTwo({
        id2: photos && photos[1]?.id || 2,
        product_color_id2: photos && photos[1]?.product_color_id,
        product_id2: photos && photos[1]?.product_id,
        status2: photos && photos[1]?.status,
        status_reason2: photos && photos[1]?.status_reason,
        status_update2: photos && photos[1]?.status_update,
        url_photo2: photos && photos[1]?.url_photo,
        url_photo_change2: photos && photos[1]?.url_photo,
      })

    }
  }, [photos])


  const handleLocationImage1 = (e) => {
    setImageOne({
      ...imageOne,
      url_File1: e.target.files[0],
      url_photo1: URL.createObjectURL(e.target.files[0]),
      changed1: true
    })
    onHandleImage({
      image_File_1: e.target.files[0],
      image_File_2: imageTwo?.url_File2,
      image_File_3: imageThree?.url_File3,
      image_File_4: imageFour?.url_File4
    })
  };
  const handleLocationImage2 = (e) => {
    setImageTwo({
      ...imageTwo,
      url_File2: e.target.files[0],
      url_photo2: URL.createObjectURL(e.target.files[0]),
      changed2: true
    })
    onHandleImage({
      image_File_1: imageOne?.url_File1,
      image_File_2: e.target.files[0],
      image_File_3: imageThree?.url_File3,
      image_File_4: imageFour?.url_File4
    })
  };
  const handleLocationImage3 = (e) => {
    setImageThree({
      ...imageThree,
      url_File3: e.target.files[0],
      url_photo3: URL.createObjectURL(e.target.files[0]),
      changed3: true
    })
    onHandleImage({
      image_File_1: imageOne?.url_File1,
      image_File_2: imageTwo?.url_File2,
      image_File_3: e.target.files[0],
      image_File_4: imageFour?.url_File4
    })
  };
  const handleLocationImage4 = (e) => {
    setImageFour({
      ...imageFour,
      url_File4: e.target.files[0],
      url_photo4: URL.createObjectURL(e.target.files[0]),
      changed4: true,
    })
    onHandleImage({
      image_File_1: imageOne?.url_File1,
      image_File_2: imageTwo?.url_File2,
      image_File_3: imageThree?.url_File3,
      image_File_4: e.target.files[0]
    })
  };

  // console.log(deleteId, "deleteId");
  function UpadatePhoto(productId) {
    let form = new FormData();
    imageOne?.changed1 && form.append("new_photo", imageOne?.url_File1);
    imageTwo?.changed2 && form.append("new_photo", imageTwo?.url_File2);
    imageThree?.changed3 && form.append("new_photo", imageThree?.url_File3);
    imageFour?.changed4 && form.append("new_photo", imageFour?.url_File4);

    return fetch(`${url}/products/${productId}/update-product-photo`, {
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

        } else if (res?.message) {
        }
        console.log(res, "ProductStoreUpdate");
      })
      .catch((err) => console.log(err, "errImage"));
  }

  const deleteImageId = useMutation(() => {
    return request({
      url: `/products/${Number(productId)}/delete-product-photo`,
      method: "DELETE",
      token: true,
      body: {
        photo_id: deleteId
      }
    });
  });


  function onHandleDeleteImage() {
    setLoader(true)
    setHideDeleteIcons(true)
    deleteImageId.mutate({},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setDeleteMessage(res?.message)
            setLoader(false)

          } else if (res?.message) {
            setSuccessMessage(res?.message)
            // setGetIdShopLocation('')
            setLoader(false)
            onRefetch()
            setTimeout(() => {
              setOpenStoreList(false)
              setHideDeleteIcons(false)
              setDeleteModal(false)
              setModalOfCarsouel(false)
            }, 1000);
          }
        },

        onError: err => {
          console.log(err);
        }
      })
  }
  console.log(
    imageOne?.url_File1, "imageOne?.url_File1",
    imageTwo?.url_File2, "imageTwo?.url_File2",
    imageThree?.url_File3, "imageThree?.url_File3",
    imageFour?.url_File4, "imageFour?.url_File4",
  );
  const onHandleAddImage = async () => {
    // setState({ ...state, sendingLoader: true })
    let form = new FormData();
    imageOne?.url_File1 && form.append("photo", imageOne?.url_File1);
    imageTwo?.url_File2 && form.append("photo", imageTwo?.url_File2);
    imageThree?.url_File3 && form.append("photo", imageThree?.url_File3);
    imageFour?.url_File4 && form.append("photo", imageFour?.url_File4);
    form.append("color_id", colorSelect[0]?.id);

    try {
      const res = await fetch(`${url}/products/${Number(productId)}/add-product-photo`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        },
        body: form,
      });
      const res_1 = await res.json();
      if (res_1) {
        if (res_1?.errors && res_1?.message) {

          toast.error(`${res_1?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          // setState({ ...state, sendingLoader: false })

        } else if (res_1?.message) {
          toast.success(`${res_1?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })

          onRefetch()

        }
        console.log(res_1, "ProductStore---Added");
      }
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      // setState({ ...state, sendingLoader: false })
      throw new Error(err?.message || "something wrong");

    }
  }


  return (
    <div className="max-w-[350px] w-full h-fit ">

      {/*------------------------- Modal Carosuel------------------------------------ */}
      {/* Open Clothing Types Bottom Mobile Modal Animation Section */}
      <div>
        <section
          onClick={() => {
            setModalOfCarsouel(false)
            setFreeModalUploadImg(false)
          }}
          className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 
          ${modalOfCarsouel || freeModalUploadImg ? "" : "hidden"
            }`}
        ></section>
        <section
          onClick={() => {
            setDeleteModal(false)
            setOpenStoreList(false)
            setSuccessMessage(null)
            setDeleteMessage(null)

          }}
          className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${deleteModal || openStoreList ? "" : "hidden"}`}
        ></section>
        {/* Delete Product Of Pop Confirm */}
        <section
          className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          <button
            onClick={() => {
              setOpenStoreList(false)
              setDeleteMessage(null)
              setSuccessMessage(null)
              setDeleteModal(false)
            }}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 ">
            <MenuCloseIcons
              className="w-full h-full"
              colors={"#a1a1a1"} />
          </button>
          {hideDeleteIcons ?
            <div className="w-full h-full flex items-center justify-center">
              {loader && hideDeleteIcons ?
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
            </div>

            :
            <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
              <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                <span className="cursor-pointer active:translate-y-[2px] text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
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
              onClick={() => setDeleteModal(false)}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
              Oтмена
            </button>
            <button
              onClick={() => onHandleDeleteImage()}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
              Удалить </button>
          </div>

        </section>
        {/*  */}
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
                      <div className={`w-[55%]  ${imageOne?.changed1 ? "justify-between" : "justify-end"}  flex items-center`}>
                        {imageOne?.changed1 && <button
                          onClick={() => {
                            setDeleteId(imageOne?.id1)
                            UpadatePhoto(imageOne?.id1)
                          }}
                          type="button"
                          className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </button>}
                        <button
                          onClick={() => {
                            setDeleteModal(true)
                            setDeleteId(imageOne?.id1)
                          }}
                          className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                        </button>
                      </div>
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
                      <div className={`w-[55%]  ${imageTwo?.changed2 ? "justify-between" : "justify-end"}  flex items-center`}>
                        {imageTwo?.changed2 && <button
                          onClick={() => {
                            setDeleteId(imageTwo?.id2)
                            UpadatePhoto(imageTwo?.id2)
                          }}
                          type="button"
                          className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </button>}
                        <button
                          onClick={() => {
                            setDeleteModal(true)
                            setDeleteId(imageTwo?.id2)
                          }}
                          className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                        </button>
                      </div>
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
                      <div className={`w-[55%]  ${imageThree?.changed3 ? "justify-between" : "justify-end"}  flex items-center`}>
                        {imageThree?.changed3 && <button
                          onClick={() => {
                            setDeleteId(imageThree?.id3)
                            UpadatePhoto(imageThree?.id3)
                          }}
                          type="button"
                          className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </button>}
                        <button
                          onClick={() => {
                            setDeleteModal(true)
                            setDeleteId(imageThree?.id3)
                          }}
                          className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                        </button>
                      </div>
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
                      <div className={`w-[55%]  ${imageFour?.changed4 ? "justify-between" : "justify-end"}  flex items-center`}>
                        {imageFour?.changed4 && <button
                          onClick={() => {
                            setDeleteId(imageFour?.id4)
                            UpadatePhoto(imageFour?.id4)
                          }}
                          type="button"
                          className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </button>}
                        <button
                          onClick={() => {
                            setDeleteModal(true)
                            setDeleteId(imageFour?.id4)
                          }}
                          className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                        </button>
                      </div>
                    </label>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
        {/* Img Upload */}
        <section
          className={`fixed z-[201] rounded-lg bg-white   w-fit h-fit m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${freeModalUploadImg ? "" : "hidden"
            }`}
        >
          <button
            onClick={() => setFreeModalUploadImg(false)}
            className="absolute top-0  z-[116] right-[-80px]  flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#808080]">
            <MenuCloseIcons colors="#fff" />
          </button>
          <div className="w-[670px] h-[60vh] overflow-hidden rounded-lg">
            {Number(modalId) === Number(imageTwo?.id2) &&
              <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                <div className="w-full h-[90%]">

                  {!imageTwo?.url_photo2 ?
                    <label
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
                        className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col items-center justify-center">
                        < FiDownload size={30} colors="" />
                        <div className="text-xl text-textLightColor mt-[5px] ">
                          Выберите фото
                        </div>
                      </div>
                    </label>
                    :
                    <img
                      src={imageTwo?.url_photo2}
                      alt="backImg"
                      className=" w-full h-full 	 border border-searchBgColor object-contain rounded-lg"
                    />}
                </div>
                <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                  <button
                    onClick={() => {
                      // setDeleteId(imageTwo?.id2)
                      // UpadatePhoto(imageTwo?.id2)
                    }}
                    type="button"
                    className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                  >
                    Изменить фото
                  </button>
                  <button
                    onClick={() => {
                      onHandleAddImage()
                      // setDeleteId(imageTwo?.id2)
                      // UpadatePhoto(imageTwo?.id2)
                    }}
                    type="button"
                    className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      // setDeleteModal(true)
                      // setDeleteId(imageTwo?.id2)
                    }}
                    className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                  </button>
                </div>
              </div>
            }
            {Number(modalId) === Number(imageThree?.id3) &&
              <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                <div className="w-full h-[90%]">

                  {!imageThree?.url_photo3 ?
                    <label
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

                      <div
                        className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col items-center justify-center">
                        < FiDownload size={30} colors="" />
                        <div className="text-xl text-textLightColor mt-[5px] ">
                          Выберите фото
                        </div>
                      </div>
                    </label>
                    :
                    <img
                      src={imageThree?.url_photo3}
                      alt="backImg"
                      className=" w-full h-full 	 border border-searchBgColor object-contain rounded-lg"
                    />}
                </div>
                <div className="w-full h-[10%] flex items-center justify-between px-3   border-t">
                  <button
                    onClick={() => {
                      onHandleAddImage()
                      // setDeleteId(imageTwo?.id2)
                      // UpadatePhoto(imageTwo?.id2)
                    }}
                    type="button"
                    className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                  >
                    Изменить фото
                  </button>
                  <button
                    onClick={() => {
                      // setDeleteId(imageTwo?.id2)
                      // UpadatePhoto(imageTwo?.id2)
                    }}
                    type="button"
                    className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      // setDeleteModal(true)
                      // setDeleteId(imageTwo?.id2)
                    }}
                    className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                  </button>
                </div>
              </div>
            }
            {Number(modalId) === Number(imageFour?.id4) &&
              <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                <div className="w-full h-[90%]">

                  {!imageFour?.url_photo4 ?
                    <label
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

                      <div
                        className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col items-center justify-center">
                        < FiDownload size={30} colors="" />
                        <div className="text-xl text-textLightColor mt-[5px] ">
                          Выберите фото
                        </div>
                      </div>
                    </label>
                    :
                    <img
                      src={imageFour?.url_photo4}
                      alt="backImg"
                      className=" w-full h-full 	 border border-searchBgColor object-contain rounded-lg"
                    />}
                </div>
                <div className="w-full h-[10%] flex items-center justify-between px-3  border-t  ">
                  <button
                    onClick={() => {
                      onHandleAddImage()
                      // setDeleteId(imageTwo?.id2)
                      // UpadatePhoto(imageTwo?.id2)
                    }}
                    type="button"
                    className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                  >
                    Изменить фото
                  </button>
                  <button
                    onClick={() => {
                      // setDeleteId(imageTwo?.id2)
                      // UpadatePhoto(imageTwo?.id2)
                    }}
                    type="button"
                    className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      // setDeleteModal(true)
                      // setDeleteId(imageTwo?.id2)
                    }}
                    className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                  </button>
                </div>
              </div>
            }
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

                  <div
                    style={{
                      backgroundImage: ` url("${imageOne?.url_photo1}")`,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                      // filter: "blur(1px)"
                    }}
                    className="BackgImageBLur   h-full  flex items-center justify-center ">
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

                className="h-[96px] w-full flex items-center justify-center overflow-hidden rounded-lg"
              >
                {/* {!imageTwo?.url_photo2 ? <label
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
                </label> */}
                {!imageTwo?.url_photo2 ? <div
                  onClick={() => {
                    handleFreeModalUploadImg(imageTwo?.id2)
                  }}
                  className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                  <DownloadIcon />
                  <div className="text-[11px] text-textLightColor mt-[5px]">
                    (необязательно)
                  </div>
                </div>
                  :
                  <div
                    onClick={() => {
                      handleClickCarosuel()
                      setModalId(imageTwo?.id2)
                    }}
                    style={{
                      backgroundImage: ` url("${imageTwo?.url_photo2}")`,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                      // filter: "blur(1px)"
                    }}
                    className="BackgImageBLur overflow-hidden  w-full h-full rounded-lg flex items-center justify-center border ">
                    <div className="flex items-center justify-center w-full h-full  backdrop-blur-md">
                      <img
                        className="
                      h-full
                      w-full
                      mx-auto 
                      align-middle object-contain cursor-pointer "
                        src={imageTwo?.url_photo2}

                        alt=""
                      />
                    </div>
                  </div>

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
                className="h-[96px] w-full flex items-center rounded-lg overflow-hidden justify-center "
              >
                {/* {!imageThree?.url_photo3 ? <label
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
                </label> */}
                {!imageThree?.url_photo3 ? <div
                  onClick={() => {
                    handleFreeModalUploadImg(imageThree?.id3)
                  }}
                  className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                  <DownloadIcon />
                  <div className="text-[11px] text-textLightColor mt-[5px]">
                    (необязательно)
                  </div>
                </div>
                  :
                  <div
                    onClick={() => {
                      handleClickCarosuel()
                      setModalId(imageThree?.id3)
                    }}
                    style={{
                      backgroundImage: ` url("${imageThree?.url_photo3}")`,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                      // filter: "blur(1px)"
                    }}
                    className="BackgImageBLur  overflow-hidden  w-full h-full rounded-lg flex items-center justify-center border  ">
                    <div className="flex items-center justify-center w-full h-full  backdrop-blur-md">
                      <img
                        className="
                    h-full
                    w-full
                    mx-auto 
                    align-middle object-contain cursor-pointer "
                        src={imageThree?.url_photo3}

                        alt=""
                      />
                    </div>
                  </div>

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

                className="h-[96px] w-full flex items-center rounded-lg overflow-hidden justify-center "
              >
                {/* {!imageFour?.url_photo4 ? <label
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
                </label> */}
                {!imageFour?.url_photo4 ? <div
                  onClick={() => {
                    handleFreeModalUploadImg(imageFour?.id4)
                  }}
                  className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                  <DownloadIcon />
                  <div className="text-[11px] text-textLightColor mt-[5px]">
                    (необязательно)
                  </div>
                </div>
                  :
                  <div
                    onClick={() => {
                      handleClickCarosuel()
                      setModalId(imageFour?.id4)
                    }}
                    style={{
                      backgroundImage: `url("${imageFour?.url_photo4}")`,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "darken",
                      // filter: "blur(1px)"
                    }}
                    className="BackgImageBLur  overflow-hidden w-full h-full rounded-lg border flex items-center justify-center ">
                    <div className="flex items-center justify-center w-full h-full  backdrop-blur-md ">
                      <img
                        className="
                    h-full
                    w-full
                    mx-auto 
                    align-middle object-contain cursor-pointer "
                        src={imageFour?.url_photo4}

                        alt=""
                      />
                    </div>
                  </div>

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
export default React.memo(CarouselEdit)

