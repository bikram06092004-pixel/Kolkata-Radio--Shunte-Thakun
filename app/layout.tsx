import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kolkata Radio-Sunte Thakun",
  description: "A nostalgic single-page music experience streaming classic vintage Indian retro melodies with live Kolkata clock and vinyl glassmorphism player.",
  keywords: ["nostalgia music", "retro lo-fi", "Kolkata vintage", "vinyl player", "Indian classical retro", "nextjs music app"],
  icons: {
    icon: "/Favicon.png",
    shortcut: "/Favicon.png",
    apple: "/Favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="h-full w-full bg-black font-sans text-white select-none overflow-hidden overscroll-none">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
