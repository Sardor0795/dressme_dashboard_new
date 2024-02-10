import React, { useContext, useEffect, useState } from "react";

import RouterList from "./root/RouterList";
import { dressMainData } from "./hook/ContextTeam";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

function App() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  useEffect(() => {
    const fetchDataRegions = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/regions`)
        if (data?.status >= 200 && data?.status < 300) {
          setDressInfo({ ...dressInfo, regionList: data?.data })
        }

      } catch (error) {

      }
    };

    if (!dressInfo?.regionList) {
      fetchDataRegions();
    }

  }, []); return (
    <div>
      {/* <NavbarDashboard /> */}
      <RouterList />

    </div>
  );
}

export default App;
