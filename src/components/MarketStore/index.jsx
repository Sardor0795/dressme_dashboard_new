import React, { useEffect, useState } from "react";
import AddStore from "./AddMarket/AddStore/AddStore";
import MyMarket from "./MyMarket/MyMarket";
import { Outlet } from "react-router-dom";

export default function MarketStore() {
  const [marketAdded, setMarketAdded] = useState(null);
  const [addStore, setAddStore] = useState(false);
  const [myMarket, setMyMarket] = useState(true);
  // ----------------AddStore---------------------
  const toggleAdd = React.useCallback(() => setAddStore(true), []);
  // -------------------------------------
  // ----------------AddLocation---------------------
  const toggleLocation = React.useCallback(() => setMyMarket(false), []);
  // -------------------------------------
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const [marketList, setMarketList] = useState([]);

  return (
    <div>
      <Outlet />
    </div>
    // <div>{!addStore ? <MyMarket /> : <AddStore onClick={toggleAdd} />}</div>
  );
}
