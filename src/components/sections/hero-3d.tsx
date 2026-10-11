"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

/** WebGL canvas is client-only; skeleton shows while three.js loads. */
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

function SceneSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-[#00a5a8]/10 blur-2xl" />
    </div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface TrustItem {
  icon: typeof ShieldCheck;
  label: string;
}

const trustItems: TrustItem[] = [
  { icon: ShieldCheck, label: "CE & FDA certified" },
  { icon: Truck, label: "Fast nationwide delivery" },
  { icon: Award, label: "Genuine brands only" },
];

export function Hero3D() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b4f6c]/5 via-white to-white">
      {/* Soft decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#00a5a8]/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:gap-6 lg:py-20">
        {/* Text: 60% */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-3"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[#0b4f6c]/15 bg-white/70 px-3 py-1 text-xs font-medium text-[#0b4f6c] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a5a8]" />
            Trusted by 2,000+ clinics & pharmacies
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-[#0f1c2e] sm:text-5xl lg:text-6xl"
          >
            Medical equipment,
            <br />
            <span className="bg-gradient-to-r from-[#0b4f6c] to-[#00a5a8] bg-clip-text text-transparent">
              engineered for care.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#0f1c2e]/70 sm:text-lg"
          >
            Aia Health supplies professionals and families with certified
            diagnostic devices, consumables and clinical essentials, delivered
            fast and backed by expert support.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[#0b4f6c] text-white hover:bg-[#0b4f6c]/90">
              <Link href="/products">
                Shop products <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#0b4f6c]/20 text-[#0b4f6c]">
              <Link href="/contact">Request a quote</Link>
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-[#0f1c2e]/70">
                <Icon className="h-4 w-4 text-[#00a5a8]" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Canvas: 40% */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-[380px] lg:col-span-2 lg:h-[620px]"
        >
          <HeroScene className="h-full w-full" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero3D;