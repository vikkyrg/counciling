const publicEnv = import.meta.env;

export const SITE = {
  name: "The Master Mind",
  tagline: "A safe space to talk, heal, and grow.",
  email: publicEnv.VITE_SITE_EMAIL || "care@themastermind.example",
  phone: publicEnv.VITE_SITE_PHONE || "+1 (555) 010-2400",
  whatsapp: publicEnv.VITE_SITE_WHATSAPP || "+91 761 875 1717",
  address: "No 12, 60ft, 1st Main Rd, Shivanagar, Rajajinagar, Bengaluru, Karnataka 560010",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
};

export const TRUST_INDICATORS = [
  {
    icon: "shield",
    title: "Certified Counsellors",
    text: "Registered, supervised professionals with accredited training.",
  },
  {
    icon: "lock",
    title: "Confidential Sessions",
    text: "Your story stays private — protected at every step.",
  },
  {
    icon: "laptop",
    title: "Online & In-Person",
    text: "Support in the format that fits your life and comfort.",
  },
  {
    icon: "heart",
    title: "Client-Centred Approach",
    text: "Your goals, your pace, your definition of progress.",
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: "chat",
    title: "Empathetic Listening",
    text: "You'll be heard fully — no rush, no judgement, no script.",
  },
  {
    icon: "book",
    title: "Evidence-Informed Approach",
    text: "Methods grounded in recognised therapeutic research.",
  },
  {
    icon: "shield",
    title: "Non-Judgemental Space",
    text: "Every background, identity, and story is welcome here.",
  },
  {
    icon: "spark",
    title: "Personalized Care",
    text: "Plans shaped around you — never one-size-fits-all.",
  },
  {
    icon: "calendar",
    title: "Flexible Scheduling",
    text: "Evening, weekend, and online options that respect your time.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Reach Out",
    text: "Send an enquiry through the contact form, phone, or WhatsApp. No detail is too small.",
  },
  {
    step: 2,
    title: "Match With a Counsellor",
    text: "We pair you with a counsellor suited to your concern, preferred language, and schedule.",
  },
  {
    step: 3,
    title: "Attend a Session",
    text: "Meet online or in person. The first session is about comfort, clarity, and your goals.",
  },
  {
    step: 4,
    title: "Continue Your Growth",
    text: "Review progress together and build on momentum — at a pace that feels right for you.",
  },
];

export const CORE_VALUES = [
  { icon: "heart", title: "Empathy", text: "We lead with understanding, not assessment." },
  { icon: "lock", title: "Confidentiality", text: "Privacy is a promise, not a policy checkbox." },
  { icon: "handshake", title: "Respect", text: "Your autonomy and choices guide the work." },
  { icon: "users", title: "Inclusion", text: "All identities, backgrounds, and beliefs welcome." },
  { icon: "badge", title: "Professionalism", text: "Supervised, accountable, ethical practice." },
  { icon: "leaf", title: "Growth", text: "Change is possible at every stage of life." },
];

export const OUR_APPROACH = [
  {
    title: "Client-Centred Counselling",
    text: "You set the agenda. Therapy follows your goals and moves at your pace.",
  },
  {
    title: "Evidence-Informed Methods",
    text: "We draw on recognised approaches like CBT, person-centred, and systemic therapies.",
  },
  {
    title: "Safe, Non-Judgemental Environment",
    text: "Sessions are spaces where nothing you say will cost you our respect.",
  },
  {
    title: "Collaborative Goal Setting",
    text: "We define what 'better' means together — and review it regularly.",
  },
];

export const WHO_WE_SERVE = [
  { icon: "person", title: "Adults", text: "Navigating stress, mood, and life changes." },
  { icon: "teen", title: "Teenagers", text: "School, identity, and emotional pressures." },
  { icon: "heart", title: "Couples", text: "Communication, trust, and reconnection." },
  { icon: "book", title: "Students", text: "Academic stress and career uncertainty." },
  { icon: "briefcase", title: "Working Professionals", text: "Burnout, workplace stress, transitions." },
  { icon: "family", title: "Families", text: "Conflict, change, and stronger bonds." },
];

export const THERAPY_ISSUES = [
  "Anxiety",
  "Depression",
  "Trauma",
  "Grief",
  "Anger",
  "OCD-related concerns",
  "Panic",
  "Loneliness",
  "Academic pressure",
  "Workplace stress",
  "Relationship difficulties",
  "Identity concerns",
  "Body image",
  "Life transitions",
];

export const THERAPY_PROCESS = [
  {
    step: 1,
    title: "Initial Consultation",
    text: "A relaxed first conversation to understand your situation and answer questions.",
  },
  {
    step: 2,
    title: "Assessment & Goal Setting",
    text: "We agree on focus areas and what a successful outcome looks like for you.",
  },
  {
    step: 3,
    title: "Regular Sessions",
    text: "Consistent weekly or fortnightly sessions with your matched counsellor.",
  },
  {
    step: 4,
    title: "Progress Review",
    text: "Open check-ins to celebrate gains, adjust direction, and plan closure well.",
  },
];

export const SESSION_FORMATS = [
  {
    icon: "laptop",
    title: "Online Sessions",
    text: "Secure video calls from anywhere — ideal for busy or remote schedules.",
  },
  {
    icon: "building",
    title: "In-Person Sessions",
    text: "Calm, private therapy rooms in a comfortable, accessible location.",
  },
  {
    icon: "users",
    title: "Individual, Couples & Group",
    text: "One-to-one, partner, and small-group formats depending on your needs.",
  },
];

export const PRICING = [
  {
    name: "Individual Session",
    price: "₹60",
    unit: "per 50-min session",
    note: "Placeholder rate — confirmed at booking.",
  },
  {
    name: "Couples / Family Session",
    price: "₹95",
    unit: "per 75-min session",
    note: "Placeholder rate — confirmed at booking.",
    featured: true,
  },
  {
    name: "Online Session",
    price: "₹55",
    unit: "per 50-min session",
    note: "Placeholder rate — confirmed at booking.",
  },
];

export const CONTACT_CARDS = [
  {
    icon: "mail",
    title: "Email",
    value: SITE.email,
    meta: "Replies within 1 working day",
    href: `mailto:${SITE.email}`,
  },
  {
    icon: "phone",
    title: "Phone",
    value: SITE.phone,
    meta: "Mon – Sat, 9 AM – 7 PM",
    href: `tel:${SITE.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    icon: "whatsapp",
    title: "WhatsApp",
    value: SITE.whatsapp,
    meta: "Text us anytime",
    href: `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`,
  },
  {
    icon: "pin",
    title: "Location",
    value: "No 12, 60ft, 1st Main Rd, Shivanagar, Rajajinagar, Bengaluru, Karnataka 560010",
    meta: "Wheelchair accessible",
  },
  {
    icon: "clock",
    title: "Working Hours",
    value: "Mon – Sat, 9:00 AM – 7:00 PM",
    meta: "Evening slots on request",
  },
];

export const BOOKING_INFO = [
  "Fill in the contact form or call us — tell us as much or as little as you like.",
  "We respond within one working day with matched counsellors and available times.",
  "Confirm your slot, format (online or in-person), and any preferences.",
  "Attend your first session. Nothing is committed beyond it until it feels right.",
];
