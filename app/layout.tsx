import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://monishbuilds.vercel.app"),
  title: "Monish Kandanuru — Web & App Developer",
  description:
    "I design and build high-quality websites and apps that help businesses attract, impress, and convert customers.",
  keywords:
    "web developer, app developer, Next.js, React, mobile app, Bangalore, India, Monish Kandanuru",
  applicationName: "Monish Kandanuru",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
      },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  verification: {
    google: "tkpCW4Y_AjKJSgLv4OpDAeCilZtY6sF5Im7dpeky9Gs",
  },
  openGraph: {
    siteName: "Monish Kandanuru",
    title: "Monish Kandanuru — Web & App Developer",
    description:
      "High-quality websites and apps that help businesses attract, impress, and convert customers.",
    type: "website",
    locale: "en_IN",
    url: "https://monishbuilds.vercel.app",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" id="top">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
