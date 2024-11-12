import type { Metadata } from "next";
import localFont from "next/font/local";

import { SidebarProvider } from "@/components/ui/sidebar";
import { ProductTourSidebar } from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Tour",
  description: "Interactive product tour",
};

const lexend = localFont({
  src: "../assets/fonts/lexend.woff2",
  variable: "--font-lexend",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} font-lexend antialiased bg-background`}>
        <SidebarProvider defaultOpen>
          <div className="flex min-h-screen w-full">
            <ProductTourSidebar />
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}