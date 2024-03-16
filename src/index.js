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
import { DressmeLanguage } from "./language/LanguageItem";
import "./language/i18n";
import RegionList from "./hook/RegionList";
import ShopIsList from "./hook/ShopList";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <DressmeLanguage>
        <ContextTeam>
          <RegionList>
            <SellerRefreshContext>
              <SellerUserContext>
                <HelperDataStore>
                  <ShopIsList>
                    <App />
                  </ShopIsList>
                </HelperDataStore>
              </SellerUserContext>
            </SellerRefreshContext>
          </RegionList>
        </ContextTeam>
      </DressmeLanguage>
    </QueryClientProvider>
  </BrowserRouter>
);
