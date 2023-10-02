import React, { useContext } from "react";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import { dressMainData } from "./hook/ContextTeam";

function App() {
  const [dressInfo, setDressInfo] = useContext(dressMainData)
  console.log(dressInfo?.AccessTokenSeller, "AccessTokenSeller");

  return <NavbarDashboard />;
}

export default App;
