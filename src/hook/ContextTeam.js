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
    const items = localStorage.getItem('DressmeUserToken');
    if (items) {
      setDressInfo({ ...dressInfo, AccessTokenSeller: items || null })
    }
  }, []);
  console.log(dressInfo?.AccessTokenSeller, "AccessTokenSeller");
  return (
    <dressMainData.Provider value={[dressInfo, setDressInfo]}>
      {children}
    </dressMainData.Provider>
  );
}
