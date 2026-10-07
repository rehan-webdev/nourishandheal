import { Reveal, SectionEyebrow } from "@/components/motion";
import { BookingFlow } from "@/components/booking/booking-flow";
import { usePageMeta } from "@/lib/use-page-meta";

export default function BookPage() {
  usePageMeta(
    "Book an Appointment",
    "Reserve your consultation at Nourish & Heal NutriClinic — discovery calls, initial assessments, follow-ups and paediatric nutrition consults."
  );

  return (
    <section className="relative overflow-hidden pt-32 pb-28 sm:pt-40">
      <div className="absolute -top-40 -right-32 size-[30rem] rounded-full bg-sage/60 blur-3xl" />
      <div className="absolute top-1/3 -left-44 size-[26rem] rounded-full bg-clay-soft/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <SectionEyebrow>Appointments</SectionEyebrow>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-balance mt-7 text-5xl leading-[1.0] font-medium tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              Let&apos;s begin,{" "}
              <span className="text-clay italic">gently.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Three small steps stand between you and a plan that finally makes
              sense. No prepayment, no pressure — just a conversation with a
              dietitian who listens.
            </p>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <BookingFlow />
        </Reveal>
      </div>
    </section>
  );
}
