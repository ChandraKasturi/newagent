import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/Navbar";
import HeroSection from "./components/Heros";

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
  description: "AI Agents for your business",
};

export default function RootLayout({ children }) {
  return (
   
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <Navbar />
          <HeroSection />
          <main>
            {children}
          </main>
        </body>
      </html>
    
  );
}
