"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building2,
  User,
  CheckCircle,
  Headphones,
  FileText,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SocialIcons } from "@/components/shared/social-icons";

/* ============================================================
   Data
   ============================================================ */

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (800) 555-0199",
    sub: "Mon–Sat, 8am–8pm ET",
    href: "tel:+18005550199",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@aia-health.com",
    sub: "We reply within 1 business day",
    href: "mailto:support@aia-health.com",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "128 Medical Park Drive",
    sub: "Boston, MA 02210, USA",
    href: "#",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Mon–Fri · 8am–8pm",
    sub: "Saturday · 9am–5pm ET",
    href: "#",
  },
];

const TOPICS = [
  {
    id: "quote",
    label: "Request a bulk quote",
    icon: FileText,
    description: "Volume pricing, tenders, contracts",
  },
  {
    id: "product",
    label: "Product information",
    icon: Building2,
    description: "Specs, availability, sourcing",
  },
  {
    id: "order",
    label: "Order status",
    icon: Truck,
    description: "Tracking, delivery, returns",
  },
  {
    id: "support",
    label: "Technical support",
    icon: Headphones,
    description: "Setup, warranty, troubleshooting",
  },
];

/* ============================================================
   Component
   ============================================================ */

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("quote");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = ((data.get("name") as string) || "").trim();
    const email = ((data.get("email") as string) || "").trim();
    const subject = (data.get("subject") as string) || "";
    const message = ((data.get("message") as string) || "").trim();

    if (name.length < 2) return toast.error("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Please enter a valid email address.");
    if (!subject) return toast.error("Please choose a subject.");
    if (message.length < 10)
      return toast.error("Please write a message (at least 10 characters).");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      form.reset();
      toast.success("Message sent! We'll reply within 1 business day.");
    }, 700);
  }

  return (
    <div className="container mx-auto px-4 py-14">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <MessageCircle className="h-3 w-3" />
          Contact us
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          Talk to a{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            medical expert
          </span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you need a bulk quote, technical specs, or help choosing the
          right product — we&apos;re here. Real humans, no bots.
        </p>
      </div>

      {/* Layout */}
      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        {/* LEFT: Info + Topics */}
        <div className="space-y-8 lg:col-span-2">
          {/* Contact Info Card */}
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="text-lg font-semibold">Get in touch</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Direct lines to our team — no phone trees, no scripts.
            </p>

            <div className="mt-6 space-y-5">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href !== "#" ? "a" : "div";
                return (
                  <Wrapper
                    key={item.label}
                    {...(item.href !== "#"
                      ? { href: item.href }
                      : {})}
                    className="group flex items-start gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-foreground">
                        {item.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.sub}
                      </div>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* Topic Cards */}
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="text-lg font-semibold">What can we help with?</h2>
            <div className="mt-4 space-y-2">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isActive = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all",
                      isActive
                        ? "border-primary/40 bg-primary/5"
                        : "border-border/60 hover:border-primary/30 hover:bg-muted/30"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{topic.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {topic.description}
                      </div>
                    </div>
                    {isActive && (
                      <CheckCircle className="ml-auto h-4 w-4 shrink-0 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Social */}
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="text-lg font-semibold">Follow us</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Product updates, certifications news, and clinic tips.
            </p>
            <div className="mt-4">
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">Message sent!</h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Thanks for reaching out. Our team will reply within one
                  business day — usually faster.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold">Send us a message</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fields marked with <span className="text-destructive">*</span>{" "}
                  are required.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="c-name">
                        Full name <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="c-name"
                          name="name"
                          placeholder="Jane Doe"
                          required
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="c-email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="c-email"
                          name="email"
                          type="email"
                          placeholder="jane@clinic.com"
                          required
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone + Organization */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="c-phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="c-phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (___) ___-____"
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="c-org">Organization</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="c-org"
                          name="organization"
                          placeholder="Clinic or hospital name"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="c-subject">
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      name="subject"
                      value={selectedTopic}
                      onValueChange={setSelectedTopic}
                      required
                    >
                      <SelectTrigger id="c-subject">
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOPICS.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.label}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity (only for quote) */}
                  {selectedTopic === "quote" && (
                    <div className="space-y-2">
                      <Label htmlFor="c-qty">Estimated quantity</Label>
                      <Input
                        id="c-qty"
                        name="quantity"
                        type="number"
                        min={1}
                        placeholder="e.g. 50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Optional — helps us prepare an accurate quote.
                      </p>
                    </div>
                  )}

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="c-message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="c-message"
                      name="message"
                      rows={6}
                      placeholder="Tell us how we can help…"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="h-12 w-full rounded-full text-base"
                  >
                    {loading ? (
                      "Sending…"
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send message
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By submitting this form you agree to our Terms & Privacy
                    Policy. We never share your information.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Map placeholder */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-border/60">
            <div className="relative h-64 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <MapPin className="h-10 w-10 text-primary" />
                <p className="mt-3 text-sm font-semibold text-foreground">
                  Aia Health HQ
                </p>
                <p className="text-xs text-muted-foreground">
                  128 Medical Park Drive, Boston, MA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}