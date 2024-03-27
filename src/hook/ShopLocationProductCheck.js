import React, { createContext, useState } from "react";
export const ShopLocationProductCheck = createContext();

export default function ShopIsLocationProductCheck({ children }) {
    const [shopLocationProductCheck, setShopLocationProductCheck] = useState(null)
    return (
        <ShopLocationProductCheck.Provider value={[shopLocationProductCheck, setShopLocationProductCheck]}>
            {children}
        </ShopLocationProductCheck.Provider>
    );
}
 