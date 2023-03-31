import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";

import PageTitle from "@/components/PageTitle";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  styled,
  Avatar,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ethers } from "ethers";
import SupplyCard from "@/components/Card/SupplyCard";
import FormatValueCustom from "@/components/FormatNumber/formatValueCustom";
import { TokenChart } from "./tokenChart";
import ApyCard from "@/components/Card/ApyCard";
import { ProtocolChart } from "./protocolDistribution";
import LaunchIcon from "@mui/icons-material/Launch";

// export interface Capsuledata {
//   tokenId: BigNumber;
//   wallet: string;
//   supplyAmounts: UserAmountData;
//   borrowAmounts: UserAmountData;
//   holdAmounts: UserAmountData;
//   aaveSupplyAmounts: UserAmountData;
//   aaveBorrowAmounts: UserAmountData;
//   totalSupplyInUsd: BigNumber;
//   totalBorrowInUsd: BigNumber;
//   totalHoldInUsd: BigNumber;
//   totalAaveSupplyInUsd: BigNumber;
//   totalAaveBorrowInUsd: BigNumber;
//   netApy: BigNumber;
//   healthFactor: BigNumber;
//   aaveHealthFactor: BigNumber;
// }

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const ModifiedAvatar = styled(Avatar)(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const avatar = (id) => (
  <ModifiedAvatar
    variant="square"
    src={`https://avatars.dicebear.com/api/adventurer-neutral/${id}.svg`}
    sx={{ width: 80, height: 80 }}
  />
);

function SinglePosition({ data }) {
  // ----------------
  const formattedHealthFactor = data?.healthFactor?.toString();
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

  const aaveformattedHealthFactor = data?.aaveHealthFactor?.toString();
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
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
              {avatar(data?.tokenId)}
            </Grid>
            <Grid item xs={3}>
              <Box>
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
                <Typography variant="subtitle2" sx={{ mt: "20px" }}>
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
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ mr: "15px" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                    noWrap
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      <FormatValueCustom
                        value={data?.totalSupplyInUsd}
                        token={""}
                        component="card"
                        sx={{ fontSize: "15px" }}
                      />{" "}
                      $
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Orbit total supply
                  </Typography>
                </Box>
                <Divider orientation="vertical" />
                <Box sx={{ ml: "15px" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                    noWrap
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      <FormatValueCustom
                        value={data?.totalAaveSupplyInUsd}
                        token={""}
                        component="card"
                        sx={{ fontSize: "15px" }}
                      />{" "}
                      $
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Aave total supply
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ mr: "15px" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                    noWrap
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      <FormatValueCustom
                        value={data?.totalBorrowInUsd}
                        token={""}
                        component="card"
                        sx={{ fontSize: "15px" }}
                      />{" "}
                      $
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Orbit total borrow
                  </Typography>
                </Box>
                <Divider orientation="vertical" />
                <Box sx={{ ml: "15px" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                    noWrap
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      <FormatValueCustom
                        value={data?.totalAaveBorrowInUsd}
                        token={""}
                        component="card"
                        sx={{ fontSize: "15px" }}
                      />{" "}
                      $
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Aave total borrow
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Card>
            <CardHeader title="Details" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box>
                    <ApyCard
                      totalApy={data?.netApy}
                      title="Net Orbit Apy"
                      sx={{ mb: "15px" }}
                    />
                    {/* <ApyCard
                      totalApy={"1000000000000000"}
                      title="Net Orbit Apy"
                      sx={{ mb: "15px" }}
                    /> */}
                    <Button
                      fullWidth
                      variant="contained"
                      href={`market/uc/positions?tokenId=${data?.tokenId.toString()}`}
                    >
                      Visit Position
                      <LaunchIcon sx={{ ml: "7px" }} />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardHeader title="Token Distribution" />
                    <TokenChart tokenData={data?.supplyAmounts} />
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardHeader title="Protocol Distribution" />
                    {/* Need to change value to an array for more protocols */}
                    <ProtocolChart value={data?.totalAaveSupplyInUsd} />
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

SinglePosition.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default SinglePosition;
