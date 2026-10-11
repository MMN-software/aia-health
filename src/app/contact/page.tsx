import type { Metadata } from "next";
import { ContactContent } from "@/components/sections/contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to an Aia Health medical supplies expert — request a bulk quote, get product support, or ask a question.",
};

export default function ContactPage() {
  return <ContactContent />;
}