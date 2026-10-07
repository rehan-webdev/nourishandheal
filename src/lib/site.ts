import {
  Salad,
  Activity,
  Flower2,
  Microscope,
  type LucideIcon,
} from "lucide-react";
import heroBowl from "@/assets/hero-bowl.webp";
import kidsJar from "@/assets/kids-jar.webp";
import founderPortrait from "@/assets/founder.jpg";

export const IMAGES = {
  heroBowl,
  kidsJar,
  kidsLabel: "/images/kids-label.png",
  founderPortrait,
  consultKitchen:
    "https://images.pexels.com/photos/8844901/pexels-photo-8844901.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  consultTable:
    "https://images.pexels.com/photos/8844553/pexels-photo-8844553.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  bowlSalad:
    "https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  bowlTop:
    "https://images.pexels.com/photos/7660428/pexels-photo-7660428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  bowlVeg:
    "https://images.pexels.com/photos/6065181/pexels-photo-6065181.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  noodles:
    "https://images.pexels.com/photos/8286761/pexels-photo-8286761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  cookingHands:
    "https://images.pexels.com/photos/8127435/pexels-photo-8127435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kitchenWoman:
    "https://images.pexels.com/photos/5237908/pexels-photo-5237908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  strawberries:
    "https://images.pexels.com/photos/8845648/pexels-photo-8845648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  produce:
    "https://images.pexels.com/photos/5084083/pexels-photo-5084083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  yoga:
    "https://images.pexels.com/photos/6454082/pexels-photo-6454082.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  meditate:
    "https://images.pexels.com/photos/6633827/pexels-photo-6633827.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  stretch:
    "https://images.pexels.com/photos/8497995/pexels-photo-8497995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  tableSet:
    "https://images.pexels.com/photos/13350113/pexels-photo-13350113.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export type Pillar = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  tags: string[];
};

export const PILLARS: Pillar[] = [
  {
    icon: Microscope,
    title: "Clinical Nutrition Therapy",
    blurb:
      "Medical nutrition therapy for PCOS, thyroid, diabetes and gut disorders — built on labs, not guesswork.",
    tags: ["PCOS", "Thyroid", "IBS"],
  },
  {
    icon: Activity,
    title: "Metabolic Reset",
    blurb:
      "Reverse insulin resistance and rebuild a metabolism that works with you, not against you.",
    tags: ["Blood sugar", "Weight", "Energy"],
  },
  {
    icon: Salad,
    title: "Sustainable Weight Care",
    blurb:
      "Lose the diet, not your life. Flexible plans grounded in metabolism science and behaviour design.",
    tags: ["No crash diets", "Habit-first"],
  },
  {
    icon: Flower2,
    title: "Women's Health",
    blurb:
      "Nutrition for every season of womanhood — fertility, pregnancy, postpartum and menopause.",
    tags: ["Hormones", "Fertility", "Menopause"],
  },
];

export type CaseStudy = {
  id: string;
  name: string;
  age: number;
  category: "Weight" | "Gut Health" | "Hormones" | "Metabolic" | "Sports";
  image: string;
  duration: string;
  headline: string;
  story: string;
  quote: string;
  stats: { label: string; before: string; after: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "meera",
    name: "Meera K.",
    age: 31,
    category: "Metabolic",
    image: IMAGES.kitchenWoman,
    duration: "7 months",
    headline: "From prediabetic to full reversal",
    story:
      "Meera came to us exhausted, on the edge of a type-2 diagnosis. We rebuilt her plate around glucose stability — no starvation, no shakes. Seven months later her endocrinologist took her off the watchlist entirely.",
    quote: "I stopped fearing food and started understanding it.",
    stats: [
      { label: "HbA1c", before: "6.4", after: "5.3" },
      { label: "Fasting glucose", before: "118", after: "89" },
      { label: "Energy (self-rated)", before: "3/10", after: "9/10" },
    ],
  },
  {
    id: "aisha",
    name: "Aisha R.",
    age: 28,
    category: "Hormones",
    image: IMAGES.yoga,
    duration: "9 months",
    headline: "PCOS symptoms in remission",
    story:
      "Irregular cycles, stubborn weight and cystic acne had defined Aisha's twenties. A phased anti-inflammatory protocol, strength-forward training nutrition and stress regulation brought her cycle back — naturally.",
    quote: "For the first time in a decade, my body feels like mine.",
    stats: [
      { label: "Cycle regularity", before: "4 /yr", after: "11 /yr" },
      { label: "Body composition", before: "38%", after: "27%" },
      { label: "Acne severity", before: "Severe", after: "Clear" },
    ],
  },
  {
    id: "daniel",
    name: "Daniel O.",
    age: 42,
    category: "Gut Health",
    image: IMAGES.cookingHands,
    duration: "5 months",
    headline: "15 years of IBS, resolved",
    story:
      "Daniel had tried every elimination diet on the internet. Our structured low-FODMAP reintroduction and gut-repair protocol found his actual triggers — two foods, not twenty.",
    quote: "I eat out with my family again. That alone was worth everything.",
    stats: [
      { label: "Flare-ups /month", before: "12", after: "0–1" },
      { label: "Trigger foods", before: "Unknown", after: "Identified" },
      { label: "Quality of life", before: "2/10", after: "9/10" },
    ],
  },
  {
    id: "sofia",
    name: "Sofia M.",
    age: 35,
    category: "Weight",
    image: IMAGES.strawberries,
    duration: "12 weeks",
    headline: "14 kg down — no diet, no rebound",
    story:
      "After two decades of yo-yo dieting, Sofia finally broke the restrict–binge cycle with structured flexibility. The weight followed as a side effect of a healed relationship with food.",
    quote: "The scale moved, but the real win was peace at the table.",
    stats: [
      { label: "Weight", before: "82 kg", after: "68 kg" },
      { label: "Binge episodes", before: "3 /wk", after: "0" },
      { label: "Maintained at 1 yr", before: "—", after: "Yes" },
    ],
  },
  {
    id: "ravi",
    name: "Ravi T.",
    age: 26,
    category: "Sports",
    image: IMAGES.stretch,
    duration: "6 months",
    headline: "Fueling a marathon debut",
    story:
      "Ravi was under-fueled and plateaued. We periodised his carb intake, dialled in race-day gut training and recovery nutrition — he finished his first marathon strong, 22 minutes under target.",
    quote: "Nutrition was the training block I was missing.",
    stats: [
      { label: "Marathon time", before: "4:12 (est.)", after: "3:38" },
      { label: "Resting HR", before: "68", after: "54" },
      { label: "Weekly energy dips", before: "5", after: "0" },
    ],
  },
  {
    id: "leena",
    name: "Leena P.",
    age: 51,
    category: "Hormones",
    image: IMAGES.meditate,
    duration: "8 months",
    headline: "Through menopause, gracefully",
    story:
      "Brain fog, night sweats and creeping weight had Leena feeling invisible. A phytoestrogen-rich protocol, protein rebalancing and targeted micronutrients gave her back clarity and calm.",
    quote: "I weathered menopause feeling powerful, not powerless.",
    stats: [
      { label: "Hot flushes /day", before: "8–10", after: "0–1" },
      { label: "Sleep quality", before: "4/10", after: "8/10" },
      { label: "Waist", before: "92 cm", after: "80 cm" },
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Dr. Vance is the first practitioner who looked at my labs, my lifestyle and my relationship with food as one whole picture. Everything finally made sense.",
    name: "Priya N.",
    detail: "Metabolic reset client",
  },
  {
    quote:
      "I've done every diet since 2010. This is the first time nothing felt like a diet — and the first time the results stayed.",
    name: "Marcus T.",
    detail: "Lost 21 kg in 9 months",
  },
  {
    quote:
      "My gut ruled my life for 15 years. Within four months I had answers, a plan, and my freedom back.",
    name: "Daniel O.",
    detail: "Gut restoration client",
  },
  {
    quote:
      "The follow-up notes alone are worth it — precise, personal, actionable. Felt like having a scientist and a coach in my corner.",
    name: "Aisha R.",
    detail: "PCOS protocol client",
  },
];

export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  mode: string;
  description: string;
};

export const BOOKABLE_SERVICES: Service[] = [
  {
    id: "discovery",
    name: "Discovery Call",
    duration: 20,
    price: 0,
    mode: "Video call",
    description:
      "A no-pressure conversation about your goals, history and whether we're the right fit for each other.",
  },
  {
    id: "initial",
    name: "Initial Consultation",
    duration: 75,
    price: 85,
    mode: "In-clinic or video",
    description:
      "Deep-dive assessment: full history, labs review, body composition and your first personalised action steps.",
  },
  {
    id: "followup",
    name: "Follow-up Consultation",
    duration: 40,
    price: 55,
    mode: "In-clinic or video",
    description:
      "Progress review, plan refinement and barrier troubleshooting for existing clients.",
  },
  {
    id: "paediatric",
    name: "Paediatric Nutrition Consult",
    duration: 60,
    price: 70,
    mode: "In-clinic or video",
    description:
      "For children 2–12: growth review, picky-eating support and a plan — including whether our Kids Growth Powder is right for them.",
  },
];


