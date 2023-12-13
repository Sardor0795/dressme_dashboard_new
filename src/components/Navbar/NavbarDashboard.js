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
import { useHttp } from "../../hook/useHttp";

export default function NavbarDashboard() {
  const { request } = useHttp()
  const [dressInfo, setDressInfo] = useContext(dressMainData)
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [surName, setSurName] = useState()

  // ----------------Get Seller Profile-------------
  // ------------GET  Has Location ?-----------------
  useQuery(["Get_Seller_Profile_dash"], () => { return request({ url: "/profile", token: true }); },
    {
      onSuccess: (res) => {
        setName(res?.name)
        setSurName(res?.surname)
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // -----------------------Seller Delete---------------
  const HandleLogOutSeller = useMutation(() => {
    return request({ url: `/logout`, method: "POST", token: true });
  });
  const logOutHandle = () => {
    HandleLogOutSeller.mutate({}, {
      onSuccess: res => {
        if (res?.message) {
          localStorage.clear();
          navigate("/login-seller")
          window.location.reload();
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
    <div className="flex flex-col w-full h-[100vh] ">
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
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${dressInfo?.logOutSeller ? " bottom-0 md:flex z-[113]" : "md:hidden bottom-[-800px] z-[-10]"
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
          dressInfo?.IsAuthenticated ?
            <div className="hidden fixed md:flex md:w-[300px] h-full">
              <Sidebar name={name} surName={surName} />
            </div> : null

        }
        <div className={`${dressInfo?.IsAuthenticated ? "w-full md:w-[calc(100%-300px)] md:ml-[300px]" : "w-full"} h-full `}>
          <RouterList />
        </div>
      </div>


    </div>
  );
}
