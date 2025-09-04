import type { Metadata } from "next";
import { Nunito_Sans, Faustina } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"


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
  title: "Jamie Packer",
  description: "Jamie's personal website",
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.png",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}