import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const TESTIMONIALS = [
  {
    name: "Dr. Reza Karimi",
    role: "Family Clinic, Toronto",
    initials: "RK",
    rating: 5,
    text: "Aia Health has become our go-to supplier. Orders arrive on time and the quality is consistent. Their support team actually understands medical products.",
  },
  {
    name: "Sarah Mitchell",
    role: "Purchasing Manager, St. Mary Hospital",
    initials: "SM",
    rating: 5,
    text: "We equipped an entire ward in one order. Their team helped us choose the right products and handled the logistics end-to-end.",
  },
  {
    name: "Liam Anderson",
    role: "Paramedic, New York City",
    initials: "LA",
    rating: 5,
    text: "Fast, reliable, and always certified. Exactly what a medical buyer needs. I've recommended them to every clinic I've worked with.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title="What professionals say"
          description="Thousands of clinics and hospitals trust us with their medical supply needs."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/10" />

              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                "{t.text}"
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}