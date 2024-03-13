import React from "react";
import WiFiLoader from "../../assets/loader/wifi_loader.gif";
export default function LoadingForSeller() {
  return (
    <div className="w-full md:w-[calc(100vw-300px)] h-[100vh] flex justify-center items-center fixed left-0 md:left-[300px] top-0 z-[9999] bg-white">
      <div
        style={{
          backgroundImage: `url('${WiFiLoader}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        className="md:w-[100px] w-[60px] md:h-[100px] h-[60px]"
      ></div>
    </div>
  );
}
