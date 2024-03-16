import React, { createContext, useState } from "react";
export const ShopLocationList = createContext();

export default function ShopIsLocationList({ children }) {
    const [shopLocationList, setShopLocationList] = useState(null)
    return (
        <ShopLocationList.Provider value={[shopLocationList, setShopLocationList]}>
            {children}
        </ShopLocationList.Provider>
    );
}
