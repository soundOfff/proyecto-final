import { MaterialUIControllerProvider } from "/context";

import SessionProvider from "/providers/SessionProvider";

import "../globals.css";

import ThemeProvider from "/providers/ThemeProvider";

import favicon from "/assets/images/favicon.ico";
import appleIcon from "/assets/images/apple-icon.png";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={favicon.src} />
        <link rel="apple-touch-icon" sizes="76x76" href={appleIcon.src} />
        <meta charSet="utf-8" />
        <title>Velo Legal</title>
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MaterialUIControllerProvider>
          <SessionProvider>
            <ThemeProvider options={{ key: "mui" }}>{children}</ThemeProvider>
          </SessionProvider>
        </MaterialUIControllerProvider>
      </body>
    </html>
  );
}
