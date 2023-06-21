import "./globals.css";

import { Inter } from "next/font/google";
import React from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HelloSpare 🧅",
  description: "When you don't know what to cook!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
          <Header />
          <main className="relative flex flex-col place-items-center">
            {children}
          </main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
