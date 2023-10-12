import React from "react";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { dressMainData } from "./hook/ContextTeam";

function App() {

  const [dressInfo, setDressInfo] = useContext(dressMainData);


  const url = "https://api.dressme.uz/api/seller"

  // // ------------GET  Has Magazin ?-----------------
  useQuery(["magazin"], () => {
    return fetch(`${url}/shops`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",

        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setDressInfo({ ...dressInfo, SellerMagazin: res })
      },
      onError: (err) => {
        console.log(err, "err magazin");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  // ------------GET  Has Location ?-----------------
  useQuery(["magazin location"], () => {
    return fetch(`${url}/shops/locations/index`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setDressInfo({ ...dressInfo, SellerMagazinLocation: res })

      },
      onError: (err) => {
        console.log(err, "err magazin location");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
  console.log("ishga tushdi");

  return <NavbarDashboard />;
}

export default App;
