import { Link } from "react-router-dom";
import {
  Leaf,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  AtSign,
  Globe,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="dot-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
        {/* CTA banner */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-cream/10 pb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.35em] text-clay uppercase">
              Begin today
            </p>
            <h2 className="font-display max-w-2xl text-4xl leading-[1.05] font-medium sm:text-6xl">
              Feed them better.
              <span className="text-sage italic"> Watch them thrive.</span>
            </h2>
          </div>
          <Link
            to="/book"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-clay px-7 py-4 text-sm font-bold tracking-wide text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
          >
            Book your consultation
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-clay text-cream">
                <Leaf className="size-5" strokeWidth={1.8} />
              </span>
              <span className="leading-none">
                <span className="font-display block text-lg font-semibold">
                  Nourish <span className="text-clay italic">&amp;</span> Heal
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-cream/60 uppercase">
                  NutriClinic
                </span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream/60">
              Evidence-based nutrition therapy, delivered with warmth. Registered
              dietitians helping you heal your metabolism, gut and relationship
              with food — for good.
            </p>
            <div className="mt-5 flex gap-3">
              {[AtSign, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-clay hover:bg-clay hover:text-cream"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[0.3em] text-cream/50 uppercase">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-cream/75">
              <li><Link className="hover:text-clay" to="/">The Clinic</Link></li>
              <li><Link className="hover:text-clay" to="/product">Kids Growth Powder</Link></li>
              <li><Link className="hover:text-clay" to="/cart">Basket &amp; Checkout</Link></li>
              <li><Link className="hover:text-clay" to="/results">Client Results</Link></li>
              <li><Link className="hover:text-clay" to="/book">Book a Consult</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[0.3em] text-cream/50 uppercase">
              Specialities
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-cream/75">
              <li>Kids Growth Powder</li>
              <li>Paediatric Nutrition</li>
              <li>Metabolic Reset</li>
              <li>Gut Restoration</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[0.3em] text-cream/50 uppercase">
              Visit
            </h3>
            <ul className="space-y-3 text-sm text-cream/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-clay" />
                <span>18 Willow Lane, Greenfield Quarter<br />Open Tue–Sat, 10:00–17:00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-clay" />
                <span>(555) 014-2830</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-clay" />
                <span>hello@nourishandheal.clinic</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Nourish &amp; Heal NutriClinic. All rights reserved.</p>
          <p>Not a substitute for emergency medical care.</p>
        </div>
      </div>
    </footer>
  );
}
