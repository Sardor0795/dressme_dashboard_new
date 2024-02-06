import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";


export default function MarketStore() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className=" md:px-10 py-1 mb-10">
      <Outlet />
    </div>
    // <div>{!addStore ? <MyMarket /> : <AddStore onClick={toggleAdd} />}</div>
  );
}
