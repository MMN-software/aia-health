import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-14">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Bulk orders & tenders
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                Equipping your practice or hospital?
              </h2>
              <p className="mt-4 max-w-2xl text-base text-white/85">
                Get a tailored quote within 24 hours. Volume discounts,
                net-30 terms, and dedicated account management for verified
                healthcare organizations.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 w-full rounded-full bg-white px-6 text-base text-primary hover:bg-white/90 sm:w-auto"
                >
                  Request a quote
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a
                href="tel:+18005550199"
                className="flex items-center justify-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white sm:justify-start"
              >
                <Phone className="h-4 w-4" />
                +1 (800) 555-0199
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}