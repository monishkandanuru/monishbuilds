import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Work — Monish Kandanuru",
  description: "Projects built to solve real business problems. NewGen Technologies, SpendWise, VaultEye and more.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
