import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Button from "../components/Button.jsx";
import Icon from "../components/Icon.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import TestimonialCarousel from "../components/TestimonialCarousel.jsx";
import FAQAccordion from "../components/FAQAccordion.jsx";
import CTASection from "../components/CTASection.jsx";
import { HOW_WE_HELP, CONCERNS } from "../data/services.js";
import {
  TRUST_INDICATORS,
  WHY_CHOOSE_US,
  HOW_IT_WORKS,
} from "../data/content.js";
import { HOME_FAQS } from "../data/faqs.js";
import heroImg from "../assets/hero-flowing.png";

// Ensures the hero image entrance animation plays only once per page session,
// even when navigating back to the home route.
let heroEntrancePlayed = false;

// The concerns list is split so desktop reads as two balanced centred rows,
// while narrower viewports simply wrap each row.
const CONCERNS_ROW_ONE = CONCERNS.slice(0, 6);
const CONCERNS_ROW_TWO = CONCERNS.slice(6);

// Three-petal lotus mark used as the decorative centrepiece of the concerns eyebrow.
function LotusMark({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 5.5c-2.7 3.4-4 6.8-4 10.1 0 3.5 1.4 6.4 4 9.1 2.6-2.7 4-5.6 4-9.1 0-3.3-1.3-6.7-4-10.1Z" />
      <path d="M16 24.7c-3.8-.5-6.9-2.1-9.2-4.6-1.6-1.8-2.5-3.8-2.7-5.9 3.3.4 6 1.6 8.1 3.5" />
      <path d="M16 24.7c3.8-.5 6.9-2.1 9.2-4.6 1.6-1.8 2.5-3.8 2.7-5.9-3.3.4-6 1.6-8.1 3.5" />
    </svg>
  );
}

// Leafy branch that tucks into a corner of the concerns section.
function CornerBranch({ className = "" }) {
  return (
    <svg viewBox="0 0 260 200" fill="none" className={className} aria-hidden="true">
      {/* Main stem sweeping in from the corner */}
      <path
        d="M6 8 C58 40, 104 78, 148 132 C166 154, 180 174, 190 192"
        stroke="#7FA158"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Leaves, deepest green closest to the edge */}
      <ellipse cx="48" cy="40" rx="30" ry="12" transform="rotate(34 48 40)" fill="#6F9A45" />
      <ellipse cx="86" cy="66" rx="28" ry="11" transform="rotate(-24 86 66)" fill="#8FB169" />
      <ellipse cx="110" cy="100" rx="27" ry="11" transform="rotate(40 110 100)" fill="#A9C186" />
      <ellipse cx="142" cy="124" rx="24" ry="10" transform="rotate(-20 142 124)" fill="#C9D8AD" />
      <ellipse cx="164" cy="158" rx="21" ry="9" transform="rotate(46 164 158)" fill="#A9C186" />
      {/* Thin secondary sprig for depth */}
      <path
        d="M20 6 C44 26, 62 52, 74 82"
        stroke="#A9C186"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <ellipse cx="36" cy="18" rx="18" ry="7.5" transform="rotate(-16 36 18)" fill="#8FB169" opacity="0.9" />
    </svg>
  );
}

const CONCERN_ICONS = {
  Anxiety: "brain",
  Stress: "bolt",
  Depression: "mood",
  Overthinking: "chat",
  Burnout: "alert",
  "Relationship issues": "users",
  "Self-esteem": "heart",
  "Emotional regulation": "spark",
  "Life transitions": "globe",
  "Career stress": "briefcase",
};

// A single non-interactive concern tag with a relevant icon.
function ConcernPill({ label }) {
  return (
    <li>
      <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/95 py-2 pl-2 pr-5 text-[15px] font-semibold text-body shadow-sm shadow-brand-900/5 sm:text-base">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600"
        >
          <Icon name={CONCERN_ICONS[label] || "spark"} className="h-3.5 w-3.5" />
        </span>
        {label}
      </span>
    </li>
  );
}

// Small decorative leaf sprig used at the outer edges of the services section.
function LeafSprig({ small = false }) {
  return small ? (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 21 C3 12, 10 3, 21 3 C21 12, 14 21, 3 21 Z"
        fill="#C9D8AD"
        opacity="0.8"
      />
      <path d="M3 21 C9 15, 15 9, 21 3" stroke="#A9C186" strokeWidth="1" />
    </svg>
  ) : (
    <svg width="190" height="250" viewBox="0 0 190 250" fill="none">
      {/* Stem */}
      <path
        d="M14 244 C48 190, 78 132, 108 52 C116 32, 124 16, 132 4"
        stroke="#A9C186"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Leaves in muted sage and olive tones */}
      <ellipse cx="46" cy="196" rx="30" ry="12" transform="rotate(-38 46 196)" fill="#C9D8AD" />
      <ellipse cx="78" cy="150" rx="30" ry="12" transform="rotate(24 78 150)" fill="#A9C186" />
      <ellipse cx="92" cy="106" rx="27" ry="11" transform="rotate(-32 92 106)" fill="#EDF3E7" stroke="#C9D8AD" strokeWidth="1" />
      <ellipse cx="114" cy="64" rx="25" ry="10" transform="rotate(28 114 64)" fill="#C9D8AD" />
      <ellipse cx="124" cy="26" rx="20" ry="9" transform="rotate(-28 124 26)" fill="#A9C186" />
    </svg>
  );
}

export default function Home() {
  const [playHeroEntrance, setPlayHeroEntrance] = useState(
    () => !heroEntrancePlayed
  );
  const journeyRef = useRef(null);
  const [journeyStarted, setJourneyStarted] = useState(false);

  useEffect(() => {
    if (playHeroEntrance) {
      heroEntrancePlayed = true;
    }
  }, [playHeroEntrance]);

  useEffect(() => {
    const section = journeyRef.current;
    if (
      !section ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    document.documentElement.classList.add("has-journey-observer");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setJourneyStarted(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-journey-observer");
    };
  }, []);

  return (
    <>
      <Seo
        title="A Safe Space to Talk, Heal, and Grow"
        description="Confidential, compassionate, professional counselling for whatever you're carrying. Certified counsellors, judgement-free listening, and care tailored to your life — online or in person."
      />

      {/* 1. Hero — Full-Background Therapy Landscape */}
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[#FAF9F4]"
      >
        {/* Full-bleed therapy photograph — the single hero background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="A peaceful person sitting comfortably by a panoramic window overlooking misty green rolling mountains with sunlit forest, tea, and indoor plants"
            width="1440"
            height="810"
            className="h-full w-full object-cover object-[62%_center] sm:object-[60%_center] lg:object-[54%_center] xl:object-[50%_center]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Soft atmospheric warm ivory gradient overlay — seamlessly blends the left text area while keeping the woman, tea table, and sunlit forest crisp on the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#FAF9F4]/95 via-[#FAF9F4]/80 via-35% sm:via-[#FAF9F4]/60 sm:via-45% to-transparent to-75% lg:to-65%"
        />

        {/* Subtle warm sunlight tint over the window scene */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#FAF9F4]/40 via-transparent to-[#E8D9B5]/15 mix-blend-soft-light"
        />

        {/* Foreground Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-xl min-w-0 motion-safe:animate-fade-up lg:max-w-xl xl:max-w-2xl">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E5EFD9]/90 backdrop-blur-xs px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#36591B] shadow-2xs border border-[#4D7C24]/10">
              <Icon name="leaf" className="h-3.5 w-3.5 text-[#4D7C24]" />
              <span>Professional counselling & therapy</span>
            </div>

            {/* Headline matching exact scale, weights, colors, and line breaks */}
            <h1
              id="hero-title"
              className="mt-6 text-4xl sm:text-5xl lg:text-[3.65rem] xl:text-[4rem] leading-[1.08] font-extrabold tracking-tight text-[#243B2A]"
            >
              A safe space to talk,
              <br />
              <span className="text-[#4D7C24]">heal, and grow.</span>
            </h1>

            {/* Supporting paragraph */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#465044] sm:text-lg sm:leading-relaxed font-normal">
              Confidential, compassionate, professional counselling for whatever
              you're carrying. Certified counsellors, judgement-free listening,
              and care tailored to your life — online or in person.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                to="/contact"
                size="lg"
                className="bg-[#4D7C24] text-white shadow-md shadow-[#4D7C24]/20 hover:bg-[#36591B] font-bold px-7 py-3.5 rounded-full"
              >
                Book a Session
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <Button
                to="/therapy"
                variant="secondary"
                size="lg"
                className="bg-white/90 backdrop-blur-xs text-[#243B2A] border border-[#243B2A]/25 hover:border-[#243B2A] hover:bg-[#EDF3E7]/60 font-bold px-7 py-3.5 rounded-full shadow-2xs"
              >
                Explore Therapy
              </Button>
            </div>

            {/* Reassurance Row */}
            <div className="mt-10 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#465044] font-medium sm:gap-x-8">
              <div className="flex items-center gap-2">
                <Icon name="chat" className="h-4 w-4 text-[#4D7C24]" />
                <span>Free initial enquiry</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-[#4D7C24]" />
                <span>Replies within 1 working day</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-[#4D7C24]" />
                <span>Fully confidential</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Trust indicators */}
      <section
        aria-labelledby="trust-title"
        className="border-y border-brand-100 bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 id="trust-title" className="sr-only">
            Why clients can trust us
          </h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_INDICATORS.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-brand-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. How We Help */}
      <section
        aria-labelledby="how-we-help-title"
        className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
      >
        {/* Botanical edge sprigs — muted sage/olive, kept near the outer margins */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-16 hidden opacity-60 lg:block"
        >
          <LeafSprig />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 bottom-16 hidden rotate-180 opacity-60 lg:block"
        >
          <LeafSprig />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-2 bottom-10 hidden opacity-50 lg:block"
        >
          <LeafSprig small />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-12 hidden -rotate-12 opacity-50 lg:block"
        >
          <LeafSprig small />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="how-we-help-title"
            eyebrow="How we help"
            eyebrowLines
            title="Support shaped around real life"
            titleClassName="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl lg:text-[2.625rem] lg:leading-[1.15]"
            description="From one-on-one therapy to couples and career guidance, every service is delivered by certified counsellors in a confidential space."
          />
          <div
            data-reveal-stagger="200"
            className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {HOW_WE_HELP.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>



      {/* 4. Common concerns */}
      <section
        aria-labelledby="concerns-title"
        className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
      >
        {/* Soft oversized pale-sage curved shapes anchoring the outer corners */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute -left-32 -top-40 h-[26rem] w-[26rem] bg-brand-100/70"
            style={{ borderRadius: "48% 52% 55% 45% / 54% 46% 54% 46%" }}
          />
          <div
            className="absolute -right-36 -top-24 h-[22rem] w-[22rem] bg-surface-soft/90"
            style={{ borderRadius: "55% 45% 48% 52% / 46% 54% 46% 54%" }}
          />
          <div
            className="absolute -bottom-44 -left-28 h-[28rem] w-[28rem] bg-surface-soft/90"
            style={{ borderRadius: "52% 48% 45% 55% / 55% 45% 55% 45%" }}
          />
          <div
            className="absolute -bottom-40 -right-32 h-[30rem] w-[30rem] bg-brand-100/70"
            style={{ borderRadius: "45% 55% 52% 48% / 48% 52% 48% 52%" }}
          />
          {/* Very light organic wash that keeps the centre bright */}
          <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_50%,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0)_62%)]" />
        </div>

        {/* Delicate leafy branches near the left and right edges */}
        <CornerBranch className="pointer-events-none absolute -left-6 -top-4 z-[1] hidden w-56 opacity-90 lg:block xl:w-64" />
        <CornerBranch className="pointer-events-none absolute -bottom-6 -right-6 z-[1] hidden w-56 rotate-180 opacity-90 lg:block xl:w-64" />
        <div className="pointer-events-none absolute left-1 top-1/2 z-[1] hidden -translate-y-1/2 opacity-45 lg:block">
          <LeafSprig small />
        </div>
        <div className="pointer-events-none absolute right-1 top-1/3 z-[1] hidden -translate-y-1/2 rotate-180 opacity-45 lg:block">
          <LeafSprig small />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {/* Eyebrow: lotus mark above a letter-spaced label with thin decorative rules */}
          <p className="mt-4 flex items-center justify-center gap-4 text-[11px] font-extrabold uppercase tracking-[0.28em] text-brand-600 sm:text-xs sm:tracking-[0.3em]">
            <span aria-hidden="true" className="h-px w-10 bg-brand-300/80 sm:w-16" />
            What we help
            <span aria-hidden="true" className="h-px w-10 bg-brand-300/80 sm:w-16" />
          </p>

          <h2
            id="concerns-title"
            className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-brand-900 sm:text-4xl sm:leading-[1.15] lg:max-w-none lg:text-[2.9rem] xl:whitespace-nowrap xl:text-[3.05rem]"
          >
            Whatever you're carrying, it's{' '}
            <span className="text-brand-600">welcome here</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[46rem] text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
            Counselling isn't only for crises. These are some of the most common
            reasons people reach out to us:
          </p>

          {/* Concern pills — two centred rows on desktop, wrapping naturally below */}
          <ul className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:mt-14">
            {CONCERNS_ROW_ONE.map((concern) => (
              <ConcernPill key={concern} label={concern} />
            ))}
          </ul>
          <ul className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-4">
            {CONCERNS_ROW_TWO.map((concern) => (
              <ConcernPill key={concern} label={concern} />
            ))}
          </ul>

          <div className="mt-12 sm:mt-14">
            <Button
              to="/therapy"
              size="lg"
              className="px-10 py-4 text-base font-semibold shadow-lg shadow-brand-600/20 sm:px-12"
            >
              See how therapy helps
              <Icon name="arrow-right" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Why choose us */}
      <section aria-labelledby="why-choose-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          id="why-choose-title"
          eyebrow="Why choose us"
          eyebrowLines
          title="Care you can feel safe with"
          description="The quality of the relationship with your counsellor is the strongest predictor of progress — so we protect it deliberately."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item) => (
            <article
              key={item.title}
              className="flex items-start gap-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-sm shadow-brand-900/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-brand-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. How it works — Replicated Journey Design */}
      <section
        aria-labelledby="how-it-works-title"
        ref={journeyRef}
        data-journey-sequence
        data-journey-started={journeyStarted ? "true" : undefined}
        className="relative overflow-hidden bg-[#FAF9F4] py-20 sm:py-24 lg:py-28"
      >
        {/* Soft background subtle pale-sage organic shapes in corners */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-[#EDF3E7]/80 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[#EDF3E7]/70 blur-3xl" />
          <div className="absolute left-1/3 bottom-10 h-72 w-72 rounded-full bg-[#E5EFD9]/40 blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Centered Section Heading with Decorative Green Lines */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-[#4D7C24]">
              <span aria-hidden="true" className="h-px w-10 sm:w-14 bg-[#A9C186]" />
              HOW IT WORKS
              <span aria-hidden="true" className="h-px w-10 sm:w-14 bg-[#A9C186]" />
            </p>
            <h2
              id="how-it-works-title"
              className="mt-4 text-3xl font-extrabold tracking-tight text-[#243B2A] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.18]"
            >
              Four simple steps to getting support
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#626D5E] sm:text-lg">
              No long forms, no waiting lists that stretch for months. Starting should feel easy.
            </p>
          </div>

          {/* Connected Steps Row */}
          <div className="relative mt-16 sm:mt-20">
            {/* Desktop Horizontal Connecting Curved Path with Circular Markers */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-16 hidden lg:block z-0"
            >
              <svg
                viewBox="0 0 1200 60"
                fill="none"
                preserveAspectRatio="none"
                className="w-full h-14"
              >
                {/* Flowing green connector curve passing through step centers */}
                <path
                  data-journey-wave
                  d="M 150 30 Q 300 15, 450 30 T 750 30 T 1050 30"
                  stroke="#4D7C24"
                  strokeWidth="1.8"
                  pathLength="1"
                  opacity="0.75"
                />
                {/* Connecting node points between steps */}
                <circle data-journey-dot="1" cx="300" cy="22" r="4" fill="#4D7C24" />
                <circle data-journey-dot="2" cx="600" cy="38" r="4" fill="#4D7C24" />
                <circle data-journey-dot="3" cx="900" cy="22" r="4" fill="#4D7C24" />
              </svg>
            </div>

            {/* 4 Steps Container */}
            <ol className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              
              {/* Step 1: Reach Out */}
              <li data-journey-step="0" className="flex flex-col items-center text-center group">
                {/* Soft Card Container matching reference */}
                <div className="w-full rounded-3xl bg-white/70 backdrop-blur-xs p-6 pt-0 border border-[#243B2A]/6 shadow-sm shadow-[#243B2A]/3 flex flex-col items-center min-h-[360px] hover:border-[#4D7C24]/30 hover:bg-white transition-all duration-300">
                  {/* Organic Illustrated Backdrop with Number Badge */}
                  <div className="relative -mt-10 mb-6 flex items-center justify-center">
                    {/* Organic Pale Green Shape */}
                    <div data-journey-illustration className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#EDF3E7] shadow-inner group-hover:scale-105 transition-transform duration-300 border border-[#FAF9F4]">
                      {/* Number Badge */}
                      <span data-journey-badge className="absolute -left-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#4D7C24] text-xs font-black text-white shadow-md shadow-[#4D7C24]/20 border-2 border-white">
                        1
                      </span>
                      
                      {/* Custom SVG Illustration: Enquiry letter emerging from envelope with paper plane / chat */}
                      <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="text-[#243B2A]">
                        {/* Soft chat bubble / letter envelope */}
                        <rect x="15" y="20" width="30" height="24" rx="4" fill="#FFFFFF" stroke="#243B2A" strokeWidth="2" />
                        <line x1="21" y1="27" x2="39" y2="27" stroke="#4D7C24" strokeWidth="2" strokeLinecap="round" />
                        <line x1="21" y1="33" x2="33" y2="33" stroke="#A9C186" strokeWidth="2" strokeLinecap="round" />
                        
                        {/* Second overlapping speech/enquiry bubble */}
                        <path d="M34 32 H49 C51.2 32, 53 33.8, 53 36 V48 C53 50.2, 51.2 52, 49 52 H42 L36 57 V52 H34 C31.8 52, 30 50.2, 30 48 V44" fill="#EDF3E7" stroke="#243B2A" strokeWidth="2" strokeLinejoin="round" />
                        
                        {/* Small spark accents */}
                        <line x1="47" y1="17" x2="49" y2="13" stroke="#4D7C24" strokeWidth="2" strokeLinecap="round" />
                        <line x1="53" y1="21" x2="57" y2="20" stroke="#4D7C24" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Heading & Accent Bar */}
                  <h3 className="text-xl font-bold text-[#243B2A] tracking-tight">
                    Step 1: Reach Out
                  </h3>
                  <div className="mt-2.5 h-0.5 w-8 rounded-full bg-[#4D7C24]" />

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-[#626D5E]">
                    Send an enquiry through the contact form, phone, or WhatsApp. No detail is too small.
                  </p>
                </div>
              </li>

              {/* Step 2: Match With a Counsellor */}
              <li data-journey-step="1" className="flex flex-col items-center text-center group">
                <div className="w-full rounded-3xl bg-white/70 backdrop-blur-xs p-6 pt-0 border border-[#243B2A]/6 shadow-sm shadow-[#243B2A]/3 flex flex-col items-center min-h-[360px] hover:border-[#4D7C24]/30 hover:bg-white transition-all duration-300">
                  <div className="relative -mt-10 mb-6 flex items-center justify-center">
                    <div data-journey-illustration className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#EDF3E7] shadow-inner group-hover:scale-105 transition-transform duration-300 border border-[#FAF9F4]">
                      <span data-journey-badge className="absolute -left-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#4D7C24] text-xs font-black text-white shadow-md shadow-[#4D7C24]/20 border-2 border-white">
                        2
                      </span>
                      
                      {/* Custom SVG Illustration: Friendly counsellor portrait with tablet/matching */}
                      <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="text-[#243B2A]">
                        {/* Background subtle cloud shape */}
                        <path d="M18 42 C16 32, 24 24, 34 24 C44 24, 52 32, 50 42 Z" fill="#E5EFD9" />
                        
                        {/* Head & Hair */}
                        <circle cx="34" cy="26" r="8" fill="#FFFFFF" stroke="#243B2A" strokeWidth="2" />
                        <path d="M26 26 C26 20, 42 20, 42 26 C42 28, 40 33, 38 34 H30 C28 33, 26 28, 26 26 Z" fill="#243B2A" />
                        
                        {/* Shoulders & Jacket */}
                        <path d="M22 52 C22 43, 26 39, 34 39 C42 39, 46 43, 46 52" stroke="#243B2A" strokeWidth="2" strokeLinecap="round" />
                        {/* Lapels */}
                        <path d="M30 39 L34 46 L38 39" stroke="#4D7C24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M28 44 L34 52 L40 44" stroke="#4D7C24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#243B2A] tracking-tight">
                    Step 2: Match With a Counsellor
                  </h3>
                  <div className="mt-2.5 h-0.5 w-8 rounded-full bg-[#4D7C24]" />

                  <p className="mt-4 text-sm leading-relaxed text-[#626D5E]">
                    We pair you with a counsellor suited to your concern, preferred language, and schedule.
                  </p>
                </div>
              </li>

              {/* Step 3: Attend a Session */}
              <li data-journey-step="2" className="flex flex-col items-center text-center group">
                <div className="w-full rounded-3xl bg-white/70 backdrop-blur-xs p-6 pt-0 border border-[#243B2A]/6 shadow-sm shadow-[#243B2A]/3 flex flex-col items-center min-h-[360px] hover:border-[#4D7C24]/30 hover:bg-white transition-all duration-300">
                  <div className="relative -mt-10 mb-6 flex items-center justify-center">
                    <div data-journey-illustration className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#EDF3E7] shadow-inner group-hover:scale-105 transition-transform duration-300 border border-[#FAF9F4]">
                      <span data-journey-badge className="absolute -left-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#4D7C24] text-xs font-black text-white shadow-md shadow-[#4D7C24]/20 border-2 border-white">
                        3
                      </span>
                      
                      {/* Custom SVG Illustration: Therapy room armchair, plant, and video bubble */}
                      <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="text-[#243B2A]">
                        {/* Comfortable Armchair */}
                        <path d="M19 36 C19 32, 22 30, 26 30 H32 C36 30, 39 32, 39 36 V44 H19 V36 Z" fill="#FFFFFF" stroke="#243B2A" strokeWidth="2" />
                        <path d="M17 38 C17 36, 18 35, 20 35 H22 V45 H19 C17.9 45, 17 44.1, 17 43 V38 Z" fill="#E5EFD9" stroke="#243B2A" strokeWidth="1.8" />
                        <path d="M41 38 C41 36, 40 35, 38 35 H36 V45 H39 C40.1 45, 41 44.1, 41 43 V38 Z" fill="#E5EFD9" stroke="#243B2A" strokeWidth="1.8" />
                        {/* Legs */}
                        <line x1="21" y1="44" x2="19" y2="50" stroke="#243B2A" strokeWidth="2" strokeLinecap="round" />
                        <line x1="37" y1="44" x2="39" y2="50" stroke="#243B2A" strokeWidth="2" strokeLinecap="round" />

                        {/* Indoor potted plant */}
                        <path d="M45 44 H51 L50 50 H46 Z" fill="#A9C186" stroke="#243B2A" strokeWidth="1.5" />
                        <path d="M48 44 C45 40, 44 34, 48 32 C52 34, 51 40, 48 44 Z" fill="#4D7C24" />

                        {/* Speech / Video consultation bubble */}
                        <circle cx="48" cy="22" r="9" fill="#FFFFFF" stroke="#243B2A" strokeWidth="1.8" />
                        <path d="M44 26 L42 29 L46 27 Z" fill="#FFFFFF" stroke="#243B2A" strokeWidth="1.8" />
                        {/* Small camera icon inside */}
                        <rect x="44" y="19" width="6" height="6" rx="1.5" fill="#4D7C24" />
                        <path d="M50 20.5 L53 19 V25 L50 23.5 Z" fill="#4D7C24" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#243B2A] tracking-tight">
                    Step 3: Attend a Session
                  </h3>
                  <div className="mt-2.5 h-0.5 w-8 rounded-full bg-[#4D7C24]" />

                  <p className="mt-4 text-sm leading-relaxed text-[#626D5E]">
                    Meet online or in person. The first session is about comfort, clarity, and your goals.
                  </p>
                </div>
              </li>

              {/* Step 4: Continue Your Growth */}
              <li data-journey-step="3" className="flex flex-col items-center text-center group">
                <div className="w-full rounded-3xl bg-white/70 backdrop-blur-xs p-6 pt-0 border border-[#243B2A]/6 shadow-sm shadow-[#243B2A]/3 flex flex-col items-center min-h-[360px] hover:border-[#4D7C24]/30 hover:bg-white transition-all duration-300">
                  <div className="relative -mt-10 mb-6 flex items-center justify-center">
                    <div data-journey-illustration className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#EDF3E7] shadow-inner group-hover:scale-105 transition-transform duration-300 border border-[#FAF9F4]">
                      <span data-journey-badge className="absolute -left-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#4D7C24] text-xs font-black text-white shadow-md shadow-[#4D7C24]/20 border-2 border-white">
                        4
                      </span>
                      
                      {/* Custom SVG Illustration: Growing plant with flourishing heart flower and ascending growth rays */}
                      <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="text-[#243B2A]">
                        {/* Stem */}
                        <line x1="34" y1="52" x2="34" y2="34" stroke="#243B2A" strokeWidth="2.5" strokeLinecap="round" />
                        
                        {/* Symmetrical Healthy Leaves */}
                        <path d="M34 46 C24 45, 20 38, 22 30 C28 32, 33 38, 34 46 Z" fill="#5C8A33" stroke="#243B2A" strokeWidth="1.8" />
                        <path d="M34 46 C44 45, 48 38, 46 30 C40 32, 35 38, 34 46 Z" fill="#5C8A33" stroke="#243B2A" strokeWidth="1.8" />
                        
                        {/* Heart Bloom representing personal healing & growth */}
                        <path d="M34 32 C31 24, 23 25, 25 31 C27 36, 34 40, 34 40 C34 40, 41 36, 43 31 C45 25, 37 24, 34 32 Z" fill="#C9D8AD" stroke="#243B2A" strokeWidth="2" strokeLinejoin="round" />

                        {/* Ascending growth sparks */}
                        <line x1="24" y1="20" x2="22" y2="17" stroke="#4D7C24" strokeWidth="2" strokeLinecap="round" />
                        <line x1="34" y1="16" x2="34" y2="12" stroke="#4D7C24" strokeWidth="2" strokeLinecap="round" />
                        <line x1="44" y1="20" x2="46" y2="17" stroke="#4D7C24" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#243B2A] tracking-tight">
                    Step 4: Continue Your Growth
                  </h3>
                  <div className="mt-2.5 h-0.5 w-8 rounded-full bg-[#4D7C24]" />

                  <p className="mt-4 text-sm leading-relaxed text-[#626D5E]">
                    Review progress together and build on momentum — at a pace that feels right for you.
                  </p>
                </div>
              </li>

            </ol>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section
        aria-labelledby="testimonials-title"
        className="relative isolate overflow-hidden bg-[#faf8f5] py-20 sm:py-24 lg:py-28"
      >
        {/* Soft decorative background layers — warm ivory with pale sage organic shapes & botanical leaves */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Subtle pale sage organic glow behind heading and cards */}
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-[50%] bg-[#eef4ea]/70 blur-3xl" />
          <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-[#e3eedc]/50 blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-88 w-88 rounded-full bg-[#e7f0e2]/60 blur-3xl" />

          {/* Left botanical leafy stem illustration (matching reference) */}
          <svg
            className="absolute -left-10 top-6 sm:top-12 h-64 w-64 sm:h-84 sm:w-84 md:h-96 md:w-96 text-[#6c8f62]/40"
            viewBox="0 0 240 320"
            fill="none"
          >
            {/* Main stem */}
            <path
              d="M-20 280 Q60 220 110 80 Q130 30 160 10"
              stroke="#5a7d50"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Delicate leaves */}
            <path
              d="M160 10 C140 2 110 15 118 38 C125 58 152 40 160 10 Z"
              fill="#749669"
              opacity="0.55"
            />
            <path
              d="M125 55 C90 40 65 65 85 92 C102 110 125 80 125 55 Z"
              fill="#628657"
              opacity="0.6"
            />
            <path
              d="M115 105 C145 100 170 125 155 155 C140 175 115 140 115 105 Z"
              fill="#789d6e"
              opacity="0.55"
            />
            <path
              d="M92 145 C60 145 40 180 62 205 C80 222 100 185 92 145 Z"
              fill="#5e8253"
              opacity="0.6"
            />
            <path
              d="M75 195 C105 200 125 235 105 260 C90 275 68 238 75 195 Z"
              fill="#6e9264"
              opacity="0.5"
            />
            <path
              d="M48 238 C20 250 15 290 42 305 C65 315 72 270 48 238 Z"
              fill="#789d6e"
              opacity="0.45"
            />
          </svg>

          {/* Right botanical outline leaf branch (matching reference) */}
          <svg
            className="absolute -right-8 top-4 sm:top-8 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 text-[#729468]/35"
            viewBox="0 0 240 320"
            fill="none"
          >
            {/* Elegant branch curve */}
            <path
              d="M260 10 Q190 60 150 170 Q120 250 80 320"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Delicate line leaves */}
            <path
              d="M240 25 C200 20 180 50 195 75 C210 95 240 65 240 25 Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M185 85 C150 75 135 110 150 135 C165 155 190 125 185 85 Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M170 140 C205 150 215 190 195 215 C175 235 155 195 170 140 Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M142 195 C115 190 98 230 115 255 C130 275 152 245 142 195 Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M125 255 C155 270 160 305 138 325 C120 338 105 300 125 255 Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          {/* Bottom right soft foliage */}
          <div className="absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-[#dcead6]/45 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header section matching reference precisely */}
          <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
            <p className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-[#4D7C24]">
              <span aria-hidden="true" className="h-px w-10 bg-[#A9C186] sm:w-14" />
              Real Stories
              <span aria-hidden="true" className="h-px w-10 bg-[#A9C186] sm:w-14" />
            </p>

            {/* Section heading — same Plus Jakarta Sans treatment as every other home heading */}
            <h2
              id="testimonials-title"
              className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-brand-900 sm:text-4xl sm:leading-[1.15] md:text-[2.75rem]"
            >
              Real stories of finding support{" "}
              
            </h2>

            {/* Centred, muted-green subtitle */}
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
              Shared with permission, names changed for privacy. Every journey is different — the first step isn't.
            </p>
          </div>

          {/* Testimonial 3-Card Carousel */}
          <div className="mt-12 sm:mt-14">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section
        aria-labelledby="faq-title"
        className="bg-[#F4F7EF] py-12 sm:py-14"
      >
        <div className="mx-auto max-w-[790px] px-4 sm:px-6">
          <SectionHeading
            id="faq-title"
            eyebrow="Questions, answered"
            title="Frequently asked questions"
            description="Clear answers to help you feel more confident about taking the next step."
            eyebrowLines
            titleClassName="text-[30px] font-extrabold leading-tight tracking-tight text-[#203B2B] sm:text-[40px]"
          />
          <div className="mt-8 sm:mt-9">
            <FAQAccordion items={HOME_FAQS} variant="home" />
          </div>
          <p className="mt-5 text-center text-sm text-[#69776B]">
            Still unsure?{" "}
            <Link
              to="/contact"
              className="font-bold text-[#36591B] underline-offset-4 hover:underline"
            >
              Ask us directly
            </Link>{" "}
            — no question is too small.
          </p>
        </div>
      </section>

      {/* 9. Final CTA */}
      <CTASection
        title="Take the first step toward feeling better."
        text="Tell us what's going on and we'll help you find the service and counsellor that fit — or talk it through on a free enquiry call first."
        primaryLabel="Book a Session"
        primaryTo="/contact"
        secondaryLabel="Make an enquiry"
        secondaryTo="/contact"
      />
    </>
  );
}
