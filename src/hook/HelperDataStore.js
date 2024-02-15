import React, { createContext, useContext, useEffect, useState } from "react";
export const HelperData = createContext();

export default function HelperDataStore({ children }) {
    const [shopCheckedList, setShopCheckedList] = useState([])
    const [helperDatainform, setHelperDatainform] = useState({
        shopsList: null,
        deliveryList: null,
        shopCheckedList: []
    });

    return (
        <HelperData.Provider value={[helperDatainform, setHelperDatainform, shopCheckedList, setShopCheckedList]}>
            {children}
        </HelperData.Provider>
    );
}
