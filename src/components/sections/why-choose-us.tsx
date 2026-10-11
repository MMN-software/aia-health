import {
  Truck,
  ShieldCheck,
  Headset,
  RefreshCw,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Certified quality",
    description:
      "Every product meets ISO, CE, or FDA requirements, with documentation included.",
  },
  {
    icon: Truck,
    title: "Fast, tracked delivery",
    description:
      "Same-day dispatch on in-stock items, with real-time tracking on every order.",
  },
  {
    icon: Headset,
    title: "Expert support",
    description:
      "Talk to real clinicians and product specialists — Monday to Saturday.",
  },
  {
    icon: RefreshCw,
    title: "Easy returns",
    description:
      "30-day returns on unopened items. Bulk orders get a dedicated account manager.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Why Aia Health"
          title="Built for healthcare professionals"
          description="We don't just sell boxes. We help clinicians stay focused on what matters: their patients."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}