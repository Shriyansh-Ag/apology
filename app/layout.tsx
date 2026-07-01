import type { Metadata } from "next";
import { Quicksand, Caveat } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Meri Laddoo ❤️",
  description: "An emotional apology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${caveat.variable} font-sans bg-cream text-gray-800 overflow-x-hidden selection:bg-blush-200 selection:text-blush-500`}>
        {children}
      </body>
    </html>
  );
}
