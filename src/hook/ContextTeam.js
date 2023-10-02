import React, { createContext, useEffect, useState } from "react";
export const dressMainData = createContext();

export default function ContextTeam({ children }) {
  const [dressInfo, setDressInfo] = useState({
    isItPorduct: true,
    isAuthen: true,
    ConfirmAuthen: false,
    AccessTokenSeller: ""
  });
  useEffect(() => {
    setDressInfo({ ...dressInfo, AccessTokenSeller: localStorage.getItem('DressmeUserToken') })
  }, []);
  return (
    <dressMainData.Provider value={[dressInfo, setDressInfo]}>
      {children}
    </dressMainData.Provider>
  );
}
