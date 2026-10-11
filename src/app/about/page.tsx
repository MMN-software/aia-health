import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/about-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Aia Health — 18 years supplying certified medical equipment to clinics and hospitals worldwide.",
};

export default function AboutPage() {
  return <AboutContent />;
}