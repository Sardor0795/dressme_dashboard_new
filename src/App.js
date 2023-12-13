import React, { useEffect } from "react";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { dressMainData } from "./hook/ContextTeam";
import { useHttp } from "./hook/useHttp";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const { request } = useHttp()
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("DressmeUserToken");
    if (user) {
      setDressInfo({ ...dressInfo, IsAuthenticated: true })
    } else {
      setDressInfo({ ...dressInfo, IsAuthenticated: false })
      navigate('/login-seller')

    }
  }, [localStorage.getItem("DressmeUserToken")]);

  // useEffect(() => {
  //   if () {
  //     navigate('/login-seller')
  //   }
  // }, [localStorage.getItem("DressmeUserToken")])
  console.log(dressInfo?.IsAuthenticated);
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
  useQuery(["products"], () => { return request({ url: "/products/locations", token: true }) },
    {
      onSuccess: (res) => {
        setDressInfo({ ...dressInfo, isCheckPoructList: res?.products_locations })
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
