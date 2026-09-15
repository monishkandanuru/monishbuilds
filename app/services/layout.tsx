import type { Metadata } from "next";
export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services — Monish Kandanuru",
  description:
    "Web development, app development, and custom solutions built around your business outcomes.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
