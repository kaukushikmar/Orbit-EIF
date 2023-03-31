import {
  Grid,
  Box,
  Typography,
  Avatar,
  Card,
  lighten,
  styled,
  LinearProgress,
  Chip,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import BigNumber from "bignumber.js";
import { UserAmountData } from "@/contexts/AppDataContext";
import FormatValue from "@/components/FormatNumber";
import { ethers } from "ethers";
// import GaugeChart from "react-gauge-chart";

const ModifiedAvatar = styled(Avatar)(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

const ModifiedLink = styled(Link)(
  ({ theme }) => `
      &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
      cursor: pointer;
     }
`
);

export interface Capsuledata {
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

export default function NftPosition({ NftData }) {
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const avatar = (
    <ModifiedAvatar
      variant="square"
      src={`https://avatars.dicebear.com/api/adventurer-neutral/${NftData?.tokenId}.svg`}
      sx={{ width: 120, height: 120 }}
    />
  );

  const getHF = (val: string) => {
    if (
      val ===
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    ) {
      return "100";
    }
    return val;
  };

  const formattedHealthFactor = NftData?.healthFactor?.toString();
  let healthFactorPercent = 100;
  let colorType:
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "primary"
    | "info" = "secondary";
  if (formattedHealthFactor >= ethers.utils.parseUnits("3", 18).toString()) {
    // healthFactorPercent = "#4CAF50";
    healthFactorPercent = 83.33333;
    colorType = "success";
  } else if (
    formattedHealthFactor < ethers.utils.parseUnits("1.1", 18).toString()
  ) {
    // healthFactorPercent = "#ff0000";
    healthFactorPercent = 16.6666666;
    colorType = "error";
  } else {
    // healthFactorPercent = "#F89F1A";
    healthFactorPercent = 50;
    colorType = "warning";
  }

  const aaveformattedHealthFactor = NftData?.aaveHealthFactor?.toString();
  let aavehealthFactorPercent = 0;
  let aavecolorType:
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "primary"
    | "info" = "secondary";
  if (
    aaveformattedHealthFactor >= ethers.utils.parseUnits("3", 18).toString()
  ) {
    // healthFactorPercent = "#4CAF50";
    aavehealthFactorPercent = 83.33333;
    aavecolorType = "success";
  } else if (
    aaveformattedHealthFactor < ethers.utils.parseUnits("1.1", 18).toString()
  ) {
    // aavehealthFactorPercent = "#ff0000";
    aavehealthFactorPercent = 16.6666666;
    aavecolorType = "error";
  } else {
    // aavehealthFactorPercent = "#F89F1A";
    aavehealthFactorPercent = 50;
    aavecolorType = "warning";
  }

  const value = parseInt(ethers.utils.formatEther(formattedHealthFactor)) * 100;

  return (
    <ModifiedLink href={`uc/positions?tokenId=${NftData?.tokenId.toString()}`}>
      <Grid item xs={12} sm={6} sx={{}}>
        <CardCc sx={{ px: 2, pt: 2, pb: 1, cursor: "pointer" }}>
          <Box display="flex" alignItems="center">
            {/* <CardLogo
              src="/static/images/placeholders/logo/visa.png"
              alt="Visa"
            /> */}
            <Box
              display="flex"
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              {avatar}
              <Typography variant="subtitle2">
                NFT ID: {NftData?.tokenId.toString()}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight="normal"
                sx={{ mt: "20px" }}
              >
                {`Orbit`}{" "}
                <LinearProgress
                  color={
                    formattedHealthFactor !==
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                      ? colorType
                      : "success"
                  }
                  variant="determinate"
                  value={100}
                />
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: "5px" }}>
                Orbit Health Factor:{" "}
                <Chip
                  color={
                    formattedHealthFactor !==
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                      ? colorType
                      : "success"
                  }
                  label={
                    formattedHealthFactor !==
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                      ? parseFloat(
                          ethers.utils.formatUnits(formattedHealthFactor, 18)
                        ).toPrecision(3)
                      : "Infinite"
                  }
                  sx={{ ml: "5px" }}
                  variant="outlined"
                  size="small"
                />
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight="normal"
                sx={{ mt: "20px" }}
              >
                {`AAVE`}{" "}
                <LinearProgress
                  color={
                    aaveformattedHealthFactor !==
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                      ? aavecolorType
                      : "success"
                  }
                  variant="determinate"
                  value={100}
                />
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: "5px" }}>
                Aave Health Factor:{" "}
                <Chip
                  color={
                    aaveformattedHealthFactor !==
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                      ? aavecolorType
                      : "success"
                  }
                  label={
                    aaveformattedHealthFactor !==
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                      ? parseFloat(
                          ethers.utils.formatUnits(
                            aaveformattedHealthFactor,
                            18
                          )
                        ).toPrecision(3)
                      : "Infinite"
                  }
                  sx={{ ml: "5px" }}
                  variant="outlined"
                  size="small"
                />
              </Typography>
            </Box>
          </Box>
        </CardCc>
      </Grid>
    </ModifiedLink>
  );
}
