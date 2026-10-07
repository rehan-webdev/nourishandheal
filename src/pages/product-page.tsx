import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FlaskConical,
  Heart,
  Leaf,
  Star,
  Truck,
  X,
} from "lucide-react";
import { Reveal, SectionEyebrow } from "@/components/motion";
import { FaqAccordion } from "@/components/faq-accordion";
import { BuyBox, BenefitStrip } from "@/components/product/buy-box";
import { StickyBuyBar } from "@/components/product/sticky-buy";
import {
  PRODUCT,
  BENEFITS,
  INGREDIENTS,
  HOW_TO_USE,
  COMPARE,
  PRODUCT_REVIEWS,
  PRODUCT_FAQS,
} from "@/lib/product";
import { usePageMeta } from "@/lib/use-page-meta";

const RATING_BREAKDOWN = [
  { stars: 5, pct: 88 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export default function ProductPage() {
  usePageMeta(
    "Kids Growth Powder — Dietitian-Formulated Daily Nutrition",
    "Nourish & Heal Kids Growth Powder: 22 whole-food ingredients for healthy growth, stronger bones, better immunity, improved appetite and focus. Ages 2–12. No added sugar."
  );

  return (
    <>
      {/* ------------------------------ BUY BOX ----------------------------- */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
        <div className="absolute -top-40 -left-32 size-[30rem] rounded-full bg-sage/60 blur-3xl" />
        <div className="absolute top-1/3 -right-40 size-[26rem] rounded-full bg-clay-soft/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <BuyBox />
        </div>
      </section>

      {/* --------------------------- BENEFIT STRIP --------------------------- */}
      <section className="relative overflow-hidden bg-sage-light py-24 sm:py-28">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <Reveal>
              <SectionEyebrow>Why parents reorder</SectionEyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-display text-balance mx-auto mt-6 max-w-3xl text-4xl leading-[1.05] font-medium sm:text-5xl">
                Five things it&apos;s{" "}
                <span className="text-clay italic">actually doing</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
                Not vague marketing claims — specific nutrients, in specific
                amounts, chosen by paediatric dietitians for growing bodies.
              </p>
            </Reveal>
          </div>
          <BenefitStrip />
        </div>
      </section>

      {/* ---------------------------- INGREDIENTS ---------------------------- */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-28">
            <SectionEyebrow>Inside the tub</SectionEyebrow>
            <h2 className="font-display text-balance mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl">
              Food first.{" "}
              <span className="text-moss italic">Always.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              Every scoop is built from real nuts, seeds, fruits, grains and
              milk — ground fine enough that a toddler can&apos;t tell. If it
              isn&apos;t food, it isn&apos;t in the tub.
            </p>

            <div className="mt-8 rounded-3xl border-2 border-forest/15 bg-sage-light p-7">
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-forest uppercase">
                <FlaskConical className="size-4" /> Every batch tested for
              </p>
              <ul className="mt-4 grid gap-2.5 text-sm font-semibold">
                {[
                  "Heavy metals (lead, cadmium, arsenic)",
                  "Microbial safety & salmonella",
                  "Protein & mineral content accuracy",
                  "Pesticide residue screening",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-forest" strokeWidth={3} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {INGREDIENTS.map((ing, i) => (
              <Reveal key={ing.name} delay={i % 4}>
                <div className="rounded-2xl border border-ink/8 bg-cream px-5 py-4 transition-all duration-400 hover:border-forest/25 hover:bg-sage-light">
                  <p className="flex items-center gap-2 text-sm font-extrabold">
                    <Leaf className="size-3.5 shrink-0 text-forest" />
                    {ing.name}
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink-soft">{ing.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- HOW TO USE ---------------------------- */}
      <section className="relative overflow-hidden bg-ink py-24 text-cream sm:py-28">
        <div className="dot-grid absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <SectionEyebrow tone="cream">How to use it</SectionEyebrow>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="font-display text-balance mt-6 max-w-xl text-4xl leading-[1.05] font-medium sm:text-5xl">
                  Thirty seconds a day.
                  <span className="text-clay-soft italic"> That&apos;s it.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={2}>
              <p className="max-w-sm text-sm leading-relaxed text-cream/70">
                No blending rituals, no pill counting. Mix, stir, hand it over —
                most kids think it&apos;s a milkshake.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {HOW_TO_USE.map((s, i) => (
              <Reveal key={s.step} delay={i}>
                <div className="h-full rounded-3xl border border-cream/12 bg-cream/5 p-8 backdrop-blur">
                  <p className="font-display text-5xl font-semibold text-clay">{s.step}</p>
                  <h3 className="font-display mt-4 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-clay/15 p-7 sm:flex-row">
              <p className="flex items-center gap-3 text-sm font-semibold">
                <Heart className="size-5 shrink-0 text-clay" />
                Picky eater in the house? Our dietitians will build a free
                mixing plan around their tastes.
              </p>
              <Link
                to="/book"
                className="group flex shrink-0 items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-clay hover:text-cream"
              >
                Ask a dietitian
                <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ COMPARE ------------------------------ */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <Reveal>
              <SectionEyebrow>Honest comparison</SectionEyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-display text-balance mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl">
                Us vs.{" "}
                <span className="text-clay italic">the supermarket shelf</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-cream">
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-ink/10 bg-sage-light px-6 py-4 sm:px-8">
                <span className="text-xs font-bold tracking-[0.16em] text-ink-soft uppercase">
                  What matters
                </span>
                <span className="w-16 text-center text-xs font-extrabold tracking-wider text-forest uppercase">
                  Ours
                </span>
                <span className="w-16 text-center text-xs font-extrabold tracking-wider text-ink-soft/70 uppercase">
                  Others
                </span>
              </div>
              {COMPARE.map((row) => (
                <div
                  key={row.point}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-ink/8 px-6 py-4 last:border-0 sm:px-8"
                >
                  <span className="text-sm font-semibold">{row.point}</span>
                  <span className="grid w-16 place-items-center">
                    <span className="grid size-7 place-items-center rounded-full bg-forest text-cream">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                  </span>
                  <span className="grid w-16 place-items-center">
                    <span className="grid size-7 place-items-center rounded-full bg-clay-soft text-clay-deep">
                      <X className="size-4" strokeWidth={3} />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ REVIEWS ------------------------------ */}
      <section className="relative overflow-hidden bg-sage-light py-24 sm:py-28">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionEyebrow>Parent reviews</SectionEyebrow>
              <h2 className="font-display text-balance mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl">
                {PRODUCT.reviewCount.toLocaleString()} families,
                <span className="text-clay italic"> one verdict</span>
              </h2>

              <div className="mt-8 flex items-end gap-4">
                <p className="font-display text-6xl leading-none font-semibold">
                  {PRODUCT.rating}
                </p>
                <div className="pb-1.5">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" strokeWidth={1.5} />
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs font-bold tracking-wide text-ink-soft uppercase">
                    Verified purchases only
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-2">
                {RATING_BREAKDOWN.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3">
                    <span className="w-8 text-xs font-bold text-ink-soft">
                      {r.stars} ★
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-forest/12">
                      <div
                        className="h-full rounded-full bg-forest"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="w-9 text-right text-xs font-bold text-ink-soft">
                      {r.pct}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-ink/10 bg-cream p-4">
                <Truck className="size-5 shrink-0 text-forest" />
                <p className="text-xs font-semibold leading-relaxed text-ink-soft">
                  <span className="text-ink">94% reorder within 60 days.</span>{" "}
                  That&apos;s the only metric we really watch.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {PRODUCT_REVIEWS.map((r, i) => (
                <Reveal key={r.name} delay={i % 2}>
                  <figure className="flex h-full flex-col rounded-3xl border border-ink/8 bg-cream p-7">
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`size-3.5 ${
                            s < r.rating ? "fill-gold text-gold" : "text-ink/15"
                          }`}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <blockquote className="font-display text-lg leading-snug font-semibold">
                      “{r.title}”
                    </blockquote>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                      {r.text}
                    </p>
                    <figcaption className="mt-5 border-t border-ink/10 pt-4">
                      <p className="text-xs font-extrabold">{r.name}</p>
                      <p className="mt-0.5 text-[11px] font-bold tracking-wider text-ink-soft/70 uppercase">
                        {r.meta}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------- FAQ -------------------------------- */}
      <section className="pb-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <Reveal>
              <SectionEyebrow>Questions parents ask</SectionEyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-display text-balance mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl">
                Good to <span className="text-moss italic">know</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <FaqAccordion items={PRODUCT_FAQS} />
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-12 rounded-[2rem] bg-forest p-9 text-center text-cream">
              <p className="font-display text-2xl font-semibold sm:text-3xl">
                Not sure it&apos;s right for your child?
              </p>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream/75">
                Book a free 20-minute discovery call. A dietitian will look at
                your child&apos;s history and tell you honestly — even if the
                answer is &ldquo;you don&apos;t need this.&rdquo;
              </p>
              <Link
                to="/book"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-clay px-8 py-4 text-sm font-bold text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                Talk to a dietitian
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefit list anchor for SEO / a11y */}
      <span className="sr-only">
        {BENEFITS.map((b) => b.title).join(", ")}
      </span>

      <StickyBuyBar />
    </>
  );
}
