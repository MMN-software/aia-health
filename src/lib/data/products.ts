import type { Product, Category } from "@/types";

export const CATEGORIES: Category[] = [
  "Diagnostic",
  "Surgical",
  "PPE",
  "Mobility",
  "Respiratory",
  "Wound Care",
  "Lab",
  "Hospital Furniture",
];

export const CATEGORY_ICONS: Record<Category, string> = {
  Diagnostic: "Stethoscope",
  Surgical: "Scissors",
  PPE: "Shield",
  Mobility: "Accessibility",
  Respiratory: "Wind",
  "Wound Care": "Bandage",
  Lab: "FlaskConical",
  "Hospital Furniture": "Bed",
};

const IMG = "/images/products";

export const PRODUCTS: Product[] = [
  {
    id: "ah-001",
    name: "Digital Blood Pressure Monitor",
    slug: "digital-blood-pressure-monitor",
    category: "Diagnostic",
    brand: "Omron",
    price: 89.99,
    oldPrice: 109.99,
    sku: "AH-BPM-001",
    stock: 42,
    rating: 4.8,
    reviews: 214,
    image: `${IMG}/product-bp-monitor.jpg`,
    gallery: [
      `${IMG}/product-bp-monitor.jpg`,
      `${IMG}/product-bp-monitor.jpg`,
      `${IMG}/product-bp-monitor.jpg`,
    ],
    shortDescription:
      "Clinically validated upper-arm monitor with irregular heartbeat detection.",
    description:
      "Clinically validated upper-arm blood pressure monitor with irregular heartbeat detection and 2-user memory. Ideal for clinics and home care.",
    specs: {
      Measurement: "Oscillometric, upper arm",
      Range: "0–299 mmHg",
      Memory: "2 users × 60 readings",
      Power: "4× AA or USB-C",
      Cuff: "22–42 cm",
    },
    featured: true,
    bestSeller: true,
  },
  {
    id: "ah-002",
    name: "Fingertip Pulse Oximeter",
    slug: "fingertip-pulse-oximeter",
    category: "Diagnostic",
    brand: "Contec",
    price: 34.99,
    sku: "AH-POX-002",
    stock: 120,
    rating: 4.6,
    reviews: 340,
    image: `${IMG}/product-pulse-oximeter.jpg`,
    gallery: [
      `${IMG}/product-pulse-oximeter.jpg`,
      `${IMG}/product-pulse-oximeter.jpg`,
    ],
    shortDescription:
      "Compact OLED pulse oximeter with SpO₂ and pulse rate.",
    description:
      "Compact OLED pulse oximeter measuring SpO₂ and pulse rate with one-touch operation and auto power-off.",
    specs: {
      "SpO₂ Range": "70–100%",
      "Pulse Range": "30–250 bpm",
      Display: "OLED, dual color",
      Battery: "2× AAA",
      Certification: "CE, FDA",
    },
    featured: true,
  },
  {
    id: "ah-003",
    name: "Classic III Stethoscope",
    slug: "classic-iii-stethoscope",
    category: "Diagnostic",
    brand: "3M Littmann",
    price: 99.99,
    sku: "AH-STH-003",
    stock: 30,
    rating: 4.9,
    reviews: 512,
    image: `${IMG}/product-stethoscope.jpg`,
    gallery: [
      `${IMG}/product-stethoscope.jpg`,
      `${IMG}/product-stethoscope.jpg`,
    ],
    shortDescription:
      "Tunable diaphragm stethoscope for adult and pediatric auscultation.",
    description:
      "Tunable diaphragm stethoscope for adult and pediatric auscultation. Excellent acoustic performance and comfortable eartips.",
    specs: {
      Type: "Dual-head, tunable",
      Material: "Stainless steel",
      Tube: "Single-lumen PVC",
      Length: "27 in",
    },
    featured: true,
    bestSeller: true,
  },
  {
    id: "ah-004",
    name: "Non-Contact Infrared Thermometer",
    slug: "infrared-thermometer",
    category: "Diagnostic",
    brand: "Braun",
    price: 49.99,
    sku: "AH-THM-004",
    stock: 85,
    rating: 4.5,
    reviews: 189,
    image: `${IMG}/product-thermometer.jpg`,
    gallery: [
      `${IMG}/product-thermometer.jpg`,
      `${IMG}/product-thermometer.jpg`,
    ],
    shortDescription: "Forehead thermometer with 1-second reading.",
    description:
      "Forehead thermometer with 1-second reading, silent mode, and fever indicator. Perfect for pediatric use.",
    specs: {
      Range: "34–42.2 °C",
      Accuracy: "±0.2 °C",
      Response: "1 second",
      Battery: "2× AA",
    },
  },
  {
    id: "ah-005",
    name: "Nitrile Exam Gloves (Box of 100)",
    slug: "nitrile-exam-gloves",
    category: "PPE",
    brand: "Ansell",
    price: 24.99,
    sku: "AH-GLV-005",
    stock: 300,
    rating: 4.7,
    reviews: 428,
    image: `${IMG}/product-gloves.jpg`,
    gallery: [
      `${IMG}/product-gloves.jpg`,
      `${IMG}/product-gloves.jpg`,
    ],
    shortDescription:
      "Powder-free, latex-free nitrile examination gloves.",
    description:
      "Powder-free, latex-free nitrile examination gloves. Textured fingertips for grip.",
    specs: {
      Material: "Nitrile",
      Size: "M (also S, L)",
      Type: "Powder-free",
      Quantity: "100 gloves",
    },
    featured: true,
    bestSeller: true,
  },
  {
    id: "ah-006",
    name: "N95 Respirator Masks (Box of 20)",
    slug: "n95-respirator-masks",
    category: "PPE",
    brand: "3M",
    price: 39.99,
    sku: "AH-MSK-006",
    stock: 180,
    rating: 4.9,
    reviews: 602,
    image: `${IMG}/product-masks.jpg`,
    gallery: [
      `${IMG}/product-masks.jpg`,
      `${IMG}/product-masks.jpg`,
    ],
    shortDescription:
      "NIOSH-approved N95 respirators with 95% filtration.",
    description:
      "NIOSH-approved N95 respirators with 95% filtration efficiency and adjustable nose clip.",
    specs: {
      Standard: "NIOSH N95",
      Filtration: "≥ 95%",
      Quantity: "20 masks",
      Strap: "Dual elastic",
    },
    featured: true,
  },
  {
    id: "ah-007",
    name: "Foldable Aluminum Wheelchair",
    slug: "foldable-aluminum-wheelchair",
    category: "Mobility",
    brand: "Drive DeVilbiss",
    price: 249.99,
    oldPrice: 299.99,
    sku: "AH-WCH-007",
    stock: 25,
    rating: 4.6,
    reviews: 78,
    image: `${IMG}/product-wheelchair.jpg`,
    gallery: [
      `${IMG}/product-wheelchair.jpg`,
      `${IMG}/product-wheelchair.jpg`,
    ],
    shortDescription: "Lightweight foldable wheelchair with padded seat.",
    description:
      "Lightweight foldable wheelchair with padded seat, detachable footrests, and puncture-proof tires.",
    specs: {
      Frame: "Aluminum",
      Weight: "11 kg",
      Capacity: "120 kg",
      "Folded size": "78 × 30 × 90 cm",
    },
    featured: true,
  },
  {
    id: "ah-008",
    name: "Compressor Nebulizer Machine",
    slug: "compressor-nebulizer",
    category: "Respiratory",
    brand: "Omron",
    price: 69.99,
    sku: "AH-NEB-008",
    stock: 40,
    rating: 4.6,
    reviews: 143,
    image: `${IMG}/product-nebulizer.jpg`,
    gallery: [
      `${IMG}/product-nebulizer.jpg`,
      `${IMG}/product-nebulizer.jpg`,
    ],
    shortDescription:
      "Compact compressor nebulizer with adult and pediatric masks.",
    description:
      "Compact compressor nebulizer with adult and pediatric masks, mouthpiece, and carrying case.",
    specs: {
      "Nebulization rate": "0.35 ml/min",
      "Particle size": "MMAD 3 μm",
      Noise: "< 55 dB",
      Power: "AC 220V",
    },
    bestSeller: true,
  },
  {
    id: "ah-009",
    name: "Sterile Gauze Pads 4×4 (Pack of 100)",
    slug: "sterile-gauze-pads",
    category: "Wound Care",
    brand: "Covidien",
    price: 14.99,
    sku: "AH-GZE-009",
    stock: 250,
    rating: 4.7,
    reviews: 205,
    image: `${IMG}/product-gauze.jpg`,
    gallery: [
      `${IMG}/product-gauze.jpg`,
      `${IMG}/product-gauze.jpg`,
    ],
    shortDescription:
      "Sterile 12-ply cotton gauze pads for wound dressing.",
    description:
      "Sterile 12-ply cotton gauze pads for wound dressing and cleaning. Individually wrapped.",
    specs: {
      Size: "10 × 10 cm",
      Ply: "12",
      Sterility: "EO sterilized",
      Quantity: "100 pads",
    },
  },
  {
    id: "ah-010",
    name: "Digital Lab Centrifuge 4000 RPM",
    slug: "digital-lab-centrifuge",
    category: "Lab",
    brand: "Eppendorf",
    price: 449.99,
    sku: "AH-CTF-010",
    stock: 12,
    rating: 4.8,
    reviews: 42,
    image: `${IMG}/product-centrifuge.jpg`,
    gallery: [
      `${IMG}/product-centrifuge.jpg`,
      `${IMG}/product-centrifuge.jpg`,
    ],
    shortDescription:
      "Benchtop digital centrifuge with 8×15 ml rotor.",
    description:
      "Benchtop digital centrifuge with 8×15 ml rotor, timer, safety lid lock, and brushless motor.",
    specs: {
      "Max speed": "4000 RPM",
      Rotor: "8 × 15 ml",
      Timer: "1–99 min",
      Display: "LCD digital",
    },
  },
  {
    id: "ah-011",
    name: "Electric Hospital Bed (3-Crank)",
    slug: "electric-hospital-bed",
    category: "Hospital Furniture",
    brand: "Hill-Rom",
    price: 1299.99,
    sku: "AH-BED-011",
    stock: 5,
    rating: 4.9,
    reviews: 28,
    image: `${IMG}/product-bed.jpg`,
    gallery: [
      `${IMG}/product-bed.jpg`,
      `${IMG}/product-bed.jpg`,
    ],
    shortDescription:
      "Adjustable electric hospital bed with side rails and IV pole.",
    description:
      "Adjustable electric hospital bed with side rails, IV pole, casters with brakes, and remote control.",
    specs: {
      Positions: "Head / foot / height",
      Capacity: "180 kg",
      Casters: "4× 125 mm locking",
      Control: "Wired remote",
    },
  },
  {
    id: "ah-012",
    name: "Surgical Scissors Set (3 pcs)",
    slug: "surgical-scissors-set",
    category: "Surgical",
    brand: "Medline",
    price: 44.99,
    sku: "AH-SCI-012",
    stock: 60,
    rating: 4.7,
    reviews: 96,
    image: `${IMG}/product-scissors.jpg`,
    gallery: [
      `${IMG}/product-scissors.jpg`,
      `${IMG}/product-scissors.jpg`,
    ],
    shortDescription:
      "Stainless steel surgical scissors set. Autoclavable.",
    description:
      "Stainless steel surgical scissors set with straight, curved, and bandage scissors. Autoclavable.",
    specs: {
      Material: "Surgical stainless steel",
      Length: "14 cm each",
      Sterilization: "Autoclave 134 °C",
      Pieces: "3",
    },
  },
];

export const BRANDS = [
  "3M",
  "3M Littmann",
  "Ansell",
  "Braun",
  "Contec",
  "Covidien",
  "Drive DeVilbiss",
  "Eppendorf",
  "Hill-Rom",
  "Medline",
  "Omron",
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.bestSeller);
}