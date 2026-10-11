import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/store/cart-context";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatWidget } from "@/components/assistant/chat-widget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aia Health — Medical Equipment & Supplies",
    template: "%s | Aia Health",
  },
  description:
    "Aia Health provides certified medical equipment, diagnostics, PPE, and hospital supplies to clinics and healthcare providers worldwide.",
  keywords: [
    "medical equipment",
    "medical supplies",
    "diagnostics",
    "PPE",
    "hospital supplies",
    "clinic equipment",
    "Aia Health",
  ],
  authors: [{ name: "Aia Health" }],
  creator: "Aia Health",
  metadataBase: new URL("https://aia-health.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Aia Health — Medical Equipment & Supplies",
    description:
      "Certified medical equipment and supplies for clinics, hospitals, and home care.",
    siteName: "Aia Health",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aia Health — Medical Equipment & Supplies",
    description:
      "Certified medical equipment and supplies for clinics, hospitals, and home care.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col`}
      >
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ChatWidget />
        </CartProvider>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}