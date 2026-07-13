import type { Metadata } from "next";
import { Nunito_Sans, Faustina } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});


const faustina = Faustina({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://jamiepacker.com"),
  title: {
    template: "%s | Jamie Packer",
    default: "Jamie Packer",
  },
  description:
    "Jamie Packer — Data Science graduate. Projects, articles, and more.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "256x256" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${faustina.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}