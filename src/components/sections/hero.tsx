"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Award, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "ISO 13485",
    subtitle: "Quality certified",
  },
  {
    icon: Award,
    title: "CE · FDA",
    subtitle: "Fully compliant",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    subtitle: "24–48h dispatch",
  },
  {
    icon: Headset,
    title: "Expert Support",
    subtitle: "Mon–Sat, 8am–8pm",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      {/* Main hero */}
      <div className="container mx-auto px-4 pb-16 pt-20 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: Text */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Trusted by 12,000+ clinics worldwide
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Medical equipment you can{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                rely on.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Certified diagnostics, PPE, surgical instruments, and hospital
              supplies from the world&apos;s leading brands. Delivered fast — and
              trusted by healthcare professionals.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/products">
                <Button size="lg" className="h-12 rounded-full px-6 text-base">
                  Shop all products
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full px-6 text-base"
                >
                  Request a quote
                </Button>
              </Link>
            </div>

            {/* Mini stats */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-foreground">12k+</div>
                <div className="text-muted-foreground">Clinics served</div>
              </div>
              <div className="hidden h-10 w-px bg-border md:block" />
              <div>
                <div className="text-2xl font-bold text-foreground">45</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div className="hidden h-10 w-px bg-border md:block" />
              <div>
                <div className="text-2xl font-bold text-foreground">99%</div>
                <div className="text-muted-foreground">On-time delivery</div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-2xl shadow-primary/10">
              <Image
                src="/images/hero-medical.jpg"
                alt="Modern medical facility"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border/60 bg-background/95 p-4 shadow-xl backdrop-blur-sm md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Certified quality</div>
                  <div className="text-xs text-muted-foreground">
                    ISO · CE · FDA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-y border-border/60 bg-muted/20">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}