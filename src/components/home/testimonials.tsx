"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import { Reveal, SectionEyebrow } from "@/components/motion";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      5200
    );
    return () => clearInterval(t);
  }, [paused]);

  const current = TESTIMONIALS[index];

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay-soft/40 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <SectionEyebrow>Kind words</SectionEyebrow>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-8 flex justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-gold text-gold" strokeWidth={1.5} />
            ))}
          </div>
        </Reveal>

        <div className="relative mt-8 min-h-[16rem] sm:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -26 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote className="mx-auto mb-5 size-8 text-clay" strokeWidth={1.4} />
              <blockquote className="font-display text-balance text-2xl leading-snug font-medium sm:text-[2rem]">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-extrabold tracking-wide">{current.name}</p>
                <p className="mt-1 text-xs font-bold tracking-[0.2em] text-ink-soft/80 uppercase">
                  {current.detail}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() =>
              setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
            }
            className="grid size-11 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-cream"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-clay" : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
            className="grid size-11 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-cream"
            aria-label="Next testimonial"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
