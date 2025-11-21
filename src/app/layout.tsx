import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // ⬅️ Tambahkan ini
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artacore CMS V2",
  description: "Simple but powerfull CMS using NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        {/* -----------------------------------------------------
            MIDTRANS SNAP.JS SCRIPT (WAJIB)
        ------------------------------------------------------ */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        />

        {children}
      </body>
    </html>
  );
}
