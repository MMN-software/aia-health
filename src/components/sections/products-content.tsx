"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/shared/product-card";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const PRICE_RANGES = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $250", min: 100, max: 250 },
  { label: "$250 – $500", min: 250, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

export function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat");
  const initialQ = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQ);
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initialCat ? [initialCat] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceIdx, setPriceIdx] = useState(0);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAll = () => {
    setSearch("");
    setSelectedCats([]);
    setSelectedBrands([]);
    setPriceIdx(0);
    setSort("featured");
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    const range = PRICE_RANGES[priceIdx];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCats.length) {
      list = list.filter((p) => selectedCats.includes(p.category));
    }

    if (selectedBrands.length) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    list = list.filter((p) => p.price >= range.min && p.price <= range.max);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [search, selectedCats, selectedBrands, priceIdx, sort]);

  const activeFilterCount =
    selectedCats.length + selectedBrands.length + (priceIdx > 0 ? 1 : 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Catalog
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          All products
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} product{filtered.length === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand, or SKU…"
            className="h-11 rounded-full pl-10"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-11 rounded-full lg:hidden"
            onClick={() => setFiltersOpen((v) => !v)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 h-5 min-w-5 rounded-full px-1 text-[10px]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-11 w-[180px] rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
              <SelectItem value="name">Name (A–Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside
          className={cn("space-y-6 lg:block", filtersOpen ? "block" : "hidden")}
        >
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Category
            </h3>
            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${cat}`}
                    checked={selectedCats.includes(cat)}
                    onCheckedChange={() => toggleCat(cat)}
                  />
                  <Label
                    htmlFor={`cat-${cat}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Brand
            </h3>
            <div className="space-y-2.5">
              {BRANDS.map((brand) => (
                <div key={brand} className="flex items-center gap-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Price
            </h3>
            <div className="space-y-2.5">
              {PRICE_RANGES.map((range, idx) => (
                <div key={range.label} className="flex items-center gap-2">
                  <Checkbox
                    id={`price-${idx}`}
                    checked={priceIdx === idx}
                    onCheckedChange={() => setPriceIdx(idx)}
                  />
                  <Label
                    htmlFor={`price-${idx}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              className="w-full rounded-full"
              onClick={clearAll}
            >
              Clear all filters ({activeFilterCount})
            </Button>
          )}
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 py-20">
              <p className="text-lg font-semibold">No products found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-full"
                onClick={clearAll}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}