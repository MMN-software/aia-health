"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  Tag,
  Truck,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/store/cart-context";
import { PRODUCTS } from "@/lib/data/products";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_FEE = 14.99;
const TAX_RATE = 0.08;

const VALID_PROMOS: Record<string, number> = {
  MEDSAVE10: 0.1,
  CLINIC15: 0.15,
  WELCOME5: 0.05,
};

export function CartContent() {
  const { items, setQty, removeItem, clearCart, isReady } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const totals = useMemo(() => {
    let subtotal = 0;
    let itemCount = 0;

    items.forEach((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return;
      subtotal += product.price * item.qty;
      itemCount += item.qty;
    });

    const discount = subtotal * discountRate;
    const afterDiscount = subtotal - discount;
    const shipping =
      afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FEE;
    const tax = afterDiscount * TAX_RATE;
    const total = afterDiscount + shipping + tax;

    return { subtotal, discount, shipping, tax, total, itemCount };
  }, [items, discountRate]);

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (VALID_PROMOS[code]) {
      setDiscountRate(VALID_PROMOS[code]);
      setAppliedPromo(code);
      toast.success(
        `Promo "${code}" applied — ${Math.round(VALID_PROMOS[code] * 100)}% off`
      );
    } else {
      setDiscountRate(0);
      setAppliedPromo(null);
      toast.error("Invalid promo code.");
    }
  }

  function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim() || "";
    const email = (data.get("email") as string)?.trim() || "";
    const address = (data.get("address") as string)?.trim() || "";
    const city = (data.get("city") as string)?.trim() || "";
    const zip = (data.get("zip") as string)?.trim() || "";
    const payment = (data.get("payment") as string) || "";

    if (name.length < 2) return toast.error("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Please enter a valid email.");
    if (address.length < 5) return toast.error("Please enter a valid address.");
    if (city.length < 2) return toast.error("Please enter your city.");
    if (zip.length < 3) return toast.error("Please enter a valid ZIP code.");
    if (!payment) return toast.error("Please select a payment method.");

    toast.success("Order placed! We'll email your confirmation shortly.");
    clearCart();
    setDiscountRate(0);
    setAppliedPromo(null);
    setPromoInput("");
    form.reset();
    setCheckoutOpen(false);
  }

  if (!isReady) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
        Loading cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-border/60 bg-muted/20 px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">
            Your cart is empty
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our catalog and add products to get started.
          </p>
          <Link href="/products">
            <Button size="lg" className="mt-6 rounded-full">
              Shop products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Your order
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Shopping cart
        </h1>
        <p className="mt-2 text-muted-foreground">
          {totals.itemCount} item{totals.itemCount === 1 ? "" : "s"} in your
          cart
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
            {items.map((item, idx) => {
              const product = PRODUCTS.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <div
                  key={item.productId}
                  className={cn(
                    "flex gap-4 p-4 transition-colors hover:bg-muted/20",
                    idx > 0 && "border-t border-border/60"
                  )}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted/20 sm:h-28 sm:w-28"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="112px"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${product.slug}`}
                          className="line-clamp-1 text-sm font-semibold transition-colors hover:text-primary sm:text-base"
                        >
                          {product.name}
                        </Link>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {product.category} · SKU {product.sku}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          removeItem(item.productId);
                          toast.success("Item removed from cart.");
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex h-9 items-center rounded-full border border-border/60 bg-background">
                        <button
                          onClick={() =>
                            setQty(item.productId, Math.max(1, item.qty - 1))
                          }
                          className="flex h-full w-9 items-center justify-center text-primary transition-colors hover:bg-muted/50"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            setQty(item.productId, Math.min(99, item.qty + 1))
                          }
                          className="flex h-full w-9 items-center justify-center text-primary transition-colors hover:bg-muted/50"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold text-foreground">
                          ${(product.price * item.qty).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${product.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link href="/products">
            <Button variant="ghost" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue shopping
            </Button>
          </Link>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({totals.itemCount} items)
                </span>
                <span className="font-medium">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>

              {totals.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedPromo})</span>
                  <span className="font-medium">
                    −${totals.discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {totals.shipping === 0
                    ? "Free"
                    : `$${totals.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">${totals.tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-baseline justify-between">
              <span className="text-base font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ${totals.total.toFixed(2)}
              </span>
            </div>

            <div className="mt-5">
              <Label htmlFor="promo" className="flex items-center gap-1.5 text-xs">
                <Tag className="h-3.5 w-3.5" />
                Promo code
              </Label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="promo"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      applyPromo();
                    }
                  }}
                  placeholder="Enter code"
                  className="h-10 uppercase"
                />
                <Button
                  variant="outline"
                  onClick={applyPromo}
                  className="shrink-0 rounded-md"
                >
                  Apply
                </Button>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Try <strong>MEDSAVE10</strong> or <strong>WELCOME5</strong>
              </p>
            </div>

            {totals.subtotal > 0 &&
              totals.subtotal < FREE_SHIPPING_THRESHOLD && (
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
                  <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Add{" "}
                    <strong>
                      ${(FREE_SHIPPING_THRESHOLD - totals.subtotal).toFixed(2)}
                    </strong>{" "}
                    more for free shipping
                  </span>
                </div>
              )}

            <Button
              onClick={() => setCheckoutOpen(true)}
              size="lg"
              className="mt-5 h-12 w-full rounded-full text-base"
            >
              <Lock className="mr-2 h-4 w-4" />
              Proceed to checkout
            </Button>

            <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure
              </span>
              <span>·</span>
              <span>VISA</span>
              <span>MC</span>
              <span>PayPal</span>
            </div>
          </div>
        </aside>
      </div>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Enter your details to place the order. This is a demo — no payment
              will be processed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCheckout} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="co-name">Full name *</Label>
              <Input id="co-name" name="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="co-email">Email *</Label>
              <Input id="co-email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="co-address">Shipping address *</Label>
              <Input id="co-address" name="address" required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="co-city">City *</Label>
                <Input id="co-city" name="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-zip">ZIP / Postal code *</Label>
                <Input id="co-zip" name="zip" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="co-notes">Order notes (optional)</Label>
              <Textarea
                id="co-notes"
                name="notes"
                rows={2}
                placeholder="Delivery instructions, PO number…"
              />
            </div>

            <div className="space-y-2">
              <Label>Payment method *</Label>
              <Select name="payment" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit / Debit card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="invoice">
                    Invoice (net 30, verified clinics)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-muted/40 p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">
                  Order total
                </span>
                <span className="text-lg font-bold text-primary">
                  ${totals.total.toFixed(2)}
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-full text-base"
              >
                Place order
              </Button>
            </DialogFooter>

            <p className="text-center text-[11px] text-muted-foreground">
              By placing this order you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}