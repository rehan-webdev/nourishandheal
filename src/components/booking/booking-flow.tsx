"use client";

import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
  Video,
} from "lucide-react";
import { BOOKABLE_SERVICES } from "@/lib/site";
import { money } from "@/components/cart/cart-provider";
import {
  getOpenDays,
  getBookedTimes,
  markSlotBooked,
  TIME_SLOTS,
  formatSlot,
  prettyDate,
} from "@/lib/booking";
import { sendWeb3Form } from "@/lib/web3forms";

const ease = [0.22, 1, 0.36, 1] as const;

type Confirmed = {
  ref: string;
  simulated: boolean;
  warning?: string;
  appointment: {
    service: string;
    duration: number;
    price: number;
    mode: string;
    date: string;
    time: string;
    name: string;
    email: string;
  };
};

const STEP_LABELS = ["Service", "Date & time", "Details"];

export function BookingFlow() {
  const [params] = useSearchParams();
  const days = useMemo(() => getOpenDays(12), []);

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(() => {
    const pre = params.get("service");
    return BOOKABLE_SERVICES.some((s) => s.id === pre) ? pre : null;
  });
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  const service = BOOKABLE_SERVICES.find((s) => s.id === serviceId) ?? null;
  const takenSet = useMemo(() => new Set(booked), [booked]);

  const pickDay = (iso: string) => {
    setDate(iso);
    setTime(null);
    setBooked(getBookedTimes(iso));
  };

  const canContinue =
    (step === 0 && !!serviceId) || (step === 1 && !!date && !!time);

  const canSubmit =
    form.name.trim().length >= 2 && /.+@.+\..+/.test(form.email) && !submitting;

  async function submit() {
    if (!canSubmit || !service || !date || !time) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await sendWeb3Form(
        "appointment",
        {
          service: `${service.name} (${service.duration} min, ${service.mode})`,
          date,
          time,
          fee: service.price === 0 ? "Free" : `${money(service.price)} at clinic`,
          name: form.name,
          email: form.email,
          phone: form.phone || "—",
          notes: form.notes || "—",
        },
        form.name
      );

      if (!res.ok) {
        setError(res.error ?? "Something went wrong. Please try again.");
        return;
      }

      markSlotBooked(date, time);
      setConfirmed({
        ref: res.ref,
        simulated: res.simulated,
        warning: res.error,
        appointment: {
          service: service.name,
          duration: service.duration,
          price: service.price,
          mode: service.mode,
          date,
          time,
          name: form.name,
          email: form.email,
        },
      });
      setStep(3);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(0);
    setServiceId(null);
    setDate(null);
    setTime(null);
    setBooked([]);
    setForm({ name: "", email: "", phone: "", notes: "" });
    setConfirmed(null);
    setError(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* ------------------------------ WIZARD ------------------------------ */}
      <div className="rounded-[2rem] border border-ink/10 bg-cream p-6 shadow-[0_30px_70px_-35px_rgba(31,44,34,0.4)] sm:p-9">
        {step < 3 && (
          <>
            {/* progress */}
            <div className="mb-9 flex items-center gap-2 sm:gap-3">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
                  <div
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-colors duration-300 ${
                      i < step
                        ? "bg-forest text-cream"
                        : i === step
                          ? "bg-clay text-cream"
                          : "bg-sand/70 text-ink-soft"
                    }`}
                  >
                    {i < step ? <Check className="size-4" /> : i + 1}
                  </div>
                  <span
                    className={`hidden text-xs font-bold tracking-wider uppercase sm:block ${
                      i === step ? "text-ink" : "text-ink-soft/60"
                    }`}
                  >
                    {label}
                  </span>
                  {i < STEP_LABELS.length - 1 && (
                    <div className="h-px flex-1 bg-ink/10" />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1 — SERVICE */}
              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                    What brings you in?
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    Choose the session that fits where you are right now.
                  </p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {BOOKABLE_SERVICES.map((s) => {
                      const active = s.id === serviceId;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setServiceId(s.id)}
                          className={`group relative rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                            active
                              ? "border-forest bg-sage-light shadow-[0_18px_40px_-20px_rgba(46,82,51,0.45)]"
                              : "border-ink/10 bg-cream hover:border-forest/35"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-display text-lg leading-tight font-semibold">
                              {s.name}
                            </h3>
                            <span
                              className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                                active
                                  ? "border-forest bg-forest text-cream"
                                  : "border-ink/20 text-transparent group-hover:border-forest/40"
                              }`}
                            >
                              <Check className="size-3.5" strokeWidth={3} />
                            </span>
                          </div>
                          <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">
                            {s.description}
                          </p>
                          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-bold text-ink-soft">
                            <span className="flex items-center gap-1.5">
                              <Clock className="size-3.5 text-clay" />
                              {s.duration} min
                            </span>
                            <span className="flex items-center gap-1.5">
                              {s.mode === "In-clinic" ? (
                                <MapPin className="size-3.5 text-clay" />
                              ) : s.mode === "Video call" ? (
                                <Video className="size-3.5 text-clay" />
                              ) : (
                                <Sparkles className="size-3.5 text-clay" />
                              )}
                              {s.mode}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-1 ${
                                s.price === 0
                                  ? "bg-forest/10 text-forest"
                                  : "bg-clay/10 text-clay-deep"
                              }`}
                            >
                              {s.price === 0 ? "Free" : money(s.price)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — DATE & TIME */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                    Pick your moment
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    The clinic is open Tuesday to Saturday, 10:00–17:00.
                  </p>

                  <div className="mt-7">
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-ink-soft uppercase">
                      <CalendarDays className="size-4 text-clay" /> Choose a day
                    </p>
                    <div className="no-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-2">
                      {days.map((d) => {
                        const active = d.iso === date;
                        return (
                          <button
                            key={d.iso}
                            onClick={() => pickDay(d.iso)}
                            className={`w-[4.4rem] shrink-0 rounded-2xl border-2 px-2 py-3.5 text-center transition-all duration-300 ${
                              active
                                ? "border-forest bg-forest text-cream shadow-lg"
                                : "border-ink/10 bg-cream hover:border-forest/40"
                            }`}
                          >
                            <p className="text-[10px] font-bold tracking-widest uppercase opacity-70">
                              {d.weekday}
                            </p>
                            <p className="font-display mt-1 text-2xl leading-none font-semibold">
                              {d.dayNum}
                            </p>
                            <p className="mt-1 text-[10px] font-bold tracking-widest uppercase opacity-70">
                              {d.month}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-ink-soft uppercase">
                      <Clock className="size-4 text-clay" /> Choose a time
                    </p>
                    {!date ? (
                      <div className="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-sm font-medium text-ink-soft">
                        Select a day above to see available times
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                        {TIME_SLOTS.map((t) => {
                          const taken = takenSet.has(t);
                          const active = t === time;
                          return (
                            <button
                              key={t}
                              disabled={taken}
                              onClick={() => setTime(t)}
                              className={`rounded-xl border-2 py-3 text-sm font-bold transition-all duration-300 ${
                                taken
                                  ? "cursor-not-allowed border-ink/5 bg-sand/40 text-ink-soft/40 line-through"
                                  : active
                                    ? "border-clay bg-clay text-cream shadow-lg"
                                    : "border-ink/10 bg-cream hover:border-clay/50"
                              }`}
                            >
                              {formatSlot(t)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — DETAILS */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                    Almost there
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    We&apos;ll send your confirmation and intake form to your inbox.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-ink-soft uppercase">
                        <User className="size-3.5 text-clay" /> Full name *
                      </span>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jordan Rivers"
                        className="w-full rounded-xl border-2 border-ink/10 bg-cream px-4 py-3.5 text-sm font-medium transition-colors outline-none placeholder:text-ink-soft/40 focus:border-forest"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-ink-soft uppercase">
                        <Mail className="size-3.5 text-clay" /> Email *
                      </span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jordan@email.com"
                        className="w-full rounded-xl border-2 border-ink/10 bg-cream px-4 py-3.5 text-sm font-medium transition-colors outline-none placeholder:text-ink-soft/40 focus:border-forest"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-ink-soft uppercase">
                        <Phone className="size-3.5 text-clay" /> Phone (optional)
                      </span>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full rounded-xl border-2 border-ink/10 bg-cream px-4 py-3.5 text-sm font-medium transition-colors outline-none placeholder:text-ink-soft/40 focus:border-forest"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-ink-soft uppercase">
                        <FileText className="size-3.5 text-clay" /> Anything we should know?
                      </span>
                      <textarea
                        rows={4}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Goals, conditions, current medications, dietary preferences…"
                        className="w-full resize-none rounded-xl border-2 border-ink/10 bg-cream px-4 py-3.5 text-sm font-medium transition-colors outline-none placeholder:text-ink-soft/40 focus:border-forest"
                      />
                    </label>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 rounded-xl border border-clay/40 bg-clay/10 px-4 py-3 text-sm font-semibold text-clay-deep"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* nav buttons */}
            <div className="mt-9 flex items-center justify-between gap-4 border-t border-ink/10 pt-7">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-bold transition-all enabled:hover:bg-ink enabled:hover:text-cream disabled:opacity-0"
              >
                <ArrowLeft className="size-4" /> Back
              </button>

              {step < 2 ? (
                <button
                  onClick={() => canContinue && setStep((s) => s + 1)}
                  disabled={!canContinue}
                  className="group flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream transition-all hover:bg-clay disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Continue
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canSubmit}
                  className="group flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-bold text-cream transition-all hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Confirming…
                    </>
                  ) : (
                    <>
                      Confirm booking
                      <Check className="size-4 transition-transform group-hover:scale-125" />
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}

        {/* SUCCESS */}
        <AnimatePresence>
          {step === 3 && confirmed && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease }}
              className="py-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto grid size-20 place-items-center rounded-full bg-forest text-cream"
              >
                <CheckCircle2 className="size-10" strokeWidth={1.8} />
              </motion.div>
              <h2 className="font-display mt-7 text-3xl font-semibold sm:text-4xl">
                You&apos;re booked
                {confirmed.appointment.name
                  ? `, ${confirmed.appointment.name.split(" ")[0]}`
                  : ""}
                .
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                A confirmation with your intake form is on its way to{" "}
                <span className="font-bold text-ink">{confirmed.appointment.email}</span>
              </p>

              <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-dashed border-forest/30 bg-sage-light p-6">
                <p className="text-[11px] font-bold tracking-[0.25em] text-forest uppercase">
                  Booking reference
                </p>
                <p className="font-display mt-1 text-3xl font-bold tracking-wide text-forest">
                  {confirmed.ref}
                </p>
                <div className="mt-5 space-y-2.5 border-t border-forest/15 pt-5 text-left text-sm">
                  <p className="flex justify-between gap-4">
                    <span className="text-ink-soft">Session</span>
                    <span className="font-bold">{confirmed.appointment.service}</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span className="text-ink-soft">When</span>
                    <span className="text-right font-bold">
                      {prettyDate(confirmed.appointment.date)} ·{" "}
                      {formatSlot(confirmed.appointment.time)}
                    </span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span className="text-ink-soft">Format</span>
                    <span className="font-bold">{confirmed.appointment.mode}</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span className="text-ink-soft">Fee</span>
                    <span className="font-bold text-clay-deep">
                      {confirmed.appointment.price === 0
                        ? "Free"
                        : `${money(confirmed.appointment.price)} — pay at clinic`}
                    </span>
                  </p>
                </div>
              </div>

              {confirmed.simulated && (
                <p className="mx-auto mt-5 flex max-w-md items-start justify-center gap-2 text-xs font-semibold text-ink-soft">
                  <Info className="mt-0.5 size-3.5 shrink-0 text-clay" />
                  <span>
                    {confirmed.warning ??
                      "Demo mode — no Web3Forms key configured. Add VITE_WEB3FORMS_ACCESS_KEY in .env to receive live booking notifications."}
                  </span>
                </p>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={reset}
                  className="rounded-full border border-ink/15 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-ink hover:text-cream"
                >
                  Book another appointment
                </button>
                <Link
                  to="/"
                  className="rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-clay"
                >
                  Back to home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------------------ SUMMARY ------------------------------ */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-forest text-cream shadow-[0_30px_70px_-35px_rgba(46,82,51,0.7)]">
          <div className="space-y-5 p-7">
            <h2 className="font-display text-2xl font-semibold">Your visit</h2>
            <SummaryRow
              label="Service"
              value={service?.name ?? "Not selected yet"}
              sub={
                service
                  ? `${service.duration} min · ${service.mode}`
                  : "Choose one to begin"
              }
            />
            <SummaryRow
              label="Date"
              value={date ? prettyDate(date) : "Not selected yet"}
            />
            <SummaryRow
              label="Time"
              value={time ? formatSlot(time) : "Not selected yet"}
            />
            <div className="flex items-end justify-between border-t border-cream/15 pt-5">
              <span className="text-xs font-bold tracking-[0.2em] text-cream/60 uppercase">
                Session fee
              </span>
              <span className="font-display text-3xl font-semibold">
                {service ? (service.price === 0 ? "Free" : money(service.price)) : "—"}
              </span>
            </div>
            <p className="rounded-xl bg-cream/10 px-4 py-3 text-xs leading-relaxed text-cream/80">
              Free rescheduling up to 24h before your visit. Fees are settled at
              the clinic — no prepayment needed.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold tracking-[0.22em] text-cream/55 uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-snug font-bold">{value}</p>
      {sub && <p className="mt-0.5 text-xs font-medium text-cream/70">{sub}</p>}
    </div>
  );
}
