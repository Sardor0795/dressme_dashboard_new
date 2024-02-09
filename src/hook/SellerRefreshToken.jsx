import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const SellerRefresh = createContext();
const { REACT_APP_BASE_URL } = process.env;

export default function SellerRefreshContext({ children }) {
    const navigate = useNavigate();

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
                console.log('refresh Success');
                localStorage.setItem("DressmeUserToken", response?.data?.access_token)
            }

        } catch (error) {
            console.log(error, "error");
            if (error?.response?.status === 401) {
                localStorage.removeItem("DressmeUserToken");
                // window.location.reload();
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
