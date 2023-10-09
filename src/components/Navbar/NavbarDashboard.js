import React from "react"
import RouterList from "../../root/RouterList";
import Sidebar from "../Sidebar/Sidebar";


export default function NavbarDashboard() {

  return (
    <div className="flex flex-col w-full h-full border border-green-500">


      <div className="relative w-full h-full flex justify-between ">
        {
          localStorage.getItem("DressmeUserToken") ? <div className="hidden md:flex md:w-[300px] h-full">
            <Sidebar />
          </div> : null

        }
        <div className={`w-full  ${localStorage.getItem("DressmeUserToken") ? "md:w-[calc(100%-300px)] border border-red-500" : "md:w-full border border-black"} h-full `}>
          <RouterList />
        </div>
      </div>


    </div>
  );
}
