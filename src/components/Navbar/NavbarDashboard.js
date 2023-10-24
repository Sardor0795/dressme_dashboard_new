import React, { useState } from "react"
import RouterList from "../../root/RouterList";
import Sidebar from "../Sidebar/Sidebar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dressMainData } from "../../hook/ContextTeam";
import { useContext } from "react";
import { MenuCloseIcons, UserExitIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavbarDashboard() {
  const [dressInfo, setDressInfo] = useContext(dressMainData)
  const navigate = useNavigate()
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
  // ------------LogOutSeller------------

  // -----------------------Seller Delete---------------
  const HandleLogOutSeller = useMutation(() => {
    return fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,

      },
    }).then((res) => res.json());
  });

  const logOutHandle = () => {
    HandleLogOutSeller.mutate({}, {
      onSuccess: res => {
        if (res?.message) {
          localStorage.clear();
          navigate("/login-seller")
          window.location.reload();
          console.log(res, "logOut");
          toast.success(`${res?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setDressInfo({ ...dressInfo, logOutSeller: false })

        }
      },
      onError: err => {

      }
    })
  }
  return (
    <div className="flex flex-col w-full h-full ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div
        onClick={() => {
          setDressInfo({ ...dressInfo, logOutSeller: false })
          // setState({...state, openModalRegions: false })
        }}
        className={`fixed inset-0 z-[112] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${dressInfo?.logOutSeller ? "" : "hidden"
          }`}
      ></div>
      {/* LogOut  Account Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${dressInfo?.logOutSeller ? " bottom-0 md:flex z-[113]" : "md:hidden bottom-[-800px] z-[-10]"
          }`}

      >
        <button
          onClick={() => setDressInfo({ ...dressInfo, logOutSeller: false })}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a1a1a1"} />
        </button>
        <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">

          <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
            Вы уверены?
          </span>

        </div>
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setDressInfo({ ...dressInfo, logOutSeller: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            Oтмена
          </button>
          <button
            onClick={logOutHandle}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center gap-x-2 justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            <UserExitIcon colors={"#fff"} />{" "}
            <span>Выйти</span>
          </button>
        </div>

      </section>

      <div className="relative w-full h-full flex justify-between ">
        {
          localStorage.getItem("DressmeUserToken") ? <div className="hidden fixed md:flex md:w-[300px] h-full">
            <Sidebar name={name} surName={surName} />
          </div> : null

        }
        <div className={`  ${localStorage.getItem("DressmeUserToken") ? "md:w-[calc(100%-300px)] md:ml-[300px]" : "md:w-full border border-black"} h-full `}>
          <RouterList />
        </div>
      </div>


    </div>
  );
}
