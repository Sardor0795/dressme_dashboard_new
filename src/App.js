import React from "react";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { dressMainData } from "./hook/ContextTeam";
import { useHttp } from "./hook/useHttp";

function App() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const { request } = useHttp()


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

  return <NavbarDashboard />;
}

export default App;
