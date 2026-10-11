import type { Metadata } from "next";
import { FaqContent } from "@/components/sections/faq-content";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about orders, shipping, returns, certifications, and bulk purchasing.",
};

export default function FaqPage() {
  return <FaqContent />;
}