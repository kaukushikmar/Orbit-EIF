/* eslint-disable @next/next/inline-script-id */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import ThemeProvider from "../src/theme/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { SidebarProvider } from "../src/contexts/SidebarContext";
import { DAppProvider, Config, Goerli, useEthers } from "@usedapp/core";
import { ReactElement, ReactNode } from "react";
import { NotificationProvider } from "@web3uikit/core";
import { DataProvider } from "@/contexts/AppDataContext";
import { UCDataProvider } from "@/contexts/UCDataContext";
import { ErrorBoundary } from "react-error-boundary";
import Tour from "../src/content/OC/Tour";
import Script from "next/script";

// @note removed Picker fns for now, might need it

// @todo Just added goerli for now
const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]:
      "https://eth-goerli.g.alchemy.com/v2/4vLfRwUz7U1CSjeNNCtepMQAuZjA36MU",
  },
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface InterfaceProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();

export default function App(props: InterfaceProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  const { chainId } = useEthers();

  // @note router events => can think of optimization
  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  return (
    <CacheProvider value={emotionCache}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Head>
        <title>Orbit labs</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DAppProvider config={config}>
          <DataProvider>
            <UCDataProvider>
              <NotificationProvider>
                <SidebarProvider>
                  <ThemeProvider>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                  </ThemeProvider>
                </SidebarProvider>
              </NotificationProvider>
            </UCDataProvider>
          </DataProvider>
        </DAppProvider>
      </ErrorBoundary>
    </CacheProvider>
  );
}
