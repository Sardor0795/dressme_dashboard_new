import { Select, Space, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  AddIconsCircle1,
  ArrowRightIcon,
  CloseAnswer,
  DeleteIcon,
  LoaderIcon,
  MenuCloseIcons,
  SearchIcon,
  StarLabel,
} from "../../../../assets/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import ClothingSection from "./DetailsForMobile/ClothesSection/ClothingSection";
import SubClothingSection from "./DetailsForMobile/SubClothesSection/SubClothingSection";
import DressSeason from "./DetailsForMobile/DressSeason/DressSeason";
import ColourGroup from "./DetailsForMobile/ColourList/ColourGroup";
import GenderList from "./DetailsForMobile/GenderList/GenderList";
import DressType from "./DetailsForMobile/DressType/DressType";
import MakeCountry from "./DetailsForMobile/CountrySize/MakeCountry";
import { useHttp } from "../../../../hook/useHttp";
import { dressMainData } from "../../../../hook/ContextTeam";
import TextFormAdd from "./TextFormGroup/TextFormAdd";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSize from "./Details/AddSize/AddSize";
import AllSizeModalEdit from "./DetailsForMobile/CategoriesMobileDropUp/AllSizeModalEdit/AllSizeModalEdit";
import CategoriesMobileDropUp from "./DetailsForMobile/CategoriesMobileDropUp/CategoriesMobileDropUp";
import CarouselEdit from "./Details/ProductCarouselEdit/CarouselEdit";
import { ClipLoader, PuffLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;


const { Option } = Select;
const url = "https://api.dressme.uz/api/seller";

// Все размеры

const AddingProduct = () => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const navigate = useNavigate()

  const { id } = useParams()
  const newProductId = id

  const { request } = useHttp();
  const [state, setState] = useState({
    showColor: false,
    openSelect: false,
    // --------------
    ClothingSection: false,
    SubClothingSection: false,
    DressSeason: false,
    Colour: false,
    GenderModal: false,
    DressTypeModal: false,
    MakeCountryModal: false,
    // ClothingCategoryModal: false,
    isCheckValid: false,
    errorList: null,
    errorListMessage: null,
    type_Id: null,
    // --------------
    pictureBgFile1: null,
    pictureBgFile2: null,
    pictureBgFile3: null,
    pictureBgFile4: null,
    // ---------------
    shopId: '',
    shopLocationId: '',
    shopLocationIds: [],
    section_Id: [],
    sub_Section_Id: [],
    season_Id: [],
    color_Id: '',
    gender_Id: '',
    min_Age_Category: '',
    max_Age_Category: '',
    sku: '',
    category_Id: '',
    filterTypeId: '',
    producer_Id: '',


    // -----Details-----
    PathnameToken: '',
    // ------
    sendingLoader: false,
    imageAddError: null,
    clearAddSize: false,
    //productsDataIdEdit
    sizeGetList: '',
    //---------------
    newColorByAddSizes: '',
    // AllChekcedSizeList
    checkedSizeList: [],
    lastElementColorId: '',
    // ----
    onEditInput: false,
    onEditTextForm: false,
    // -----
    subSectionToggle: false
  });

  const [deleteColorId, setDeleteColorId] = useState(null);
  const [hideToggleIcons, setHideToggleIcons] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [addSizeDisable, setAddSizeDisable] = useState(null);

  function CallBackHeadWear(childData) {
    setState({ ...state, newColorByAddSizes: childData })
  }
  function AllCheckedSizeList(childData, lastElementColorId) {
    setState({ ...state, checkedSizeList: childData, lastElementColorId: lastElementColorId })
  }
  // console.log();
  // console.log(state?.checkedSizeList, state?.lastElementColorId, "checkedSizeList---lastElementColorId");
  function randomCode(len) {
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    setState({
      ...state,
      sku: [...Array(len)].reduce((a) => a + p[~~(Math.random() * p.length)], ""),
      onEditInput: true
    }
    )
  }

  // ---------Callback----
  const onEditTextFormCall = React.useCallback(
    () => setState({ ...state, onEditTextForm: true }),
    []
  ); // onEdittextForm
  // console.log(state?.onEditTextForm, "onEditTextForm");
  const ClothingSectionToggle = React.useCallback(
    () => setState({ ...state, ClothingSection: false }),
    []
  ); // ClothingSection
  const SubClothingSectionToggle = React.useCallback(
    () => setState({ ...state, SubClothingSection: false }),
    []
  ); // ClothingSection
  const DressSeasonToggle = React.useCallback(
    () => setState({ ...state, DressSeason: false }),
    []
  ); // ClothingSection
  const ColourListToggle = React.useCallback(
    () => setState({ ...state, Colour: false }),
    []
  ); // ClothingSection
  const GenderListToggle = React.useCallback(
    () => setState({ ...state, GenderModal: false }),
    []
  ); // ClothingSection
  const DressTypeToggle = React.useCallback(
    () => setState({ ...state, DressTypeModal: false }),
    []
  ); // ClothingSection
  const MakeCountryToggle = React.useCallback(
    () => setState({ ...state, MakeCountryModal: false }),
    []
  ); // ClothingSection



  const [openCategories, setOpenCategories] = useState();
  const toggleCategories = React.useCallback(
    () => setOpenCategories(false),
    []
  ); // Categories
  const [selectColorID, setSelectColorID] = useState()
  const [colorChecked, setColorChecked] = useState();
  const [colorAction, setColorAction] = useState(false);
  const [colorDelete, setColorDelete] = useState(false);
  const [colorListForTest, setColorListForTest] = useState([]);
  const [lastElement, setLastElement] = useState('')

  const [productsDataIdEdit, setProductsDataIdEdit] = useState();
  const [section_Id, setSection_Id] = useState([]);
  const [subSection_Id, setSubSection_Id] = useState([]);
  const [season_Id, setSeason_Id] = useState([]);
  const [colors_Id, setColors_Id] = useState([]);
  const [arrDat, setArrData] = useState([])
  // console.log(newProductId, "newProductId");


  const { refetch } = useQuery(["products_id"], () => {
    return request({ url: `/products/${newProductId}`, token: true })
  },
    {
      onSuccess: (res) => {
        setProductsDataIdEdit(res?.product)

        res?.product?.sections?.map(value => {
          if (!section_Id) {
            setSection_Id(section_Id => [...section_Id, value?.id])
          }
          if (!section_Id?.includes(value?.id)) {
            setSection_Id(section_Id => [...section_Id, value?.id])
          }
        })

        res?.product?.sub_sections?.map(value => {
          if (!subSection_Id) {
            setSubSection_Id(subSection_Id => [...subSection_Id, value?.id])
          }
          if (!subSection_Id?.includes(value?.id)) {
            setSubSection_Id(subSection_Id => [...subSection_Id, value?.id])
          }
        })

        res?.product?.seasons?.map(value => {
          if (!season_Id) {
            setSeason_Id(season_Id => [...season_Id, value?.id])
          }
          if (!season_Id?.includes(value?.id)) {
            setSeason_Id(season_Id => [...season_Id, value?.id])
          }
        })

        res?.product?.colors?.map(value => {
          if (!colors_Id?.includes(value?.id)) {
            setColors_Id(colors_Id => [...colors_Id, value?.id])
          }
          if (!colorListForTest?.includes(value?.id)) {
            setColorListForTest(colorListForTest => [...colorListForTest, value?.id])
          }
          if (!selectColorID) {
            setColorChecked(res?.product?.colors[0]?.id)
            setSelectColorID(res?.product?.colors[0]?.id)
          }
        })

        if (!state?.gender_Id && !state?.min_Age_Category && !state?.max_Age_Category && !state?.sku && !state?.filterTypeId && !state?.producer_Id) {
          setState({
            ...state,
            gender_Id: res?.product?.gender_id,
            min_Age_Category: res?.product?.min_age_category,
            max_Age_Category: res?.product?.max_age_category,
            sku: res?.product?.sku,
            category_Id: res?.product?.category_id,
            filterTypeId: res?.product?.type_id,
            producer_Id: res?.product?.producer_id,
            shopId: res?.product?.shop[0]?.id,
            shopLocationId: res?.product?.shop_locations[0]?.id,
            shopLocationIds: res?.product?.shop_locations,
            sizeGetList: res?.product
          })
        }
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  // ------------------------------------------------------------------------ border-red-500
  // allSizeModalShow
  const [allSizeModalShow, setAllSizeModalShow] = useState(false);
  const toggleAllSizeModalShow = React.useCallback(
    () => setAllSizeModalShow(false),
    []
  );


  // ------------------------------------------------------------------------
  const handleChangeSection = (e) => {
    if (e?.length < section_Id?.length) {
      if (section_Id?.length > 1) {
        setSection_Id(e)
        setState({ ...state, onEditInput: true })
      }
    } else {
      setSection_Id(e)
      setState({ ...state, onEditInput: true })
    }
  }
  // ---------Mobile Device--------
  const handleChangeSectionMobile = (e) => {
    setState({ ...state, onEditInput: true })
    if (section_Id?.length === 0) {
      setSection_Id(section_Id => [...section_Id, e])
    }
    if (section_Id?.length > 0 && !section_Id?.includes(e)) {
      setSection_Id(section_Id => [...section_Id, e])
    }
  }
  const handleChangeSectionDeleteMobile = (e) => {
    setState({ ...state, onEditInput: true })
    if (section_Id?.length > 0 && section_Id?.includes(e)) {
      setSection_Id(section_Id?.filter((v) => v !== e))
    }
  }


  const [newArray, setNewArray] = useState([])
  useEffect(() => {
    setNewArray([])
    dressInfo?.getProductInfo?.sections?.map(item => {
      item?.sub_sections?.map(item => {
        if (section_Id?.includes(Number(item?.section_id))) {
          if (!newArray) {
            setNewArray(newArray => [...newArray, item])
          } else {
            setNewArray(newArray => [...newArray, item])
          }
        }
      })
    })
    if (newArray?.length === 0) {
      setState({ ...state, subSection_Id: [] })
    }
  }, [section_Id, dressInfo?.getProductInfo])
  // console.log(productsData, "productsData");
  // console.log(section_Id, "section_Id");
  // -----------------------------------------------------------
  // ColorHandle
  // ------------------------------------------------------------------------

  function onHanleColorList(e) {
    if (!colorListForTest?.includes(e)) {
      setSelectColorID(e)
      if (colorListForTest?.length + 2 > colors_Id?.length && colors_Id?.length > colorListForTest?.length && e) {
        setColors_Id(colors_Id?.filter(e => e !== colors_Id[colors_Id?.length - 1]))
        setColors_Id(colors_Id => [...colors_Id, e])
      } else {
        setColors_Id(colors_Id => [...colors_Id, e])
      }

    }
  }
  // console.log(colors_Id?.length, "colors_Id?.length ");


  function onHandleColorUnchecked(id) {
    if (colorListForTest?.includes(id)) {
      setDeleteColorId(id)
      setColorDelete(true)
    } else {
      setColors_Id(colors_Id?.filter(e => e !== id))
      setSelectColorID(colorListForTest[0])
    }

  }

  useEffect(() => {
    if (!colorListForTest?.includes(selectColorID) && selectColorID > 0) {
      setColorAction(true)
      setLastElement(selectColorID)
    } else {
      setColorAction(false)
      setLastElement()
    }
  }, [selectColorID, productsDataIdEdit?.colors])

  // -----------------------------------------------------------
  // console.log(selectColorID, "selectColorID");
  const onSearch = (value) => {
    // console.log("search:", value);
  };

  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      if (getCurrentDimension().width < 758 && state?.showColor) {
        setState({ ...state, showColor: false });
      }
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const LocationAddSubmit = () => {
    // console.log(state?.textListOfFormList, " state?.textListOfFormList");
  }
  // const CallBackTextForm = (childData) => {
  // };
  const handleNextPage = () => {
    setDressInfo({ ...dressInfo, nextPageShowForm: false })
  }

  const handleChangeSubSection = (e) => {
    if (e?.length < subSection_Id?.length) {
      if (newArray) {
        if (subSection_Id?.length > 1) {
          setSubSection_Id(e)
          setState({ ...state, onEditInput: true })
        }
      } else {
        setSubSection_Id(e)
        setState({ ...state, onEditInput: true })
      }
    } else {
      setSubSection_Id(e)
      setState({ ...state, onEditInput: true })
    }
  }

  const handleChangeSubSectionMobile = (e) => {
    setState({ ...state, onEditInput: true })
    if (subSection_Id?.length === 0) {
      setSubSection_Id(subSection_Id => [...subSection_Id, e])
    }
    if (subSection_Id?.length > 0 && !subSection_Id?.includes(e)) {
      setSubSection_Id(subSection_Id => [...subSection_Id, e])
    }
  }
  const handleChangeSubSectionDeleteMobile = (e) => {
    setState({ ...state, onEditInput: true })
    if (subSection_Id?.length > 0 && subSection_Id?.includes(e)) {
      setSubSection_Id(subSection_Id?.filter((v) => v !== e))
    }
  }

  useEffect(() => {
    if (section_Id?.length > 1) {
      setSection_Id(section_Id.filter((x, i, a) => a.indexOf(x) == i))
    }
  }, [dressInfo?.getProductInfo])
  // }, [productsData])

  useEffect(() => {
    if (subSection_Id?.length > 1) {
      setSubSection_Id(subSection_Id.filter((x, i, a) => a.indexOf(x) == i))
    }
  }, [newArray, section_Id])


  function onHandleChangeSeason(e) {
    if (e?.length < season_Id?.length) {
      if (season_Id?.length > 1) {
        setSeason_Id(e)
        setState({ ...state, onEditInput: true })
      }
    } else {
      setSeason_Id(e)
      setState({ ...state, onEditInput: true })
    }
  }
  // --------Mobile Season
  const onHandleChangeSeasonMobile = (e) => {
    setState({ ...state, onEditInput: true })
    if (season_Id?.length === 0) {
      setSeason_Id(season_Id => [...season_Id, e])
    }
    if (season_Id?.length > 0 && !season_Id?.includes(e)) {
      setSeason_Id(season_Id => [...season_Id, e])
    }

  }
  const onHandleChangeSeasonDeleteMobile = (e) => {
    setState({ ...state, onEditInput: true })
    if (season_Id?.length > 0 && season_Id?.includes(e)) {
      setSeason_Id(season_Id?.filter((v) => v !== e))
    }
  }


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [dressInfo?.nextPageShowForm]);

  const location = useLocation();
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname !== '/products')
      setState({ ...state, PathnameToken: pathname.replace("/products/location/:", "") })

  }, [location.pathname]);

  useEffect(() => {
    if (state?.PathnameToken) {
      setDressInfo({ ...dressInfo, productAddByIdForToggle: state?.PathnameToken })
    }
  }, [state?.PathnameToken]);


  // ---------Callback----
  useEffect(() => {
    if (
      state?.showColor ||
      // state?.ClothingCategoryModal ||
      state?.ClothingSection ||
      state?.Colour ||
      state?.DressSeason ||
      state?.DressTypeModal ||
      state?.GenderModal ||
      state?.MakeCountryModal ||
      state?.SubClothingSection ||
      allSizeModalShow
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    state?.showColor,
    // state?.ClothingCategoryModal,
    state?.ClothingSection,
    state?.Colour,
    state?.DressSeason,
    state?.DressTypeModal,
    state?.GenderModal,
    state?.MakeCountryModal,
    state?.SubClothingSection,
    allSizeModalShow
  ]);
  function onHandleImageAdd(childData) {
    setState({
      ...state,
      pictureBgFile1: childData?.image_File_5,
      pictureBgFile2: childData?.image_File_6,
      pictureBgFile3: childData?.image_File_7,
      pictureBgFile4: childData?.image_File_8,
    })
  }
  useEffect(() => {
    setState({ ...state, imageAddError: null })
  }, [lastElement])
  // console.log(state?.newColorByAddSizes?.amount, state?.newColorByAddSizes?.price, state?.checkedSizeList, "---------------");
  const onHandleAddImage = async () => {
    setState({ ...state, sendingLoader: true })
    let form = new FormData();
    state?.pictureBgFile1 && form.append("photos[]", state?.pictureBgFile1);
    state?.pictureBgFile2 && form.append("photos[]", state?.pictureBgFile2);
    state?.pictureBgFile3 && form.append("photos[]", state?.pictureBgFile3);
    state?.pictureBgFile4 && form.append("photos[]", state?.pictureBgFile4);

    state?.shopLocationIds?.forEach((index) => {
      form.append("shop_location_ids[]", Number(index?.id));
    })
    // form.append("shop_location_ids[]", dressInfo?.locationIdAddProduct);
    form.append("color_id", Number(lastElement));
    state?.checkedSizeList?.forEach((index) => {
      form.append("product_size_ids[]", Number(index));
    })
    state?.newColorByAddSizes?.price && form.append("price", state?.newColorByAddSizes?.price);
    state?.newColorByAddSizes?.amount && form.append("amount", state?.newColorByAddSizes?.amount);
    state?.newColorByAddSizes?.age && form.append("age", Number(state?.newColorByAddSizes?.age));
    state?.newColorByAddSizes?.discount_percent && form.append("discount_percent", state?.newColorByAddSizes?.discount_percent);//no R
    state?.newColorByAddSizes?.discount_price && form.append("discount_price", state?.newColorByAddSizes?.discount_price);//no R

    // // HeadWear
    state?.newColorByAddSizes?.sizeCheck && form.append("one_size", state?.newColorByAddSizes?.sizeCheck ? 1 : 0);
    state?.newColorByAddSizes?.minHeadGirth && form.append("min_head_girth", state?.newColorByAddSizes?.minHeadGirth);
    state?.newColorByAddSizes?.maxHeadGirth && form.append("max_head_girth", state?.newColorByAddSizes?.maxHeadGirth);
    // // OutWear
    state?.newColorByAddSizes?.outWearLetterSize && form.append("outwear_letter_size", state?.newColorByAddSizes?.outWearLetterSize);
    state?.newColorByAddSizes?.minOutWearSize && form.append("min_outwear_size", state?.newColorByAddSizes?.minOutWearSize);
    state?.newColorByAddSizes?.maxOutWearSize && form.append("max_outwear_size", state?.newColorByAddSizes?.maxOutWearSize);
    state?.newColorByAddSizes?.minChestGirth && form.append("min_chest_girth", state?.newColorByAddSizes?.minChestGirth);
    state?.newColorByAddSizes?.maxChestGirth && form.append("max_chest_girth", state?.newColorByAddSizes?.maxChestGirth);
    state?.newColorByAddSizes?.minOutWearWaistGirth && form.append("min_outwear_waist_girth", state?.newColorByAddSizes?.minOutWearWaistGirth);
    state?.newColorByAddSizes?.maxOutWearWaistGirth && form.append("max_outwear_waist_girth", state?.newColorByAddSizes?.maxOutWearWaistGirth);
    state?.newColorByAddSizes?.minOutWearHipGirth && form.append("min_outwear_hip_girth", state?.newColorByAddSizes?.minOutWearHipGirth);
    state?.newColorByAddSizes?.maxOutWearHipGirth && form.append("max_outwear_hip_girth", state?.newColorByAddSizes?.maxOutWearHipGirth);
    // // UnderWear
    state?.newColorByAddSizes?.underWearLetterSize && form.append("underwear_letter_size", state?.newColorByAddSizes?.underWearLetterSize);
    state?.newColorByAddSizes?.minHeight && form.append("min_height", state?.newColorByAddSizes?.minHeight);
    state?.newColorByAddSizes?.maxHeight && form.append("max_height", state?.newColorByAddSizes?.maxHeight);
    state?.newColorByAddSizes?.minUnderWearSize && form.append("min_underwear_size", state?.newColorByAddSizes?.minUnderWearSize);
    state?.newColorByAddSizes?.maxUnderWearSize && form.append("max_underwear_size", state?.newColorByAddSizes?.maxUnderWearSize);
    state?.newColorByAddSizes?.minUnderwearWaistGirth && form.append("min_underwear_waist_girth", state?.newColorByAddSizes?.minUnderwearWaistGirth);
    state?.newColorByAddSizes?.maxUnderwearWaistGirth && form.append("max_underwear_waist_girth", state?.newColorByAddSizes?.maxUnderwearWaistGirth);
    state?.newColorByAddSizes?.minUnderWearHipGirth && form.append("min_underwear_hip_girth", state?.newColorByAddSizes?.minUnderWearHipGirth);
    state?.newColorByAddSizes?.maxUnderWearHipGirth && form.append("max_underwear_hip_girth", state?.newColorByAddSizes?.maxUnderWearHipGirth);
    // // FooterSize
    state?.newColorByAddSizes?.footWearSize && form.append("footwear_size", state?.newColorByAddSizes?.footWearSize);
    state?.newColorByAddSizes?.minFootLength && form.append("min_foot_length", state?.newColorByAddSizes?.minFootLength);
    state?.newColorByAddSizes?.maxFootLength && form.append("max_foot_length", state?.newColorByAddSizes?.maxFootLength);
    // // Accessory
    state?.newColorByAddSizes?.accessoryLetterSize && form.append("accessory_letter_size", state?.newColorByAddSizes?.accessoryLetterSize);
    state?.newColorByAddSizes?.accessorySize && form.append("accessory_size", state?.newColorByAddSizes?.accessorySize);
    state?.newColorByAddSizes?.legnthAcc && form.append("length", state?.newColorByAddSizes?.legnthAcc);
    state?.newColorByAddSizes?.widthAcc && form.append("width", state?.newColorByAddSizes?.widthAcc)
    try {
      const res = await fetch(`${url}/products/${Number(newProductId)}/add-product-color`, {
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
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          setState({ ...state, sendingLoader: false, imageAddError: res_1?.errors })
        } else if (res_1?.message) {
          toast.success(`${res_1?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          setState({
            ...state,
            pictureBgFile1: null,
            pictureBgFile2: null,
            pictureBgFile3: null,
            pictureBgFile4: null,
            sendingLoader: false,
            imageAddError: null,
            clearAddSize: !state?.clearAddSize
          })
          setProductsDataIdEdit()
          setLastElement()
          setSelectColorID()
          refetch()
        }
        // console.log(res_1, "Product--Store--Added");
      }
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setState({ ...state, sendingLoader: false })
      throw new Error(err?.message || "something wrong");
    }
  }
  // -------Delete Color ID
  const deleteColor = useMutation(() => {
    return request({
      url: `/products/${Number(newProductId)}/delete-product-color`,
      method: "POST",
      token: true,
      body: {
        color_id: deleteColorId
      }
    });
  });

  function onHandleDeleteColor() {
    setLoader(true)
    setHideToggleIcons(true)
    deleteColor.mutate({},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setErrorMessage(res?.message)
            setLoader(false)
            refetch()
            setTimeout(() => {
              setHideToggleIcons(false)
              setColorDelete(false)
            }, 3000);
          } else if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            setColors_Id([])
            setColorListForTest([])
            setColorChecked()
            setSelectColorID()
            setProductsDataIdEdit()
            refetch()
            setTimeout(() => {
              setHideToggleIcons(false)
              setColorDelete(false)
              setState({ ...state, showColor: false, })
            }, 1000);
          }
        },

        onError: err => {
          toast.error(`${err?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          // refetch()

        }
      })
  }

  const productUpdate = (childData) => {
    setState({ ...state, isCheckValid: true })
    if (newArray?.length && subSection_Id?.length) {
      setState({ ...state, sendingLoader: true, })
      let form = new FormData();
      section_Id && section_Id?.forEach((index) => {
        form.append("section_ids[]", Number(index));
      })
      subSection_Id && subSection_Id?.forEach((index) => {
        form.append("sub_section_ids[]", Number(index));
      })
      season_Id && season_Id?.forEach((index) => {
        form.append("season_ids[]", Number(index));
      })
      state?.gender_Id && form.append("gender_id", state?.gender_Id);
      state?.min_Age_Category && form.append("min_age_category", state?.min_Age_Category);
      state?.max_Age_Category && form.append("max_age_category", state?.max_Age_Category);
      state?.sku && form.append("sku", state?.sku);
      state?.filterTypeId && form.append("type_id", parseFloat(state?.filterTypeId));
      state?.producer_Id && form.append("producer_id", state?.producer_Id);
      childData?.name_Uz && form.append("name_uz", childData?.name_Uz);
      childData?.name_Ru && form.append("name_ru", childData?.name_Ru);
      childData?.quality_Uz && form.append("quality_uz", childData?.quality_Uz);
      childData?.quality_Ru && form.append("quality_ru", childData?.quality_Ru);
      childData?.description_Uz && form.append("description_uz", childData?.description_Uz);
      childData?.description_Ru && form.append("description_ru", childData?.description_Ru);
      childData?.composition_Uz && form.append("composition_uz", childData?.composition_Uz);//no R
      childData?.composition_Ru && form.append("composition_ru", childData?.composition_Ru);//no R
      childData?.brand_id && form.append("brand_id", childData?.brand_id);//no R

      return fetch(`${url}/products/${Number(newProductId)}`, {
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
            toast.error(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            setState({ ...state, onEditInput: false, sendingLoader: false, isCheckValid: false })
          } else if (res?.message) {
            toast.success(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            refetch()
            setState({ ...state, onEditInput: false, sendingLoader: false })
          }
          // console.log(res, "ProductStore---Added");
        })
        .catch((err) => {
          toast.error(`${err?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        });
    }
    if (!newArray?.length) {
      setState({ ...state, sendingLoader: true, })
      let form = new FormData();
      section_Id && section_Id?.forEach((index) => {
        form.append("section_ids[]", Number(index));
      })
      subSection_Id && subSection_Id?.forEach((index) => {
        form.append("sub_section_ids[]", Number(index));
      })
      season_Id && season_Id?.forEach((index) => {
        form.append("season_ids[]", Number(index));
      })
      state?.gender_Id && form.append("gender_id", state?.gender_Id);
      state?.min_Age_Category && form.append("min_age_category", state?.min_Age_Category);
      state?.max_Age_Category && form.append("max_age_category", state?.max_Age_Category);
      state?.sku && form.append("sku", state?.sku);
      state?.filterTypeId && form.append("type_id", parseFloat(state?.filterTypeId));
      state?.producer_Id && form.append("producer_id", state?.producer_Id);
      childData?.name_Uz && form.append("name_uz", childData?.name_Uz);
      childData?.name_Ru && form.append("name_ru", childData?.name_Ru);
      childData?.quality_Uz && form.append("quality_uz", childData?.quality_Uz);
      childData?.quality_Ru && form.append("quality_ru", childData?.quality_Ru);
      childData?.description_Uz && form.append("description_uz", childData?.description_Uz);
      childData?.description_Ru && form.append("description_ru", childData?.description_Ru);
      childData?.composition_Uz && form.append("composition_uz", childData?.composition_Uz);//no R
      childData?.composition_Ru && form.append("composition_ru", childData?.composition_Ru);//no R
      childData?.brand_id && form.append("brand_id", childData?.brand_id);//no R

      return fetch(`${url}/products/${Number(newProductId)}`, {
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
            toast.error(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            setState({ ...state, onEditInput: false, sendingLoader: false, isCheckValid: false, })
          } else if (res?.message) {
            toast.success(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            refetch()
            setState({ ...state, onEditInput: false, sendingLoader: false, isCheckValid: false })

          }
          // console.log(res, "ProductStore---Added");
        })
        .catch((err) => {
          toast.error(`${err?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        });
    }
  };

  useEffect(() => {
    if (newArray?.length) {
      setState({ ...state, subSectionToggle: true })
    } else {
      setState({ ...state, subSectionToggle: false })
    }
  }, [newArray?.length, subSection_Id?.length])

  useEffect(() => {
    if (colorAction) {
      if (state?.checkedSizeList?.length && state?.lastElementColorId) {
        setAddSizeDisable('AllSize')
      }
      if (state?.newColorByAddSizes?.price && state?.newColorByAddSizes?.amount) {
        setAddSizeDisable('AddSize')
      }
    }
    if (!colorAction) {
      setAddSizeDisable(null)
    }
  }, [state?.checkedSizeList?.length, state?.lastElementColorId, addSizeDisable, colorAction, state?.newColorByAddSizes?.price, state?.newColorByAddSizes?.amount])
  // console.log(colorAction, "111111-colorAction");
  // console.log(addSizeDisable, "111111-addSizeDisable");
  // console.log(state?.checkedSizeList?.length, state?.lastElementColorId, "111111-state?.checkedSizeList?.length && state?.lastElementColorId");
  // console.log(state?.newColorByAddSizes, "111111-state?.newColorByAddSizes?.priceNum && state?.newColorByAddSizes?.quantityNum");
  useEffect(() => {
    if (!dressInfo?.locationIdAddProduct) {
      navigate(-1)
    }
  }, [])
  console.log(state?.filterTypeId, "state?.filterTypeId");
  console.log(state?.type_Id, "state?.type_Id");

  return (
    <div className="w-full h-fit ">
      <div>
        <div className=" flex items-center grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2 mt-5 ">
          {state?.errorListMessage && <div className="w-full  flex items-center gap-x-2 ">
            <span className="text-[16px] text-textRedColor font-AeonikProRegular">{state?.errorListMessage}</span>
          </div>}
          {state?.errorList?.shop_id && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Магазин:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.shop_id[0]}</span>
          </div>}
          {state?.errorList?.shop_location_id && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Локация:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.shop_location_id[0]}</span>
          </div>}
          {state?.errorList?.section_ids && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Раздел одежды:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.section_ids[0]}</span>
          </div>}
          {state?.errorList?.season_ids && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Сезон одежды:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.season_ids[0]}</span>
          </div>}
          {state?.errorList?.color_id && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Цвет:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.color_id[0]}</span>
          </div>}
          {state?.errorList?.gender_id && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Пол:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.gender_id[0]}</span>
          </div>}
          {state?.errorList?.min_age_category && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Возраст Min:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.min_age_category[0]}</span>
          </div>}
          {state?.errorList?.max_age_category && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Возраст Max:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.max_age_category[0]}</span>
          </div>}
          {state?.errorList?.category_id && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Категория одежды:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.category_id[0]}</span>
          </div>}
          {state?.errorList?.type_id && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Тип:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.type_id[0]}</span>
          </div>}
          {state?.errorList?.producer_Id && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Производитель:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.producer_Id[0]}</span>
          </div>}
          {state?.errorList?.amount && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Количество:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.amount[0]}</span>
          </div>}
          {state?.errorList?.price && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Цена:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.price[0]}</span>
          </div>}
          {state?.errorList?.photos && <div className="w-full  flex items-center gap-x-2 ">
            <span className=" md:text-base font-AeonikProRegular">Выберите фото:</span>
            <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.photos[0]}</span>
          </div>}

        </div>
        <div className={`${dressInfo?.nextPageShowForm ? "flex" : "hidden"}  relative w-full md:px-0  items-center justify-between mb-[50px] my-6 md:my-[50px] focus:bg-textBlueColor `}>
          {/* <ToastContainer
            style={{ zIndex: "1000", top: "80px" }}
            position="top-right"
            autoClose={3000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          /> */}
          <section
            onClick={() => {
              setState({
                ...state,
                ClothingSection: false,
                SubClothingSection: false,
                DressSeason: false,
                Colour: false,
                GenderModal: false,
                DressTypeModal: false,
                MakeCountryModal: false,
                // ClothingCategoryModal: false,
                showColor: false,
                openSelect: false,
              })
              setAllSizeModalShow(false)
              setOpenCategories(false)
              setColorDelete(false)

            }
            }
            className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.ClothingSection ||
                state?.SubClothingSection ||
                state?.DressSeason ||
                state?.Colour ||
                state?.GenderModal ||
                state?.DressTypeModal ||
                // state?.ClothingCategoryModal ||
                state?.showColor ||
                state?.openSelect ||
                state?.MakeCountryModal ||
                allSizeModalShow ||
                openCategories ||
                colorDelete
                ? ""
                : "hidden"
              }`}
          ></section>
          <section
            onClick={() => { setColorDelete(false) }}
            className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${colorDelete ? "" : "hidden"}`}
          ></section>

          {state?.showColor && (
            // {` max-w-[600px] h-fit fixed    px-3 md:px-6  py-2 md:py-4 bg-white rounded-b-none md:rounded-b-lg	 rounded-t-lg  mx-auto w-full duration-500 z-[113] md:top-[50%] left-1/2 right-1/2 translate-x-[-50%] md:translate-y-[-50%] overflow-hidden ${state?.openModalRegions
            //   ? " bottom-0 md:flex flex-col"
            //   : "md:hidden bottom-[-1500px] z-[-10]"
            //   }`}
            <div className={`
            ${screenSize > 768 ?
                'max-w-[650px] w-full fixed z-[221]  md:top-[50%] left-1/2 right-1/2 translate-x-[-50%] md:translate-y-[-50%]  h-fit flex items-center  justify-center mx-auto'
                :
                `${state?.showColor ? " bottom-0 md:flex flex-col"
                  : "md:hidden bottom-[-1500px] z-[-10]"
                } max-w-[650px] w-full fixed z-[221] duration-300  md:top-[50%] left-1/2 right-1/2 translate-x-[-50%] md:translate-y-[-50%]  h-fit flex items-center  justify-center mx-auto`}
            `}>
              {/* </div> */}
              <div className="relative z-[223]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-t-md  md:rounded-md shadow-lg">
                <div
                  className={`flex items-center justify-between border-b border-searchBgColor pb-3`}
                >
                  <div className="w-fit flex items-center">
                    <span className="text-black text-[14px] md:text-lg not-italic font-AeonikProRegular leading-5">
                      Выберите цвет
                    </span>
                    <span className="text-[11px] md:text-sm ml-[10px] text-[#a1a1a1] font-AeonikProRegular">
                      (Можно добавить максимум 4 цвета)
                    </span>
                  </div>
                  <button
                    className="py-2"
                    type="button"
                    onClick={() => setState({ ...state, showColor: false })}
                  >
                    <MenuCloseIcons colors={"#000"} />
                  </button>
                </div>
                <div className="w-full py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6">
                  {dressInfo?.getProductInfo?.colors.map((data) => {
                    return (
                      <div
                        key={data?.id}
                        className={`flex flex-col items-center justify-center ${colors_Id?.length === 4 ? colors_Id?.includes(data?.id) ? "" : "opacity-50" : ""} `}>
                        <div
                          className={` relative md:rounded-[12px] rounded-full overflow-hidden flex items-center justify-center w-10 h-10 md:w-[65px] md:h-[40px] bg-[${data.hex
                            }] cursor-pointer ${data?.id == 2
                              ? "border border-setTexOpacity flex items-center justify-center"
                              : ""
                            }
                     `}
                        >
                          <div
                            onClick={
                              colors_Id?.length < 4 ? () => onHanleColorList(data?.id) : null
                            }
                            style={{ background: `${data.hex}` }}
                            className="w-full h-full ">

                          </div>
                          {colors_Id?.includes(data?.id) ? (
                            <span onClick={() => onHandleColorUnchecked(data?.id)} className="absolute z-[221] w-[20px] h-[20px] rounded-b-md	 right-0 top-0 hover:opacity-70 absolute bg-black flex items-center justify-center p-[1px]">
                              <MenuCloseIcons colors={"#fff"} /></span>
                          ) : null}

                          {/* {state?.color_Id === 2 && data?.id === state?.color_Id ? (
                              <InputCheckedTrueIcons colors={"#000"} />
                            ) : null} */}
                        </div>
                        <span
                          className={`text-black text-center text-[10px] ll:text-[11px] md:text-[14px] not-italic font-AeonikProRegular ${colors_Id?.includes(data?.id) ? "border-b border-fullBlue" : ""}`}
                        >
                          {data?.name_ru}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end  gap-x-5">

                  {state?.color_Id &&
                    <button
                      onClick={() => setState({ ...state, color_Id: '', showColor: false })}
                      className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"                    >
                      Отключить
                    </button>
                  }
                  <button onClick={() => setState({ ...state, showColor: false })}
                    className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-sm md:text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                    Готово
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Color Delete Of Pop Confirm */}
          <section
            className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${colorDelete ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
              }`}
          >
            <button
              onClick={() => setColorDelete(false)}
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
                  <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                    <DeleteIcon width={30} />
                  </span>
                </span>
                <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                  Вы уверены?
                </span>
                <span className=" text-[#a2a2a2] text-base xs:text-lg not-italic font-AeonikProMedium text-center">
                  Если вы удалите цвет, то удалятся все фото и размеры выбранного цвета!
                </span>
              </div>}
            <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">

              <button
                onClick={() => setColorDelete(false)}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                Oтмена
              </button>
              <button
                onClick={() => onHandleDeleteColor()}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                Удалить
              </button>
            </div>

          </section>
          <section
            className={` max-w-[440px] md:max-w-[700px] z-[201] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[25px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openSelect ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
              }`}
          >
            <button
              onClick={() => setState({ ...state, openSelect: false })}
              type="button"
              className="absolute  right-3 top-3 w-5 h-5 "
            >
              <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
            </button>
            <div className="w-full h-fit flex items-center justify-center py-5 border-b border-borderColor2">
              <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
                Прикрепить к локация
              </p>
            </div>
            <div className="w-full px-[10px] py-[30px] flex flex-col gap-y-[10px]">
              {dressInfo?.getProductInfo?.shops?.filter(e => Number(e?.id) === Number(state?.shopId)).map((item) => {
                return item?.shop_locations?.map(data => {
                  return (
                    <button
                      onClick={() => setState({ ...state, shopLocationId: data?.id, openSelect: false })}
                      key={data?.id}
                      className={`w-full py-[10px] px-[20px] flex items-center justify-between rounded-[8px] ${data?.id == dressInfo?.locationIdAddProduct ? "bg-LocationSelectBg" : "bg-white"} hover:bg-LocationSelectBg focus:bg-LocationSelectBg`}
                    >
                      <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                        {" "}
                        {data?.address}
                      </span>
                      {
                        Number(data?.id) === Number(dressInfo?.locationIdAddProduct) &&
                        <BiCheckDouble size={25} color={"#007dca"} />
                      }
                    </button>
                  )
                })
              })
              }

            </div>
          </section>

          <div className="absolute top-[0px] hidden md:flex items-center justify-center flex-col mr-[50px]">
            <div className="w-[45px] h-[45px] font-AeonikProMedium border-2 flex items-center justify-center bg-textBlueColor border-textBlueColor rounded-full text-2xl text-white mb-[5px]">
              1
            </div>
            <div className="w-[2px] h-[150px] bg-textBlueColor active:bg-textBlueColor mb-[5px] "></div>
            <div className="flex items-center justify-center font-AeonikProMedium text-textBlueColor text-2xl border border-textBlueColor w-[45px] h-[45px] rounded-full mb-[5px]">
              2
            </div>
            <div className="line flex-1"></div>
          </div>

          {/* ---------------------------------------- */}
          {/* Categories Mobile Bottom Modal Animation Section */}
          {/* Clothing Section */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.ClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
              <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                <p className="text-xl font-AeonikProMedium"> Раздел товара</p>
                <button onClick={() => setState({ ...state, ClothingSection: false })}>
                  <CloseAnswer colors={"#000"} />
                </button>
              </section>
              <section className="w-full h-[400px] px-4 flex flex-col items-center">
                <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                  <form className='w-full flex flex-col items-center'>
                    <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                      <input type="text" name='clothingTypes' placeholder='Искать раздел' className='w-full pr-3 outline-none' />
                      <SearchIcon />
                    </div>
                    <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                      {dressInfo?.getProductInfo?.sections?.map((item) => {
                        return (
                          <div
                            onClick={() => handleChangeSectionMobile(item?.id)}
                            key={item?.id}
                            className={`w-full ${section_Id?.includes(item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                            {item.name_ru}
                            {section_Id?.includes(item?.id) && <span onClick={() => handleChangeSectionDeleteMobile(item?.id)}><MenuCloseIcons colors={'#b5b5b5'} /></span>}
                          </div>
                        );
                      })}
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </section>
          {/*Sub Clothing Section */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden  ${state?.SubClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
              <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                <p className={`text-xl font-AeonikProMedium `}>Подраздел одежды</p>
                <button onClick={() => setState({ ...state, SubClothingSection: false })}>
                  <CloseAnswer colors={"#000"} />
                </button>
              </section>
              <section className="w-full h-[400px] px-4 flex flex-col items-center">
                <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                  <form className='w-full flex flex-col items-center'>
                    <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                      <input type="text" name='clothingTypes' placeholder='Искать раздел' className='w-full pr-3 outline-none' />
                      <SearchIcon />
                    </div>
                    <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                      {newArray?.map((item) => {
                        return (
                          <div
                            onClick={() => handleChangeSubSectionMobile(item?.id)}
                            key={item?.id} className={`w-full ${subSection_Id?.includes(item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                            {item.name_ru}
                            {subSection_Id?.includes(item?.id) && <span onClick={() => handleChangeSubSectionDeleteMobile(item?.id)}><MenuCloseIcons colors={'#b5b5b5'} /></span>}
                          </div>
                        );
                      })}
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </section>
          {/*DressSeason */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressSeason ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
              <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                <p className="text-xl font-AeonikProMedium">Сезон товара</p>
                <button onClick={() => setState({ ...state, DressSeason: false })}>
                  <CloseAnswer colors={"#000"} />
                </button>
              </section>
              <section className="w-full h-[400px] px-4 flex flex-col items-center">
                <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                  <form className='w-full flex flex-col items-center'>
                    <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                      <input type="text" name='clothingTypes' placeholder='Искать раздел' className='w-full pr-3 outline-none' />
                      <SearchIcon />
                    </div>
                    <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                      {dressInfo?.getProductInfo?.seasons?.map((item) => {
                        return (
                          <div onClick={() => onHandleChangeSeasonMobile(item?.id)} key={item?.id} className={`w-full ${season_Id?.includes(item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                            {item.name_ru}
                            {season_Id?.includes(item?.id) && <span onClick={() => onHandleChangeSeasonDeleteMobile(item?.id)}><MenuCloseIcons colors={'#b5b5b5'} /></span>}
                          </div>
                        );
                      })}
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </section>
          {/*GenderModal */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.GenderModal ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
              <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                <p className="text-xl font-AeonikProMedium"> Пол</p>
                <button onClick={() => setState({ ...state, GenderModal: false })}>
                  <CloseAnswer colors={"#000"} />
                </button>
              </section>
              <section className="w-full h-[400px] px-4 flex flex-col items-center">
                <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                  <form className='w-full flex flex-col items-center'>
                    <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                      <input type="text" name='clothingTypes' placeholder='Искать раздел' className='w-full pr-3 outline-none' />
                      <SearchIcon />
                    </div>
                    <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                      {dressInfo?.getProductInfo?.gender?.map((item) => {
                        return (
                          <div onClick={() => setState({ ...state, gender_Id: item?.id, onEditInput: true, })} key={item?.id} className={`w-full ${state?.gender_Id == item?.id ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                            {item.name_ru}
                            {state?.gender_Id == (item?.id) && <span onClick={() => setState({ ...state, gender_Id: null, onEditInput: true })}><MenuCloseIcons colors={'#b5b5b5'} /></span>}
                          </div>
                        );
                      })}
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </section>
          {/*Type */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressTypeModal ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
              <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                <p className="text-xl font-AeonikProMedium"> Тип</p>
                <button onClick={() => setState({ ...state, DressTypeModal: false })}>
                  <CloseAnswer colors={"#000"} />
                </button>
              </section>
              <section className="w-full h-[400px] px-4 flex flex-col items-center">
                <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                  <form className='w-full flex flex-col items-center'>
                    <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                      <input type="text" name='clothingTypes' placeholder='Искать раздел' className='w-full pr-3 outline-none' />
                      <SearchIcon />
                    </div>
                    <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                      {state?.category_Id ? dressInfo?.getProductInfo?.types?.filter(e => e?.category_id == state?.category_Id)?.map((item) => {
                        return (
                          <div
                            onClick={() => setState({ ...state, filterTypeId: item?.id, onEditInput: true, type_Id: item?.category_id })}
                            key={item?.id} className={`w-full ${state?.filterTypeId == item?.id ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                            {item.name_ru}
                            {state?.filterTypeId == (item?.id) && <span onClick={() => setState({ ...state, filterTypeId: null, onEditInput: true })}><MenuCloseIcons colors={'#b5b5b5'} /></span>}

                          </div>
                        )
                      }) :
                        dressInfo?.getProductInfo?.types?.map((item) => {
                          return (
                            <div
                              onClick={() => setState({ ...state, filterTypeId: item?.id, onEditInput: true, type_Id: item?.category_id })}
                              key={item?.id} className={`w-full ${state?.filterTypeId == (item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                              {item.name_ru}
                              {state?.filterTypeId == (item?.id) && <span onClick={() => setState({ ...state, filterTypeId: null, onEditInput: true })}><MenuCloseIcons colors={'#b5b5b5'} /></span>}

                            </div>
                          )
                        })
                      }
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </section>
          {/*MakeCountry */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.MakeCountryModal ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
              <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                <p className="text-xl font-AeonikProMedium"> Производитель</p>
                <button onClick={() => setState({ ...state, MakeCountryModal: false })}>
                  <CloseAnswer colors={"#000"} />
                </button>
              </section>
              <section className="w-full h-[400px] px-4 flex flex-col items-center">
                <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                  <form className='w-full flex flex-col items-center'>
                    <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                      <input type="text" name='clothingTypes' placeholder='Искать раздел' className='w-full pr-3 outline-none' />
                      <SearchIcon />
                    </div>
                    <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                      {dressInfo?.getProductInfo?.producers?.map((item) => {
                        return (
                          <div
                            onClick={() => setState({ ...state, producer_Id: item?.id })}
                            key={item?.id} className={`w-full ${state?.producer_Id == (item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                            {item.name_ru}
                            {state?.producer_Id == (item?.id) && <span onClick={() => setState({ ...state, producer_Id: null, onEditInput: true })}><MenuCloseIcons colors={'#b5b5b5'} /></span>}
                          </div>
                        );
                      })}
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </section>

          {/* ---------------------------------------- */}

          <div className="w-full md:mx-[140px] md:mb-[50px] xs:border border-borderColor rounded-xl md:px-0 p-1">
            <div className="w-full h-fit md:relative md:py-12">
              <div className=" w-full h-fit flex gap-x-4 flex-col-reverse md:flex-row md:px-7 ">
                <div className="w-full md:w-[70%] h-fit flex flex-col gap-y-6 border border-red-600">
                  <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-6 mt-6 md:mt-0">
                    {/* Input Select 1.1 */}
                    <div className=" w-full h-fit flex flex-col gap-y-[5px] overflow-hidden">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Магазин
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>

                      <div className={`w-full  cursor-not-allowed flex rounded-lg overflow-hidden`}>
                        <button
                          type="button"
                          className="w-full cursor-not-allowed h-[40px]  bg-[#F5F5F5] rounded-lg flex items-center justify-between border border-borderColor px-3"
                        >
                          <span>
                            <span
                              className=" mt-[3px] font-AeonikProRegular capitalize text-[12px] md:text-[14px] text-[#b5b5b5]">
                              {productsDataIdEdit?.shop?.name}
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                    {/* Input Select 2.1 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className={`text-[13px] md:text-base font-AeonikProRegular ${state?.shopId ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                          Локация
                        </span>
                      </div>

                      <div className="w-full  cursor-not-allowed h-fit flex">
                        <button
                          type="button"
                          className="w-full cursor-not-allowed h-[40px] overflow-hidden bg-[#F5F5F5] rounded-lg flex items-center justify-between border border-borderColor px-1 md:px-3"
                        >
                          <span>
                            <span
                              className="w-[95%] flex items-center text-tableTextTitle2 text-[11px] xs:text-[12px] md:text-[14px] not-italic font-AeonikProRegular"
                            >
                              {productsDataIdEdit?.shop_locations?.filter(e => e?.id == dressInfo?.locationIdAddProduct)?.map(item => {
                                return (
                                  <span className="w-full leading-[15px]	 text-start text-[11px] xs:text-[12px] md:text-[14px]  overflow-hidden text-[#b5b5b5] flex items-center">
                                    {item?.address}
                                  </span>
                                )
                              })}
                            </span>

                          </span>
                        </button>
                      </div>
                    </div>
                    {/* Input Select 1 */}
                    <div className=" w-full h-fit flex flex-col gap-y-[5px] ">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Раздел товара
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={
                          colorAction ? null : () =>
                            setState({ ...state, ClothingSection: true })
                        }
                        type="button"
                        className={`w-full min-h-[40px] relative rounded-lg py-[2px] flex md:hidden items-center   justify-between border border-borderColor px-3 
                        ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""}
                        `}
                      >
                        {colorAction ?
                          section_Id?.length ?
                            <div className="w-fit h-full rounded-lg flex flex-wrap overflow-hidden text-[#b5b5b5] bg-[#F5F5F5]">
                              {dressInfo?.getProductInfo?.sections?.filter(e => section_Id?.includes(e?.id))?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {item?.name_ru}
                                  </span>
                                )
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between text-[#b5b5b5] bg-[#F5F5F5]">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                          :
                          section_Id?.length ?
                            <div className="w-full h-full rounded-lg flex flex-wrap overflow-hidden ">
                              {dressInfo?.getProductInfo?.sections?.filter(e => section_Id?.includes(e?.id))?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {item?.name_ru}
                                  </span>
                                )
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                        }
                      </button>
                      <div className={`w-full  hidden md:flex  rounded-lg focus:border-none `}>
                        <Select
                          className={` rounded-lg w-full  ${state?.isCheckValid && !section_Id?.length ? "!border border-[#FFB8B8] !bg-[#FFF6F6]" : ""}`}
                          showSearch
                          mode="multiple"
                          placeholder="Выбрать"
                          optionLabelProp="label"
                          disabled={colorAction ? true : false}
                          value={dressInfo?.getProductInfo?.sections?.filter(e => section_Id?.includes(e?.id))?.map((item) => { return item?.id })}
                          onChange={(e) => handleChangeSection(e)}
                          onSearch={onSearch}
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {dressInfo?.getProductInfo?.sections?.map((item) => {
                            return (
                              <Option
                                key={item.id}
                                value={item.id}
                                label={item.name_ru}
                              >
                                <Space>
                                  <span>{item.name_ru}</span>
                                </Space>
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    {/* Input Select 2 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className={`text-[13px] md:text-base font-AeonikProRegular ${state?.subSectionToggle ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                          Подраздел товара
                        </span>
                        <span className="ml-[5px]">
                          {state?.subSectionToggle ? (
                            <StarLabel />
                          ) : null}
                        </span>
                      </div>
                      <button
                        onClick={
                          state?.subSectionToggle ?
                            () => setState({ ...state, SubClothingSection: true })
                            : null
                        }
                        type="button"
                        className={`w-full min-h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3
                        ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""}
                        `}
                      >
                        {subSection_Id?.length ?
                          <div className="w-full h-full rounded-lg flex flex-wrap items-center justify-start gap-1">
                            {newArray?.filter(e => subSection_Id?.includes(e?.id))?.map((item) => {
                              return (
                                <span className="text-[13px] md:text-base font-AeonikProRegular">{item?.name_ru}</span>
                              )
                            })}
                          </div>
                          :
                          <div className="w-full h-full rounded-lg flex items-center justify-between">
                            <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                              Выбрать
                            </span>
                            <ArrowRightIcon />
                          </div>
                        }
                      </button>
                      <div className="w-full h-fit hidden md:flex">
                        <Select
                          className={`rounded-lg w-full  ${newArray?.length && state?.isCheckValid && !subSection_Id?.length ? "border border-[#FFB8B8] bg-[#FFF6F6]" : " border-borderColor bg-white"}`}
                          showSearch
                          disabled={colorAction || !state?.subSectionToggle}
                          placeholder="Выбрать"
                          mode="multiple"
                          optionLabelProp="label"
                          value={newArray?.filter(e => subSection_Id?.includes(e?.id))?.map((item) => { return item?.id })}
                          onChange={handleChangeSubSection}
                          onSearch={onSearch}
                          size="large"
                          // allowClear
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {newArray?.map(item => {
                            return (
                              <Option
                                key={item.id}
                                value={item.id}
                                label={item.name_ru}
                              >
                                <Space>
                                  {dressInfo?.getProductInfo?.sections?.filter(e => e?.id == item?.section_id)?.map((data, index) => {
                                    return <div key={index} className=" flex items-center">
                                      <p className="flex  items-center font-AeonikProRegular">{item.name_ru} </p>
                                      <p className="text-[12px]  flex items-center  ml-[8px] text-[#b5b5b5] font-AeonikProRegular">({data?.name_ru})</p>
                                    </div>
                                  })}
                                </Space>
                              </Option>
                            )
                          })
                          }
                        </Select>
                      </div>
                    </div>
                    {/* Input Select 3 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Сезон товара
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={colorAction ? null : () => setState({ ...state, DressSeason: true })}
                        type="button"
                        className={`w-full h-[40px] py-[2px]  rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3
                        ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""}
                        `}
                      >
                        {colorAction ?
                          season_Id?.length ?
                            <div className="w-fit h-full rounded-lg flex items-center gap-x-1 text-[#b5b5b5] bg-[#F5F5F5]">
                              {dressInfo?.getProductInfo?.seasons?.filter(e => season_Id?.includes(e?.id))?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {item?.name_ru}

                                  </span>)
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between text-[#b5b5b5] bg-[#F5F5F5]">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                          :
                          season_Id?.length ?
                            <div className="w-full h-full rounded-lg flex items-center gap-x-1">
                              {dressInfo?.getProductInfo?.seasons?.filter(e => season_Id?.includes(e?.id))?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {item?.name_ru}

                                  </span>)
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                        }
                      </button>
                      <div className="w-full h-fit hidden md:flex">
                        <Select
                          className={`overflow-hidden rounded-lg w-full  ${state?.isCheckValid && !season_Id?.length ? "!border border-[#FFB8B8] !bg-[#FFF6F6]" : ""}`}
                          mode="multiple"
                          disabled={colorAction ? true : false}
                          placeholder="Выбрать"
                          value={dressInfo?.getProductInfo?.seasons?.filter(e => season_Id?.includes(e?.id))?.map((item) => { return item?.id })}
                          size="large"
                          onChange={(e) => {
                            onHandleChangeSeason(e)
                          }}
                          optionLabelProp="label"
                        >
                          {dressInfo?.getProductInfo?.seasons?.map((item) => {
                            return (
                              <Option
                                key={item.id}
                                value={item.id}
                                label={item.name_ru}
                              >
                                <Space>
                                  <span>{item.name_ru}</span>
                                </Space>
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    {/* Input Select 4 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Цвет
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className={` w-fit ${colorAction ? "p-[4px] border-[3px] border-yellow-500 rounded-lg " : ""}`}>
                        <div className={`w-fit flex items-center gap-x-2 justify-start  overflow-hidden                   
                        ${state?.imageAddError?.color_id && !lastElement ? "border-[2px] border-textRedColor " : "border border-borderColor"}   rounded-lg  h-[42px] md:h-10 px-[12px]`}>
                          {dressInfo?.getProductInfo?.colors
                            ?.filter((e) => colors_Id?.includes(e?.id))
                            ?.map((data) => {
                              return (
                                <div key={data?.id} className="block w-fit">
                                  <div className="w-full ">
                                    <label
                                      key={data?.id}
                                      htmlFor={data?.id}
                                      onClick={() => setSelectColorID(data?.id)}

                                      style={{ background: `${data.hex}` }}
                                      className={`rounded-full border  w-[22px] h-[22px] p-[2px] cursor-pointer flex items-center justify-center hover:scale-110 duration-300 `}
                                    >

                                      {data?.id === (selectColorID || colorChecked) && (selectColorID || colorChecked) !== 1 ? (
                                        <BiCheck size={28} color={"#000"} className="flex items-center justify-center" />
                                      ) : null}

                                      {(selectColorID || colorChecked) === 1 && data?.id === (selectColorID || colorChecked) ? (
                                        <BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />
                                      ) : null}
                                    </label>
                                    <input
                                      type="radio"
                                      id={data?.id}
                                      name="checkStatus"
                                      value={data?.id}
                                      className={"hidden w-full h-full"}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          <button
                            onClick={() => setState({ ...state, showColor: true })}
                            type="button"
                          >
                            <AddIconsCircle1 />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Input Select 5 */}
                    <div className="w-full h-fit  flex items-center gap-x-3">
                      <div className="w-full md:w-1/2 flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Пол
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <button
                          onClick={colorAction ? null : () => setState({ ...state, GenderModal: true })}
                          type="button"
                          className={`w-full h-[40px] py-[2px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3
                          ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""}
                          `}
                        >
                          {colorAction ?
                            state?.gender_Id ?
                              <div className="w-fit h-full rounded-lg flex items-center gap-x-1 text-[#b5b5b5] bg-[#F5F5F5]">
                                {dressInfo?.getProductInfo?.gender?.filter(e => state?.gender_Id == e?.id)?.map((item) => {
                                  return (
                                    <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                      {item?.name_ru}
                                    </span>
                                  )
                                })}
                              </div>
                              :
                              <div className="w-full h-full rounded-lg flex items-center justify-between text-[#b5b5b5] bg-[#F5F5F5]">
                                <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                  Выбрать
                                </span>
                                <ArrowRightIcon />
                              </div>
                            :
                            state?.gender_Id ?
                              <div className="w-full h-full rounded-lg flex items-center gap-x-1">
                                {dressInfo?.getProductInfo?.gender?.filter(e => state?.gender_Id == e?.id)?.map((item) => {
                                  return (
                                    <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                      {item?.name_ru}

                                    </span>
                                  )
                                })}
                              </div>
                              :
                              <div className="w-full h-full rounded-lg flex items-center justify-between">
                                <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                  Выбрать
                                </span>
                                <ArrowRightIcon />
                              </div>
                          }
                        </button>
                        <div className="w-full h-fit md:flex hidden">
                          <Select
                            className={` ${state?.isCheckValid && !state?.gender_Id ? "border border-[#FFB8B8] " : ""}
                          rounded-lg w-full h-11 md:h-10 overflow-hidden`}
                            showSearch
                            placeholder="Выбрать"
                            optionFilterProp="children"
                            disabled={colorAction ? true : false}
                            value={dressInfo?.getProductInfo?.gender?.filter(e => e?.id == state?.gender_Id)?.map((item) => { return item?.id })}
                            onChange={(e) => setState({ ...state, gender_Id: e, onEditInput: true })}
                            onSearch={onSearch}
                            size="large"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={dressInfo?.getProductInfo?.gender?.map((item) => {
                              return {
                                value: item?.id,
                                label: item?.name_ru,
                              };
                            })}
                          />
                        </div>
                      </div>
                      <div className="w-1/2 hidden md:flex flex-col gap-y-[5px] ">
                        <div className="flex items-center">
                          <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                            Возраст
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-fit flex items-center gap-x-2">
                          {colorAction ? <span className={` cursor-not-allowed outline-none w-[55px] h-10 text-center text-[#b5b5b5] bg-[#F5F5F5] border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                          >{state?.min_Age_Category}</span> :
                            <input
                              type="text"
                              name="minAge"
                              placeholder="Мин"
                              value={state?.min_Age_Category}
                              onChange={(e) => setState({ ...state, onEditInput: true, min_Age_Category: e.target.value })}
                              className={`inputStyle outline-none w-[55px] h-10 text-center  ${state?.isCheckValid && !state?.min_Age_Category ? "border border-[#FFB8B8] " : "border border-borderColor"}  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                            />}
                          <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                          {colorAction ? <span className={` cursor-not-allowed outline-none w-[55px] h-10 text-center text-[#b5b5b5] bg-[#F5F5F5] border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                          >{state?.max_Age_Category}</span> :
                            <input
                              type="text"
                              name="maxAge"
                              placeholder="Макс"
                              value={state?.max_Age_Category}
                              onChange={(e) => setState({ ...state, onEditInput: true, max_Age_Category: e.target.value })}
                              className={`inputStyle outline-none w-[55px] h-10 text-center  ${state?.isCheckValid && !state?.max_Age_Category ? "border border-[#FFB8B8] " : "border border-borderColor"}  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                            />}
                        </div>
                      </div>
                    </div>
                    {/* Input Select 6 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center  ">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Артикул
                        </span>

                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className="w-full h-fit flex items-center justify-between gap-x-3">
                        {colorAction ?
                          <span className={` cursor-not-allowed px-3 text-[12px] md:text-base outline-none w-[calc(100%-42px)] h-10 text-start text-[#b5b5b5] bg-[#F5F5F5] border border-borderColor  flex items-center  rounded-lg font-AeonikProRegular `}
                          >{state?.sku}</span> :
                          <input
                            type="text"
                            value={state?.sku}
                            onChange={(e) => setState({ ...state, onEditInput: true, sku: e.target.value })}
                            name="artikul"
                            placeholder=""
                            className={`inputStyle w-[calc(100%-42px)] h-10    flex items-center justify-between ${state?.isCheckValid && !state?.sku ? "border border-[#FFB8B8] " : "border border-borderColor"} rounded-lg px-[10px] outline-none`}
                          />}
                        {colorAction ?
                          <button
                            type={"button"}
                            className={`w-[40px] h-[40px] cursor-not-allowed  opacity-50 flex items-center justify-center  bg-textBlueColor border border-borderColor rounded-lg`}
                          >
                            <LoaderIcon />
                          </button> :
                          <button
                            onClick={() => randomCode(17)}
                            type={"button"}
                            className={`w-[40px] h-[40px] active:scale-95  active:opacity-70 flex items-center justify-center  bg-textBlueColor border border-borderColor rounded-lg`}
                          >
                            <LoaderIcon />
                          </button>}
                      </div>
                    </div>
                    {/* Input Select 7 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Категория товара
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        type="button"
                        className={`w-full flex md:hidden items-center justify-between border border-borderColor rounded-lg h-[40px] px-3 
                        ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""}
                        `}
                      >
                        {colorAction ?
                          state?.category_Id ?
                            <div className="w-fit h-full rounded-lg flex items-center justify-between text-[#b5b5b5] bg-[#F5F5F5">
                              {dressInfo?.getProductInfo?.categories?.filter(e => e?.id == state?.category_Id)?.map((item, index) => {
                                return <span key={index} className="text-[#a1a1a1] text-[13px] md:text-base font-AeonikProRegular">{item?.name_ru}</span>
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between text-[#b5b5b5] bg-[#F5F5F5]">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                          :
                          state?.category_Id ?
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              {dressInfo?.getProductInfo?.categories?.filter(e => e?.id == state?.category_Id)?.map((item, index) => {
                                return <span key={index} className="text-[#a1a1a1] text-[13px] md:text-base font-AeonikProRegular">{item?.name_ru}</span>
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                        }
                      </button>
                      <div className="w-full  cursor-not-allowed h-fit md:flex flex-col hidden">
                        <button
                          type="button"
                          className={`w-full cursor-not-allowed overflow-hidden ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""} cursor-text h-[40px] hidden md:flex items-center justify-between border border-borderColor  rounded-lg p-3 `}
                        >
                          {dressInfo?.getProductInfo?.categories?.filter(e => e?.id == state?.category_Id)?.map((item, index) => {
                            return <span key={index} className="text-[#a1a1a1]">{item?.name_ru}</span>

                          })}
                        </button>
                      </div>
                    </div>
                    {/* Input Select 8 */}
                    <div className="w-full   h-fit  hidden md:flex items-center gap-x-3">
                      <div className="w-1/2 flex flex-col gap-y-[5px] ">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Тип
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-fit">
                          <Select
                            className={`overflow-hidden block rounded-lg w-full h-11 md:h-10  ${state?.isCheckValid && !state?.filterTypeId ? "border border-[#FFB8B8] bg-[#FFF6F6]" : ""}`}
                            showSearch
                            // allowClear
                            disabled={colorAction ? true : false}
                            placeholder="Выбрать"
                            value={dressInfo?.getProductInfo?.types?.filter(e => e?.id == state?.filterTypeId)?.map((item) => { return item?.name_ru })}
                            optionFilterProp="children"
                            onChange={(value, attribute2) => {
                              setState({ ...state, filterTypeId: value, onEditInput: true, type_Id: attribute2?.attribute2 })
                            }}
                            onSearch={onSearch}
                            size="large"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          >
                            {state?.category_Id ? dressInfo?.getProductInfo?.types?.filter(e => e?.category_id == state?.category_Id)?.map((item) => {
                              return (
                                <Option
                                  key={"item_" + item.id}
                                  value={item?.id}
                                  attribute2={item?.category_id}
                                >
                                  {item.name_ru}
                                </Option>
                              )
                            }) : dressInfo?.getProductInfo?.types?.map((item) => {
                              return (
                                <Option
                                  key={"item_" + item.id}
                                  value={item?.id}
                                  attribute2={item?.category_id}
                                >
                                  {item.name_ru}
                                </Option>
                              )
                            })
                            }
                          </Select>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col gap-y-[5px] ">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Производитель
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-11 md:h-10 overflow-hidden">
                          <Select
                            className={`overflow-hidden rounded-lg w-full  h-full ${state?.isCheckValid && !state?.producer_Id ? "border border-[#FFB8B8] " : ""}`}
                            showSearch
                            disabled={colorAction ? true : false}
                            placeholder="Выбрать"
                            optionFilterProp="children"
                            value={dressInfo?.getProductInfo?.producers?.filter(e => e?.id == state?.producer_Id)?.map((item) => { return item?.name_ru })}
                            onChange={(e) => setState({ ...state, producer_Id: e })}
                            onSearch={onSearch}
                            size="large"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={dressInfo?.getProductInfo?.producers?.map((item) => {
                              return {
                                value: item?.id,
                                label: item?.name_ru,
                              };
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Input Select 9 mobile */}
                    <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Тип
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={colorAction ? null : () => setState({ ...state, onEditInput: true, DressTypeModal: true })}
                        type="button"
                        className={`w-full h-[40px] py-[2px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3
                        ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""}
                        `}
                      >
                        {colorAction ? state?.category_Id ?
                          <div className="w-fit h-full rounded-lg flex items-center gap-x-1 text-[#b5b5b5] bg-[#F5F5F5]">
                            {dressInfo?.getProductInfo?.types?.filter(e => e?.id == state?.filterTypeId)?.map((item) => {
                              return (
                                <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                  {item?.name_ru}

                                </span>)
                            })}
                          </div>
                          :
                          <div className="w-full h-full rounded-lg flex items-center justify-between text-[#b5b5b5] bg-[#F5F5F5]">
                            <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                              Выбрать
                            </span>
                            <ArrowRightIcon />
                          </div>
                          :
                          state?.category_Id ?
                            <div className="w-full h-full rounded-lg flex items-center gap-x-1">
                              {dressInfo?.getProductInfo?.types?.filter(e => e?.id == state?.filterTypeId)?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {item?.name_ru}

                                  </span>)
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                        }
                      </button>
                    </div>
                    {/* Input Select 10 mobile */}
                    <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Производитель
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={
                          colorAction ? null :
                            () =>
                              setState({ ...state, MakeCountryModal: true })
                        }
                        type="button"
                        className={`w-full h-[40px] py-[2px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3
                        ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""}
                        `}
                      >
                        {colorAction ?
                          state?.producer_Id ?
                            <div className="w-fit h-full rounded-lg flex items-center gap-x-1 text-[#b5b5b5] bg-[#F5F5F5]">
                              {dressInfo?.getProductInfo?.producers?.filter(e => e?.id == state?.producer_Id)?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {item?.name_ru}

                                  </span>)
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between text-[#b5b5b5] bg-[#F5F5F5]">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                          :
                          state?.producer_Id ?
                            <div className="w-full h-full rounded-lg flex items-center gap-x-1">
                              {dressInfo?.getProductInfo?.producers?.filter(e => e?.id == state?.producer_Id)?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {item?.name_ru}

                                  </span>)
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                Выбрать
                              </span>
                              <ArrowRightIcon />
                            </div>
                        }
                      </button>

                    </div>
                    {/* Input Select 11 mobile */}
                    <div className="w-full  flex md:hidden flex-col gap-y-[5px] ">
                      <div className="flex items-center">
                        <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                          Возрастная категория
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className="w-full h-fit flex items-center justify-between gap-x-2">
                        {colorAction ? <span className=" cursor-not-allowed inputStyle outline-none w-[40%] h-10 bg-[#f5f5f5] text-[#b5b5b5] text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                        >{state?.min_Age_Category}</span> :
                          <input
                            type="text"
                            name="minAge1"
                            placeholder="Мин"
                            value={state?.min_Age_Category}
                            onChange={(e) => setState({ ...state, min_Age_Category: e.target.value })}
                            className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                          />}
                        <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                        {colorAction ? <span className=" cursor-not-allowed inputStyle outline-none w-[40%] h-10 bg-[#f5f5f5] text-[#b5b5b5] text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                        >{state?.min_Age_Category}</span> : <input
                          type="text"
                          name="maxAge1"
                          placeholder="Макс"
                          value={state?.max_Age_Category}
                          onChange={(e) => setState({ ...state, max_Age_Category: e.target.value })}
                          className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                        />}
                      </div>
                    </div>
                    {/* Input Sizes 12 mobile */}
                    <div className="w-full  flex md:hidden flex-col gap-y-[5px] ">
                      <div className={`w-full flex items-center rounded-lg overflow-hidden  justify-between   md:gap-x-3 ${colorAction ? "p-[4px] border-[3px] border-yellow-500" : ""}`} >
                        <div className="w-[48%]">
                          {addSizeDisable == 'AddSize' ?
                            <button
                              type="button"
                              className="group w-full flex items-center justify-center h-[38px]  whitespace-nowrap text-[#b5b5b5] border border-[#b5b5b5] bg-[#F5F5F5] font-AeonikProMedium flex items-center text-[12px] md:text-sm justify-center cursor-pointer  rounded-lg  "
                            >
                              Все размеры{" "}
                            </button> :
                            <button
                              type="button"
                              onClick={() => setAllSizeModalShow(true)}
                              className="group w-full flex items-center justify-center h-[38px]  whitespace-nowrap border-textBlueColor text-textBlueColor border-[1px] font-AeonikProMedium flex items-center text-[12px] md:text-sm justify-center cursor-pointer  rounded-lg focus:bg-textBlueColor focus:text-white transition duration-300"
                            >
                              Все размеры{" "}
                            </button>}
                        </div>
                        <div className="w-[48%]">
                          {addSizeDisable == 'AllSize' ?
                            <div
                              className={`w-full text-[#b5b5b5] border border-[#b5b5b5] bg-[#F5F5F5] group h-[38px] select-none font-AeonikProMedium flex items-center justify-center text-[12px] md:text-sm cursor-pointer rounded-lg transition duration-300`}
                            >
                              <span>Добавить размер</span>
                            </div>
                            :
                            <button className={` w-full ${state?.imageAddError?.price && !state?.newColorByAddSizes?.price ? " border-[2px] border-textRedColor" : " border border-textBlueColor"} rounded-[10px] h-[38px] `}>
                              <AddSize typeId={state?.category_Id} newProductId={newProductId} onRefetch={refetch} handleCallBack={CallBackHeadWear} clearSize={state?.clearAddSize} productsDataIdEdit={productsDataIdEdit} colorListForTest={colorListForTest} selectColorID={selectColorID} />
                            </button>}
                        </div>

                      </div>
                    </div>
                    <div className={`w-full hidden md:flex items-center rounded-lg overflow-hidden  justify-between gap-x-3 ${colorAction ? "p-[4px] border-[3px] border-yellow-500" : ""}`} >
                      {addSizeDisable == 'AddSize' ?
                        <button
                          type="button"
                          className="group w-[168px] flex items-center justify-center h-[38px]  whitespace-nowrap text-[#b5b5b5] border border-[#b5b5b5] bg-[#F5F5F5] font-AeonikProMedium flex items-center text-[12px] md:text-sm justify-center cursor-pointer  rounded-lg  "
                        >
                          Все размеры{" "}
                        </button> :
                        <button
                          type="button"
                          onClick={() => setAllSizeModalShow(true)}
                          className="group w-[168px] flex items-center justify-center h-[38px]  whitespace-nowrap border-textBlueColor text-textBlueColor border-[1px] font-AeonikProMedium flex items-center text-[12px] md:text-sm justify-center cursor-pointer  rounded-lg focus:bg-textBlueColor focus:text-white transition duration-300"
                        >
                          Все размеры{" "}
                        </button>}
                      {addSizeDisable == 'AllSize' ?
                        <div
                          className={`text-[#b5b5b5] border border-[#b5b5b5] bg-[#F5F5F5] group h-[38px] select-none font-AeonikProMedium flex items-center justify-center text-[12px] md:text-sm cursor-pointer rounded-lg transition duration-300`}
                        >
                          <span>Добавить размер</span>
                        </div>
                        :
                        <button className={`${state?.imageAddError?.price && !state?.newColorByAddSizes?.price ? " border-[2px] border-textRedColor" : " border border-textBlueColor"} rounded-[10px] h-[38px]  w-fit `}>
                          <AddSize typeId={state?.category_Id} newProductId={newProductId} onRefetch={refetch} handleCallBack={CallBackHeadWear} clearSize={state?.clearAddSize} productsDataIdEdit={productsDataIdEdit} colorListForTest={colorListForTest} selectColorID={selectColorID} />
                        </button>}
                    </div>
                  </div>
                  <section
                    className={`fixed z-[115]   w-fit h-fit m-auto cursor-pointer flex items-center justify-center inset-0  overflow-hidden ${allSizeModalShow ? "" : "hidden"
                      }`}
                  >
                    {(
                      <AllSizeModalEdit ThisState={state} newProductId={newProductId} lastElement={lastElement} allColor={dressInfo?.getProductInfo?.colors} AllCheckedSizeList={AllCheckedSizeList} onClick={toggleAllSizeModalShow} onRefetch={refetch} productsDataIdEdit={productsDataIdEdit} />
                    )}{" "}
                  </section>
                </div>
                <div className={`w-full md:w-fit h-fit flex md:flex-col flex-row  border border-red-600 justify-center gap-x-4 ${colorAction ? "p-[4px] border-[3px] border-yellow-500 rounded-lg " : ""}`}>
                  {/* Img Carousel */}
                  <div className={`w-full h-fit mx-auto flex flex-col items-center justify-center border border-green-600 gap-y-[120px] rounded-lg ${state?.imageAddError?.photo && !state?.pictureBgFile1 && !state?.pictureBgFile2 && !state?.pictureBgFile3 && !state?.pictureBgFile4 ? " border-textRedColor border-[2px]" : ""}`}>
                    <CarouselEdit onHandleImage={onHandleImageAdd} clearSize={state?.clearAddSize} activeColor={selectColorID} colorListForTest={colorListForTest} colorGroup={dressInfo?.getProductInfo?.colors} onRefetch={refetch} productId={newProductId} colors_Id={colors_Id} productData={productsDataIdEdit} />
                  </div>
                </div>
              </div>
              <div className="md:relative w-full mt-[60px]  md:mt-[150px] ">
                <div className="flex md:hidden items-center justify-between mb-[40px]">
                  <div className="w-1/3 h-[1px] bg-borderColor"></div>
                  <div className="w-1/3 flex items-center justify-around">
                    <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full	">
                      <span className="w-2 h-2 rounded-full bg-textBlueColor block "></span>
                    </button>
                    <span className="w-1/2 h-[1px]  bg-textBlueColor "></span>
                    <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full"></button>
                  </div>
                  <div className="w-1/3 h-[1px] bg-borderColor"></div>
                </div>
                <div className=" flex items-center md:justify-end justify-between md:gap-x-4 mr-4">
                  {
                    lastElement ?
                      lastElement && (state?.newColorByAddSizes?.amount && state?.newColorByAddSizes?.price || state?.lastElementColorId) && (state?.pictureBgFile1 || state?.pictureBgFile2 || state?.pictureBgFile3 || state?.pictureBgFile4) ?
                        <button
                          type="button"
                          onClick={
                            state?.onEditInput ?
                              () => {
                                productUpdate()
                                onHandleAddImage()
                              }
                              :
                              () => onHandleAddImage()
                          }
                          className="w-[45%] md:w-[200px] h-[42px] md:h-[45px] flex items-center justify-center cursor-pointer  active:scale-95  py-3 border border-textBlueColor  text-textBlueColor rounded-lg text-base md:text-lg font-AeonikProMedium"
                        >
                          {state?.sendingLoader ?
                            <ClipLoader
                              className="h-full py-[2px]"
                              color={"#007DCA"}
                              size={40}
                              loading={true}
                            /> : "Сохранить"}
                        </button>
                        :
                        <span
                          className="w-[45%] select-none cursor-not-allowed  md:w-[200px] h-[42px] md:h-[45px] flex items-center justify-center border border-[#b5b5b5] text-[#b5b5b5] bg-[#f5f5f5]  py-3   t rounded-lg text-base md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </span>
                      :
                      state?.onEditInput ?
                        <button
                          type="button"
                          onClick={
                            productUpdate
                          }
                          className="w-[45%] md:w-[200px] h-[42px] md:h-[45px] flex items-center justify-center cursor-pointer  active:scale-95  py-3 border border-textBlueColor  text-textBlueColor rounded-lg text-base md:text-lg font-AeonikProMedium"
                        >
                          {state?.sendingLoader ?
                            <ClipLoader
                              className="h-full py-[2px]"
                              color={"#007DCA"}
                              size={40}
                              loading={true}
                            /> : "Сохранить"}
                        </button>
                        :
                        <span
                          className="w-[45%] select-none cursor-not-allowed  md:w-[200px] h-[42px] md:h-[45px] flex items-center justify-center border border-[#b5b5b5] text-[#b5b5b5] bg-[#f5f5f5]  py-3   t rounded-lg text-base md:text-lg font-AeonikProMedium"
                        >
                          Сохранить
                        </span>
                  }
                  <button
                    type="button"
                    onClick={handleNextPage}
                    className="w-[45%] md:w-[200px] h-[42px] md:h-[45px] flex items-center justify-center  cursor-pointer active:scale-95  py-3 border border-textBlueColor  hover:bg-textBlueColor hover:text-white text-textBlueColor rounded-lg text-base md:text-lg font-AeonikProMedium"
                  >
                    Продолжить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`relative w-full ${dressInfo?.nextPageShowForm ? "hidden" : " flex"} `}>

          <TextFormAdd productsEdit={productsDataIdEdit} onClick={onEditTextFormCall} onEdit={state?.onEditTextForm} handlCallBack={productUpdate} loading={state?.sendingLoader} />
        </div>
      </div >
    </div >
  );
};
// Добавить
export default AddingProduct;
