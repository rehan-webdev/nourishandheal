"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/site";
import { Link } from "react-router-dom";

const CATEGORIES = ["All", "Metabolic", "Hormones", "Gut Health", "Weight", "Sports"];

export function CaseGallery() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === active);

  return (
    <div>
      {/* filters */}
      <div className="no-scrollbar mb-12 flex gap-2.5 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
              active === cat
                ? "border-forest bg-forest text-cream"
                : "border-ink/15 bg-cream text-ink-soft hover:border-forest/40 hover:text-forest"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((c, i) => (
            <motion.article
              layout
              key={c.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="group overflow-hidden rounded-[2rem] border border-ink/8 bg-cream transition-shadow duration-500 hover:shadow-[0_35px_70px_-30px_rgba(31,44,34,0.4)]"
            >
              <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-60 overflow-hidden sm:min-h-full">
                  <img
                    src={c.image}
                    alt={c.headline}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-[10px] font-bold tracking-widest text-forest uppercase backdrop-blur">
                    {c.category}
                  </span>
                  <p className="font-display absolute bottom-4 left-4 text-xl leading-tight font-semibold text-cream sm:text-2xl">
                    {c.headline}
                  </p>
                </div>

                <div className="flex flex-col p-7 sm:p-8">
                  <p className="text-xs font-bold tracking-[0.2em] text-clay uppercase">
                    {c.name} · {c.age} · {c.duration}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {c.story}
                  </p>
                  <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed font-medium text-forest italic">
                    <Quote className="mt-0.5 size-4 shrink-0 text-clay" />
                    {c.quote}
                  </p>
                </div>
              </div>

              {/* stats */}
              <div className="grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10">
                {c.stats.map((s) => (
                  <div key={s.label} className="px-4 py-4 text-center sm:px-5">
                    <p className="truncate text-[10px] font-bold tracking-[0.14em] text-ink-soft/70 uppercase">
                      {s.label}
                    </p>
                    <p className="mt-1.5 flex items-center justify-center gap-1.5 text-sm font-extrabold whitespace-nowrap">
                      <span className="text-ink-soft/60 line-through decoration-clay/60">
                        {s.before}
                      </span>
                      <ArrowRight className="size-3 text-clay" />
                      <span className="text-forest">{s.after}</span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 rounded-[2.5rem] border border-ink/10 bg-sage-light p-10 text-center">
        <h3 className="font-display text-3xl font-medium sm:text-4xl">
          Your story could be <span className="text-clay italic">next.</span>
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
          Every case study above started with a single conversation. Yours is
          free, 20 minutes, and entirely without pressure.
        </p>
        <Link
          to="/book"
          className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-cream transition-colors hover:bg-clay"
        >
          Start with a discovery call
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
