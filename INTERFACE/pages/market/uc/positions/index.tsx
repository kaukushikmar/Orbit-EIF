// NOTE: useRouter for query params of the nft id.
import BorrowCard from "../../../../src/components/Card/BorrowCard";
import SupplyCard from "../../../../src/components/Card/SupplyCard";
import PageTitleWrapper from "../../../../src/components/PageTitleWrapper";
import PageHeaderPositions from "../../../../src/content/UC/Positions/PageHeaderPositions";
// @todo Borrow asset
import SidebarLayout from "../../../../src/layouts/SidebarLayout";
import {
  Box,
  Container,
  Grid,
  styled,
  useTheme,
  Tab,
  Tabs,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardHeader,
  Divider,
  TableContainer,
  LinearProgress,
} from "@mui/material";
import { Falsy, QueryParams, useCall, useEthers } from "@usedapp/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import WalletDrawer from "../../../../src/content/Wallet";
import { BigNumber, Contract } from "ethers";
import { UIDataProviderInterface } from "../../../../src/constants";
import {
  UserAmountData,
  PriceInEth,
  PoolData,
  useAppDataProvider,
} from "../../../../src/contexts/AppDataContext";
import SupplyAssetUC from "../../../../src/content/UC/SupplyAsset";
import BorrowAsset from "../../../../src/content/UC/BorrowAsset";
import { useWalletData } from "@/hooks/useWalletData";
import { UserUCWalletData } from "@/contexts/UCDataContext";
import BorrowAssetUC from "../../../../src/content/UC/BorrowAsset";
import BarLoader from "react-spinners/BarLoader";
import ApyCard from "@/components/Card/ApyCard";
import HealthFactorCard from "@/components/Card/HealthFactorCard";

// @todo add no NFT/Wallet found page (if tokenId does not exist) [can we do that ?]

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      position: relative;
      .MuiTabs-root {
        height: 100px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;

          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 20%;
            width: 75%;
            content: ' ';
            margin-left: -14px;
            
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 100px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[10]};
              border-bottom: 0;
              position: relative;
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .05;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

interface StyledTabProps {
  label: string;
}

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#000",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

const StyledCard = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} solid 1px;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {

          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }

        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

function Positions() {
  const router = useRouter();
  const { account } = useEthers();
  const [hasMetamask, setHasMetamask] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  const [walletDrawer, setWalletDrawer] = useState(false);

  const openWalletDrawer = () => {
    setWalletDrawer(true);
  };

  const onCloseWallet = (val: boolean) => {
    setWalletDrawer(val);
  };

  const walletButton = (val: boolean) => {
    setWalletDrawer(val);
  };

  // @note tokenID specific data fetch
  const tokenId = router.query.tokenId as string;
  const walletData: UserUCWalletData = useWalletData(tokenId);
  // console.log("🚀 ~ file: index.tsx:150 ~ Positions ~ walletData", walletData);

  // @note Orbit token data fetch
  const { OCData } = useAppDataProvider(); // Using token data from OCdata

  const gridSpacing = 1;

  const [currentTab, setCurrentTab] = useState<string>("orbit");

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const OrbitTab = (
    <StyledCard sx={{ display: "flex", p: "0", m: "0" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "0",
        }}
      >
        <CardContent sx={{ flex: "0 0 auto" }}>
          <Typography component="div" variant="h4">
            Orbit
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Position in orbit
          </Typography>
        </CardContent>
      </Box>
    </StyledCard>
  );

  const AaveTab = (
    <StyledCard sx={{ display: "flex", p: "0" }}>
      <Box sx={{ display: "flex", flexDirection: "column", p: "0" }}>
        <CardContent sx={{ flex: "0 0 auto" }}>
          <Typography component="div" variant="h4">
            Aave
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Position in aave
          </Typography>
        </CardContent>
      </Box>
    </StyledCard>
  );

  const UniswapTab = (
    <Card sx={{ display: "flex", p: "0" }}>
      <Box sx={{ display: "flex", flexDirection: "column", p: "0" }}>
        <CardContent sx={{ flex: "0 0 auto" }}>
          <Typography component="div" variant="h4" sx={{ color: "GrayText" }}>
            Uniswap
          </Typography>
          <Typography variant="subtitle1" color="GrayText" component="div">
            Coming soon
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );

  const BalancerTab = (
    <Card sx={{ display: "flex", p: "0" }}>
      <Box sx={{ display: "flex", flexDirection: "column", p: "0" }}>
        <CardContent sx={{ flex: "0 0 auto" }}>
          <Typography component="div" variant="h4" sx={{ color: "GrayText" }}>
            Balancer
          </Typography>
          <Typography variant="subtitle1" color="GrayText" component="div">
            Coming soon
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );

  const CurveTab = (
    <Card sx={{ display: "flex", p: "0" }}>
      <Box sx={{ display: "flex", flexDirection: "column", p: "0" }}>
        <CardContent sx={{ flex: "0 0 auto" }}>
          <Typography component="div" variant="h4" sx={{ color: "GrayText" }}>
            Curve
          </Typography>
          <Typography variant="subtitle1" color="GrayText" component="div">
            Coming soon
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );

  const tabs = [
    { value: "orbit", label: OrbitTab },
    { value: "aave", label: AaveTab },
    { value: "uniswap", label: UniswapTab },
    { value: "balancer", label: BalancerTab },
    { value: "curve", label: CurveTab },
  ];

  return (
    <>
      <Head>
        <title>Markets</title>
      </Head>

      <div>
        {hasMetamask ? (
          account ? (
            <Container maxWidth="xl" sx={{ mb: "25px" }}>
              <PageTitleWrapper>
                <PageHeaderPositions
                  WalletOpen={walletButton}
                  tokenId={tokenId}
                />
              </PageTitleWrapper>
              {/* TODO: add markets data */}
              <TabsContainerWrapper>
                <Tabs
                  onChange={handleTabsChange}
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabs.map((tab) => (
                    <StyledTab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                      disabled={tab.value === "uniswap"}
                    />
                  ))}
                </Tabs>
              </TabsContainerWrapper>
              <Card variant="outlined">
                {currentTab === "orbit" && (
                  <>
                    <Grid
                      container
                      spacing={gridSpacing}
                      sx={{ pb: "35px", pt: "25px" }}
                      p={1}
                    >
                      <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            {/* @todo orbit position data overall, isLoading also required */}
                            <SupplyCard
                              totalSupplyUsd={walletData?.totalSupplyInUsd?.toString()}
                              isLoading={false}
                            />
                          </Grid>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <BorrowCard
                              totalBorrowUsd={walletData?.totalBorrowInUsd?.toString()}
                            />
                          </Grid>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <HealthFactorCard
                              totalHealthFactor={
                                walletData?.healthFactor?.toString() ===
                                "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                                  ? "10000000000000000000000"
                                  : walletData?.healthFactor?.toString()
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="stretch"
                      spacing={2}
                      p={1}
                    >
                      <Grid item xs={6}>
                        <SupplyAssetUC
                          walletData={walletData}
                          tab="orbit"
                          tokenId={tokenId}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <BorrowAssetUC
                          walletData={walletData}
                          tab="orbit"
                          tokenId={tokenId}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
                {currentTab === "aave" && (
                  <>
                    <Grid
                      container
                      spacing={gridSpacing}
                      sx={{ pb: "35px", pt: "25px" }}
                      p={1}
                    >
                      <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <SupplyCard
                              totalSupplyUsd={walletData?.totalAaveSupplyInUsd?.toString()}
                            />
                          </Grid>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <BorrowCard
                              totalBorrowUsd={walletData?.totalAaveBorrowInUsd?.toString()}
                            />
                          </Grid>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <HealthFactorCard
                              totalHealthFactor={
                                walletData?.aaveHealthFactor?.toString() ===
                                "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                                  ? "10000000000000000000000"
                                  : walletData?.aaveHealthFactor?.toString()
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="stretch"
                      spacing={2}
                      p={1}
                    >
                      <Grid item xs={6}>
                        <SupplyAssetUC
                          walletData={walletData}
                          tab="aave"
                          tokenId={tokenId}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <BorrowAssetUC
                          walletData={walletData}
                          tab="aave"
                          tokenId={tokenId}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Card>
            </Container>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <WalletDrawer
          open={walletDrawer}
          onClose={onCloseWallet}
          walletData={walletData}
        />
      </div>
    </>
  );
}

Positions.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Positions;
