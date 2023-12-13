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

const CarouselEdit = ({ productData, selectColorID, colors_Id, colorGroup, onRefetch, productId, onHandleImage }) => {
  const { request } = useHttp()
  const [modalId, setModalId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  // --------------
  const [deleteModal, setDeleteModal] = useState(false);
  const [hideToggleIcons, setHideToggleIcons] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);


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
  const [imageFive, setImageFive] = useState({
    id5: 5,
    product_color_id5: null,
    product_id5: null,
    status5: null,
    status_reason5: null,
    status_update5: null,
    url_photo5: null,
    url_photo_change5: null,
    url_File5: null,
    changed5: false

  });
  const [imageSix, setImageSix] = useState({
    id6: 6,
    product_color_id6: null,
    product_id6: null,
    status6: null,
    status_reason6: null,
    status_update6: null,
    url_photo6: null,
    url_photo_change6: null,
    url_File6: null,
    changed6: false

  });
  const [imageSeven, setImageSeven] = useState({
    id6: 7,
    product_color_id7: null,
    product_id7: null,
    status7: null,
    status_reason7: null,
    status_update7: null,
    url_photo7: null,
    url_photo_change7: null,
    url_File7: null,
    changed7: false

  });
  const [imageEight, setImageEight] = useState({
    id8: 8,
    product_color_id8: null,
    product_id8: null,
    status8: null,
    status_reason8: null,
    status_update8: null,
    url_photo8: null,
    url_photo_change8: null,
    url_File8: null,
    changed8: false

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

    if (productData?.photos?.length) {
      setImageOne({
        id1: productData?.photos && productData?.photos[0]?.id || 1,
        product_color_id1: productData?.photos && productData?.photos[0]?.product_color_id,
        product_id1: productData?.photos && productData?.photos[0]?.product_id,
        status1: productData?.photos && productData?.photos[0]?.status,
        status_reason1: productData?.photos && productData?.photos[0]?.status_reason,
        status_update1: productData?.photos && productData?.photos[0]?.status_update,
        url_photo1: productData?.photos && productData?.photos[0]?.url_photo,
        url_photo_change1: productData?.photos && productData?.photos[0]?.url_photo,
      })

      setImageFour({
        id4: productData?.photos && productData?.photos[3]?.id || 4,
        product_color_id4: productData?.photos && productData?.photos[3]?.product_color_id,
        product_id4: productData?.photos && productData?.photos[3]?.product_id,
        status4: productData?.photos && productData?.photos[3]?.status,
        status_reason4: productData?.photos && productData?.photos[3]?.status_reason,
        status_update4: productData?.photos && productData?.photos[3]?.status_update,
        url_photo4: productData?.photos && productData?.photos[3]?.url_photo,
        url_photo_change4: productData?.photos && productData?.photos[3]?.url_photo,
      })

      setImageThree({
        id3: productData?.photos && productData?.photos[2]?.id || 3,
        product_color_id3: productData?.photos && productData?.photos[2]?.product_color_id,
        product_id3: productData?.photos && productData?.photos[2]?.product_id,
        status3: productData?.photos && productData?.photos[2]?.status,
        status_reason3: productData?.photos && productData?.photos[2]?.status_reason,
        status_update3: productData?.photos && productData?.photos[2]?.status_update,
        url_photo3: productData?.photos && productData?.photos[2]?.url_photo,
        url_photo_change3: productData?.photos && productData?.photos[2]?.url_photo,
      })

      setImageTwo({
        id2: productData?.photos && productData?.photos[1]?.id || 2,
        product_color_id2: productData?.photos && productData?.photos[1]?.product_color_id,
        product_id2: productData?.photos && productData?.photos[1]?.product_id,
        status2: productData?.photos && productData?.photos[1]?.status,
        status_reason2: productData?.photos && productData?.photos[1]?.status_reason,
        status_update2: productData?.photos && productData?.photos[1]?.status_update,
        url_photo2: productData?.photos && productData?.photos[1]?.url_photo,
        url_photo_change2: productData?.photos && productData?.photos[1]?.url_photo,
      })
      setImageFive({
        id5: productData?.photos && productData?.photos[4]?.id || 5,
        product_color_id5: productData?.photos && productData?.photos[4]?.product_color_id,
        product_id5: productData?.photos && productData?.photos[4]?.product_id,
        status5: productData?.photos && productData?.photos[4]?.status,
        status_reason5: productData?.photos && productData?.photos[4]?.status_reason,
        status_update5: productData?.photos && productData?.photos[4]?.status_update,
        url_photo5: productData?.photos && productData?.photos[4]?.url_photo,
        url_photo_change5: productData?.photos && productData?.photos[4]?.url_photo,
      })
      setImageSix({
        id6: productData?.photos && productData?.photos[5]?.id || 6,
        product_color_id6: productData?.photos && productData?.photos[5]?.product_color_id,
        product_id6: productData?.photos && productData?.photos[5]?.product_id,
        status6: productData?.photos && productData?.photos[5]?.status,
        status_reason6: productData?.photos && productData?.photos[5]?.status_reason,
        status_update6: productData?.photos && productData?.photos[5]?.status_update,
        url_photo6: productData?.photos && productData?.photos[5]?.url_photo,
        url_photo_change6: productData?.photos && productData?.photos[5]?.url_photo,
      })
      setImageSeven({
        id7: productData?.photos && productData?.photos[6]?.id || 7,
        product_color_id7: productData?.photos && productData?.photos[6]?.product_color_id,
        product_id7: productData?.photos && productData?.photos[6]?.product_id,
        status7: productData?.photos && productData?.photos[6]?.status,
        status_reason7: productData?.photos && productData?.photos[6]?.status_reason,
        status_update7: productData?.photos && productData?.photos[6]?.status_update,
        url_photo7: productData?.photos && productData?.photos[6]?.url_photo,
        url_photo_change7: productData?.photos && productData?.photos[6]?.url_photo,
      })
      setImageEight({
        id8: productData?.photos && productData?.photos[7]?.id || 8,
        product_color_id8: productData?.photos && productData?.photos[7]?.product_color_id,
        product_id8: productData?.photos && productData?.photos[7]?.product_id,
        status8: productData?.photos && productData?.photos[7]?.status,
        status_reason8: productData?.photos && productData?.photos[7]?.status_reason,
        status_update8: productData?.photos && productData?.photos[7]?.status_update,
        url_photo8: productData?.photos && productData?.photos[7]?.url_photo,
        url_photo_change8: productData?.photos && productData?.photos[7]?.url_photo,
      })

    }
  }, [productData?.photos])


  const handleLocationImage1 = (e) => {
    setImageOne({
      ...imageOne,
      url_File1: e.target.files[0],
      url_photo1: URL.createObjectURL(e.target.files[0]),
      changed1: true
    })

  };
  const handleLocationImage2 = (e) => {
    setImageTwo({
      ...imageTwo,
      url_File2: e.target.files[0],
      url_photo2: URL.createObjectURL(e.target.files[0]),
      changed2: true
    })

  };
  const handleLocationImage3 = (e) => {
    setImageThree({
      ...imageThree,
      url_File3: e.target.files[0],
      url_photo3: URL.createObjectURL(e.target.files[0]),
      changed3: true
    })

  };
  const handleLocationImage4 = (e) => {
    setImageFour({
      ...imageFour,
      url_File4: e.target.files[0],
      url_photo4: URL.createObjectURL(e.target.files[0]),
      changed4: true,
    })

  };
  const handleLocationImage5 = (e) => {
    setImageFive({
      ...imageFive,
      url_File5: e.target.files[0],
      url_photo5: URL.createObjectURL(e.target.files[0]),
      changed5: true,
    })
    onHandleImage({
      image_File_5: e.target.files[0],
      image_File_6: imageSix?.url_File6,
      image_File_7: imageSeven?.url_File7,
      image_File_8: imageEight?.url_File8,

    })
  }
  const handleLocationImage6 = (e) => {
    setImageSix({
      ...imageSix,
      url_File6: e.target.files[0],
      url_photo6: URL.createObjectURL(e.target.files[0]),
      changed6: true,
    })
    onHandleImage({
      image_File_5: imageFive?.url_File5,
      image_File_6: e.target.files[0],
      image_File_7: imageSeven?.url_File7,
      image_File_8: imageEight?.url_File8,
    })
  };
  const handleLocationImage7 = (e) => {
    setImageSeven({
      ...imageSeven,
      url_File7: e.target.files[0],
      url_photo7: URL.createObjectURL(e.target.files[0]),
      changed7: true,
    })
    onHandleImage({
      image_File_5: imageFive?.url_File5,
      image_File_6: imageSix?.url_File6,
      image_File_7: e.target.files[0],
      image_File_8: imageEight?.url_File8,
    })
  };
  const handleLocationImage8 = (e) => {
    setImageEight({
      ...imageEight,
      url_File8: e.target.files[0],
      url_photo8: URL.createObjectURL(e.target.files[0]),
      changed8: true,
    })
    onHandleImage({
      image_File_5: imageFive?.url_File5,
      image_File_6: imageSix?.url_File6,
      image_File_7: imageSeven?.url_File7,
      image_File_8: e.target.files[0],
    })
  };

  // console.log(selectColorID, "selectColorID");
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
    setHideToggleIcons(true)
    deleteImageId.mutate({},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setErrorMessage(res?.message)
            setLoader(false)

          } else if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            onRefetch()
            setTimeout(() => {
              // setOpenStoreList(false)
              setHideToggleIcons(false)
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
  // console.log(
  //   // imageOne?.url_File1, "imageOne?.url_File1",
  //   // imageTwo?.url_File2, "imageTwo?.url_File2",
  //   // imageThree?.url_File3, "imageThree?.url_File3",
  //   // imageFour?.url_File4, "imageFour?.url_File4",
  //   imageFive?.url_File5, "imageFive?.url_File5",
  //   imageSix?.url_File6, "imageSix?.url_File6",
  // );
  const onHandleAddImage = async () => {
    setLoader(true)
    setHideToggleIcons(true)
    let form = new FormData();
    imageOne?.url_File1 && form.append("photo", imageOne?.url_File1);
    imageTwo?.url_File2 && form.append("photo", imageTwo?.url_File2);
    imageThree?.url_File3 && form.append("photo", imageThree?.url_File3);
    imageFour?.url_File4 && form.append("photo", imageFour?.url_File4);
    form.append("color_id", productData?.colors[0]?.id);

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
          setErrorMessage(res_1?.message)
          setLoader(false)

        } else if (res_1?.message) {

          setSuccessMessage(res_1?.message)
          setLoader(false)
          onRefetch()
          setTimeout(() => {
            // setOpenStoreList(false)
            setHideToggleIcons(false)
            setFreeModalUploadImg(false)
            onRefetch()
          }, 1000);
        }
        console.log(res_1, "ProductStore---Added");
      }
    } catch (err) {
      setErrorMessage(err)

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
          }}
          className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 
          ${modalOfCarsouel ? "" : "hidden"
            }`}
        ></section>
        <section
          onClick={() => {
            setDeleteModal(false)
            // setOpenStoreList(false)
            setSuccessMessage(null)
            setErrorMessage(null)
            setFreeModalUploadImg(false)

          }}
          className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${deleteModal || freeModalUploadImg ? "" : "hidden"}`}
        ></section>
        {/* Delete Product Of Pop Confirm */}
        <section
          className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          <button
            onClick={() => {
              // setOpenStoreList(false)
              setErrorMessage(null)
              setSuccessMessage(null)
              setDeleteModal(false)
            }}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 ">
            <MenuCloseIcons
              className="w-full h-full"
              colors={"#a1a1a1"} />
          </button>
          {hideToggleIcons ?
            <div className="w-full h-full flex items-center justify-center">
              {loader && hideToggleIcons ?
                <PuffLoader
                  // className={styles.loader1}
                  color={"#007DCA"}
                  size={80}
                  loading={true}
                />
                :
                <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                  {errorMessage ?
                    <span className="flex items-center justify-center p-2">
                      <MdError size={35} color="#FF4343" />
                    </span> :
                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                      <FaCheck size={30} color="#009B17" />
                    </span>}
                  <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
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
                    <div className={`w-full justify-between flex items-center px-3 h-[50px]`}>
                      <label
                        htmlFor={"imageOne1"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageOne1"}
                          type="file"
                          onChange={handleLocationImage1}
                          accept=" image/*"
                        />
                        Изменить фото
                      </label>
                      {imageOne?.changed1 ? <button
                        onClick={() => {
                          setDeleteId(imageOne?.id1)
                          UpadatePhoto(imageOne?.id1)
                        }}
                        type="button"
                        className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </button> :
                        <span
                          className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </span>
                      }
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setDeleteId(imageOne?.id1)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageTwo?.id2 &&
                  <div>
                    <img
                      src={imageTwo?.url_photo2}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />
                    <div className={`w-full  justify-between  flex items-center px-3 h-[50px]`}>
                      <label
                        htmlFor={"imageTwo1"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageTwo1"}
                          type="file"
                          onChange={handleLocationImage2}
                          accept=" image/*"
                        />
                        Изменить фото
                      </label>
                      {imageTwo?.changed2 ?
                        <button
                          onClick={() => {
                            setDeleteId(imageTwo?.id2)
                            UpadatePhoto(imageTwo?.id2)
                          }}
                          type="button"
                          className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </button> :
                        <span
                          className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </span>}
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setDeleteId(imageTwo?.id2)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageThree?.id3 &&
                  <div>

                    <img
                      src={imageThree?.url_photo3}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />
                    <div className={`w-full justify-between px-3 h-[50px] flex items-center`}>
                      <label
                        htmlFor={"imageThree1"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageThree1"}
                          type="file"
                          onChange={handleLocationImage3}
                          accept=" image/*"
                        />
                        Изменить фото
                      </label>
                      {imageThree?.changed3 ? <button
                        onClick={() => {
                          setDeleteId(imageThree?.id3)
                          UpadatePhoto(imageThree?.id3)
                        }}
                        type="button"
                        className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </button> :
                        <span
                          className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </span>}
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setDeleteId(imageThree?.id3)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageFour?.id4 &&
                  <div>
                    <img
                      src={imageFour?.url_photo4}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />
                    <div className={`w-full  justify-between px-3 h-[50px]  flex items-center`}>
                      <label
                        htmlFor={"imageFour1"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageFour1"}
                          type="file"
                          onChange={handleLocationImage4}
                          accept=" image/*"
                        />
                        Изменить фото
                      </label>
                      {imageFour?.changed4 ? <button
                        onClick={() => {
                          setDeleteId(imageFour?.id4)
                          UpadatePhoto(imageFour?.id4)
                        }}
                        type="button"
                        className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </button> : <span
                        className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </span>}
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setDeleteId(imageFour?.id4)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageFive?.id5 &&
                  <div>
                    <img
                      src={imageFive?.url_photo5}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />
                    <div className={`w-full  justify-between px-3 h-[50px]  flex items-center`}>
                      <label
                        htmlFor={"imageFive1"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageFive1"}
                          type="file"
                          onChange={handleLocationImage5}
                          accept=" image/*"
                        />
                        Изменить фото
                      </label>
                      {imageFive?.changed5 ? <button
                        onClick={() => {
                          setDeleteId(imageFive?.id5)
                          UpadatePhoto(imageFive?.id5)
                        }}
                        type="button"
                        className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </button> : <span
                        className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </span>}
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setDeleteId(imageFive?.id5)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageSix?.id6 &&
                  <div>
                    <img
                      src={imageSix?.url_photo6}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />
                    <div className={`w-full  justify-between px-3 h-[50px]  flex items-center`}>
                      <label
                        htmlFor={"imageSix1"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageSix1"}
                          type="file"
                          onChange={handleLocationImage6}
                          accept=" image/*"
                        />
                        Изменить фото
                      </label>
                      {imageSix?.changed6 ? <button
                        onClick={() => {
                          setDeleteId(imageSix?.id6)
                          UpadatePhoto(imageSix?.id6)
                        }}
                        type="button"
                        className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </button> : <span
                        className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </span>}
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setDeleteId(imageSix?.id6)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageSeven?.id7 &&
                  <div>
                    <img
                      src={imageSeven?.url_photo7}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />
                    <div className={`w-full  justify-between px-3 h-[50px]  flex items-center`}>
                      <label
                        htmlFor={"imageSeven1"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageSeven1"}
                          type="file"
                          onChange={handleLocationImage7}
                          accept=" image/*"
                        />
                        Изменить фото
                      </label>
                      {imageSeven?.changed7 ? <button
                        onClick={() => {
                          setDeleteId(imageSeven?.id7)
                          UpadatePhoto(imageSeven?.id7)
                        }}
                        type="button"
                        className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </button> : <span
                        className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </span>}
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setDeleteId(imageSeven?.id7)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </div>
                  </div>
                }
                {modalId == imageEight?.id8 &&
                  <div>
                    <img
                      src={imageEight?.url_photo8}
                      alt="backImg"
                      className=" w-[670px] h-[80vh] 	 border border-searchBgColor object-contain rounded-lg"
                    />
                    <div className={`w-full  justify-between px-3 h-[50px]  flex items-center`}>
                      <label
                        htmlFor={"imageEight1"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageEight1"}
                          type="file"
                          onChange={handleLocationImage8}
                          accept=" image/*"
                        />
                        Изменить фото
                      </label>
                      {imageEight?.changed8 ? <button
                        onClick={() => {
                          setDeleteId(imageEight?.id8)
                          UpadatePhoto(imageEight?.id8)
                        }}
                        type="button"
                        className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </button> : <span
                        className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                      >
                        Сохранить
                      </span>}
                      <button
                        onClick={() => {
                          setDeleteModal(true)
                          setDeleteId(imageEight?.id8)
                        }}
                        className="text-[#D50000] active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Удалить
                      </button>
                    </div>
                  </div>
                }

              </div>
            </div>
          </div>
        </section>
        {/* Img Upload */}
        <section
          className={`fixed z-[223] rounded-lg bg-white   w-fit h-fit m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${freeModalUploadImg ? "" : "hidden"
            }`}
        >
          <button
            onClick={() => {
              // setOpenStoreList(false)
              setErrorMessage(null)
              setSuccessMessage(null)
              setFreeModalUploadImg(false)
            }}
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
                    hideToggleIcons ?
                      <div className="w-full h-full flex items-center justify-center">
                        {loader && hideToggleIcons ?
                          <PuffLoader
                            // className={styles.loader1}
                            color={"#007DCA"}
                            size={80}
                            loading={true}
                          />
                          :
                          <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                            {errorMessage ?
                              <span className="flex items-center justify-center p-2">
                                <MdError size={35} color="#FF4343" />
                              </span> :
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>}
                            <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                          </div>
                        }
                      </div>
                      :
                      <img
                        src={imageTwo?.url_photo2}
                        alt="backImg"
                        className=" w-full h-full  object-contain "
                      />
                  }
                </div>
                {imageTwo?.url_File2 ?
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <label
                      htmlFor={"changeImageTwo"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"changeImageTwo"}
                        type="file"
                        onChange={handleLocationImage2}
                        accept=" image/*"
                      />
                      Изменить фото
                    </label>

                    <button
                      onClick={() => {
                        onHandleAddImage()
                      }}
                      type="button"
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageTwo({ ...imageTwo, url_File2: null, url_photo2: null })
                      }}
                      className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Отменить
                    </button>
                  </div> :
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <span
                      className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                    >
                      Изменить фото
                    </span>
                    <span
                      className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </span>
                    <span
                      className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">Отменить
                    </span>
                  </div>}
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
                    hideToggleIcons ?
                      <div className="w-full h-full flex items-center justify-center">
                        {loader && hideToggleIcons ?
                          <PuffLoader
                            // className={styles.loader1}
                            color={"#007DCA"}
                            size={80}
                            loading={true}
                          />
                          :
                          <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                            {errorMessage ?
                              <span className="flex items-center justify-center p-2">
                                <MdError size={35} color="#FF4343" />
                              </span> :
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>}
                            <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                          </div>
                        }
                      </div>
                      :
                      <img
                        src={imageThree?.url_photo3}
                        alt="backImg"
                        className=" w-full h-full  object-contain "
                      />
                  }
                </div>
                {imageThree?.url_photo3 ?
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <label
                      htmlFor={"changeImageThree"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"changeImageThree"}
                        type="file"
                        onChange={handleLocationImage3}
                        accept=" image/*"
                      />
                      Изменить фото
                    </label>
                    <button
                      onClick={() => {
                        onHandleAddImage()
                      }}
                      type="button"
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setImageThree({ ...imageThree, url_File3: null, url_photo3: null })
                      }}
                      className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Отменить
                    </button>
                  </div> :
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <span
                      className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                    >
                      Изменить фото
                    </span>
                    <span
                      className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </span>
                    <span
                      className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">Отменить
                    </span>
                  </div>}
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
                    hideToggleIcons ?
                      <div className="w-full h-full flex items-center justify-center">
                        {loader && hideToggleIcons ?
                          <PuffLoader
                            // className={styles.loader1}
                            color={"#007DCA"}
                            size={80}
                            loading={true}
                          />
                          :
                          <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                            {errorMessage ?
                              <span className="flex items-center justify-center p-2">
                                <MdError size={35} color="#FF4343" />
                              </span> :
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>}
                            <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                          </div>
                        }
                      </div>
                      :
                      <img
                        src={imageFour?.url_photo4}
                        alt="backImg"
                        className=" w-full h-full  object-contain "
                      />
                  }
                </div>
                {imageFour?.url_photo4 ?
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <label
                      htmlFor={"changeImageFour"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"changeImageFour"}
                        type="file"
                        onChange={handleLocationImage4}
                        accept=" image/*"
                      />
                      Изменить фото
                    </label>
                    <button
                      onClick={() => {
                        onHandleAddImage()
                      }}
                      type="button"
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageFour({ ...imageFour, url_File4: null, url_photo4: null })
                      }}
                      className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Отменить
                    </button>
                  </div>
                  :
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <span
                      className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                    >
                      Изменить фото
                    </span>
                    <span
                      className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </span>
                    <span
                      className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">Отменить
                    </span>
                  </div>}
              </div>
            }
            {Number(modalId) === Number(imageFive?.id5) &&
              <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                <div className="w-full h-[90%]">

                  {!imageFive?.url_photo5 ?
                    <label
                      htmlFor={"imageFive"}
                      className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                    >
                      <input
                        className="hidden"
                        id={"imageFive"}
                        type="file"
                        onChange={handleLocationImage5}
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
                    hideToggleIcons ?
                      <div className="w-full h-full flex items-center justify-center">
                        {loader && hideToggleIcons ?
                          <PuffLoader
                            // className={styles.loader1}
                            color={"#007DCA"}
                            size={80}
                            loading={true}
                          />
                          :
                          <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                            {errorMessage ?
                              <span className="flex items-center justify-center p-2">
                                <MdError size={35} color="#FF4343" />
                              </span> :
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>}
                            <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                          </div>
                        }
                      </div>
                      :
                      <img
                        src={imageFive?.url_photo5}
                        alt="backImg"
                        className=" w-full h-full  object-contain "
                      />
                  }
                </div>
                {imageFive?.url_photo5 ?
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <label
                      htmlFor={"changeimageFive"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"changeimageFive"}
                        type="file"
                        onChange={handleLocationImage4}
                        accept=" image/*"
                      />
                      Изменить фото
                    </label>
                    {false && <button
                      onClick={() => {
                        onHandleAddImage()
                      }}
                      type="button"
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </button>}
                    <button
                      type="button"
                      onClick={() => {
                        setImageFive({ ...imageFive, url_File5: null, url_photo5: null })
                      }}
                      className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Отменить
                    </button>
                  </div>
                  :
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <span
                      className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                    >
                      Изменить фото
                    </span>
                    {false && <span
                      className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </span>}
                    <span
                      className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">Отменить
                    </span>
                  </div>}
              </div>
            }
            {Number(modalId) === Number(imageSix?.id6) &&
              <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                <div className="w-full h-[90%]">

                  {!imageSix?.url_photo6 ?
                    <label
                      htmlFor={"imageSix"}
                      className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                    >
                      <input
                        className="hidden"
                        id={"imageSix"}
                        type="file"
                        onChange={handleLocationImage6}
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
                    hideToggleIcons ?
                      <div className="w-full h-full flex items-center justify-center">
                        {loader && hideToggleIcons ?
                          <PuffLoader
                            // className={styles.loader1}
                            color={"#007DCA"}
                            size={80}
                            loading={true}
                          />
                          :
                          <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                            {errorMessage ?
                              <span className="flex items-center justify-center p-2">
                                <MdError size={35} color="#FF4343" />
                              </span> :
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>}
                            <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                          </div>
                        }
                      </div>
                      :
                      <img
                        src={imageSix?.url_photo6}
                        alt="backImg"
                        className=" w-full h-full  object-contain "
                      />
                  }
                </div>
                {imageSix?.url_photo6 ?
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <label
                      htmlFor={"changeimageSix"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"changeimageSix"}
                        type="file"
                        onChange={handleLocationImage6}
                        accept=" image/*"
                      />
                      Изменить фото
                    </label>
                    {false && <button
                      onClick={() => {
                        onHandleAddImage()
                      }}
                      type="button"
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </button>}
                    <button
                      type="button"
                      onClick={() => {
                        setImageSix({ ...imageSix, url_File6: null, url_photo6: null })
                      }}
                      className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Отменить
                    </button>
                  </div>
                  :
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <span
                      className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                    >
                      Изменить фото
                    </span>
                    {false && <span
                      className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </span>}
                    <span
                      className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">Отменить
                    </span>
                  </div>}
              </div>
            }
            {Number(modalId) === Number(imageSeven?.id7) &&
              <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                <div className="w-full h-[90%]">

                  {!imageSeven?.url_photo7 ?
                    <label
                      htmlFor={"imageSeven"}
                      className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                    >
                      <input
                        className="hidden"
                        id={"imageSeven"}
                        type="file"
                        onChange={handleLocationImage7}
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
                    hideToggleIcons ?
                      <div className="w-full h-full flex items-center justify-center">
                        {loader && hideToggleIcons ?
                          <PuffLoader
                            // className={styles.loader1}
                            color={"#007DCA"}
                            size={80}
                            loading={true}
                          />
                          :
                          <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                            {errorMessage ?
                              <span className="flex items-center justify-center p-2">
                                <MdError size={35} color="#FF4343" />
                              </span> :
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>}
                            <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                          </div>
                        }
                      </div>
                      :
                      <img
                        src={imageSeven?.url_photo7}
                        alt="backImg"
                        className=" w-full h-full  object-contain "
                      />
                  }
                </div>
                {imageSeven?.url_photo7 ?
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <label
                      htmlFor={"changeimageSeven"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"changeimageSeven"}
                        type="file"
                        onChange={handleLocationImage7}
                        accept=" image/*"
                      />
                      Изменить фото
                    </label>
                    {false && <button
                      onClick={() => {
                        onHandleAddImage()
                      }}
                      type="button"
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </button>}
                    <button
                      type="button"
                      onClick={() => {
                        setImageSeven({ ...imageSeven, url_File7: null, url_photo7: null })
                      }}
                      className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Отменить
                    </button>
                  </div>
                  :
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <span
                      className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                    >
                      Изменить фото
                    </span>
                    {false && <span
                      className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </span>}
                    <span
                      className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">Отменить
                    </span>
                  </div>}
              </div>
            }
            {Number(modalId) === Number(imageEight?.id8) &&
              <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                <div className="w-full h-[90%]">

                  {!imageEight?.url_photo8 ?
                    <label
                      htmlFor={"imageEight"}
                      className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                    >
                      <input
                        className="hidden"
                        id={"imageEight"}
                        type="file"
                        onChange={handleLocationImage8}
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
                    hideToggleIcons ?
                      <div className="w-full h-full flex items-center justify-center">
                        {loader && hideToggleIcons ?
                          <PuffLoader
                            // className={styles.loader1}
                            color={"#007DCA"}
                            size={80}
                            loading={true}
                          />
                          :
                          <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                            {errorMessage ?
                              <span className="flex items-center justify-center p-2">
                                <MdError size={35} color="#FF4343" />
                              </span> :
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>}
                            <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                          </div>
                        }
                      </div>
                      :
                      <img
                        src={imageEight?.url_photo8}
                        alt="backImg"
                        className=" w-full h-full  object-contain "
                      />
                  }
                </div>
                {imageEight?.url_photo8 ?
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <label
                      htmlFor={"changeimageEight"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"changeimageEight"}
                        type="file"
                        onChange={handleLocationImage8}
                        accept=" image/*"
                      />
                      Изменить фото
                    </label>
                    {false && <button
                      onClick={() => {
                        onHandleAddImage()
                      }}
                      type="button"
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </button>}
                    <button
                      type="button"
                      onClick={() => {
                        setImageEight({ ...imageEight, url_File8: null, url_photo8: null })
                      }}
                      className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">Отменить
                    </button>
                  </div>
                  :
                  <div className="w-full h-[10%] flex items-center justify-between px-3  border-t">
                    <span
                      className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                    >
                      Изменить фото
                    </span>
                    {false && <span
                      className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </span>}
                    <span
                      className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">Отменить
                    </span>
                  </div>}
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
                      {productData?.colors?.filter(e => e?.id == colors_Id[0])?.map(item => {

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
            < div className={`w-[30%] h-full flex-col items-center justify-start ${colors_Id?.length > 3 ? "hidden" : "flex"}`}>
              <button
                type="button"

                className="h-[96px] w-full flex items-center justify-center overflow-hidden rounded-lg"
              >

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
                {productData?.colors?.filter(e => e?.id == colors_Id[0])?.map(item => {

                  return (
                    <div className="w-fit h-fit flex items-center">
                      {
                        colorGroup?.filter(e => e?.id == colors_Id[0])?.map(value => {
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
            <div className={`w-[30%] h-full  flex-col items-center justify-start ${colors_Id?.length >= 2 ? "hidden" : "flex"}`} >
              <button
                type="button"
                className="h-[96px] w-full flex items-center rounded-lg overflow-hidden justify-center "
              >

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
                {productData?.colors?.filter(e => e?.id == colors_Id[0])?.map(item => {

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
            <div className={`w-[30%] h-full  flex-col items-center justify-start ${colors_Id?.length >= 2 ? "hidden" : "flex"}`} >
              <button
                type="button"

                className="h-[96px] w-full flex items-center rounded-lg overflow-hidden justify-center "
              >

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
                {productData?.colors?.filter(e => e?.id == colors_Id[0])?.map(item => {
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
            {/*  color-2 */}
            <div className={`w-[30%] h-full  flex-col items-center justify-start ${colors_Id?.length >= 2 ? "flex" : "hidden"}`}  >
              <button
                type="button"

                className="h-[96px] w-full flex items-center rounded-lg overflow-hidden justify-center "
              >

                {!imageFive?.url_photo5 ? <div
                  onClick={() => {
                    handleFreeModalUploadImg(imageFive?.id5)
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
                      setModalId(imageFive?.id5)
                    }}
                    style={{
                      backgroundImage: `url("${imageFive?.url_photo5}")`,
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
                        src={imageFive?.url_photo5}

                        alt=""
                      />
                    </div>
                  </div>

                }

              </button>

              <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                {colors_Id?.length === productData?.colors ?
                  productData?.colors?.filter(e => e?.id == colors_Id[1])?.map(item => {
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
                        {imageFive?.status5 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {imageFive?.status5 || "status"}
                        </td>}
                        {imageFive?.status5 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {imageFive?.status5 || "status"}
                        </td>}
                        {imageFive?.status5 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                          {imageFive?.status5 || "status"}
                        </td>}
                      </div>
                    )
                  }) :
                  colorGroup?.filter(e => e?.id == Number(colors_Id[1]))?.map(value => {
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
            </div>
            <div className={`w-[30%] h-full  flex-col items-center justify-start ${colors_Id?.length == 2 ? "flex" : "hidden"}`}  >
              <button
                type="button"

                className="h-[96px] w-full flex items-center rounded-lg overflow-hidden justify-center "
              >

                {!imageSix?.url_photo6 ? <div
                  onClick={() => {
                    handleFreeModalUploadImg(imageSix?.id6)
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
                      setModalId(imageSix?.id6)
                    }}
                    style={{
                      backgroundImage: `url("${imageSix?.url_photo6}")`,
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
                        src={imageSix?.url_photo6}

                        alt=""
                      />
                    </div>
                  </div>

                }

              </button>

              <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                  {colors_Id?.length === productData?.colors ?
                    productData?.colors?.filter(e => e?.id == colors_Id[1])?.map(item => {
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
                          {imageSix?.status6 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageSix?.status6 || "status"}
                          </td>}
                          {imageSix?.status6 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageSix?.status6 || "status"}
                          </td>}
                          {imageSix?.status6 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageSix?.status6 || "status"}
                          </td>}
                        </div>
                      )
                    }) :
                    colorGroup?.filter(e => e?.id == Number(colors_Id[1]))?.map(value => {
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

              </div>
            </div>
            {/*  color-3*/}
            <div className={`w-[30%] h-full  flex-col items-center justify-start ${colors_Id?.length >= 3 ? "flex" : "hidden"}`}  >
              <button
                type="button"

                className="h-[96px] w-full flex items-center rounded-lg overflow-hidden justify-center "
              >

                {!imageSeven?.url_photo7 ? <div
                  onClick={() => {
                    handleFreeModalUploadImg(imageSeven?.id7)
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
                      setModalId(imageSeven?.id7)
                    }}
                    style={{
                      backgroundImage: `url("${imageSeven?.url_photo7}")`,
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
                        className=" h-full w-full mx-auto align-middle object-contain cursor-pointer "
                        src={imageSeven?.url_photo7}
                        alt=""
                      />
                    </div>
                  </div>

                }

              </button>

              <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                  {colors_Id?.length === productData?.colors ?
                    productData?.colors?.filter(e => e?.id == colors_Id[2])?.map(item => {
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
                          {imageSeven?.status7 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageSeven?.status7 || "status"}
                          </td>}
                          {imageSeven?.status7 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageSeven?.status7 || "status"}
                          </td>}
                          {imageSeven?.status7 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageSeven?.status7 || "status"}
                          </td>}
                        </div>
                      )
                    }) :
                    colorGroup?.filter(e => e?.id == Number(colors_Id[2]))?.map(value => {
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
              </div>
            </div>
            {/*  color-4*/}
            <div className={`w-[30%] h-full  flex-col items-center justify-start ${colors_Id?.length === 4 ? "flex" : "hidden"}`}  >
              <button
                type="button"
                className="h-[96px] w-full flex items-center rounded-lg overflow-hidden justify-center "
              >

                {!imageEight?.url_photo8 ? <div
                  onClick={() => {
                    handleFreeModalUploadImg(imageEight?.id8)
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
                      setModalId(imageEight?.id8)
                    }}
                    style={{
                      backgroundImage: `url("${imageEight?.url_photo8}")`,
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
                        src={imageEight?.url_photo8}
                        alt=""
                      />
                    </div>
                  </div>
                }
              </button>
              <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                <div className="w-full flex h-[22px] items-center justify-between mt-[3px] border rounded-[12px]">
                  {colors_Id?.length === productData?.colors ?
                    productData?.colors?.filter(e => e?.id == colors_Id[3])?.map(item => {
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
                          {imageEight?.status8 === "approved" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageEight?.status8 || "status"}
                          </td>}
                          {imageEight?.status8 === "declined" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageEight?.status8 || "status"}
                          </td>}
                          {imageEight?.status8 === "pending" && <td className=" h-fit  flex items-center justify-center text-[12px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[2px] px-[5px] rounded-[10px] ">
                            {imageEight?.status8 || "status"}
                          </td>}
                        </div>
                      )
                    }) :
                    colorGroup?.filter(e => e?.id == Number(colors_Id[3]))?.map(value => {
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
              </div>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};
export default React.memo(CarouselEdit)

