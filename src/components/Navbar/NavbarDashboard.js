import React, { useState } from "react"
import RouterList from "../../root/RouterList";
import Sidebar from "../Sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";


export default function NavbarDashboard() {
  const url = "https://api.dressme.uz/api/seller"
  const [name, setName] = useState()
  const [surName, setSurName] = useState()

  // console.log("ishga NavbarDashboard");
  // ----------------Get Seller Profile-------------
  useQuery(["Get-Seller-Profile-dash"], () => {
    return fetch(`${url}/profile`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        // "Accept": "application/json",
        'Content-type': 'application/json; charset=UTF-8',
        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      }
    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        // console.log(res, "Response in Profile Dashboard")
        setName(res?.name)
        setSurName(res?.surname)

      },
      onError: (err) => {
        console.log(err, "err get profile");
      },
    }
  )
  return (
    <div className="flex flex-col w-full h-full border border-green-500">


      <div className="relative w-full h-full flex justify-between ">
        {
          localStorage.getItem("DressmeUserToken") ? <div className="hidden fixed md:flex md:w-[300px] h-full">
            <Sidebar name={name} surName={surName} />
          </div> : null

        }
        <div className={`  ${localStorage.getItem("DressmeUserToken") ? "md:w-[calc(100%-300px)] md:ml-[300px] border border-red-500" : "md:w-full border border-black"} h-full `}>
          <RouterList />
        </div>
      </div>


    </div>
  );
}
