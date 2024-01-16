import React, { useEffect, useState } from "react";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { dressMainData } from "./hook/ContextTeam";
import { useHttp } from "./hook/useHttp";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "./components/Authentication/AxiosIntance";
import axios from "axios";
// import axiosInstance from "./components/Authentication/AxiosIntance.js";
import Cookies from "js-cookie";

function App() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [statusUser, setStatusUser] = useState()
  const { request } = useHttp()
  const navigate = useNavigate()

  const url = "https://api.dressme.uz/api/seller"

  const location = useLocation();



  useEffect(() => {
    // Component yaratilib turilganda bir marta ishlaydi

    const handleFocus = () => {
      const postDataWithHeaders = async () => {
        try {
          const headers = {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `Bearer ${localStorage.getItem("RefreshUserToken")}`,
          };
          const data = {
            refresh_token: localStorage.getItem("RefreshUserToken"),
          };
          const response = await axios.post(`${url}/refresh-token`, data, { headers });
          // console.log('bu-401-Response:', response);
          if (response?.status == 200) {
            localStorage.setItem("DressmeUserToken", response?.data?.access_token)
            setDressInfo({ ...dressInfo, IsAuthenticated: true })
          }

        } catch (error) {
          if (error) {
            setDressInfo({ ...dressInfo, IsAuthenticated: false })
            navigate("/login-seller")
          }
        }
      };

      axiosInstance.get('/profile')
        .then(response => {
          console.log(response, "bu-app");
          if (response) {
            setStatusUser()
            setDressInfo({ ...dressInfo, IsAuthenticated: true, userData: response?.data })
          }
        })
        .catch(error => {
          if (error?.response?.status === 401) {
            setStatusUser(error?.response?.status)

            postDataWithHeaders()
          }
          console.error(error?.message, "bu app error");
        });
      console.log('Window focused');
    };



    const handleBlur = () => { };

    // Event listenerlarni qo'shish
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []); // useEffect faqat bir marta chaqiriladi

  // -----------------------------------------------------
  // -----------------------------------------------------



  useEffect(() => {
    const postDataWithHeaders = async () => {
      try {
        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `Bearer ${localStorage.getItem("RefreshUserToken")}`,
        };
        const data = {
          refresh_token: localStorage.getItem("RefreshUserToken"),
        };
        const response = await axios.post(`${url}/refresh-token`, data, { headers });
        // console.log('bu-Response:', response);
        if (response?.status == 200) {
          localStorage.setItem("DressmeUserToken", response?.data?.access_token)
        }

      } catch (error) {
        setDressInfo({ ...dressInfo, IsAuthenticated: false })
        navigate("/login-seller")
        // console.error('Error:', error);
      }
    };
    const intervalId = setInterval(() => {
      postDataWithHeaders();
    }, 2 * 60 * 60 * 1000);
    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log(dressInfo?.userData, dressInfo?.IsAuthenticated, "bu dressInfo?.userData");

  // ------------GET  Has Location ?-----------------
  useQuery(["magazin_location"], () => { return request({ url: "/shops/locations/index", token: true }); },
    {
      onSuccess: (res) => {
        setDressInfo({ ...dressInfo, SellerMagazinLocation: res })
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      <NavbarDashboard />
    </div>
  );
}

export default App;
