import Link from "next/link";
import {
  Stethoscope,
  Scissors,
  Shield,
  Accessibility,
  Wind,
  Bandage,
  FlaskConical,
  Bed,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CATEGORIES, type Category } from "@/lib/data/products";

const CATEGORY_META: Record<
  Category,
  { icon: React.ComponentType<{ className?: string }>; blurb: string }
> = {
  Diagnostic: {
    icon: Stethoscope,
    blurb: "Monitors, oximeters, thermometers",
  },
  Surgical: {
    icon: Scissors,
    blurb: "Instruments & sterile tools",
  },
  PPE: {
    icon: Shield,
    blurb: "Gloves, masks & protection",
  },
  Mobility: {
    icon: Accessibility,
    blurb: "Wheelchairs & walkers",
  },
  Respiratory: {
    icon: Wind,
    blurb: "Nebulizers & oxygen therapy",
  },
  "Wound Care": {
    icon: Bandage,
    blurb: "Gauze, dressings & bandages",
  },
  Lab: {
    icon: FlaskConical,
    blurb: "Microscopes & lab equipment",
  },
  "Hospital Furniture": {
    icon: Bed,
    blurb: "Beds, tables & storage",
  },
};

export function CategoryGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Browse by category"
          title="Everything your practice needs"
          description="From diagnostics to hospital furniture — carefully selected, fully certified."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            return (
              <Link
                key={cat}
                href={`/products?cat=${encodeURIComponent(cat)}`}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Subtle gradient on hover */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 to-primary/0 transition-colors group-hover:from-primary/5 group-hover:to-transparent" />

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  {cat}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {meta.blurb}
                </p>

                <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Browse
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}