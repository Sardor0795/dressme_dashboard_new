import React, { createContext, useContext, useEffect, useState } from "react";
export const HelperData = createContext();

export default function HelperDataStore({ children }) {
    const [helperDatainform, setHelperDatainform] = useState({
        shopsList: null,
        deliveryList: null
    });

    return (
        <HelperData.Provider value={[helperDatainform, setHelperDatainform]}>
            {children}
        </HelperData.Provider>
    );
}
