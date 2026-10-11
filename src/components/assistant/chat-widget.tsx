"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { respond, INITIAL_MESSAGE, type AssistantReply } from "@/lib/assistant/engine";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: Product[];
  quickReplies?: string[];
  loading?: boolean;
}

function uid(): string {
  return Math.random().toString(36).slice(2);
}

function MiniProduct({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background p-2 transition-all hover:border-primary/40 hover:bg-muted/30"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="line-clamp-1 text-xs font-semibold">
          {product.name}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {product.category} · ${product.price.toFixed(2)}
        </div>
      </div>
      <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "assistant",
      text: INITIAL_MESSAGE.text,
      quickReplies: INITIAL_MESSAGE.quickReplies,
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const userMsg: Message = { id: uid(), role: "user", text: trimmed };
    const placeholder: Message = {
      id: uid(),
      role: "assistant",
      text: "",
      loading: true,
    };

    setMessages((m) => [...m, userMsg, placeholder]);
    setInput("");
    setBusy(true);

    const reply: AssistantReply = await respond(trimmed);

    setMessages((m) =>
      m.map((msg) => {
        if (msg.id !== placeholder.id) return msg;
        return {
          id: placeholder.id,
          role: "assistant",
          text: reply.text,
          products: reply.products,
          quickReplies: reply.quickReplies,
        };
      })
    );
    setBusy(false);
  }

  function handleQuickReply(text: string) {
    const lower = text.toLowerCase();
    const base = "/aia-health";

    if (lower.includes("contact")) {
      window.location.href = base + "/contact/";
      return;
    }
    if (lower.includes("quote form")) {
      window.location.href = base + "/contact/#bulk";
      return;
    }
    if (lower.includes("browse") || lower.includes("show all")) {
      window.location.href = base + "/products/";
      return;
    }
    if (lower.startsWith("show ")) {
      const cat = text
        .replace(/^show /i, "")
        .replace(/ products$/i, "")
        .trim();
      window.location.href = base + "/products/?cat=" + encodeURIComponent(cat);
      return;
    }
    handleSend(text);
  }

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
        >
          <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
          <span className="absolute right-0 top-0 h-3 w-3 animate-pulse rounded-full bg-accent" />
        </button>
      ) : null}

      {open ? (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-primary to-primary/90 px-4 py-3 text-primary-foreground">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-5 w-5" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-primary bg-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                Aia Assistant
                <Sparkles className="h-3 w-3" />
              </div>
              <div className="text-[10px] text-white/80">
                Online · replies instantly
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-muted text-foreground"
                    )}
                  >
                    {msg.loading ? (
                      <div className="flex items-center gap-1 py-0.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                      </div>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(msg.text),
                        }}
                      />
                    )}
                  </div>
                </div>

                {msg.products && msg.products.length > 0 ? (
                  <div className="mt-2 space-y-1.5">
                    {msg.products.map((p) => (
                      <MiniProduct key={p.id} product={p} />
                    ))}
                  </div>
                ) : null}

                {msg.role === "assistant" &&
                msg.quickReplies &&
                msg.quickReplies.length > 0 &&
                !msg.loading ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.quickReplies.map((qr) => (
                      <button
                        type="button"
                        key={qr}
                        onClick={() => handleQuickReply(qr)}
                        className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 border-t border-border/60 bg-background p-3"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, shipping..."
              className="h-10 flex-1 rounded-full border-border/60 bg-muted/40"
              disabled={busy}
            />
            <Button
              type="submit"
              size="icon"
              disabled={busy || !input.trim()}
              className="h-10 w-10 shrink-0 rounded-full"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : null}
    </>
  );
}