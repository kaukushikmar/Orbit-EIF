import React, { useContext } from "react";
import { Falsy, QueryParams, useCall, useEthers } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { UIDataProviderContract, UIDataProviderInterface } from "../constants";
import { deployedAddress } from "../constants";
import { BigNumber as bigNumber } from "bignumber.js";

// @todo need data type
export interface Rates {
  weth: BigNumber;
  usdc: BigNumber;
  dai: BigNumber;
  wbtc: BigNumber;
}

export interface LiquidityPoolData {
  supplyRate: Rates;
  borrowRate: Rates;
}

export interface UserOCAmountData {
  weth: BigNumber;
  usdc: BigNumber;
  dai: BigNumber;
  wbtc: BigNumber;
}

export interface PriceInEth {
  weth: BigNumber;
  usdc: BigNumber;
  dai: BigNumber;
  wbtc: BigNumber;
}

export interface UserAmountData {
  weth: BigNumber;
  usdc: BigNumber;
  dai: BigNumber;
  wbtc: BigNumber;
}

export interface UserUCWalletData {
  tokenId: BigNumber;
  wallet: string;
  supplyAmounts: UserAmountData;
  borrowAmounts: UserAmountData;
  holdAmounts: UserAmountData;
  aaveSupplyAmounts: UserAmountData;
  aaveBorrowAmounts: UserAmountData;
  totalSupplyInUsd: BigNumber;
  totalBorrowInUsd: BigNumber;
  totalHoldInUsd: BigNumber;
  totalAaveSupplyInUsd: BigNumber;
  totalAaveBorrowInUsd: BigNumber;
  netApy: BigNumber;
  healthFactor: BigNumber;
  aaveHealthFactor: BigNumber;
}

export interface UserUCData {
  totalSupplyInUsd: BigNumber;
  totalBorrowInUsd: BigNumber;
  totalApy: BigNumber;
  nftDatas: UserUCWalletData[];
}

export interface Appdata {
  UCData: UserUCData;
}

const AppDataContext = React.createContext({} as Appdata);

function useUCData(
  // @todo pass the parameters
  userAddress: string | Falsy
) {
  const { value, error } =
    useCall(
      deployedAddress.UIDataProvider &&
        userAddress && {
          contract: new Contract(
            deployedAddress.UIDataProvider,
            UIDataProviderInterface
          ),
          method: "getUserNftsData",
          args: [userAddress],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
}

// One and only data provider for all data
export const UCDataProvider = ({ children }) => {
  //   const tokenAddresses = [ /** Need token address */];
  const { account } = useEthers();
  let UCData = useUCData(account);
  // console.log(`UCDATA: ${UCData}`);

  UCData = {
    totalSupplyInUsd:
      UCData !== undefined
        ? UCData[0] ?? new bigNumber("0")
        : new bigNumber("0"),
    totalBorrowInUsd:
      UCData !== undefined
        ? UCData[1] ?? new bigNumber("0")
        : new bigNumber("0"),
    totalApy:
      UCData !== undefined
        ? UCData[2] ?? new bigNumber("0")
        : new bigNumber("0"),
    nftDatas: (UCData !== undefined && [...UCData[3]]) ?? [
      {} as UserUCWalletData,
    ],
  };

  return (
    <AppDataContext.Provider
      value={{
        UCData: UCData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useUCDataProvider = () => useContext(AppDataContext);
