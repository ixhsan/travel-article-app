import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import "./index.css";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { localStoragePersister, queryClient } from "./lib/query-client";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: localStoragePersister }}
        >
          <App />
        </PersistQueryClientProvider>
      </BrowserRouter>
    </>
  </React.StrictMode>
);
