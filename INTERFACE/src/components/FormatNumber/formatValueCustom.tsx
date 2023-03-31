import { ethers, BigNumber as big } from "ethers";
import BigNumber from "bignumber.js";
import { Typography, TypographyProps } from "@mui/material";

export interface HealthFactorProps extends TypographyProps {
  value: any;
  token: string;
  fixed?: number;
  hf?: boolean;
  component?: string;
}

export default function FormatValueCustom({
  value,
  token,
  fixed = 2,
  hf = false,
  component,
  ...rest
}: HealthFactorProps) {
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

  const valueConverted =
    isNegative !== "small"
      ? token === "apy"
        ? isSmall === "small"
          ? "< 0.01"
          : valueRemainder.toFixed(fixed)
        : valueRemainder.toFixed(fixed)
      : valueRemainder.toFixed(fixed);
  return (
    <Typography sx={{ ...rest.sx }} component="span">
      {valueConverted}
    </Typography>
  );
}
