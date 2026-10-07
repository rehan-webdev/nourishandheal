"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Star, Salad, HeartPulse } from "lucide-react";
import { IMAGES } from "@/lib/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      {/* ambient blobs */}
      <div className="absolute -top-40 -right-40 size-[34rem] rounded-full bg-sage/70 blur-3xl" />
      <div className="absolute top-1/2 -left-52 size-[28rem] rounded-full bg-clay-soft/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-cream/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.28em] text-forest uppercase backdrop-blur">
              <Sparkles className="size-3.5" />
              Registered Dietitians · Est. 2013
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
            className="font-display text-balance mt-7 text-[13.5vw] leading-[0.98] font-medium tracking-[-0.02em] sm:text-7xl lg:text-[5.6rem]"
          >
            Heal from
            <br />
            <span className="text-clay italic">the inside</span> out.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.22 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            At Nourish &amp; Heal NutriClinic, we treat food as medicine — and
            you as a whole person. Clinical nutrition therapy for metabolism,
            gut, hormones and a calm, lasting relationship with food.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/book"
              className="group flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-sm font-bold text-cream transition-colors duration-300 hover:bg-clay"
            >
              Book your consultation
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
            <Link
              to="/product"
              className="link-underline text-sm font-bold text-forest"
            >
              Shop Kids Growth Powder
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.46 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5"
          >
            {[
              { n: "2,400+", l: "clients guided" },
              { n: "96%", l: "reach their goals" },
              { n: "4.9", l: "average rating", star: true },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display flex items-center gap-1.5 text-3xl font-semibold">
                  {s.n}
                  {s.star && (
                    <Star className="size-5 fill-gold text-gold" strokeWidth={1.5} />
                  )}
                </p>
                <p className="mt-0.5 text-xs font-semibold tracking-[0.16em] text-ink-soft/80 uppercase">
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* visual column */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeOut, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border-8 border-cream shadow-[0_40px_80px_-30px_rgba(31,44,34,0.45)]">
              <div className="relative aspect-[4/5.4]">
                <img
                  src={IMAGES.heroBowl}
                  alt="A nourishing bowl of greens, grains and roasted tomatoes"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* rotating badge */}
            <motion.div
              style={{ y: floatY }}
              className="absolute -top-6 -left-8 hidden sm:block"
            >
              <div className="relative grid size-32 place-items-center">
                <svg
                  viewBox="0 0 100 100"
                  className="animate-spin-slow absolute inset-0 size-full"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="fill-forest text-[10.5px] font-bold tracking-[0.22em] uppercase">
                    <textPath href="#circlePath">
                      Nour · Heal · Thrive · Repeat ·
                    </textPath>
                  </text>
                </svg>
                <span className="grid size-14 place-items-center rounded-full bg-clay text-cream shadow-lg">
                  <Salad className="size-6" strokeWidth={1.8} />
                </span>
              </div>
            </motion.div>

            {/* floating card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeOut, delay: 0.75 }}
              className="absolute -bottom-8 -left-6 sm:-left-12"
            >
              <div className="animate-pulse-soft flex items-center gap-3 rounded-2xl border border-ink/8 bg-cream/95 px-5 py-4 shadow-xl backdrop-blur">
                <span className="grid size-11 place-items-center rounded-full bg-sage text-forest">
                  <HeartPulse className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-extrabold">Root-cause care</p>
                  <p className="text-xs font-medium text-ink-soft">
                    Labs • Gut • Hormones • Habits
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
