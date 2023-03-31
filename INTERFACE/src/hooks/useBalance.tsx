import { useToken, useTokenBalance } from "@usedapp/core";
import { BigNumberish } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import tokenAddress from "../constants/tokenAddress.json";

interface TokenInfo {
  name: string;
  symbol: string;
  decimals?: number;
  totalSupply?: BigNumberish;
}

const tokens = {
  usdc: tokenAddress["usdc"].address,
  btc: tokenAddress["wbtc"].address,
  dai: tokenAddress["dai"].address,
  eth: tokenAddress["weth"].address,
};

export const useBalance = (address: string) => {
  let USDC_BAL: string, DAI_BAL: string, ETH_BAL: string, BTC_BAL: string;
  const usdc: TokenInfo = useToken(tokens.usdc);
  const btc: TokenInfo = useToken(tokens.btc);
  const dai: TokenInfo = useToken(tokens.dai);
  const eth: TokenInfo = useToken(tokens.eth);

  let valueUsdc = useTokenBalance(tokens.usdc, address);

  if (valueUsdc) {
    USDC_BAL = formatUnits(valueUsdc, usdc.decimals);
    // console.log(
    //   "🚀 ~ file: useBalance.tsx:31 ~ useBalance ~ USDC_BAL",
    //   USDC_BAL
    // );
  } else {
    USDC_BAL = "0";
  }

  let valueDai = useTokenBalance(tokens.dai, address);

  if (valueDai) {
    DAI_BAL = formatUnits(valueDai, dai.decimals);
    // console.log("🚀 ~ file: useBalance.tsx:39 ~ useBalance ~ DAI_BAL", DAI_BAL);
  } else {
    DAI_BAL = "0";
  }

  const valueBtc = useTokenBalance(tokens.btc, address);

  if (valueBtc) {
    BTC_BAL = formatUnits(valueBtc, btc.decimals);
    // console.log("🚀 ~ file: useBalance.tsx:47 ~ useBalance ~ BTC_BAL", BTC_BAL);
  } else {
    BTC_BAL = "0";
  }

  const valueEth = useTokenBalance(tokens.eth, address);

  if (valueEth) {
    ETH_BAL = formatUnits(valueEth, eth.decimals);
    // console.log("🚀 ~ file: useBalance.tsx:55 ~ useBalance ~ ETH_BAL", ETH_BAL);
  } else {
    ETH_BAL = "0";
  }

  return [USDC_BAL, DAI_BAL, BTC_BAL, ETH_BAL];
};
