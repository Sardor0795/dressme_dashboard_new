import React, { useEffect } from "react";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { dressMainData } from "./hook/ContextTeam";
import { useHttp } from "./hook/useHttp";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "./components/Authentication/AxiosIntance";
import axios from "axios";
// import axiosInstance from "./components/Authentication/AxiosIntance.js";

function App() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const { request } = useHttp()
  const navigate = useNavigate()
  const url = "https://api.dressme.uz/api/seller"

  const location = useLocation();



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Set loading to true while waiting for the response
  //       setLoading(true);

  //       // Make the API request using Axios
  //       const response = await axios.get('https://api.example.com/data');

  //       // Set the data in the state
  //       setData(response.data);
  //     } catch (error) {
  //       // Set error state if there's an error
  //       setError(error);
  //     } finally {
  //       // Set loading to false regardless of success or failure
  //       setLoading(false);
  //     }
  //   };

  //   // Call the async function
  //   fetchData();
  // }, []);


  // console.log(data?.status, "data");
  // console.log(error, "error");
  // console.log(status, "status");
  // useEffect(() => {
  //   const instance = axios.create({
  //     baseURL: `${url}`,
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //       "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
  //       // Add other common headers here
  //     },
  //   });

  //   const handleFocus = () => {
  //     console.log('Window focused');
  //     // Focus event handling code
  //   };
  //   instance.get('/profile')
  //     .then(response => {
  //       console.log('Data:', response.data);
  //     })
  //     .catch(error => {
  //       if (error?.response?.status === 401) {
  //         localStorage?.removeItem("DressmeUserToken")
  //         navigate("/login-seller")
  //         console.error('Data--Error:', error);
  //       }
  //     });
  //   window.addEventListener('focus', handleFocus);

  //   // Cleanup: Remove the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener('focus', handleFocus);
  //     console.log('Event listener removed');
  //   };
  // }, []);

  useEffect(() => {
    const user = localStorage.getItem("DressmeUserToken");
    if (user) {
      setDressInfo({ ...dressInfo, IsAuthenticated: true })
    } else {
      setDressInfo({ ...dressInfo, IsAuthenticated: false })
      navigate('/login-seller')
    }
  }, [localStorage.getItem("DressmeUserToken")]);


  // ----------------Get Seller Profile-------------
  // useQuery(["Get-context-Seller-Profile"], () => {
  //   return fetch(`${url}/profile`, {
  //     method: "GET",
  //     headers: {
  //       // "Content-Type": "application/json",
  //       // "Accept": "application/json",
  //       'Content-type': 'application/json; charset=UTF-8',
  //       "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
  //     }
  //   }).then(res => res.json())
  // },
  //   {
  //     onSuccess: (res) => {
  //       console.log(res, "Response in Profile")
  //     },
  //     onError: (err) => {
  //       console.log(err, "err get profile");
  //     },

  //     keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
  //     refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
  //   }
  // )

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
  // useQuery(["products"], () => { return request({ url: "/products/locations", token: true }) },
  //   {
  //     onSuccess: (res) => {
  //       setDressInfo({ ...dressInfo, isCheckPoructList: res?.products_locations })
  //     },
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  return (
    <div>
      <NavbarDashboard />
    </div>
  );
}

export default App;
