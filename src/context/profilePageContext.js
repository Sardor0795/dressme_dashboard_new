import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dressMainData } from "../hook/ContextTeam";
import { toast } from "react-toastify";
export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const [profileContext, setProfileContext] = useState();

  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const navigate = useNavigate();

  const url = "https://api.dressme.uz/api/seller";

  // ----------------Get Seller Profile-------------
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
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`, // Add other headers as needed
  };

  const { data, status, error } = useQuery(
    ["get_profile_axios22"],
    () => fetchData(customHeaders),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const postDataWithHeaders = async () => {
      try {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("RefreshUserToken")}`,
        };
        const data = {
          refresh_token: localStorage.getItem("RefreshUserToken"),
        };
        const response = await axios.post(`${url}/refresh-token`, data, {
          headers,
        });
        // console.log('bu-Response:', response);
        if (response?.status == 200) {
          localStorage.setItem(
            "DressmeUserToken",
            response?.data?.access_token
          );
        }
      } catch (error) {
        setDressInfo({ ...dressInfo, IsAuthenticated: false });
        navigate("/login-seller");
      }
    };
    if (localStorage?.getItem("DressmeUserToken")) {
      if (data?.error?.code === "ERR_NETWORK") {
        toast.error(`${data?.error?.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (data?.status === 200) {
        console.log("bu 200");
        setDressInfo({
          ...dressInfo,
          IsAuthenticated: true,
          userData: data?.data,
        });
      }
      if (data?.status === 401) {
        postDataWithHeaders();
        console.log("bu profile page 401");
      }
    } else {
      navigate("/login-seller");
    }
    // console.log("ishga tushdi");
  }, [data]);

  return (
    <ProfileContext.Provider value={[profileContext, setProfileContext]}>
      {children}
    </ProfileContext.Provider>
  );
}
