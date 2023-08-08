import { NavLink, NavMain, Navbar } from "@/components/nav-main";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/providers/lang-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Madloved",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = "en";

  return (
    <html lang="en">
      <LanguageProvider language="id">
        <body className={inter.className}>
          <NavMain />
          <Toaster />
          {children}
        </body>
      </LanguageProvider>
    </html>
  );
}
