import { Reveal, SectionEyebrow } from "@/components/motion";
import { CaseGallery } from "@/components/results/case-gallery";
import { usePageMeta } from "@/lib/use-page-meta";

const AGGREGATES = [
  { n: "2,400+", l: "clients guided since 2013" },
  { n: "96%", l: "reach their primary goal" },
  { n: "31k kg", l: "collective weight released" },
  { n: "4.9 / 5", l: "average client rating" },
];

export default function ResultsPage() {
  usePageMeta(
    "Client Results & Case Studies",
    "Real clients, real labs, real change. Browse dietitian-led case studies across metabolic health, hormones, gut health, weight and sports nutrition."
  );

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-sage/60 blur-3xl" />
        <div className="absolute top-20 -right-40 size-[26rem] rounded-full bg-clay-soft/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionEyebrow>Portfolio of change</SectionEyebrow>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-balance mt-7 max-w-4xl text-5xl leading-[1.0] font-medium tracking-[-0.02em] sm:text-7xl">
              Real people. Real labs.{" "}
              <span className="text-clay italic">Real change.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              We don&apos;t do before/after swimsuit photos. We do before/after
              bloodwork, symptom scores and lives reclaimed. Shared with proud
              client permission, names abbreviated for privacy.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-ink/10 py-10 lg:grid-cols-4">
              {AGGREGATES.map((a) => (
                <div key={a.l}>
                  <p className="font-display text-4xl font-semibold text-forest sm:text-5xl">
                    {a.n}
                  </p>
                  <p className="mt-2 text-xs font-bold tracking-[0.18em] text-ink-soft uppercase">
                    {a.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <CaseGallery />
        </div>
      </section>
    </>
  );
}
