import type { Metadata } from "next";
import clsx from "clsx";

import localFont from 'next/font/local';
import "./globals.css"

const polySansVariable = localFont({
  src: [
    {
      path: '../assets/fonts/PolySans-Neutral.woff',
      style: 'normal'
    },
    {
      path: '../assets/fonts/PolySans-NeutralItalic.woff',
      style: 'italic'
    }
  ],
  variable: '--font-polysans'
});

const polySansMono = localFont({
  src: [
    {
      path: '../assets/fonts/PolySans-NeutralMono.woff',
      style: 'normal'
    },
    {
      path: '../assets/fonts/PolySans-SlimMono.woff',
      style: 'normal'
    }
  ],
  variable: '--font-polysans-mono'
});


export const metadata: Metadata = {
  title: "Product Tour",
  description: "Interactive product tour",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(
      'h-full antialiased bg-vermilion-00',
      polySansVariable.variable,
      polySansMono.variable
    )}>
      <body>{children}</body>
    </html>
  )
}
