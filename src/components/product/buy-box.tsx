"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Baby,
  Bone,
  HeartPulse,
  Brain,
  Check,
} from "lucide-react";
import { useCart, money } from "@/components/cart/cart-provider";
import {
  PRODUCT,
  VARIANTS,
  BENEFITS,
  FREE_FROM,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/product";
import { IMAGES } from "@/lib/site";

const ICONS = {
  growth: Baby,
  bone: Bone,
  shield: ShieldCheck,
  stomach: HeartPulse,
  brain: Brain,
} as const;

export function BuyBox() {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(VARIANTS[1].id);
  const [qty, setQty] = useState(1);

  const variant = VARIANTS.find((v) => v.id === variantId) ?? VARIANTS[0];
  const saving = variant.compareAt
    ? variant.compareAt - variant.price
    : 0;
  const perServing = (variant.price / parseInt(variant.servings.replace(/\D/g, ""))).toFixed(2);

  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {/* ---------------------------- GALLERY ---------------------------- */}
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] rounded-tr-[7rem] border-8 border-cream bg-sage-light shadow-[0_40px_80px_-35px_rgba(31,44,34,0.45)]"
        >
          <div className="relative aspect-square">
            <img
              src={IMAGES.kidsJar}
              alt="Nourish & Heal Kids Growth Powder tub"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <span className="absolute top-5 left-5 rounded-full bg-clay px-4 py-2 text-[11px] font-extrabold tracking-[0.18em] text-cream uppercase shadow-lg">
            Dietitian formulated
          </span>
        </motion.div>

      </div>

      {/* ----------------------------- DETAILS ---------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sage px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-forest uppercase">
            {PRODUCT.ageRange}
          </span>
          <span className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-ink-soft uppercase">
            {PRODUCT.flavour}
          </span>
        </div>

        <h1 className="font-display text-balance mt-5 text-4xl leading-[1.02] font-medium tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]">
          Nourish &amp; Heal{" "}
          <span className="text-clay italic">Kids Growth Powder</span>
        </h1>

        <p className="mt-3 text-sm font-semibold tracking-[0.12em] text-moss uppercase">
          {PRODUCT.tagline}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-gold text-gold" strokeWidth={1.5} />
            ))}
          </span>
          <span className="text-sm font-bold">{PRODUCT.rating}</span>
          <span className="text-sm font-medium text-ink-soft">
            {PRODUCT.reviewCount.toLocaleString()} reviews
          </span>
        </div>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
          {PRODUCT.promise}
        </p>

        {/* benefit chips */}
        <ul className="mt-7 flex flex-wrap gap-2">
          {BENEFITS.map((b) => (
            <li
              key={b.title}
              className={`rounded-full px-3.5 py-2 text-xs font-extrabold ${b.bg} ${b.color}`}
            >
              {b.title}
            </li>
          ))}
        </ul>

        {/* variants */}
        <fieldset className="mt-9">
          <legend className="mb-3 text-xs font-bold tracking-[0.2em] text-ink-soft uppercase">
            Choose your size
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {VARIANTS.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                    active
                      ? "border-forest bg-sage-light shadow-[0_16px_36px_-18px_rgba(46,82,51,0.5)]"
                      : "border-ink/12 hover:border-forest/40"
                  }`}
                >
                  {v.label && (
                    <span
                      className={`absolute -top-2.5 left-3 rounded-full px-2.5 py-0.5 text-[9px] font-extrabold tracking-widest uppercase ${
                        v.label === "Best value"
                          ? "bg-clay text-cream"
                          : "bg-forest text-cream"
                      }`}
                    >
                      {v.label}
                    </span>
                  )}
                  <p className="font-display text-lg leading-none font-semibold">
                    {v.size}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold text-ink-soft">
                    {v.servings}
                  </p>
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-base font-extrabold">{money(v.price)}</span>
                    {v.compareAt && (
                      <span className="text-xs font-semibold text-ink-soft/60 line-through">
                        {money(v.compareAt)}
                      </span>
                    )}
                  </p>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* qty + price + cta */}
        <div className="mt-8 rounded-3xl border border-ink/10 bg-sage-light/60 p-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-ink-soft uppercase">
                Total
              </p>
              <p className="font-display mt-1 flex items-baseline gap-2.5 text-4xl font-semibold">
                {money(variant.price * qty)}
                {saving > 0 && (
                  <span className="rounded-full bg-clay px-2.5 py-1 text-[11px] font-extrabold text-cream">
                    Save {money(saving * qty)}
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs font-semibold text-ink-soft">
                ≈ {money(Number(perServing))} per serving
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full border-2 border-ink/15 bg-cream p-1.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid size-9 place-items-center rounded-full transition-colors hover:bg-sand"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-9 text-center font-display text-xl font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
                className="grid size-9 place-items-center rounded-full transition-colors hover:bg-sand"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <button
            onClick={() => add(variantId, qty)}
            className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4.5 text-sm font-extrabold tracking-wide text-cream transition-colors duration-300 hover:bg-clay"
          >
            <ShoppingBag className="size-4.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Add to basket · {money(variant.price * qty)}
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-forest">
            <Truck className="size-4" />
            Free shipping over {money(FREE_SHIPPING_THRESHOLD)} · ships in 24h
          </p>
        </div>

        {/* trust row */}
        <ul className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            { icon: RotateCcw, t: "30-day refund", s: "Even if the tub is open" },
            { icon: ShieldCheck, t: "Lab tested", s: "Heavy metals & microbes" },
            { icon: Bone, t: "No added sugar", s: "Sweetened by dates" },
          ].map((x) => (
            <li key={x.t} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage text-forest">
                <x.icon className="size-4.5" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-xs font-extrabold">{x.t}</span>
                <span className="block text-[11px] font-medium text-ink-soft">{x.s}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* free-from */}
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-6">
          {FREE_FROM.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs font-bold text-ink-soft">
              <Check className="size-3.5 text-forest" strokeWidth={3} />
              {f}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export function BenefitStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <AnimatePresence>
        {BENEFITS.map((b, i) => {
          const Icon = ICONS[b.icon];
          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-3xl border border-ink/8 bg-cream p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-25px_rgba(31,44,34,0.3)]"
            >
              <span
                className={`mb-4 grid size-12 place-items-center rounded-2xl ${b.bg} ${b.color}`}
              >
                <Icon className="size-5.5" strokeWidth={1.8} />
              </span>
              <h3 className="text-sm leading-tight font-extrabold">{b.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{b.text}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}


