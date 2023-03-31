import { ethers, BigNumber as big } from "ethers";
import BigNumber from "bignumber.js";

export default function FormatNumber({
  value,
  token,
  fixed = 2,
  hf = false,
}: {
  value: any;
  token: string;
  fixed?: number;
  hf?: boolean;
}) {
  // console.log(`value: ${value}`);
  let decimals = new BigNumber(18);
  switch (token) {
    case "usdc":
      decimals = new BigNumber(6);
      break;
    case "weth":
      decimals = new BigNumber(18);
      break;
    case "wbtc":
      decimals = new BigNumber(8);
      break;
    case "dai":
      decimals = new BigNumber(18);
      break;
    case "apy":
      decimals = new BigNumber(16);
      break;
    case "hf":
      decimals = new BigNumber(18);
      break;
    default:
      decimals = new BigNumber(18);
  }

  if (value === undefined) value = "0";

  const valueConvertedToUnits = ethers.utils.formatUnits(
    value,
    decimals.toString()
  );
  const valueRemainder = new BigNumber(valueConvertedToUnits);

  const isSmall: string =
    valueRemainder.comparedTo(0.01) === 1
      ? "big"
      : valueRemainder.comparedTo(0.01) === -1
      ? "small"
      : "equal";

  const isNegative: string =
    valueRemainder.comparedTo(0) === 1
      ? "big"
      : valueRemainder.comparedTo(0) === -1
      ? "small"
      : "equal";

  const valueConverted = valueRemainder.toFixed(fixed);
  return valueConverted;
}
