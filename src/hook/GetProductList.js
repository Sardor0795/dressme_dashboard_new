import React, { createContext, useState } from "react";
export const GetProductList = createContext();

export default function GetProductIsList({ children }) {
    const [getProductList, setGetProductList] = useState(null)
    return (
        <GetProductList.Provider value={[getProductList, setGetProductList]}>
            {children}
        </GetProductList.Provider>
    );
}
