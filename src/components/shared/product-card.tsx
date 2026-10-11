"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/store/cart-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-muted/30"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="rounded-full px-2 py-0.5 text-[10px] font-bold"
            >
              -{discount}%
            </Badge>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <Badge
              variant="secondary"
              className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800"
            >
              Low stock
            </Badge>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {product.category}
        </span>

        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="font-medium text-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span>({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="mt-2 h-9 w-full rounded-md"
        >
          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
          Add to cart
        </Button>
      </div>
    </article>
  );
}