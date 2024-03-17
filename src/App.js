import React, { useContext, useEffect, useState } from "react";

import RouterList from "./root/RouterList";
 

function App() {
 

  // useEffect(() => {
  //   const fetchDataRegions = async () => {
  //     try {
  //       const data = await axios.get(`${REACT_APP_BASE_URL}/regions`);
  //       if (data?.status >= 200 && data?.status < 300) {
  //         setRegionList(data?.data);
  //       }
  //     } catch (error) { }
  //   };
  //   if (!regionList) {
  //     fetchDataRegions();
  //   }
  // }, []);

  useEffect(() => {
    if (
      localStorage.getItem("i18nextLng") === "en-US" ||
      localStorage.getItem("i18nextLng") === "en-UZ"
    ) {
      localStorage.setItem("i18nextLng", "ru");
      window.location.reload();
    }
  }, []);

   
  console.log("app1");
  return (
    <div>
      {/* <NavbarDashboard /> */}
      <RouterList />
    </div>
  );
}

export default App;
