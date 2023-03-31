import { deployedAddress, UIDataProviderInterface } from "@/constants";
import { Falsy, useCall } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { ERC20Interface } from "@/constants";

export function useApprovalAllowance(
  tokenAddress: string,
  userAddress: string | Falsy,
  spenderAddress: string | Falsy
) {
  let { value, error } =
    useCall(
      tokenAddress &&
        tokenAddress !== "0x0" &&
        userAddress &&
        spenderAddress && {
          contract: new Contract(tokenAddress, ERC20Interface),
          method: "allowance",
          args: [userAddress, spenderAddress],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  if (value === undefined) value = [BigNumber.from("0")];
  return value?.[0];
}
