import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { WalletProvider } from './contexts/WalletContext.jsx'; 
import { WagmiConfig, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { injected } from "wagmi/connectors";
import { createPublicClient, http } from "viem";

const chains = [sepolia]; // or [mainnet] if you want mainnet

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
});

const config = createConfig({
  autoConnect: true,
  connectors: [injected()],
  publicClient,
  chains
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
       <WalletProvider>
      <WagmiConfig config={config}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WagmiConfig>
       </WalletProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
