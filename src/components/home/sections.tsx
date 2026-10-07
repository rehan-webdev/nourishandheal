
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Leaf,
  Check,
  BadgeCheck,
  Quote,
  ArrowRight,
  Star,
} from "lucide-react";
import { Reveal, SectionEyebrow } from "@/components/motion";
import { IMAGES, PILLARS, CASE_STUDIES } from "@/lib/site";
import { BENEFITS } from "@/lib/product";
import { money } from "@/components/cart/cart-provider";

/* ------------------------------ MARQUEE ------------------------------ */

const MARQUEE_ITEMS = [
  "Gut Restoration",
  "PCOS & Hormones",
  "Metabolic Reset",
  "Sustainable Weight",
  "Sports Nutrition",
  "Fertility & Postpartum",
];

export function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-forest py-4 text-cream">
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-lg italic sm:text-xl">{item}</span>
            <Leaf className="size-4 text-clay-soft" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- ABOUT -------------------------------- */

export function About() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2.5rem] rounded-tr-[8rem]">
            <div className="relative aspect-[4/5]">
              <img
                src={IMAGES.founderPortrait}
                alt="Dr. Rabia Bashir, lead dietitian at Nourish & Heal"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-7 text-cream">
              <p className="font-display text-2xl font-semibold">Dr. Rabia Bashir</p>
              <p className="text-sm font-medium text-cream/85">
                MSc RD · Clinical Dietitian &amp; Founder
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-6 hidden rotate-3 rounded-2xl bg-clay px-6 py-4 text-cream shadow-xl sm:block">
            <p className="font-display text-3xl font-semibold">12+</p>
            <p className="text-xs font-bold tracking-[0.18em] uppercase">
              years of practice
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionEyebrow>The Clinic</SectionEyebrow>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-display text-balance mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl">
              No fads. No fear-mongering.{" "}
              <span className="text-moss italic">Just science, served warm.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              We started Nourish &amp; Heal because nutrition care had become
              either clinical and cold, or warm and unscientific. Here,
              registered dietitians read your labs, honour your culture and your
              cravings, and build protocol-driven plans you can actually live
              with.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {[
                "Registered dietitians only",
                "Lab-marker driven protocols",
                "No food is forbidden",
                "Culturally flexible meal design",
                "Weekly structured follow-up",
                "98% would recommend us",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sage text-forest">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/book"
                className="group flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-clay"
              >
                Meet your dietitian
                <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </Link>
              <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-ink-soft uppercase">
                <BadgeCheck className="size-4 text-clay" />
                Board-certified · CD Registered
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- PILLARS ------------------------------ */

export function Pillars() {
  return (
    <section className="relative overflow-hidden bg-sage-light py-24 sm:py-32">
      <div className="dot-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionEyebrow>Areas of care</SectionEyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-display text-balance mt-6 max-w-2xl text-4xl leading-[1.05] font-medium sm:text-5xl">
                Four pillars. <span className="text-clay italic">One you.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
              Every plan begins with a 75-minute clinical assessment — then we
              match you to the pillar, or blend, your body needs.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i}>
              <div className="group flex h-full flex-col rounded-3xl border border-ink/8 bg-cream p-7 transition-all duration-500 hover:-translate-y-2 hover:border-forest/30 hover:shadow-[0_30px_60px_-25px_rgba(46,82,51,0.4)]">
                <span className="mb-6 grid size-13 place-items-center rounded-2xl bg-sage text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-cream">
                  <p.icon className="size-6" strokeWidth={1.7} />
                </span>
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {p.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink/10 px-3 py-1 text-[11px] font-bold tracking-wide text-ink-soft uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- PROGRAM TEASER --------------------------- */

export function ProductTeaser() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest text-cream">
          <div className="dot-grid absolute inset-0 opacity-15" />
          <div className="relative grid items-center gap-10 p-8 sm:p-14 lg:grid-cols-2">
            <div>
              <Reveal>
                <SectionEyebrow tone="cream">Our one product</SectionEyebrow>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="font-display text-balance mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl">
                  Kids Growth Powder
                  <span className="text-clay-soft italic"> — growth, bones, immunity, appetite, focus.</span>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream/75 sm:text-base">
                  Our paediatric team spent two years building the powder
                  they&apos;d hand their own children: 22 whole-food
                  ingredients, zero refined sugar, lab-tested every batch. For
                  ages 2–12.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {BENEFITS.map((b) => (
                    <li
                      key={b.title}
                      className="rounded-full border border-cream/20 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-cream/85 uppercase"
                    >
                      {b.title}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={4}>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    to="/product"
                    className="group flex items-center gap-2 rounded-full bg-clay px-7 py-4 text-sm font-bold text-cream transition-colors hover:bg-cream hover:text-ink"
                  >
                    Shop the powder
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <div>
                    <p className="font-display text-2xl font-semibold">From {money(24)}</p>
                    <p className="text-xs font-semibold tracking-widest text-cream/60 uppercase">
                      free shipping over {money(50)}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={2} className="relative">
              <Link to="/product" className="group block">
                <div className="relative overflow-hidden rounded-[2rem] rounded-tl-[6rem]">
                  <div className="relative aspect-[5/4]">
                    <img
                      src={IMAGES.kidsJar}
                      alt="Nourish & Heal Kids Growth Powder tub"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/10" />
                </div>
              </Link>
              <div className="absolute -bottom-4 -left-2 flex items-center gap-2.5 rounded-2xl bg-cream px-4 py-3 text-ink shadow-xl sm:-left-6">
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-gold text-gold" />
                  ))}
                </span>
                <span className="text-xs font-extrabold">4.9 · 1,284 reviews</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- RESULTS TEASER --------------------------- */

export function ResultsTeaser() {
  const featured = CASE_STUDIES.slice(0, 3);
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionEyebrow>Client results</SectionEyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-display text-balance mt-6 text-4xl leading-[1.05] font-medium sm:text-5xl">
                Proof, <span className="text-moss italic">not promises.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <Link
              to="/results"
              className="group flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-bold transition-colors hover:bg-ink hover:text-cream"
            >
              Browse all case studies
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal key={c.id} delay={i}>
              <Link
                to="/results"
                className="group block overflow-hidden rounded-3xl border border-ink/8 bg-cream transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(31,44,34,0.35)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.headline}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-[11px] font-bold tracking-widest text-forest uppercase backdrop-blur">
                    {c.category}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl leading-tight font-semibold">
                    {c.headline}
                  </h3>
                  <p className="mt-2 text-xs font-bold tracking-widest text-clay uppercase">
                    {c.name} · {c.age} · {c.duration}
                  </p>
                  <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft italic">
                    <Quote className="mt-0.5 size-4 shrink-0 text-clay" />
                    {c.quote}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
