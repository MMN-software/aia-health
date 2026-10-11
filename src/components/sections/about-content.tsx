"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Stethoscope,
  ShieldCheck,
  Truck,
  Award,
  Users,
  Calendar,
  TrendingUp,
  CheckCircle,
  Heart,
  Star,
  ArrowRight,
  Zap,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

/* ============================================================
   Data
   ============================================================ */

const SERVICES = [
  {
    icon: <Stethoscope className="h-6 w-6" />,
    secondaryIcon: <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-primary" />,
    title: "Diagnostics",
    description:
      "Certified diagnostic equipment from the world's leading brands — blood pressure monitors, oximeters, thermometers, and more.",
    position: "left" as const,
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    secondaryIcon: <CheckCircle className="absolute -right-1 -top-1 h-4 w-4 text-primary" />,
    title: "PPE & Protection",
    description:
      "NIOSH-approved N95 masks, nitrile gloves, and full PPE kits to keep healthcare professionals safe on every shift.",
    position: "left" as const,
  },
  {
    icon: <Truck className="h-6 w-6" />,
    secondaryIcon: <Star className="absolute -right-1 -top-1 h-4 w-4 text-primary" />,
    title: "Fast Delivery",
    description:
      "Same-day dispatch on in-stock items, with real-time tracking and reliable delivery to 45+ countries.",
    position: "left" as const,
  },
  {
    icon: <Award className="h-6 w-6" />,
    secondaryIcon: <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-primary" />,
    title: "Certified Quality",
    description:
      "Every product meets ISO 13485, CE, or FDA standards. Documentation and certificates included with each order.",
    position: "right" as const,
  },
  {
    icon: <Users className="h-6 w-6" />,
    secondaryIcon: <CheckCircle className="absolute -right-1 -top-1 h-4 w-4 text-primary" />,
    title: "Human Support",
    description:
      "Talk to real clinicians and product specialists — Monday to Saturday. No bots, no queues, no scripts.",
    position: "right" as const,
  },
  {
    icon: <Heart className="h-6 w-6" />,
    secondaryIcon: <Star className="absolute -right-1 -top-1 h-4 w-4 text-primary" />,
    title: "Built for Care",
    description:
      "We help clinicians stay focused on what matters most — their patients. Every order, every product, every time.",
    position: "right" as const,
  },
];

const STATS = [
  { icon: <Award />, value: 12000, label: "Clinics Served", suffix: "+" },
  { icon: <Users />, value: 45, label: "Countries Shipped", suffix: "" },
  { icon: <Calendar />, value: 18, label: "Years Experience", suffix: "" },
  { icon: <TrendingUp />, value: 99, label: "On-time Delivery", suffix: "%" },
];

/* ============================================================
   Component
   ============================================================ */

export function AboutContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-24 px-4"
    >
      {/* Decorative backgrounds */}
      <motion.div
        className="absolute left-10 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute left-1/4 top-1/2 h-4 w-4 rounded-full bg-primary/30"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 h-6 w-6 rounded-full bg-accent/30"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container relative z-10 mx-auto max-w-6xl"
        initial="hidden"
        animate={isMounted && isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="mb-6 flex flex-col items-center" variants={itemVariants}>
          <motion.span
            className="mb-2 flex items-center gap-2 font-medium text-primary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="h-4 w-4" />
            DISCOVER OUR STORY
          </motion.span>
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Built by clinicians,
            <br />
            for clinicians
          </h2>
          <motion.div
            className="h-1 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="mx-auto mb-16 max-w-2xl text-center text-muted-foreground"
          variants={itemVariants}
        >
          Aia Health started with a simple frustration: ordering medical
          supplies was slow, opaque, and unreliable. Today we serve over 12,000
          healthcare organizations across 45 countries — every item verified,
          certified, and backed by real human support.
        </motion.p>

        {/* Services grid */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left */}
          <div className="space-y-16">
            {SERVICES.filter((s) => s.position === "left").map((service, index) => (
              <ServiceItem
                key={`left-${index}`}
                icon={service.icon}
                secondaryIcon={service.secondaryIcon}
                title={service.title}
                description={service.description}
                variants={itemVariants}
                delay={index * 0.2}
                direction="left"
              />
            ))}
          </div>

          {/* Center image */}
          <div className="order-first mb-8 flex items-center justify-center md:order-none md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="overflow-hidden rounded-md shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="relative aspect-square">
                  <Image
                    src="/images/about-team.jpg"
                    alt="Aia Health team"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-primary/50 to-transparent p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/products"
                      className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-primary"
                    >
                      Browse Catalog <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Border frame */}
              <motion.div
                className="absolute inset-0 -m-3 z-[-1] rounded-md border-4 border-primary/20"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Floating accents */}
              <motion.div
                className="absolute -right-8 -top-4 h-16 w-16 rounded-full bg-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-10 h-20 w-20 rounded-full bg-accent/15"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              />
              <motion.div
                className="absolute -top-10 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-12 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>

          {/* Right */}
          <div className="space-y-16">
            {SERVICES.filter((s) => s.position === "right").map((service, index) => (
              <ServiceItem
                key={`right-${index}`}
                icon={service.icon}
                secondaryIcon={service.secondaryIcon}
                title={service.title}
                description={service.description}
                variants={itemVariants}
                delay={index * 0.2}
                direction="right"
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {STATS.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 flex flex-col items-center justify-between gap-6 rounded-xl bg-gradient-to-br from-primary to-primary/80 p-8 text-white md:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold">
              Ready to equip your practice?
            </h3>
            <p className="text-white/85">
              Talk to our team about bulk orders, tenders, or custom sourcing.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-primary transition-colors hover:bg-white/90"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   ServiceItem
   ============================================================ */

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: {
    hidden: { opacity: number; y?: number };
    visible: {
      opacity: number;
      y?: number;
      transition: { duration: number };
    };
  };
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({
  icon,
  secondaryIcon,
  title,
  description,
  variants,
  delay,
  direction,
}: ServiceItemProps) {
  return (
    <motion.div
      className="group flex flex-col"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="mb-3 flex items-center gap-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="group-hover:bg-primary/20 relative rounded-lg bg-primary/10 p-3 text-primary transition-colors duration-300"
          whileHover={{
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="group-hover:text-primary text-xl font-semibold text-foreground transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="pl-12 text-sm leading-relaxed text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <div className="mt-3 flex items-center pl-12 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </motion.div>
  );
}

/* ============================================================
   StatCounter
   ============================================================ */

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="group flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-card hover:shadow-lg"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="group-hover:bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <div
        ref={countRef}
        className="flex items-center text-3xl font-bold text-foreground"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      <motion.div className="mt-3 h-0.5 w-10 bg-primary transition-all duration-300 group-hover:w-16" />
    </motion.div>
  );
}