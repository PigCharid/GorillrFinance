import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import {  bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {DAppProvider} from "@usedapp/core";
// import { DAPP_CONFIG } from "./config";
const { chains, provider } = configureChains([bsc,goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "gf",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
        <Router>
          <App />
        </Router>
    </RainbowKitProvider>
  </WagmiConfig>
);
