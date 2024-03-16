import React, { createContext, useState } from "react";
export const ShopList = createContext();

export default function ShopIsList({ children }) {
    const [shopList, setShopList] = useState(null)
    return (
        <ShopList.Provider value={[shopList, setShopList]}>
            {children}
        </ShopList.Provider>
    );
}
