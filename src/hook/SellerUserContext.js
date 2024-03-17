import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SellerRefresh } from "./SellerRefreshToken";
import { dressMainData } from "./ContextTeam";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../components/Authentication/AxiosIntance";
export const SellerMainData = createContext();
const { REACT_APP_BASE_URL } = process.env;

export default function SellerUserContext({ children }) {
    const [sellerInformation, setSellerInformation] = useState({
        sellerUserData: [],
     });

    const fetchData = async (customHeaders) => {
        try {
            const response = await axiosInstance.get("/profile", {
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
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`, // Add other headers as needed
    };
    useQuery(["profile_list1"], () => fetchData(customHeaders), {
        onSuccess: (data) => {
            if (data?.status >= 200 && data?.status < 300) {
                setSellerInformation({ ...sellerInformation, sellerUserData: data?.data })
            }
        },
        onError: (error) => {
            throw new Error(error || "something wrong");
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    return (
        <SellerMainData.Provider value={[sellerInformation, setSellerInformation]}>
            {children}
        </SellerMainData.Provider>
    );
}
