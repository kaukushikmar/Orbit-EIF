import Head from "next/head";
import SidebarLayout from "../../../src/layouts/SidebarLayout";
import { Grid, Container, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import SupplyCard from "../../../src/components/Card/SupplyCard";
import BorrowCard from "../../../src/components/Card/BorrowCard";
import ApyCard from "../../../src/components/Card/ApyCard";
import PageTitleWrapper from "../../../src/components/PageTitleWrapper";
import PageHeader from "../../../src/components/PageTitle";
import ConnectWallet from "../../../src/components/Error/ConnectWallet";
import InstallMetamask from "../../../src/components/Error/InstallMetamask";
import { useAppDataProvider } from "../../../src/contexts/AppDataContext";
import PositionsCard from "../../../src/content/UC/Positions/PositionsCard";
import { useUCDataProvider } from "@/contexts/UCDataContext";
import Tour from "../../../src/content/UC/Tour";

function UCMarkets() {
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

  const { UCData } = useUCDataProvider();
  // console.log(`UCData: ${UCData}`);

  const gridSpacing = 1;
  if (typeof window !== "undefined" && !localStorage.getItem("tourDoneUC")) {
    localStorage.setItem("tourDoneUC", "true");
    setTourOpen(true);
  }
  return (
    <>
      <Head>
        <title>UC Market</title>
      </Head>

      <div>
        {hasMetamask ? (
          account ? (
            <Container maxWidth="xl" sx={{ mb: "25px" }}>
              <PageTitleWrapper>
                <PageHeader
                  headText="Under Collateralized Positions"
                  bodyText="Your all Wallets"
                />
              </PageTitleWrapper>
              {tourOpen && <Tour />}
              <Grid container spacing={gridSpacing} sx={{ pb: "35px" }}>
                <Grid item xs={12}>
                  <Grid container spacing={gridSpacing}>
                    <Grid
                      item
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                      data-tut="uc-supply-card"
                    >
                      <SupplyCard
                        totalSupplyUsd={UCData?.totalSupplyInUsd.toString()}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                      data-tut="uc-borrow-card"
                    >
                      <BorrowCard
                        totalBorrowUsd={UCData?.totalBorrowInUsd.toString()}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                      data-tut="uc-apy-card"
                    >
                      <ApyCard totalApy={UCData?.totalApy.toString()} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <PositionsCard capsuleData={UCData?.nftDatas} />
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

UCMarkets.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UCMarkets;
