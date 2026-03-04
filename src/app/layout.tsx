import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SkywarnStatus from "@/components/SkywarnStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indiana GMRS | Community & Coverage",
  description: "Official website for the Indiana GMRS repeater network and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background-primary min-h-screen text-white antialiased flex flex-col`}>
        <div className="sticky top-0 z-[50] flex flex-col">
          <SkywarnStatus />
          <Navbar />
        </div>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
