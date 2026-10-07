"use client";


import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, Truck, Lock } from "lucide-react";
import { detailed, money, useCart } from "./cart-provider";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/product";
import { IMAGES } from "@/lib/site";

export function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count } = useCart();
  const items = detailed(lines);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display flex items-center gap-2.5 text-xl font-semibold">
                <ShoppingBag className="size-5 text-clay" />
                Your basket
                {count > 0 && (
                  <span className="rounded-full bg-forest px-2.5 py-0.5 text-xs font-bold text-cream">
                    {count}
                  </span>
                )}
              </h2>
              <button
                onClick={close}
                aria-label="Close basket"
                className="grid size-9 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-cream"
              >
                <X className="size-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid size-20 place-items-center rounded-full bg-sage-light text-forest">
                  <ShoppingBag className="size-8" strokeWidth={1.5} />
                </span>
                <p className="font-display mt-6 text-2xl font-semibold">
                  Your basket is empty
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Little bodies, big appetites. Let&apos;s fix both.
                </p>
                <Link
                  to="/product"
                  onClick={close}
                  className="mt-7 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-clay"
                >
                  Shop Kids Growth Powder
                </Link>
              </div>
            ) : (
              <>
                {/* free shipping meter */}
                <div className="border-b border-ink/10 bg-sage-light px-6 py-4">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-forest">
                    <Truck className="size-4" />
                    {remaining > 0 ? (
                      <>
                        You&apos;re{" "}
                        <span className="text-clay-deep">{money(remaining)}</span>{" "}
                        away from free shipping
                      </>
                    ) : (
                      <>Free shipping unlocked 🎉</>
                    )}
                  </p>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-forest/15">
                    <motion.div
                      className="h-full rounded-full bg-forest"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                {/* lines */}
                <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4"
                    >
                      <Link
                        to="/product"
                        onClick={close}
                        className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-ink/10"
                      >
                        <img
                          src={IMAGES.kidsJar}
                          alt={item.variant.size}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-extrabold leading-tight">
                              Kids Growth Powder
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                              {item.variant.size}
                            </p>
                          </div>
                          <p className="shrink-0 text-sm font-extrabold text-forest">
                            {money(item.lineTotal)}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1">
                            <button
                              onClick={() => setQty(item.variantId, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid size-7 place-items-center rounded-full transition-colors hover:bg-sand"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">
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
                            aria-label="Remove item"
                            className="grid size-8 place-items-center rounded-full text-ink-soft/60 transition-colors hover:bg-clay-soft hover:text-clay-deep"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* footer */}
                <div className="border-t border-ink/10 px-6 py-5">
                  <div className="flex items-end justify-between">
                    <span className="text-xs font-bold tracking-[0.2em] text-ink-soft uppercase">
                      Subtotal
                    </span>
                    <span className="font-display text-3xl font-semibold">
                      {money(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-ink-soft">
                    {remaining > 0
                      ? `Shipping calculated at checkout (flat ${money(6)})`
                      : "Free shipping applied at checkout"}
                  </p>
                  <Link
                    to="/cart"
                    onClick={close}
                    className="group mt-5 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-bold text-cream transition-colors hover:bg-clay"
                  >
                    Checkout
                    <Lock className="size-3.5 opacity-70" />
                  </Link>
                  <button
                    onClick={close}
                    className="mt-3 w-full text-center text-xs font-bold tracking-wide text-ink-soft uppercase hover:text-ink"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
