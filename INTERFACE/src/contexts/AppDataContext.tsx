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

export interface PoolData {
  supplyRate: Rates;
  borrowRate: Rates;
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
  positions: UserUCWalletData[];
}

export interface UserOCData {
  loading: boolean;
  supplyAmounts: UserAmountData;
  borrowAmounts: UserAmountData;
  totalSupplyInUsd: BigNumber;
  totalBorrowInUsd: BigNumber;
  netApy: BigNumber;
  healthFactor: BigNumber;
}

export interface Appdata {
  OCData: UserOCData;
  PoolData: PoolData;
  AavePoolData: PoolData;
}

const AppDataContext = React.createContext({} as Appdata);

function useOCData(
  // @todo pass the parameters
  userAddress: string | Falsy
) {
  const { value, error } =
    useCall(
      userAddress && {
        contract: new Contract(
          deployedAddress.UIDataProvider,
          UIDataProviderInterface
        ),
        method: "getUserOCData",
        args: [userAddress],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

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

function usePoolData() {
  const { value, error } =
    useCall({
      contract: new Contract(
        deployedAddress.UIDataProvider,
        UIDataProviderInterface
      ),
      method: "getLiquidityPoolData",
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

function useAavePoolData() {
  const { value, error } =
    useCall({
      contract: new Contract(
        deployedAddress.UIDataProvider,
        UIDataProviderInterface
      ),
      method: "getAavePoolData",
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

// One and only data provider for all data
export const DataProvider = ({ children }) => {
  //   const tokenAddresses = [ /** Need token address */];
  const { account } = useEthers();
  // console.log(`account: ${account}`);
  let OCData = useOCData(account);
  let PoolData = usePoolData();
  let AavePoolData = useAavePoolData();

  // console.log(`PoolData: ${PoolData}`);
  // console.log(`OC: ${OCData}`);
  // console.log(`UC Data: ${UCData}`);

  return (
    <AppDataContext.Provider
      value={{
        OCData: OCData,
        PoolData: PoolData,
        AavePoolData: AavePoolData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataProvider = () => useContext(AppDataContext);
