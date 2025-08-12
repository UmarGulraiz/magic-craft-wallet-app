import { Network } from "core/types";

export const MOONBEAM: Network[] = [
  // Mainnet
  {
    chainId: 1284,
    type: "mainnet",
    rpcUrls: [
      "https://rpc.api.moonbeam.network",
      "https://moonbeam.public.blastapi.io",
      "https://rpc.ankr.com/moonbeam",
    ],
    chainTag: "moonbeam",
    name: "Moonbeam",
    nativeCurrency: {
      symbol: "GLMR",
      name: "Glimmer",
      decimals: 18,
    },
    explorerUrls: ["https://moonbeam.moonscan.io"],
    explorerApiUrl: "https://api-moonbeam.moonscan.io/api",
    faucetUrls: [],
    infoUrl: "https://moonbeam.network/networks/moonbeam/",
  },
];
