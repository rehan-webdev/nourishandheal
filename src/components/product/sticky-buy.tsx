"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, money } from "@/components/cart/cart-provider";
import { PRODUCT, VARIANTS, FREE_SHIPPING_THRESHOLD } from "@/lib/product";
import { IMAGES } from "@/lib/site";

export function StickyBuyBar() {
  const { add } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 880);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const variant = VARIANTS[1];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4"
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-cream/95 p-3 pl-4 shadow-[0_20px_50px_-20px_rgba(31,44,34,0.5)] backdrop-blur-xl">
            <img
              src={IMAGES.kidsJar}
              alt=""
              className="hidden size-11 rounded-xl object-cover sm:block"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold">{PRODUCT.name}</p>
              <p className="text-xs font-semibold text-ink-soft">
                From {money(PRODUCT.priceFrom)} · free shipping over{" "}
                {money(FREE_SHIPPING_THRESHOLD)}
              </p>
            </div>
            <button
              onClick={() => add(variant.id, 1)}
              className="shrink-0 rounded-full bg-clay px-5 py-3 text-xs font-extrabold text-cream transition-colors hover:bg-ink sm:text-sm"
            >
              Add to basket
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
