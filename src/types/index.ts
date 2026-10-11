/* ============================================================
   Aia Health — Global types
   ============================================================ */

export type Category =
  | "Diagnostic"
  | "Surgical"
  | "PPE"
  | "Mobility"
  | "Respiratory"
  | "Wound Care"
  | "Lab"
  | "Hospital Furniture";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  brand: string;
  price: number;
  oldPrice?: number;
  sku: string;
  stock: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  productId: string;
  qty: number;
}