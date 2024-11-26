import type { Metadata } from "next";
<<<<<<< HEAD

=======
import { GeistSans } from 'geist/font/sans'
>>>>>>> 9d9c017 (Completed layout template with demo)

import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
<<<<<<< HEAD
import { ProductTourSidebar } from "@/components/sidebar";
=======
import { AppSidebar } from "@/components/app-sidebar";
>>>>>>> 9d9c017 (Completed layout template with demo)

export const metadata: Metadata = {
  title: "Product Tour",
  description: "Interactive product tour",
};

<<<<<<< HEAD


=======
>>>>>>> 9d9c017 (Completed layout template with demo)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  console.log('GeistSans.variable', GeistSans.variable)

  return (
<<<<<<< HEAD
    <html lang="en">
      <body className="font-sans antialiased bg-background">
        <SidebarProvider defaultOpen>
          <div className="flex min-h-screen w-full">
            {/* <ProductTourSidebar /> */}
            {children}
          </div>
        </SidebarProvider>
      </body>
=======
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
>>>>>>> 9d9c017 (Completed layout template with demo)
    </html>
  )
}