import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsContent } from "@/components/sections/products-content";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our full catalog of certified medical equipment and supplies.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
          Loading products…
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}