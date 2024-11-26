import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'

import "./globals.css";

export const metadata: Metadata = {
  title: "Product Tour",
  description: "Interactive product tour",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  console.log('GeistSans.variable', GeistSans.variable)

  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  )
}
