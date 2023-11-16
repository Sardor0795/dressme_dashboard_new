import { createContext, useState } from "react";

export const SelectedButtonContext = createContext();

export const SelectedButtonContextProvider = ({ children }) => {
  const [showSelectedButton, setShowSelectedButton] = useState("products");

  return (
    <SelectedButtonContext.Provider
      value={[showSelectedButton, setShowSelectedButton]}
    >
      {children}
    </SelectedButtonContext.Provider>
  );
};
