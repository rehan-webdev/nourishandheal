"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  tone = "cream",
}: {
  items: FaqItem[];
  tone?: "cream" | "plain";
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      className={`divide-y divide-ink/10 rounded-3xl border border-ink/10 ${
        tone === "cream" ? "bg-cream" : "bg-sage-light"
      }`}
    >
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
            >
              <span className="font-display text-lg font-semibold sm:text-xl">
                {f.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors ${
                  isOpen
                    ? "border-clay bg-clay text-cream"
                    : "border-ink/15 text-ink"
                }`}
              >
                <Plus className="size-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl px-6 pb-7 text-sm leading-relaxed text-ink-soft sm:px-8 sm:text-base">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
