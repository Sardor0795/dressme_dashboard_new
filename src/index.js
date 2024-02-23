import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextTeam from "./hook/ContextTeam";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SellerUserContext from "./hook/SellerUserContext";
import SellerRefreshContext from "./hook/SellerRefreshToken";
import HelperDataStore from "./hook/HelperDataStore";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ContextTeam>
      <SellerUserContext>
        <SellerRefreshContext>
          <HelperDataStore>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider >
          </HelperDataStore>
        </SellerRefreshContext>
      </SellerUserContext>
    </ContextTeam>
  </BrowserRouter>
);
