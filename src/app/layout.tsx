import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VickyStream | Live Event Streaming Platform",
  description: "Experience premium live events with real-time interaction and cinematic quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${sora.variable} ${inter.variable} font-sans bg-background text-text-primary min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

