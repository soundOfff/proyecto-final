import { Inter } from "next/font/google";
import "./globals.css";
import NextServiceProvider from "./auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Velo Legal",
  description: "CRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextServiceProvider>{children}</NextServiceProvider>
      </body>
    </html>
  );
}
