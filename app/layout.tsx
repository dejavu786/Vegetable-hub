import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://freshfields.pk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fresh Fields | Farm-Fresh Vegetables, Delivered Same Day",
    template: "%s | Fresh Fields",
  },
  description:
    "Fresh Fields picks farm-fresh vegetables every morning and delivers them the same day across DHA, Karachi. Real food, honestly grown.",
  openGraph: {
    title: "Fresh Fields | Farm-Fresh Vegetables, Delivered Same Day",
    description:
      "Hand-picked vegetables, delivered fresh the same day across DHA, Karachi.",
    url: siteUrl,
    siteName: "Fresh Fields",
    images: [{ url: "/og-image.png", width: 1024, height: 1024 }],
    locale: "en_PK",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/og-image.png",
  },
};

export const viewport = {
  themeColor: "#1c3f21",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col font-body">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
