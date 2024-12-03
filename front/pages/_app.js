/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

// @emotion
import createCache from "@emotion/cache";

// @emotion/react components
import { CacheProvider } from "@emotion/react";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// NextJS Material Dashboard 2 PRO themes
import theme from "/assets/theme";

// NextJS Material Dashboard 2 PRO Dark Mode themes
import themeDark from "/assets/theme-dark";

// NextJS Material Dashboard 2 PRO Context Provider
import {
  MaterialUIControllerProvider,
  useMaterialUIController,
} from "/context";

// Images
import favicon from "/assets/images/favicon.ico";
import appleIcon from "/assets/images/apple-icon.png";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: "css", prepend: true });

function Main({ Component, pageProps }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { pathname } = useRouter();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

import { SessionProvider } from "next-auth/react";

import "../globals.css";

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <MaterialUIControllerProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href={favicon.src} />
          <link rel="apple-touch-icon" sizes="76x76" href={appleIcon.src} />
          <title>App Legal</title>
        </Head>
        <SessionProvider session={pageProps.session}>
          <Main Component={Component} pageProps={pageProps} />
        </SessionProvider>
      </CacheProvider>
    </MaterialUIControllerProvider>
  );
}

export default MyApp;
