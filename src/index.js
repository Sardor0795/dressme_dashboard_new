import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextTeam from "./hook/ContextTeam";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileContextProvider from "./context/profilePageContext";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <ContextTeam>
      <BrowserRouter>
        <ProfileContextProvider>
          <App />
        </ProfileContextProvider>
      </BrowserRouter>
    </ContextTeam>
  </QueryClientProvider>
);
