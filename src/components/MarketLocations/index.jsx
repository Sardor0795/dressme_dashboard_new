import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const { REACT_APP_BASE_URL } = process.env;

export default function MarketLocations() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  return (
    <div className="">
      <Outlet />
    </div>
  );
}
 