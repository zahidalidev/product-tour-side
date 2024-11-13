import type { Metadata } from "next";
import { Inter } from 'next/font/google'

import { SidebarProvider } from "@/components/ui/sidebar";
import { ProductTourSidebar } from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Tour",
  description: "Interactive product tour",
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background`}>
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