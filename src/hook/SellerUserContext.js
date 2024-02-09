import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SellerRefresh } from "./SellerRefreshToken";
export const SellerMainData = createContext();
const { REACT_APP_BASE_URL } = process.env;

export default function SellerUserContext({ children }) {
    const [sellerInformation, setSellerInformation] = useState({
        sellerUserData: []

    });
    const [sellerRefreshToken] = useContext(SellerRefresh)

    const fetchDataSeller = async () => {
        try {
            const data = await axios.get(`${REACT_APP_BASE_URL}/profile`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                }
            });
            if (data?.status >= 200 && data?.status < 300) {
                setSellerInformation({ ...sellerInformation, sellerUserData: data?.data })
            }
            // console.log(data, "data in sellerUsercontext out Hook");

        } catch (error) {
            // console.log(error, "error in sellerUsercontext out Hook");

            if (error?.response === 401) {
                sellerRefreshToken()
            }
        }
    }
    useEffect(() => {
        if (localStorage.getItem('DressmeUserToken')) {
            const fetchDatProfile = async () => {
                try {
                    const data = await axios.get(`${REACT_APP_BASE_URL}/profile`, {
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                        }
                    });
                    if (data?.status >= 200 && data?.status < 300) {
                        setSellerInformation({ ...sellerInformation, sellerUserData: data?.data })
                        // console.log(data, "data in sellerUsercontext in hook");
                    }
                } catch (error) {
                    // console.log(error, "err0r in sellerUsercontext in hook");
                    if (error?.response === 401) {
                        fetchDataSeller()
                        sellerRefreshToken()
                    }
                }
            }
            fetchDatProfile()
        }
    }, [])
    // console.log("sellerdatamain");
    return (
        <SellerMainData.Provider value={[sellerInformation, setSellerInformation]}>
            {children}
        </SellerMainData.Provider>
    );
}
