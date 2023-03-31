import { deployedAddress, UIDataProviderInterface } from "@/constants";
import { Falsy, useCall } from "@usedapp/core";
import { Contract } from "ethers";

export function useWalletData(tokenId: string | Falsy) {
  let { value, error } =
    useCall(
      deployedAddress.UIDataProvider &&
        tokenId && {
          contract: new Contract(
            deployedAddress.UIDataProvider,
            UIDataProviderInterface
          ),
          method: "getNftData",
          args: [tokenId],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  // @todo
  // Handle error
  // if (value === undefined) {
  //   value = {
  //      tokenId;
  //       address wallet;
  //       UserAmountData supplyAmounts;
  //       UserAmountData borrowAmounts;
  //       UserAmountData holdAmounts;
  //       UserAmountData aaveSupplyAmounts;
  //       UserAmountData aaveBorrowAmounts;
  //       uint256 totalSupplyInUsd;
  //       uint256 totalBorrowInUsd;
  //       uint256 totalHoldInUsd;
  //       uint256 totalAaveSupplyInUsd;
  //       uint256 totalAaveBorrowInUsd;
  //       int256 netApy;
  //       uint256 healthFactor;
  //       uint256 aaveHealthFactor;
  //   }
  // }
  return value?.[0];
}
