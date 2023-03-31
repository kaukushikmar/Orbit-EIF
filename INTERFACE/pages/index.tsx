/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import SidebarLayout from "../src/layouts/SidebarLayout";
import { Grid, Container, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import ConnectWallet from "../src/components/Error/ConnectWallet";
import InstallMetamask from "../src/components/Error/InstallMetamask";
import SupplyCard from "../src/components/Card/SupplyCard";
import BorrowCard from "../src/components/Card/BorrowCard";
import ApyCard from "../src/components/Card/ApyCard";
import PageTitleWrapper from "../src/components/PageTitleWrapper";
import PageHeader from "../src/content/Dashboard/PageHeader";
import RecentTransactions from "../src/content/Dashboard/RecentTransactions";
import { useUCDataProvider } from "@/contexts/UCDataContext";
import { useAppDataProvider } from "@/contexts/AppDataContext";
import SwitchNetwork from "@/components/Error/SwitchNetwork";
import Positions from "@/content/Dashboard/Positions";

function Home() {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const [hasMetamask, setHasMetamask] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });
  async function connect() {
    await activateBrowserWallet();
  }

  if (chainId !== 5) {
    return <SwitchNetwork />;
  }

  const gridSpacing = 3;
  const { UCData } = useUCDataProvider();
  const { OCData } = useAppDataProvider();
  const totalSupply =
    OCData?.totalSupplyInUsd &&
    UCData?.totalSupplyInUsd &&
    OCData?.totalSupplyInUsd.add(UCData?.totalSupplyInUsd).toString();
  const totalBorrow = OCData?.totalBorrowInUsd
    .add(UCData?.totalBorrowInUsd)
    .toString();
  const OCApy = OCData?.netApy.toString();
  const UCApy = UCData?.totalApy.toString();
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        {hasMetamask ? (
          account ? (
            <Container maxWidth="xl" sx={{ mb: "25px" }}>
              <PageTitleWrapper>
                <PageHeader />
              </PageTitleWrapper>
              <Grid container spacing={gridSpacing} sx={{ pb: "35px" }}>
                <Grid item xs={12}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                      <SupplyCard
                        isLoading={totalSupply ? false : true}
                        totalSupplyUsd={totalSupply}
                      />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                      <BorrowCard
                        isLoading={totalBorrow ? false : true}
                        totalBorrowUsd={totalBorrow}
                      />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                      <ApyCard
                        totalApy={OCApy}
                        isLoading={OCApy ? false : true}
                        title="Net OC Apy"
                      />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                      <ApyCard
                        totalApy={UCApy}
                        isLoading={OCApy ? false : true}
                        title="Net UC Apy"
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
                spacing={3}
                sx={{ pb: "35px" }}
              >
                <Grid item xs={12}>
                  <Positions />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12}>
                  <RecentTransactions />
                </Grid>
              </Grid>
            </Container>
          ) : (
            <ConnectWallet connect={connect} />
          )
        ) : (
          <InstallMetamask />
        )}
      </div>
    </>
  );
}

Home.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Home;
