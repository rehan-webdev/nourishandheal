import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { detailed, money, useCart } from "@/components/cart/cart-provider";
import { SHIPPING_FLAT, FREE_SHIPPING_THRESHOLD, PRODUCT } from "@/lib/product";
import { IMAGES } from "@/lib/site";
import { sendWeb3Form } from "@/lib/web3forms";
import { usePageMeta } from "@/lib/use-page-meta";

type Placed = {
  ref: string;
  simulated: boolean;
  warning?: string;
  order: {
    items: { name: string; size: string; qty: number; unitPrice: number }[];
    itemCount: number;
    subtotal: number;
    shipping: number;
    total: number;
    email: string;
    name: string;
    city: string;
  };
};

export default function CartPage() {
  usePageMeta("Checkout", "Review your basket and complete your order.");

  const { lines, setQty, remove, clear, subtotal, count, ready } = useCart();
  const items = detailed(lines);

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;
  const toFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Placed | null>(null);

  const formValid =
    form.customerName.trim().length >= 2 &&
    /.+@.+\..+/.test(form.email) &&
    form.address.trim().length >= 6 &&
    form.city.trim().length >= 2 &&
    form.country.trim().length >= 2;

  async function placeOrder() {
    if (!formValid || submitting) return;
    setSubmitting(true);
    setError(null);

    const itemLines = items
      .map(
        (i) =>
          `${i.qty} × ${PRODUCT.name} (${i.variant.size}) — ${money(i.lineTotal)}`
      )
      .join(" | ");

    const res = await sendWeb3Form(
      "order",
      {
        items: itemLines,
        item_count: String(items.reduce((s, i) => s + i.qty, 0)),
        subtotal: money(subtotal),
        shipping: shipping === 0 ? "Free" : money(shipping),
        total: money(total),
        name: form.customerName,
        email: form.email,
        phone: form.phone || "—",
        address: form.address,
        city: form.city,
        postal_code: form.postalCode || "—",
        country: form.country,
        notes: form.notes || "—",
      },
      form.customerName
    );

    if (!res.ok) {
      setError(res.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    setPlaced({
      ref: res.ref,
      simulated: res.simulated,
      warning: res.error,
      order: {
        items: items.map((i) => ({
          name: "Kids Growth Powder",
          size: i.variant.size,
          qty: i.qty,
          unitPrice: i.variant.price,
        })),
        itemCount: items.reduce((s, i) => s + i.qty, 0),
        subtotal,
        shipping,
        total,
        email: form.email,
        name: form.customerName,
        city: form.city,
      },
    });
    clear();
    setSubmitting(false);
  }

  /* ----------------------------- SUCCESS ----------------------------- */
  if (placed) {
    return (
      <section className="relative overflow-hidden pt-32 pb-28 sm:pt-40">
        <div className="absolute -top-40 right-0 size-[30rem] rounded-full bg-sage/60 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mx-auto grid size-20 place-items-center rounded-full bg-forest text-cream"
          >
            <CheckCircle2 className="size-10" strokeWidth={1.8} />
          </motion.div>
          <h1 className="font-display text-balance mt-7 text-4xl leading-tight font-medium sm:text-5xl">
            Order placed{placed.order.name ? `, ${placed.order.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Confirmation is on its way to{" "}
            <span className="font-bold text-ink">{placed.order.email}</span>. We
            pack and ship within 24 hours, Monday to Saturday.
          </p>

          <div className="mt-9 rounded-3xl border-2 border-dashed border-forest/30 bg-sage-light p-7 text-left">
            <p className="text-[11px] font-bold tracking-[0.25em] text-forest uppercase">
              Order reference
            </p>
            <p className="font-display mt-1 text-3xl font-bold tracking-wide text-forest">
              {placed.ref}
            </p>
            <div className="mt-5 space-y-2.5 border-t border-forest/15 pt-5 text-sm">
              {placed.order.items.map((i) => (
                <p key={i.size} className="flex justify-between gap-4">
                  <span className="text-ink-soft">
                    {i.name} · {i.size} × {i.qty}
                  </span>
                  <span className="font-bold">{money(i.unitPrice * i.qty)}</span>
                </p>
              ))}
              <p className="flex justify-between gap-4 border-t border-forest/15 pt-3">
                <span className="text-ink-soft">Shipping</span>
                <span className="font-bold">
                  {placed.order.shipping === 0 ? "Free" : money(placed.order.shipping)}
                </span>
              </p>
              <p className="flex justify-between gap-4 text-base">
                <span className="font-extrabold">Total paid on delivery</span>
                <span className="font-display font-bold text-clay-deep">
                  {money(placed.order.total)}
                </span>
              </p>
              <p className="flex items-start justify-between gap-4 pt-2 text-xs text-ink-soft">
                <span>Delivering to</span>
                <span className="text-right font-semibold text-ink">
                  {placed.order.city}
                </span>
              </p>
            </div>
          </div>

          {placed.simulated && (
            <p className="mt-5 flex items-start justify-center gap-2 text-xs font-semibold text-ink-soft">
              <Info className="mt-0.5 size-3.5 shrink-0 text-clay" />
              Demo mode — no Web3Forms key configured. Add{" "}
              <span className="font-mono">VITE_WEB3FORMS_ACCESS_KEY</span> in{" "}
              <span className="font-mono">.env</span> to receive live order
              notifications.
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/product"
              className="rounded-full border border-ink/15 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-ink hover:text-cream"
            >
              Keep shopping
            </Link>
            <Link
              to="/"
              className="rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-clay"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------------------- EMPTY CART ---------------------------- */
  if (ready && items.length === 0) {
    return (
      <section className="relative overflow-hidden pt-32 pb-28 sm:pt-40">
        <div className="absolute -top-40 -left-32 size-[30rem] rounded-full bg-sage/60 blur-3xl" />
        <div className="relative mx-auto max-w-xl px-5 text-center sm:px-8">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-sage-light text-forest">
            <ShoppingBag className="size-8" strokeWidth={1.5} />
          </span>
          <h1 className="font-display text-balance mt-7 text-4xl leading-tight font-medium sm:text-5xl">
            Nothing in your basket yet
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Add the Kids Growth Powder and we&apos;ll take care of the rest —
            free shipping over {money(FREE_SHIPPING_THRESHOLD)}.
          </p>
          <Link
            to="/product"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-cream transition-colors hover:bg-clay"
          >
            Shop Kids Growth Powder
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    );
  }

  /* ------------------------------ CHECKOUT ---------------------------- */
  return (
    <section className="relative overflow-hidden pt-32 pb-28 sm:pt-40">
      <div className="absolute -top-40 -right-32 size-[28rem] rounded-full bg-sage/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10">
          <Link
            to="/product"
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-ink-soft uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" /> Continue shopping
          </Link>
          <h1 className="font-display text-4xl leading-tight font-medium sm:text-5xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm font-semibold text-ink-soft">
            {count} {count === 1 ? "item" : "items"} · cash on delivery available
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* --------------------------- ITEMS + FORM --------------------------- */}
          <div className="space-y-6">
            {/* items */}
            <div className="rounded-[2rem] border border-ink/10 bg-cream p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold">Your basket</h2>
              <div className="mt-6 space-y-6">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 border-b border-ink/8 pb-6 last:border-0 last:pb-0"
                    >
                      <Link
                        to="/product"
                        className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-ink/10"
                      >
                        <img
                          src={IMAGES.kidsJar}
                          alt={item.variant.size}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-extrabold">
                              Nourish &amp; Heal Kids Growth Powder
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                              {item.variant.size} · {item.variant.servings}
                            </p>
                            {item.variant.label && (
                              <span className="mt-2 inline-block rounded-full bg-forest px-2.5 py-0.5 text-[9px] font-extrabold tracking-widest text-cream uppercase">
                                {item.variant.label}
                              </span>
                            )}
                          </div>
                          <p className="font-display shrink-0 text-xl font-semibold text-forest">
                            {money(item.lineTotal)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1">
                            <button
                              onClick={() => setQty(item.variantId, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid size-7 place-items-center rounded-full transition-colors hover:bg-sand"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-bold">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => setQty(item.variantId, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="grid size-7 place-items-center rounded-full transition-colors hover:bg-sand"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(item.variantId)}
                            className="flex items-center gap-1.5 text-xs font-bold text-ink-soft transition-colors hover:text-clay-deep"
                          >
                            <Trash2 className="size-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* delivery form */}
            <div className="rounded-[2rem] border border-ink/10 bg-cream p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold">Delivery details</h2>
              <p className="mt-1.5 text-xs font-semibold text-ink-soft">
                We ship within 24 hours, Monday to Saturday.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  icon={<User className="size-3.5" />}
                  value={form.customerName}
                  onChange={(v) => setForm({ ...form, customerName: v })}
                  placeholder="Jordan Rivers"
                />
                <Field
                  label="Email"
                  icon={<Mail className="size-3.5" />}
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="jordan@email.com"
                />
                <Field
                  label="Phone (optional)"
                  icon={<Phone className="size-3.5" />}
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder="(555) 000-0000"
                />
                <Field
                  label="City"
                  icon={<MapPin className="size-3.5" />}
                  value={form.city}
                  onChange={(v) => setForm({ ...form, city: v })}
                  placeholder="Greenfield"
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Street address"
                    icon={<MapPin className="size-3.5" />}
                    value={form.address}
                    onChange={(v) => setForm({ ...form, address: v })}
                    placeholder="18 Willow Lane, Apt 4"
                  />
                </div>
                <Field
                  label="Postal code (optional)"
                  icon={<MapPin className="size-3.5" />}
                  value={form.postalCode}
                  onChange={(v) => setForm({ ...form, postalCode: v })}
                  placeholder="10001"
                />
                <Field
                  label="Country"
                  icon={<MapPin className="size-3.5" />}
                  value={form.country}
                  onChange={(v) => setForm({ ...form, country: v })}
                  placeholder="United States"
                />
                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-ink-soft uppercase">
                      <MessageSquare className="size-3.5 text-clay" /> Delivery notes
                      (optional)
                    </span>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Gate code, preferred delivery window, gift message…"
                      className="w-full resize-none rounded-xl border-2 border-ink/10 bg-cream px-4 py-3.5 text-sm font-medium transition-colors outline-none placeholder:text-ink-soft/40 focus:border-forest"
                    />
                  </label>
                </div>
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
            </div>
          </div>

          {/* ----------------------------- SUMMARY ----------------------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-forest text-cream shadow-[0_30px_70px_-35px_rgba(46,82,51,0.7)]">
              <div className="p-7">
                <h2 className="font-display text-xl font-semibold">Order summary</h2>

                <div className="mt-6 space-y-3 text-sm">
                  <Row label={`Subtotal (${count} items)`} value={money(subtotal)} />
                  <Row
                    label="Shipping"
                    value={shipping === 0 ? "Free" : money(shipping)}
                    accent={shipping === 0}
                  />
                </div>

                {toFree > 0 && (
                  <div className="mt-5 rounded-2xl bg-cream/10 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold">
                      <Truck className="size-4 text-clay-soft" />
                      Add {money(toFree)} for free shipping
                    </p>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-cream/20">
                      <motion.div
                        className="h-full rounded-full bg-clay"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-end justify-between border-t border-cream/15 pt-5">
                  <span className="text-xs font-bold tracking-[0.2em] text-cream/60 uppercase">
                    Total
                  </span>
                  <span className="font-display text-4xl font-semibold">{money(total)}</span>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={!formValid || submitting}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-sm font-extrabold tracking-wide text-cream transition-colors hover:bg-cream hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Placing order…
                    </>
                  ) : (
                    <>
                      Place order
                      <Lock className="size-3.5 opacity-70" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-cream/60">
                  Pay on delivery — no card needed now. Full 30-day refund if
                  your child won&apos;t take it.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-3 px-2">
              {[
                "Ships within 24 hours",
                "Cash or card on delivery",
                "30-day no-questions refund",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-xs font-semibold text-ink-soft"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-forest" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <p className="flex justify-between gap-4">
      <span className="text-cream/70">{label}</span>
      <span className={`font-bold ${accent ? "text-clay-soft" : ""}`}>{value}</span>
    </p>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-ink-soft uppercase">
        <span className="text-clay">{icon}</span>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-ink/10 bg-cream px-4 py-3.5 text-sm font-medium transition-colors outline-none placeholder:text-ink-soft/40 focus:border-forest"
      />
    </label>
  );
}
