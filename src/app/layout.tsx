import "./globals.css";
import { Outfit, Instrument_Sans, Black_Han_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteGradualBlur from "@/components/GradualBlur/SiteGradualBlur";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageBackgroundSync from "@/components/PageBackgroundSync";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const blackHanSans = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-han-sans",
  display: "swap",
});

export const metadata = {
  title: "Aashidesignz",
  description: "Brand & Digital Experience Designer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${instrumentSans.variable} ${blackHanSans.variable}`}
    >
      <head>
        <link rel="icon" type="image/x-icon" href="/img/favicon.svg" />
        {/* GA Script goes here if needed */}
      </head>
      <body className={outfit.className}>
        <PageBackgroundSync />
        <CustomCursor />
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <SiteGradualBlur />
      </body>
    </html>
  );
}
