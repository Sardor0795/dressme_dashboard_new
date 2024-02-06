import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import MyMarket from "../MyMarket/MyMarket";
import AddStore from "../AddMarket/AddStore/AddStore";
import LoadingForSeller from "../../Loading/LoadingFor";
import "react-toastify/dist/ReactToastify.css";
import { dressMainData } from "../../../hook/ContextTeam";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default function MarketIsStoreCheck() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

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
        setDressInfo({ ...dressInfo, shopsList: data?.data })
      }
      if (data?.status === 401) {

      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {

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
          {dressInfo?.shopsList?.shops?.data?.length >= 1 && <MyMarket onRefetch={refetch} />}
          {dressInfo?.shopsList?.shops?.data?.length === 0 && <AddStore onRefetch={refetch} />}
        </div>
      )}
    </div>
  );
}
