import { useEffect } from "react";
import { Hero } from "@/components/home/hero";
import {
  Marquee,
  About,
  Pillars,
  ProductTeaser,
  ResultsTeaser,
} from "@/components/home/sections";
import { Testimonials } from "@/components/home/testimonials";

export default function HomePage() {
  useEffect(() => {
    document.title = "Nourish & Heal NutriClinic — Dietitian & Nutrition Therapy";
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Pillars />
      <ProductTeaser />
      <ResultsTeaser />
      <Testimonials />
    </>
  );
}
