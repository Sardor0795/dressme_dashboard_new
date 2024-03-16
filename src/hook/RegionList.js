 import React, { createContext, useEffect, useState } from "react";
export const dressRegionList = createContext();

export default function RegionList({ children }) {
  const [regionList, setRegionList] = useState(null)
  return (
    <dressRegionList.Provider value={[regionList, setRegionList]}>
      {children} 
    </dressRegionList.Provider>
  );
}
