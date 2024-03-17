import React, { useContext, useEffect, useState } from "react";

import RouterList from "./root/RouterList";


function App() {



  useEffect(() => {
    if (
      localStorage.getItem("i18nextLng") === "en-US" ||
      localStorage.getItem("i18nextLng") === "en-UZ"
    ) {
      localStorage.setItem("i18nextLng", "ru");
      window.location.reload();
    }
  }, []);


  return (
    <div>

      {/* <NavbarDashboard /> */}
      <RouterList />
    </div>
  );
}

export default App;
