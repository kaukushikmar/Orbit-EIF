import Head from "next/head";
import SidebarLayout from "../../../src/layouts/SidebarLayout";
import { Grid, Container, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import SupplyCard from "../../../src/components/Card/SupplyCard";
import BorrowCard from "../../../src/components/Card/BorrowCard";
import ApyCard from "../../../src/components/Card/ApyCard";
import PageTitleWrapper from "../../../src/components/PageTitleWrapper";
import PageHeader from "../../../src/content/OC/PageHeader";
import { ButtonThemed } from "../../../src/theme/themedComponents/ButtonThemed";
import ConnectWallet from "../../../src/components/Error/ConnectWallet";
import InstallMetamask from "../../../src/components/Error/InstallMetamask";
import SupplyAsset from "../../../src/content/OC/SupplyAsset";
import BorrowAsset from "../../../src/content/OC/BorrowAsset";
import { useAppDataProvider } from "../../../src/contexts/AppDataContext";
import dynamic from "next/dynamic";
import Tour from "../../../src/content/OC/Tour";
import HealthFactorCard from "@/components/Card/HealthFactorCard";

function OCMarkets() {
  const { activateBrowserWallet, account } = useEthers();
  const [hasMetamask, setHasMetamask] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });
  async function connect() {
    await activateBrowserWallet();
  }

  const gridSpacing = 1;

  const { OCData } = useAppDataProvider();
  // console.log(OCData);
  // const Tour = dynamic(() => import("../../../src/content/OC/Tour"), {
  //   ssr: false,
  // });

  if (typeof window !== "undefined" && !localStorage.getItem("tourDone")) {
    localStorage.setItem("tourDone", "true");
    setTourOpen(true);
  }
  return (
    <>
      <Head>
        <title>Over collateralized Market</title>
      </Head>
      {/*  */}
      <div>
        {hasMetamask ? (
          account ? (
            <Container maxWidth="xl" sx={{ mb: "25px" }}>
              <PageTitleWrapper>
                <PageHeader />
              </PageTitleWrapper>
              {tourOpen && <Tour />}
              <Grid container spacing={gridSpacing} sx={{ pb: "35px" }}>
                <Grid item xs={12}>
                  <Grid container spacing={gridSpacing}>
                    <Grid
                      item
                      lg={3}
                      md={4}
                      sm={6}
                      xs={12}
                      data-tut="oc-supply-card"
                    >
                      <SupplyCard
                        totalSupplyUsd={OCData?.totalSupplyInUsd?.toString()}
                        isLoading={OCData?.loading}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={4}
                      sm={6}
                      xs={12}
                      data-tut="oc-borrow-card"
                    >
                      <BorrowCard
                        totalBorrowUsd={OCData?.totalBorrowInUsd?.toString()}
                        isLoading={OCData?.loading}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={4}
                      sm={6}
                      xs={12}
                      data-tut="oc-apy-card"
                    >
                      <ApyCard
                        totalApy={OCData?.netApy?.toString()}
                        isLoading={OCData?.loading}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={4}
                      sm={6}
                      xs={12}
                      data-tut="oc-apy-card"
                    >
                      <HealthFactorCard
                        totalHealthFactor={OCData?.healthFactor?.toString()}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="stretch" spacing={3}>
                <Grid item xs={6} data-tut="oc-supply-assets">
                  <SupplyAsset />
                </Grid>
                <Grid item xs={6} data-tut="oc-borrow-assets">
                  <BorrowAsset />
                </Grid>
              </Grid>
            </Container>
          ) : (
            <ConnectWallet connect={connect}></ConnectWallet>
          )
        ) : (
          <InstallMetamask></InstallMetamask>
        )}
      </div>
    </>
  );
}

OCMarkets.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default OCMarkets;
