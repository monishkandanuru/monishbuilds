import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About — Monish Kandanuru",
  description:
    "Clean UI, real experience, scalable code, and obsessive attention to detail.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
