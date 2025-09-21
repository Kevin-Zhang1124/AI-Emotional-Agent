import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmoCoach - AI Emotional Support Companion",
  description: "Your compassionate AI companion for emotional support and mental wellness. Get personalized guidance to help process and manage your feelings.",
  keywords: ["AI", "emotional support", "mental health", "coaching", "wellness"],
  authors: [{ name: "EmoCoach Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#a855f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} h-full`}>
        {children}
      </body>
    </html>
  );
}
