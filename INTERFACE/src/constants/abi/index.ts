import { Interface } from "ethers/lib/utils";
import uiDataProvider from "./uiDataProvider.json";
import ocMarket from "./OCMarket.json";
import { Contract } from "ethers";
import tokenAddress from "../tokenAddress.json";
import ERC20 from "./erc20.json";
import factory from "./factory.json";
import faucet from "./faucet.json";

export const deployedAddress = {
  UIDataProvider: "0x934D514f9618D510e3E8C9F5eb816325AFdB0C21",
  OCMarket: "0xA7aF2FBABf8406DD5C53F1b258eeeC7C5435541D",
  LiquidityPool: "0xDd1FA8f06a97721478Db9f1aC63Da7Cd9abBBF71",
  NFTManager: "0x397897D80aA543C8dA83ACD6098485f9FB2d8eB9",
  Faucet: "0x4Ee1393353ec1b95Bb6d254B00EA3D4294B9b77C",
};

const UIDataProviderInterface = new Interface(uiDataProvider.abi);
export { UIDataProviderInterface };

const OCMarketInterface = new Interface(ocMarket.abi);
export { OCMarketInterface };

const ERC20Interface = new Interface(ERC20.abi);
export { ERC20Interface };

const NFTManagerInterface = new Interface(factory.abi);
export { NFTManagerInterface };

const FaucetInterface = new Interface(faucet.abi);
export { FaucetInterface };

const UIDataProviderContract = new Contract(
  deployedAddress.UIDataProvider,
  UIDataProviderInterface
);
export { UIDataProviderContract };

const OCMarketContract = new Contract(
  deployedAddress.OCMarket,
  OCMarketInterface
);
export { OCMarketContract };

const USDCContract = new Contract(tokenAddress["usdc"].address, ERC20Interface);
export { USDCContract };

const NFTManagerContract = new Contract(
  deployedAddress.NFTManager,
  NFTManagerInterface
);
export { NFTManagerContract };

const FaucetContract = new Contract(deployedAddress.Faucet, FaucetInterface);
export { FaucetContract };
