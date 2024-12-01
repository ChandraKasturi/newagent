import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head';

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Agent Genix",
  description: "AI Agents for you and your business",
};

export default function RootLayout({ children }) {
  return (
   
    
      <html lang="en">
        <Head>
        <link rel="icon" href="/logoagent.png" type="image/png" />
      </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <Navbar />
          
          <main>
            {children}  
          </main>
          <Footer />
        </body>
      </html>
    
  );
}
