"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Package,
  Truck,
  RotateCcw,
  ShieldCheck,
  Building2,
  Headset,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FAQ_CATEGORIES = [
  {
    id: "orders",
    icon: Package,
    label: "Orders & payment",
    faqs: [
      {
        q: "How do I place an order?",
        a: "Browse our catalog, add products to your cart, and proceed to checkout. You'll receive an order confirmation email immediately and a shipping confirmation with tracking within 24 hours.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit cards (Visa, Mastercard, AmEx), PayPal, and — for verified healthcare organizations — invoicing on net-30 terms.",
      },
      {
        q: "Can I get a quote before ordering?",
        a: "Absolutely. Use the 'Request a quote' button on any product page or contact us directly. We respond to quote requests within 24 hours.",
      },
      {
        q: "Do I need an account to order?",
        a: "No — you can check out as a guest. Creating an account lets you save addresses, track orders, and access order history.",
      },
    ],
  },
  {
    id: "shipping",
    icon: Truck,
    label: "Shipping & delivery",
    faqs: [
      {
        q: "How much does shipping cost?",
        a: "Standard shipping is a flat $14.99 within the continental US. Orders over $150 ship free. Express and international options are calculated at checkout.",
      },
      {
        q: "How fast will I receive my order?",
        a: "In-stock items dispatch the same business day if ordered before 3:00 PM local time. Standard delivery takes 2–4 business days. Express options are available.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes — we ship to over 45 countries. International shipping costs and duties are calculated at checkout. Some products may have regional restrictions based on local regulations.",
      },
    ],
  },
  {
    id: "returns",
    icon: RotateCcw,
    label: "Returns & warranty",
    faqs: [
      {
        q: "What is your return policy?",
        a: "Unopened items can be returned within 30 days of delivery for a full refund. For hygiene reasons, opened PPE, wound care, and sterile products cannot be returned.",
      },
      {
        q: "Are products covered by warranty?",
        a: "Most diagnostic and durable equipment carries a manufacturer warranty — typically 12–24 months. Warranty details are included with each product. Contact us for warranty claims and we'll handle the process with the manufacturer.",
      },
      {
        q: "What if my order arrives damaged?",
        a: "Contact us within 48 hours of delivery with photos of the damaged item and packaging. We'll arrange a replacement or refund immediately — no questions asked.",
      },
    ],
  },
  {
    id: "products",
    icon: ShieldCheck,
    label: "Products & certifications",
    faqs: [
      {
        q: "Are your products certified?",
        a: "Yes. All products carry the certifications required for their category — CE marking for the EU, FDA registration for the US, and ISO 13485 quality management. Product-specific certificates are available on request.",
      },
      {
        q: "Do you provide product documentation?",
        a: "Yes. Instruction manuals, spec sheets, and certificates of conformity are available for every product. Request them on the product page or via our contact form.",
      },
      {
        q: "Can you source products not listed on your site?",
        a: "Often yes. We work with a global network of manufacturers. Send us a description or part number and we'll try to source it for you.",
      },
    ],
  },
  {
    id: "bulk",
    icon: Building2,
    label: "Bulk & wholesale",
    faqs: [
      {
        q: "Do you offer volume discounts?",
        a: "Yes. Orders above certain thresholds qualify for automatic discounts, and larger contracts (hospitals, tenders, government) get customized pricing. Contact us for a tailored quote.",
      },
      {
        q: "Do you support purchase orders (POs)?",
        a: "Yes — for verified healthcare organizations we accept POs and offer net-30 terms. Contact our sales team to set up an account.",
      },
    ],
  },
  {
    id: "support",
    icon: Headset,
    label: "Account & support",
    faqs: [
      {
        q: "How do I contact support?",
        a: "Email support@aia-health.com, call +1 (800) 555-0199, or use our contact form. We respond within one business day.",
      },
      {
        q: "What are your support hours?",
        a: "Monday to Friday, 8am–8pm ET. Saturday, 9am–5pm ET. We're closed on Sundays and major holidays.",
      },
    ],
  },
];

export function FaqContent() {
  const [activeCategory, setActiveCategory] = useState<string>("orders");

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Help center
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-muted-foreground">
          Everything you need to know about ordering, shipping, returns, and
          certifications. Can&apos;t find what you&apos;re looking for? Our team
          is one message away.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Topics
          </h3>
          <nav className="mt-3 space-y-1">
            {FAQ_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h4 className="mt-3 text-sm font-semibold">
              Still have questions?
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Our team responds within one business day.
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full rounded-full"
              >
                Contact support
              </Button>
            </Link>
          </div>
        </aside>

        <div className="space-y-12">
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3 border-b-2 border-primary/20 pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight">
                    {cat.label}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {cat.faqs.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${cat.id}-${idx}`}
                      className="border-border/60"
                    >
                      <AccordionTrigger className="text-sm sm:text-base">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            );
          })}

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h3 className="text-xl font-bold text-white md:text-2xl">
                Still have questions?
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/85">
                Our team is happy to help with anything — from product specs to
                bulk pricing.
              </p>
              <Link href="/contact">
                <Button className="mt-5 rounded-full bg-white text-primary hover:bg-white/90">
                  Contact support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}