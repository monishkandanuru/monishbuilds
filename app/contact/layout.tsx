import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact — Monish Kandanuru",
  description: "Start your project. Tell me what you need and I'll respond with the best approach.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
