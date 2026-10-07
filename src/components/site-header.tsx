"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, ArrowUpRight, Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart/cart-provider";

const LINKS = [
  { href: "/", label: "Clinic" },
  { href: "/product", label: "Shop" },
  { href: "/results", label: "Results" },
  { href: "/book", label: "Book" },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, open: openCart, ready } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-cream/85 shadow-[0_1px_0_0_rgba(31,44,34,0.08)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-forest text-cream transition-transform duration-500 group-hover:rotate-[20deg]">
              <Leaf className="size-5" strokeWidth={1.8} />
            </span>
            <span className="leading-none">
              <span className="font-display block text-lg font-semibold tracking-tight">
                Nourish <span className="text-clay italic">&amp;</span> Heal
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-ink-soft/70 uppercase">
                NutriClinic
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`link-underline text-sm font-semibold tracking-wide ${
                  pathname === l.href ? "text-clay" : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={openCart}
              className="group relative grid size-10 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-cream"
              aria-label={`Open basket${count ? `, ${count} items` : ""}`}
            >
              <ShoppingBag className="size-[1.1rem]" strokeWidth={1.9} />
              <AnimatePresence>
                {ready && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-clay px-1.5 text-[10px] font-extrabold text-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <Link
              to="/book"
              className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-cream transition-colors duration-300 hover:bg-clay md:flex"
            >
              Book a consult
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-ink/15 md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 rounded-3xl border border-ink/10 bg-cream p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="font-display rounded-xl px-4 py-3 text-2xl font-medium hover:bg-sage-light"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/book"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-bold text-cream"
              >
                Book a consult <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
