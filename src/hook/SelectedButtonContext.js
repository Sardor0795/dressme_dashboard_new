import { createContext, useState } from "react";

export const SelectedButtonContext = createContext();

export const SellerContextProvider = ({ children }) => {
  const [showSelectedButton, setShowSelectedButton] = useState("pending");

  return (
    <SelectedButtonContext.Provider value={[showSelectedButton, setShowSelectedButton]}>
      {children}
    </SelectedButtonContext.Provider>
  );
};