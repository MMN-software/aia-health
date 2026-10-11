import type { Metadata } from "next";
import { CartContent } from "@/components/sections/cart-content";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected medical supplies and proceed to checkout.",
};

export default function CartPage() {
  return <CartContent />;
}