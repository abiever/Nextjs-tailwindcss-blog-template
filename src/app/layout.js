//This file helps control the overall layout/format of the site at large

import "./globals.css";
import { cx } from "@/src/utils"; //This function is used to help combine classNames
import { Inter, Manrope } from "next/font/google";
import Header from "@/src/components/Header"; //The main Header shared across pages
import Footer from "../components/Footer";
//Helps with SEO
import siteMetadata from "../utils/siteMetaData";
import Script from "next/script";

//Fonts that will be used for the website
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  // Enables site to be scrolled by search engine robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cx(
          //These two variables are initialized above
          inter.variable,
          manrope.variable,
          //'mr' stands for 'manrope'
          "font-mr bg-light dark:bg-dark"
        )}
      >
        {/* Dark Mode Engager */}
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }`}
        </Script>
        {/* This is the main Header component below */}
        <Header /> 
        {children}
        <Footer />
      </body>
    </html>
  );
}
