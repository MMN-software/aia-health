"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headset,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/store/cart-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const PERKS = [
  { icon: Truck, title: "Free shipping over $150" },
  { icon: ShieldCheck, title: "Certified: ISO · CE · FDA" },
  { icon: RotateCcw, title: "30-day returns on unopened items" },
  { icon: Headset, title: "Expert support Mon–Sat" },
];

const DEMO_REVIEWS = [
  {
    name: "Dr. N. Alvarez",
    date: "2 weeks ago",
    rating: 5,
    text: "Excellent quality, exactly as described. Arrived quickly and works perfectly in our clinic.",
  },
  {
    name: "Clinic Manager, H.J.",
    date: "1 month ago",
    rating: 4,
    text: "Good product overall. Packaging could be sturdier for bulk orders, but no complaints about the item itself.",
  },
  {
    name: "Sara K.",
    date: "2 months ago",
    rating: 5,
    text: "Ordered 20 units for our practice. Consistent quality and the support team was very helpful.",
  },
];

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const inStock = product.stock > 0;

  function handleAddToCart() {
    addItem(product.id, qty);
    toast.success(`${qty} × ${product.name} added to cart`);
  }

  function handleQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim() || "";
    const email = (data.get("email") as string)?.trim() || "";
    const quantity = (data.get("quantity") as string)?.trim() || "";
    const notes = (data.get("notes") as string)?.trim() || "";

    if (name.length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!quantity || parseInt(quantity, 10) < 1) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    // Demo submission
    console.log("Quote request:", { name, email, quantity, notes, product: product.name, sku: product.sku });
    toast.success("Quote request sent! We'll reply within 24 hours.");
    form.reset();
    setQuoteOpen(false);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav
        className="mb-6 flex items-center gap-1 text-xs text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-primary">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/products?cat=${encodeURIComponent(product.category)}`}
          className="hover:text-primary"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Main layout */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {discount > 0 && (
              <Badge
                variant="destructive"
                className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
              >
                -{discount}%
              </Badge>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all",
                    activeImage === idx
                      ? "border-primary"
                      : "border-border/60 hover:border-primary/50"
                  )}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${product.name} image ${idx + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>
              Brand: <strong className="text-foreground">{product.brand}</strong>
            </span>
            <span className="h-3 w-px bg-border" />
            <span>
              SKU: <strong className="text-foreground">{product.sku}</strong>
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <strong className="text-foreground">
                {product.rating.toFixed(1)}
              </strong>
              <span>({product.reviews} reviews)</span>
            </span>
          </div>

          <Separator className="my-5" />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          {/* Stock */}
          <div className="mt-4">
            {inStock ? (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                In stock — {product.stock} available
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                Out of stock
              </span>
            )}
          </div>

          {/* Buy actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Quantity */}
            <div className="flex h-12 items-center rounded-full border border-border/60 bg-background">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-full w-11 items-center justify-center text-primary transition-colors hover:bg-muted/50"
                aria-label="Decrease quantity"
                disabled={!inStock}
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v)) setQty(Math.min(99, Math.max(1, v)));
                }}
                className="h-full w-12 border-0 bg-transparent text-center text-base font-semibold outline-none"
                aria-label="Quantity"
                min={1}
                max={99}
              />
              <button
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="flex h-full w-11 items-center justify-center text-primary transition-colors hover:bg-muted/50"
                aria-label="Increase quantity"
                disabled={!inStock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              size="lg"
              disabled={!inStock}
              className="h-12 flex-1 rounded-full px-6 text-base sm:flex-none"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </Button>

            <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full px-6 text-base"
                >
                  Request a quote
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Request a bulk quote</DialogTitle>
                  <DialogDescription>
                    We&apos;ll reply within 24 hours with pricing and
                    availability for <strong>{product.name}</strong>.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="q-name">Full name *</Label>
                    <Input id="q-name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-email">Email *</Label>
                    <Input
                      id="q-email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-quantity">Quantity *</Label>
                    <Input
                      id="q-quantity"
                      name="quantity"
                      type="number"
                      min={1}
                      defaultValue={10}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-notes">Notes</Label>
                    <Textarea
                      id="q-notes"
                      name="notes"
                      placeholder="Specific requirements, deadlines, product variants…"
                      rows={3}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full rounded-full">
                      Send request
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Perks */}
          <ul className="mt-6 space-y-3 rounded-xl bg-muted/30 p-5">
            {PERKS.map((perk) => (
              <li key={perk.title} className="flex items-center gap-3 text-sm">
                <perk.icon className="h-4 w-4 shrink-0 text-primary" />
                <span>{perk.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start overflow-x-auto rounded-none border-b border-border/60 bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent px-5 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="rounded-none border-b-2 border-transparent px-5 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-5 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent px-5 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Shipping & returns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </TabsContent>

          <TabsContent value="specs" className="pt-6">
            <div className="max-w-2xl overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <tr
                      key={key}
                      className={cn(
                        "border-b border-border/60 last:border-b-0",
                        idx % 2 === 0 ? "bg-muted/20" : "bg-background"
                      )}
                    >
                      <th className="w-2/5 px-4 py-3 text-left font-medium text-muted-foreground">
                        {key}
                      </th>
                      <td className="px-4 py-3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <div className="max-w-3xl space-y-4">
              {DEMO_REVIEWS.map((review, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/60 bg-card p-5"
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-muted-foreground">
                      · {review.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="pt-6">
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Shipping</h3>
                <p className="mt-2 text-muted-foreground">
                  Orders placed before 3:00 PM (local time) ship the same
                  business day. Standard delivery takes 2–4 business days.
                  Express options are available at checkout.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Returns</h3>
                <p className="mt-2 text-muted-foreground">
                  Unopened items can be returned within 30 days of delivery. For
                  hygiene reasons, opened PPE and wound care items cannot be
                  returned. Bulk orders are subject to a dedicated return
                  policy — please contact your account manager.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}