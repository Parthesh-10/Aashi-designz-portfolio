import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import SiteGradualBlur from "@/components/GradualBlur/SiteGradualBlur";

export const metadata = {
  title: "Aashidesignz",
  description: "Brand & Digital Experience Designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/img/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css"
        />
        <link rel="stylesheet" href="/css/style.css" />
        {/* GA Script goes here if needed */}
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <SiteGradualBlur />
        <Script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js" strategy="lazyOnload" />
        <Script src="/js/index.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
