import React from "react"
import RouterList from "../../root/RouterList";
import Sidebar from "../Sidebar/Sidebar";
import { useContext } from "react";
import { dressMainData } from "../../hook/ContextTeam";

export default function NavbarDashboard() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  return (
    <div className="flex flex-col w-full h-full border border-green-500">
      {
        dressInfo?.AccessTokenSeller ?
          <div className="relative w-full h-full flex justify-between">
            <Sidebar />
            <div className="w-full md:w-[calc(100%-300px)] h-full md:ml-[300px]">
              <RouterList />
            </div>
          </div>
          :
          <div className="w-full h-full border border-red-500">
            <RouterList />
          </div>
      }
    </div>
  );
}
