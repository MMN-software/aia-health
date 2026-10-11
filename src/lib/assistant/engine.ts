/* ============================================================
   Aia Health — Assistant Engine (rule-based)
   Designed to be swappable with a real AI later.
   Public API: `respond(message, history) => Promise<AssistantReply>`
   ============================================================ */

import { PRODUCTS } from "@/lib/data/products";
import type { Product } from "@/types";

export interface AssistantReply {
  text: string;
  products?: Product[];
  quickReplies?: string[];
}

type Intent =
  | "greeting"
  | "thanks"
  | "search_product"
  | "price_range"
  | "compare"
  | "shipping"
  | "returns"
  | "certifications"
  | "bulk_quote"
  | "contact"
  | "hours"
  | "categories"
  | "help"
  | "fallback";

const KEYWORDS: Record<Intent, string[]> = {
  greeting: ["hi", "hello", "hey", "salam", "good morning", "good evening"],
  thanks: ["thanks", "thank you", "thx", "merci"],
  shipping: ["ship", "shipping", "delivery", "deliver", "how long"],
  returns: ["return", "refund", "exchange", "money back"],
  certifications: ["certif", "iso", "ce", "fda", "compliance", "standard"],
  bulk_quote: ["quote", "bulk", "wholesale", "volume", "b2b", "tender"],
  contact: ["contact", "phone", "email", "call", "reach", "support"],
  hours: ["hours", "open", "close", "available", "when"],
  categories: ["categories", "category", "what do you sell", "products"],
  help: ["help", "what can you do", "how can you help"],
  compare: ["compare", "difference", "vs", "versus", "better"],
  price_range: ["cheap", "budget", "expensive", "under", "around", "between"],
  search_product: [],
  fallback: [],
};

/* ------------------------------------------------------------------ */
/*  Intent detection                                                   */
/* ------------------------------------------------------------------ */

function detectIntent(raw: string): Intent {
  const msg = raw.toLowerCase().trim();

  if (msg.length < 2) return "fallback";

  for (const [intent, keys] of Object.entries(KEYWORDS)) {
    if (intent === "search_product" || intent === "fallback") continue;
    if (keys.some((k) => msg.includes(k))) {
      return intent as Intent;
    }
  }

  // If message contains a product-ish keyword, treat as search
  const searchable = PRODUCTS.some(
    (p) =>
      msg.includes(p.name.toLowerCase().split(" ")[0]) ||
      msg.includes(p.category.toLowerCase()) ||
      msg.includes(p.brand.toLowerCase())
  );
  if (searchable) return "search_product";

  return "fallback";
}

/* ------------------------------------------------------------------ */
/*  Product search                                                     */
/* ------------------------------------------------------------------ */

function searchProducts(query: string, limit = 3): Product[] {
  const q = query.toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);

  const scored = PRODUCTS.map((p) => {
    let score = 0;
    const haystack = `${p.name} ${p.brand} ${p.category} ${p.shortDescription}`.toLowerCase();

    for (const t of tokens) {
      if (p.name.toLowerCase().includes(t)) score += 5;
      if (p.brand.toLowerCase().includes(t)) score += 3;
      if (p.category.toLowerCase().includes(t)) score += 3;
      if (haystack.includes(t)) score += 1;
    }
    return { p, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((x) => x.p);
}

/* ------------------------------------------------------------------ */
/*  Reply builders                                                     */
/* ------------------------------------------------------------------ */

const QUICK_DEFAULT = [
  "Browse categories",
  "Shipping info",
  "Request a quote",
  "Talk to a human",
];

function replyForIntent(intent: Intent, message: string): AssistantReply {
  switch (intent) {
    case "greeting":
      return {
        text: "Hi! 👋 I'm Aia, your medical supplies assistant. I can help you find products, compare options, or answer questions about shipping, certifications, and bulk orders. What are you looking for?",
        quickReplies: QUICK_DEFAULT,
      };

    case "thanks":
      return {
        text: "You're welcome! Anything else I can help with? 😊",
        quickReplies: ["Browse products", "Shipping info", "Talk to a human"],
      };

    case "shipping":
      return {
        text: "🚚 **Shipping info:**\n\n• Orders placed before 3 PM ship same day\n• Standard delivery: 2–4 business days\n• Free shipping on orders over $150\n• Flat $14.99 shipping for smaller orders\n• We ship to 45+ countries\n\nNeed express or international rates? I can connect you with support.",
        quickReplies: ["Request a quote", "Talk to a human"],
      };

    case "returns":
      return {
        text: "↩️ **Returns & refunds:**\n\n• 30 days on unopened items\n• Full refund, no questions asked\n• Damaged item? We replace it free within 48h of delivery\n• ⚠️ Opened PPE and wound-care products can't be returned (hygiene)\n\nWant to start a return?",
        quickReplies: ["Talk to a human", "Shipping info"],
      };

    case "certifications":
      return {
        text: "🛡️ **Certifications:**\n\nEvery product we ship meets strict regulatory standards:\n\n• **ISO 13485** — Quality management\n• **CE** — EU market approval\n• **FDA** — US registration\n• **GDP** — Good Distribution Practice\n\nCertificates of conformity are available on request for any product.",
        quickReplies: ["Browse products", "Request a quote"],
      };

    case "bulk_quote":
      return {
        text: "📋 **Bulk orders & tenders:**\n\nWe offer:\n\n• Volume discounts (tiered pricing)\n• Net-30 terms for verified clinics\n• Dedicated account manager\n• POs accepted\n\nTell me roughly what you need and I'll point you to the quote form — or use the button on any product page.",
        quickReplies: ["Open quote form", "Talk to a human"],
      };

    case "contact":
      return {
        text: "📞 **Ways to reach us:**\n\n• Phone: +1 (800) 555-0199\n• Email: support@aia-health.com\n• Hours: Mon–Sat, 8am–8pm ET\n• Or use our contact form\n\nAverage reply time: under 1 business day.",
        quickReplies: ["Open contact page", "Shipping info"],
      };

    case "hours":
      return {
        text: "🕐 **Support hours:**\n\n• Mon–Fri: 8am – 8pm ET\n• Saturday: 9am – 5pm ET\n• Sunday: closed\n\nOutside these hours? Leave a message and we'll reply first thing.",
        quickReplies: ["Contact info", "Browse products"],
      };

    case "categories":
      return {
        text: "📦 **We carry 8 categories:**\n\nDiagnostic · Surgical · PPE · Mobility · Respiratory · Wound Care · Lab · Hospital Furniture\n\nWhich one interests you?",
        quickReplies: [
          "Show Diagnostics",
          "Show PPE",
          "Show Mobility",
          "Browse all",
        ],
      };

    case "help":
      return {
        text: "I can help with:\n\n• 🔍 **Finding products** — just describe what you need\n• ⚖️ **Comparing** two products\n• 🚚 **Shipping** information\n• 🛡️ **Certifications**\n• 📋 **Bulk quotes**\n• 📞 **Contacting** our team\n\nWhat would you like to explore?",
        quickReplies: QUICK_DEFAULT,
      };

    case "compare":
      return {
        text: "Sure! Tell me the names of the two products you'd like to compare — for example: *\"Compare Omron BP monitor and pulse oximeter\"*.",
        quickReplies: ["Show Diagnostic products"],
      };

    case "price_range": {
      const under50 = PRODUCTS.filter((p) => p.price < 50).slice(0, 3);
      return {
        text: "Here are some budget-friendly options under $50:",
        products: under50,
        quickReplies: ["Show all products", "Filter by category"],
      };
    }

    case "search_product": {
      const results = searchProducts(message);
      if (results.length === 0) {
        return {
          text: "I couldn't find a product matching that. Try describing what you need — e.g. *\"blood pressure monitor\"*, *\"nitrile gloves\"*, or *\"wheelchair\"*.",
          quickReplies: QUICK_DEFAULT,
        };
      }
      return {
        text:
          results.length === 1
            ? "Here's what I found:"
            : `Here are the top ${results.length} matches:`,
        products: results,
        quickReplies: ["Show all products", "Talk to a human"],
      };
    }

    case "fallback":
    default:
      return {
        text: "I'm not sure I understood that. 🤔 Try asking about products, shipping, certifications, or bulk orders — or type *\"help\"* to see what I can do.",
        quickReplies: ["Help", "Browse products", "Contact info"],
      };
  }
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export async function respond(
  message: string,
  _history: { role: "user" | "assistant"; content: string }[] = []
): Promise<AssistantReply> {
  // Simulate a short network delay for a natural feel
  await new Promise((r) => setTimeout(r, 350));

  const intent = detectIntent(message);
  return replyForIntent(intent, message);
}

export const INITIAL_MESSAGE: AssistantReply = {
  text: "Hi! 👋 I'm **Aia**, your medical supplies assistant. I can help you find products, compare options, or answer questions. What do you need?",
  quickReplies: QUICK_DEFAULT,
};