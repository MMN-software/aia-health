"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/data/products";
import { SocialIcons } from "@/components/shared/social-icons";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Certifications", href: "/about#certifications" },
];

const SUPPORT_LINKS = [
  { label: "Shipping & Returns", href: "/faq#shipping" },
  { label: "Warranty", href: "/faq#returns" },
  { label: "Bulk Orders", href: "/contact#bulk" },
  { label: "Talk to an Expert", href: "/contact#expert" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("Thanks! You're subscribed.");
    }, 600);
  }

  return (
    <footer className="mt-20 border-t border-border/60 bg-muted/30">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                <span className="text-base font-bold">A+</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight">
                  Aia Health
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Medical Supplies
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Certified medical equipment and supplies for clinics, hospitals,
              and home care — since 2007.
            </p>

            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@aia-health.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>128 Medical Park Drive, Boston, MA</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-5">
              <SocialIcons />
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Shop
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  All Products
                </Link>
              </li>
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?cat=${encodeURIComponent(cat)}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Support
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Product updates & clinic tips. Once a month.
            </p>
            <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 bg-background"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading}
                className="h-9 w-9 shrink-0 rounded-md"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>
              © 2025 Aia Health. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Terms
            </Link>
            <div className="flex items-center gap-2">
              <span className="rounded bg-background px-2 py-1 text-[10px] font-semibold">
                VISA
              </span>
              <span className="rounded bg-background px-2 py-1 text-[10px] font-semibold">
                MC
              </span>
              <span className="rounded bg-background px-2 py-1 text-[10px] font-semibold">
                PayPal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}