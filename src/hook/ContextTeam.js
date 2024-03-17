import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
export const dressMainData = createContext();

export default function ContextTeam({ children }) {
  const [dressInfo, setDressInfo] = useState({
    isAuthen: true,
    // ------Product----
    ProductFilterType: null,
    nextPageShowForm: true,
    locationIdAddProduct: null,
    getProductInfo: null,

    // ------MarketStore
     getReviewProduct: null,
    showSelectedButton: 'products',
    genderList: null,
    typeList: null,
    sellerStatus: null
  });


  return (
    <dressMainData.Provider value={[dressInfo, setDressInfo]}>
      {children}
    </dressMainData.Provider>
  );
}
