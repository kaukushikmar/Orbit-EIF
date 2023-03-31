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
import PageHeader from "../src/content/Faucet/PageHeader";
import RecentTransactions from "../src/content/Dashboard/RecentTransactions";
import AssetList from "@/content/Faucet/AssetList";

function Home() {
  const { activateBrowserWallet, account } = useEthers();
  const [hasMetamask, setHasMetamask] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });
  async function connect() {
    await activateBrowserWallet();
  }

  const gridSpacing = 3;

  return (
    <>
      <Head>
        <title>Faucet</title>
      </Head>

      <div>
        {hasMetamask ? (
          account ? (
            <Container maxWidth="xl" sx={{ mb: "25px" }}>
              <PageTitleWrapper>
                <PageHeader />
              </PageTitleWrapper>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12}>
                  <AssetList />
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
