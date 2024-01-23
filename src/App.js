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
  const pathname = window.location.pathname;
  // console.log(pathname, "pathname");
  let pathnameMailVerif = pathname.replace("/mail-verify-seller/:", "");
  let pathnameMaResetPassword = pathname.replace("/reset-password-seller/:", "");
  // console.log(pathnameMailVerif, "pathnameMailVerif");
  // console.log(pathnameMaResetPassword, "pathnameMaResetPassword");
  const [locationWindow, setLocationWindow] = useState("");
  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname]);


  useEffect(() => {
    // Component yaratilib turilganda bir marta ishlaydi

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
          if (locationWindow !== "/signup-seller" &&
            locationWindow !== "/signup-seller" &&
            locationWindow !== "/forgot-password-seller" &&
            locationWindow !== `/reset-password-seller/:${pathnameMaResetPassword}` &&
            locationWindow !== `/mail-verify-seller/:${pathnameMailVerif}` &&
            locationWindow !== "/login-seller") {
            // navigate("/login-seller")
            console.log("work 1");
            navigate("/login-seller")
          } else {
          }
        }
      }
    };

    axiosInstance.get('/profile')
      .then(response => {
        // console.log(response, "bu-app");
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
        // console.error(error?.message, "bu app error");
      });

  }, [pathname == '/edit-profile']); // useEffect faqat bir marta chaqiriladi


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
        if (response?.status == 200) {
          localStorage.setItem("DressmeUserToken", response?.data?.access_token)
        }

      } catch (error) {
        setDressInfo({ ...dressInfo, IsAuthenticated: false })
        if (locationWindow !== "/signup-seller" &&
          locationWindow !== "/signup-seller" &&
          locationWindow !== "/forgot-password-seller" &&
          locationWindow !== `/reset-password-seller/:${pathnameMaResetPassword}` &&
          locationWindow !== `/mail-verify-seller/:${pathnameMailVerif}` &&
          locationWindow !== "/login-seller") {
          // navigate("/login-seller")
          console.log("work 2");
          navigate("/login-seller")
        } else {
        }
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

  // -----------------------------------------------------
  // -----------------------------------------------------
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
      if (locationWindow !== "/signup-seller" &&
        locationWindow !== "/signup-seller" &&
        locationWindow !== "/forgot-password-seller" &&
        locationWindow !== `/reset-password-seller/:${pathnameMaResetPassword}` &&
        locationWindow !== `/mail-verify-seller/:${pathnameMailVerif}` &&
        locationWindow !== "/login-seller") {
        // console.log("work 3");

        navigate("/login-seller")
      } else {
      }
      // console.error('Error:', error);
    }
  };
  useQuery(['get_profile_axios11'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      console.log("birinchi");
      setStatusUser();
      setDressInfo({
        ...dressInfo, IsAuthenticated: true, userData: data?.data
      });
      if (data?.status === 401) {
        postDataWithHeaders();
      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        setStatusUser(error?.response?.status);
        postDataWithHeaders();
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  // console.log(dressInfo?.userData, "userDta");
  return (
    <div>
      <NavbarDashboard />
    </div>
  );
}

export default App;
