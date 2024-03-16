import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import MyMarket from "../MyMarket/MyMarket";
import AddStore from "../AddMarket/AddStore/AddStore";
import LoadingForSeller from "../../Loading/LoadingFor";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SellerRefresh } from "../../../hook/SellerRefreshToken";
import { HelperData } from "../../../hook/HelperDataStore";
import { dressMainData } from "../../../hook/ContextTeam"; 
import { ShopList } from "../../../hook/ShopList";
const { REACT_APP_BASE_URL } = process.env;

export default function MarketIsStoreCheck() {
  const [sellerRefreshToken] = useContext(SellerRefresh)
  const [helperDatainform, setHelperDatainform] = useContext(HelperData);
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [shopList, setShopList] = useContext(ShopList)

  const fetchData = async (customHeaders) => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/shops`, {
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
  const { refetch, isLoading } = useQuery(['seller_shops_list'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        // setHelperDatainform({ ...helperDatainform, shopsList: data?.data, shopList: data?.status })
        setShopList(data?.data)

      }

      if (data?.status === 401) {
        sellerRefreshToken()
        fetchData()
        setDressInfo({ ...dressInfo, sellerStatus: data?.status })

      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        sellerRefreshToken()
        setDressInfo({ ...dressInfo, sellerStatus: error?.response?.status })

      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return (
    <div>

      {isLoading ? (
        <LoadingForSeller />
      ) : (
        <div>
          {shopList?.shops?.length >= 1 && <MyMarket onRefetch={refetch} />}
          {shopList?.shops?.length === 0 && <AddStore onRefetch={refetch} />}
        </div>
      )}
    </div>
  );
}
