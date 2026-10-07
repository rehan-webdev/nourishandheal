export type Variant = {
  id: string;
  size: string;
  servings: string;
  price: number;
  compareAt: number | null;
  label?: string;
};

export const PRODUCT = {
  name: "Kids Growth Powder",
  tagline: "Healthy Growth · Stronger Bones · Better Immunity",
  brand: "Nourish & Heal",
  priceFrom: 24,
  rating: 4.9,
  reviewCount: 1284,
  ageRange: "Ages 2–12",
  flavour: "Natural dates & nuts",
  sku: "NH-KGP-300",
  promise:
    "A paediatric-dietitian-formulated daily nutrition mix of 22 nuts, seeds, fruits and grains — no refined sugar, no preservatives, no shortcuts.",
};

export const VARIANTS: Variant[] = [
  {
    id: "kgp-250",
    size: "250 g",
    servings: "≈ 16 servings",
    price: 24,
    compareAt: null,
  },
  {
    id: "kgp-500",
    size: "500 g",
    servings: "≈ 33 servings",
    price: 42,
    compareAt: 48,
    label: "Most popular",
  },
  {
    id: "kgp-twin",
    size: "Twin pack · 2 × 500 g",
    servings: "≈ 66 servings",
    price: 76,
    compareAt: 84,
    label: "Best value",
  },
];

export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_FLAT = 6;

export type Benefit = {
  title: string;
  text: string;
  color: string;
  bg: string;
  icon: "growth" | "bone" | "shield" | "stomach" | "brain";
};

export const BENEFITS: Benefit[] = [
  {
    title: "Supports Healthy Growth",
    text: "Protein, calcium and zinc in growth-supporting ratios for developing bodies.",
    color: "text-forest",
    bg: "bg-sage",
    icon: "growth",
  },
  {
    title: "Stronger Bones & Teeth",
    text: "Calcium, magnesium, phosphorus and vitamin D work together for skeletal strength.",
    color: "text-clay-deep",
    bg: "bg-clay-soft",
    icon: "bone",
  },
  {
    title: "Boosts Immunity",
    text: "Zinc, vitamin C and antioxidants from amla and dates reinforce natural defences.",
    color: "text-rose-700",
    bg: "bg-rose-100",
    icon: "shield",
  },
  {
    title: "Improves Appetite",
    text: "Gentle digestive spices and fibre gently wake up a picky or low appetite.",
    color: "text-purple-700",
    bg: "bg-purple-100",
    icon: "stomach",
  },
  {
    title: "Enhances Energy & Focus",
    text: "Slow-release carbs, iron and omega-3s fuel steady mornings and better concentration.",
    color: "text-teal-800",
    bg: "bg-teal-100",
    icon: "brain",
  },
];

export const INGREDIENTS = [
  { name: "Dates", note: "Natural sweetness + iron" },
  { name: "Almonds", note: "Vitamin E, healthy fats" },
  { name: "Cashews", note: "Zinc & magnesium" },
  { name: "Walnuts", note: "Omega-3 for brain" },
  { name: "Oats", note: "Slow-release energy" },
  { name: "Milk solids", note: "Complete protein" },
  { name: "Amla", note: "Vitamin C immunity" },
  { name: "Turmeric", note: "Anti-inflammatory" },
  { name: "Cardamom", note: "Digestive comfort" },
  { name: "Wheat germ", note: "B-vitamins & folate" },
];

export const FREE_FROM = [
  "No refined sugar",
  "No preservatives",
  "No artificial colours",
  "No palm oil",
  "No whey isolates",
  "Gluten-free option",
];

export const HOW_TO_USE = [
  {
    step: "01",
    title: "Scoop it",
    text: "Add two level scoops (about 15 g) to a glass of warm or cold milk.",
  },
  {
    step: "02",
    title: "Stir or blend",
    text: "Mix until creamy. Blend with a banana for a smoothie kids ask for.",
  },
  {
    step: "03",
    title: "Serve daily",
    text: "Once a day, any time. Consistency over 8–12 weeks shows the most.",
  },
];

export const COMPARE = [
  { point: "Sweetened with whole dates, not sugar", us: true, them: false },
  { point: "Formulated by registered paediatric dietitians", us: true, them: false },
  { point: "22 whole-food ingredients, nothing synthetic", us: true, them: false },
  { point: "Lab-tested for heavy metals & microbes", us: true, them: false },
  { point: "No fillers, anti-caking agents or palm oil", us: true, them: false },
  { point: "Tastes like a treat, not a supplement", us: true, them: false },
];

export const PRODUCT_REVIEWS = [
  {
    name: "Priya S.",
    meta: "Mum of 5-year-old · Verified buyer",
    rating: 5,
    title: "My picky eater asks for it",
    text: "Mealtimes used to be a battle. Three months in, he's gained 1.4 kg and actually finishes his glass without negotiation. Tastes like a milkshake, works like a supplement.",
  },
  {
    name: "Anita D.",
    meta: "Mum of twins, 7 · Verified buyer",
    rating: 5,
    title: "Fewer sick days this term",
    text: "Both girls had constant colds last year. This term they've missed two days total. The ingredient list is what sold me — nothing I can't pronounce.",
  },
  {
    name: "Rahul M.",
    meta: "Dad of 9-year-old · Verified buyer",
    rating: 5,
    title: "Pediatrician approved",
    text: "Showed the label to our paediatrician and she said it was one of the cleanest kids' powders she'd seen. That was the reassurance we needed.",
  },
  {
    name: "Fatima K.",
    meta: "Mum of 3-year-old · Verified buyer",
    rating: 4,
    title: "Great, wish the tub were bigger",
    text: "My daughter loves the taste and her appetite has genuinely improved. Only note: we go through the 250 g fast, so reorder the 500 g.",
  },
];

export const PRODUCT_FAQS = [
  {
    q: "What age is it suitable for?",
    a: "Kids Growth Powder is formulated for children aged 2 to 12 years. For children under 2, please consult your paediatrician first — we're happy to help you decide.",
  },
  {
    q: "How does it taste?",
    a: "Naturally sweet and nutty, like a light dates-and-nuts milkshake. There's no added sugar and no artificial flavouring — the sweetness comes entirely from whole dates and dried fruit.",
  },
  {
    q: "Is it safe for lactose-sensitive kids?",
    a: "It contains milk solids, so it isn't lactose-free. Many mildly sensitive children tolerate it well mixed into plant milk, but for diagnosed lactose intolerance we'd recommend a consult first so we can advise properly.",
  },
  {
    q: "How long until we see results?",
    a: "Appetite and energy changes often appear within 3–4 weeks. Growth, weight and immunity improvements are typically visible across 8–12 weeks of consistent daily use.",
  },
  {
    q: "Can I give it alongside a multivitamin?",
    a: "Usually yes, since our formula is food-based. That said, if your child takes anything with iron or high-dose vitamins, send us the label and a dietitian will check it for free.",
  },
  {
    q: "What's your return policy?",
    a: "If your child genuinely won't take it, contact us within 30 days and we'll refund you in full — you don't need to return the tub. We'd rather you trust us than keep a product that isn't used.",
  },
];
