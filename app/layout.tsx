import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Monish Kandanuru — Web & App Developer",
  description: "I design and build high-quality websites and apps that help businesses attract, impress, and convert customers.",
  keywords: "web developer, app developer, Next.js, React, mobile app, Bangalore, India",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Monish Kandanuru — Web & App Developer",
    description: "High-quality websites and apps that help businesses attract, impress, and convert customers.",
    type: "website",
    locale: "en_IN",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg text-white font-body antialiased">{children}</body>
    </html>
  );
}
