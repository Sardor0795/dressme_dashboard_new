import React from "react"
import RouterList from "../../root/RouterList";
import Sidebar from "../Sidebar/Sidebar";
import { useContext } from "react";
import { dressMainData } from "../../hook/ContextTeam";

export default function NavbarDashboard() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  return (
    <div className="flex flex-col w-full h-full border border-green-500">


      <div className="relative w-full h-full flex justify-between ">
        {
          dressInfo?.AccessTokenSeller &&
          <div className="w-[300px] h-full">
            <Sidebar />
          </div>
        }
        <div className={`w-full  ${dressInfo?.AccessTokenSeller ? "md:w-[calc(100%-300px)] border border-red-500" : "md:w-full border border-black"} h-full `}>
          <RouterList />
        </div>
      </div>


    </div>
  );
}
