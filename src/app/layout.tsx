import type { Metadata } from "next";


import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { ProductTourSidebar } from "@/components/sidebar";

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
    <html lang="en">
      <body className="font-sans antialiased bg-background">
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