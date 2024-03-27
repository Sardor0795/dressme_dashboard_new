import React, { useContext, useEffect } from 'react'
import LocationList from '../Locations/LocationList/LocationList'
import NoLocations from '../NoLocations/NoLocations'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import LoadingForSeller from '../../Loading/LoadingFor'
import axios from 'axios'
import { dressMainData } from '../../../hook/ContextTeam'
import { SellerRefresh } from '../../../hook/SellerRefreshToken'
import { HelperData } from '../../../hook/HelperDataStore'
import { useTranslation } from 'react-i18next'
import { ShopList } from '../../../hook/ShopList'
import { ShopLocationList } from '../../../hook/ShopLocationList'
import axiosInstance from '../../Authentication/AxiosIntance'
const { REACT_APP_BASE_URL } = process.env;

export default function MarketIsLocationCheck() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [sellerRefreshToken] = useContext(SellerRefresh)
  const [shopList, setShopList] = useContext(ShopList)
  const [shopLocationList, setShopLocationList] = useContext(ShopLocationList)

  const { t } = useTranslation("locations");



  const fetchData = async (customHeaders) => {
    try {
      const response = await axiosInstance.get("/shops/locations/index", {
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
  const { isLoading, refetch } = useQuery(['seller_location_list33'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setShopLocationList(data?.data)
      }
    },
    onError: (error) => {
      throw new Error(error || "something wrong");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const fetchDataShop = async (customHeaders) => {
    try {
      const response = await axiosInstance.get("/shops", {
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

  useQuery(['seller_location_shop'], () => fetchDataShop(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setShopList(data?.data)
      }
    },
    onError: (error) => {
      throw new Error(error || "something wrong");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  console.log(shopLocationList, 'shopLocationList?.shop_locations?.length');
  return (
    <div>
      {isLoading
        ?
        <LoadingForSeller />
        :
        shopList?.shops?.length > 0 ? (
          shopLocationList?.locations_exist ? (
            <LocationList />
          ) : (
            <NoLocations />
          )
        ) : (
          <div className="flex items-center h-[100vh] justify-center ">
            <Link
              to="/store"
              className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
            >
              {t("first_create_a_store")}!
            </Link>
          </div>
        )}
    </div>
  );
}
