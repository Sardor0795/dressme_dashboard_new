import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SellerMainData } from "./SellerUserContext";
export const SellerRefresh = createContext();
const { REACT_APP_BASE_URL } = process.env;

export default function SellerRefreshContext({ children }) {
    const navigate = useNavigate();
    const [sellerInformation, setSellerInformation] = useContext(SellerMainData);
    const url = "https://api.dressme.uz/api/seller";

    const fetchData = async (customHeaders) => {
        try {
            const response = await axios.get(`${url}/profile`, {
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

    const { refetch } = useQuery(['get_profile_axios11'], () => fetchData(customHeaders), {
        onSuccess: (data) => {
            if (data?.status >= 200 && data?.status < 300) {
                setSellerInformation({ ...sellerInformation, sellerUserData: data?.data })
            }
            if (data?.status === 401) {
                setSellerInformation({ ...sellerInformation, sellerUserData: [] })
                sellerRefreshToken()
            }
        },
        onError: (error) => {
            if (error?.response?.status === 401) {
                sellerRefreshToken()
                setSellerInformation({ ...sellerInformation, sellerUserData: [] })
            }
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });


    const sellerRefreshToken = async () => {
        try {
            const headers = {
                'Content-type': 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${localStorage.getItem("RefreshUserToken")}`,
            };
            const data = {
                refresh_token: localStorage.getItem("RefreshUserToken"),
            };
            const response = await axios.post(`${REACT_APP_BASE_URL}/refresh-token`, data, { headers });
            if (response?.status >= 200 && response?.status < 300) {
                localStorage.setItem("DressmeUserToken", response?.data?.access_token)
                refetch()
            }

        } catch (error) {
            if (error?.response?.status === 401) {
                localStorage.removeItem("DressmeUserToken");
                navigate("/login-seller");
            }
            if (error?.response?.status === 403) {
                localStorage.removeItem("DressmeUserToken");
                navigate("/login-seller");
            }
        }
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            sellerRefreshToken();
            // }, 5 * 10000);
        }, 2 * 59 * 60 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <SellerRefresh.Provider value={[sellerRefreshToken]}>
            {children}
        </SellerRefresh.Provider >
    );
}
