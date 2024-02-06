import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Reviews1() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-full ">
      <div>
        <Outlet />
      </div>{" "}
    </div>
  );
}
