import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Work — Monish Kandanuru",
  description:
    "Projects built to solve real business problems. ThermoWatch, FitAI, NewGen Technologies, SpendWise, and VaultEye.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
