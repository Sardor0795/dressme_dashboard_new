import React, { createContext, useState } from "react";
export const dressMainData = createContext();

export default function ContextTeam({ children }) {
  const [dressInfo, setDressInfo] = useState({
    isItPorduct: true,
    isAuthen: true,
    ConfirmAuthen: false,
  });

  return (
    <dressMainData.Provider value={[dressInfo, setDressInfo]}>
      {children}
    </dressMainData.Provider>
  );
}
