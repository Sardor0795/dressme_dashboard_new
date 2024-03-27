import React, { createContext, useState } from "react";
export const ShopLocationProductList = createContext();

export default function ShopIsLocationProductList({ children }) {
    const [shopLocationProductList, setShopLocationProductList] = useState(null)
    return (
        <ShopLocationProductList.Provider value={[shopLocationProductList, setShopLocationProductList]}>
            {children}
        </ShopLocationProductList.Provider>
    );
}
 