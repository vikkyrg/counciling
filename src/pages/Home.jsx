import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
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
  STATS,
  TRUST_INDICATORS,
  WHY_CHOOSE_US,
  HOW_IT_WORKS,
} from "../data/content.js";
import { HOME_FAQS } from "../data/faqs.js";
import heroImg from "../assets/hero-flowing.png";
import mobileHeroImg from "../assets/mobile.png";
import whoWeAreImg from "../assets/who-we-are-session.jpg";

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

function AnimatedCounter({ end, duration = 2000, isVisible, shouldReduceMotion }) {
  const [displayValue, setDisplayValue] = useState(() => (shouldReduceMotion ? end : 0));
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(end);
      return undefined;
    }

    if (!isVisible) {
      return undefined;
    }

    // EaseOutExpo: extremely smooth deceleration giving a luxury, natural feel
    const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const current = Math.round(easedProgress * end);
      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(end);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, isVisible, shouldReduceMotion]);

  return <>{displayValue.toLocaleString()}</>;
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [playHeroEntrance, setPlayHeroEntrance] = useState(
    () => !heroEntrancePlayed
  );
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const whoWeAreRef = useRef(null);
  const [whoWeAreStarted, setWhoWeAreStarted] = useState(false);
  const journeyRef = useRef(null);
  const [journeyStarted, setJourneyStarted] = useState(false);

  // Single unified Framer Motion timeline variants (with graceful fallback for reduced motion)
  // No mouse coordinates, no spring shaking, perfectly stationary during mouse movement
  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  // 1. Counselling Badge: Soft fade and gentle upward glide
  const badgeVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // 2. Headline: Clean line-by-line clipping mask reveals
  const headlineLineVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : "100%",
    },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // 3. Description: Soft fade with minimal upward entrance
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // 4. Action Buttons: Refined stagger entrance
  const buttonGroupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const buttonItemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // 5. Trust Indicators: Quiet fade-in at the end
  const trustGroupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const trustItemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  useEffect(() => {
    if (playHeroEntrance) {
      heroEntrancePlayed = true;
    }
  }, [playHeroEntrance]);

  useEffect(() => {
    const statsEl = statsRef.current;
    if (
      !statsEl ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setStatsStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStatsStarted(true);
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" },
    );
    observer.observe(statsEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = whoWeAreRef.current;
    if (
      !el ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setWhoWeAreStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setWhoWeAreStarted(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

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

      {/* 1. Hero Section — Responsive Architecture:
          • Desktop / Tablet (sm+): Full-bleed therapy landscape background with horizontal gradient, text on left, woman crisp on right.
          • Mobile (<sm): Dedicated vertical composition with clean readable content section above, followed by a dedicated portrait photograph card showcasing the woman, mountain vista, and tea table without interference. */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-[#FAF9F4] flex flex-col justify-between min-h-[calc(100vh-3.5rem)] min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100vh-5rem)] sm:min-h-[calc(100svh-5rem)] sm:flex-row sm:items-center"
      >
        {/* =========================================================================
            BACKGROUND LAYERS — Full-bleed on mobile and desktop
            ========================================================================= */}
        <div className="absolute inset-0 z-0 origin-center overflow-hidden">
          <motion.div
            className="h-full w-full"
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              opacity: { duration: shouldReduceMotion ? 0.01 : 0.9, ease: "easeOut" },
            }}
          >
            {/* Desktop Background */}
            <img
              src={heroImg}
              alt=""
              width="1440"
              height="810"
              className="hidden sm:block h-full w-full object-cover sm:object-[70%_center] md:object-[64%_center] lg:object-[54%_center] xl:object-[50%_center] select-none hero-bg-ken-burns"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            {/* Mobile Dedicated Portrait Background */}
            <img
              src={mobileHeroImg}
              alt="A peaceful person sitting comfortably by a panoramic window overlooking misty green rolling mountains with sunlit forest, tea, and indoor plants"
              width="720"
              height="1280"
              className="block sm:hidden h-full w-full object-cover object-[80%_25%] select-none hero-bg-ken-burns-mobile"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Soft Cream-to-transparent overlays — Desktop & Mobile */}
        {/* Desktop horizontal gradient overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden sm:block bg-gradient-to-r from-[#FAF9F4]/95 via-[#FAF9F4]/80 via-35% sm:via-[#FAF9F4]/60 sm:via-45% to-transparent to-75% lg:to-65%"
        />
        {/* Mobile vertical gradient overlay: subtle transparent cream only behind top text so woman, face, hair, and landscape remain completely clear and vibrant */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] block sm:hidden bg-gradient-to-b from-[#FAF9F4]/85 via-[#FAF9F4]/40 via-35% to-transparent to-55%"
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden sm:block bg-gradient-to-tr from-[#FAF9F4]/30 via-transparent to-[#F1E5C4]/20 mix-blend-soft-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
        />

        {/* =========================================================================
            MAIN HERO CONTENT WRAPPER
            ========================================================================= */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 pb-7 sm:py-16 lg:py-20 flex-1 flex flex-col justify-between">
          <motion.div
            className="max-w-xl min-w-0 lg:max-w-xl xl:max-w-2xl flex-1 flex flex-col justify-between"
            variants={heroContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top content group */}
            <div>
              {/* 1. Counselling Badge */}
              <motion.div variants={badgeVariants}>
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#E2EDD5]/90 backdrop-blur-md px-3.5 py-1.5 sm:px-4 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#2D4D1B] shadow-2xs border border-[#4D7C24]/15">
                  <Icon name="leaf" className="h-3.5 w-3.5 shrink-0 text-[#4D7C24]" />
                  <span className="truncate">PROFESSIONAL COUNSELLING &amp; THERAPY</span>
                </div>
              </motion.div>

              {/* 2. Main Heading: Editorial line-by-line clipping reveal */}
              <h1
                id="hero-title"
                className="mt-3.5 sm:mt-6 text-[35px] sm:text-5xl lg:text-[3.65rem] xl:text-[4rem] leading-[1.08] sm:leading-[1.08] font-extrabold tracking-tight text-[#162E20]"
              >
                {/* Line 1: "A safe space to talk," on desktop / "A safe space to" on mobile */}
                <span className="block overflow-hidden pb-0.5">
                  <motion.span
                    variants={headlineLineVariants}
                    className="block"
                  >
                    A safe space to<span className="hidden sm:inline"> talk,</span>
                  </motion.span>
                </span>

                {/* Line 2 on Mobile: "talk," */}
                <span className="block overflow-hidden pb-0.5 sm:hidden">
                  <motion.span
                    variants={headlineLineVariants}
                    className="block"
                  >
                    talk,
                  </motion.span>
                </span>

                {/* Line 2 on Desktop / Line 3 on Mobile: "heal, and grow." in botanical green */}
                <span className="block overflow-hidden pt-0.5 text-[#3D7A28]">
                  <motion.span
                    variants={headlineLineVariants}
                    className="block"
                  >
                    heal, and grow.
                  </motion.span>
                </span>
              </h1>

              {/* 3. Description: Clean, unclipped text with maximum readability */}
              <motion.p
                variants={descriptionVariants}
                className="mt-3 sm:mt-6 max-w-lg text-[14.5px] sm:text-lg leading-[1.5] text-[#3A453A] font-medium"
              >
                Confidential, compassionate, professional counselling for whatever
                you&apos;re carrying. Certified counsellors, judgement-free listening,
                and care tailored to your life — online or in person.
              </motion.p>
            </div>

            {/* Bottom actions & indicators group */}
            <div className="pt-6 sm:pt-0">
              {/* 4. Action Buttons with Deliberate, Restrained Hover / Arrow Motion Only */}
              <motion.div
                variants={buttonGroupVariants}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
              >
              {/* Primary Action Button: "Book a Session" */}
              <motion.div
                variants={buttonItemVariants}
                className="w-full sm:w-auto inline-block rounded-full"
              >
                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -2,
                          boxShadow: "0 10px 24px -4px rgba(61, 122, 40, 0.35)",
                          transition: { duration: 0.2, ease: "easeOut" },
                        }
                  }
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="rounded-full w-full"
                >
                  <Button
                    to="/contact"
                    size="lg"
                    className="w-full sm:w-auto group justify-center bg-[#467A26] hover:bg-[#38641E] text-white shadow-md shadow-[#467A26]/20 font-bold px-7 py-3.5 rounded-full transition-colors duration-200"
                  >
                    <span>Book a Session</span>
                    <span className="inline-flex items-center transition-transform duration-200 ease-out group-hover:translate-x-1">
                      <Icon name="arrow-right" className="h-4 w-4" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Secondary Action Button: "Explore Therapy" */}
              <motion.div
                variants={buttonItemVariants}
                className="w-full sm:w-auto inline-block rounded-full"
              >
                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -2,
                          boxShadow: "0 8px 20px -4px rgba(36, 59, 42, 0.12)",
                          transition: { duration: 0.2, ease: "easeOut" },
                        }
                  }
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="rounded-full w-full"
                >
                  <Button
                    to="/therapy"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto justify-center bg-white/95 backdrop-blur-xs text-[#22402A] border border-[#22402A]/25 hover:border-[#22402A] hover:bg-[#EDF3E7]/80 font-bold px-7 py-3.5 rounded-full shadow-2xs transition-all duration-200"
                  >
                    Explore Therapy
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 5. Trust / Reassurance Row: Matching reference pill card layout on mobile with subtle translucent backing */}
            <motion.div
              variants={trustGroupVariants}
              className="mt-4 sm:mt-10 grid grid-cols-3 divide-x divide-gray-200/60 sm:divide-x-0 sm:flex sm:flex-wrap items-center sm:gap-x-8 text-[11px] sm:text-xs text-[#465044] font-medium bg-white/70 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none rounded-2xl py-2 px-1 sm:p-0 border border-white/50 sm:border-0 shadow-2xs sm:shadow-none"
            >
              <motion.div variants={trustItemVariants} className="flex items-center justify-center sm:justify-start gap-1.5 px-1 sm:px-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EBF3E3] text-[#3D7A28]">
                  <Icon name="chat" className="h-3.5 w-3.5" />
                </span>
                <span className="leading-tight text-center sm:text-left font-semibold text-[#30382E]">Free initial enquiry</span>
              </motion.div>
              <motion.div variants={trustItemVariants} className="flex items-center justify-center sm:justify-start gap-1.5 px-1 sm:px-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EBF3E3] text-[#3D7A28]">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                </span>
                <span className="leading-tight text-center sm:text-left font-semibold text-[#30382E]">Replies within 1 working day</span>
              </motion.div>
              <motion.div variants={trustItemVariants} className="flex items-center justify-center sm:justify-start gap-1.5 px-1 sm:px-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EBF3E3] text-[#3D7A28]">
                  <Icon name="shield" className="h-3.5 w-3.5" />
                </span>
                <span className="leading-tight text-center sm:text-left font-semibold text-[#30382E]">Fully confidential</span>
              </motion.div>
            </motion.div>
          </div>

          </motion.div>
        </div>
      </section>

      {/* 2. Premium Animated Statistics Section */}
      <section
        ref={statsRef}
        data-stats-section
        aria-labelledby="stats-title"
        className="relative z-10 border-y border-[#243B2A]/10 bg-[#FAF9F4] py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="stats-title" className="sr-only">
            Our Journey &amp; Clinical Impact
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-10 lg:gap-y-0 lg:divide-x lg:divide-[#243B2A]/10">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={statsStarted ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.6,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center text-center px-2 sm:px-4 lg:px-6 group"
              >
                {/* Minimal outline icon badge (48-52px rounded-square badge, soft muted pale sage green) */}
                <div className="mb-3 flex h-12 w-12 sm:h-[52px] sm:w-[52px] items-center justify-center rounded-[18px] bg-[#EBF2E4] text-[#243B2A] border border-[#3E6B20]/15 shadow-2xs group-hover:scale-105 group-hover:bg-[#E2EDD8] transition-all duration-300">
                  <Icon name={stat.icon} className="h-6 w-6 sm:h-7 sm:w-7 text-[#243B2A]" />
                </div>

                {/* Prominent Number Counter (refined, well-balanced sizing) */}
                <div className="flex items-baseline justify-center font-extrabold tracking-tight text-[#162E20] text-2xl sm:text-3xl md:text-[2.25rem] lg:text-[2.5rem] leading-none">
                  <span>
                    <AnimatedCounter
                      end={stat.value}
                      duration={2000}
                      isVisible={statsStarted}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  </span>
                  <span className="text-[#4D7C24] font-bold ml-1 text-lg sm:text-xl lg:text-2xl select-none">
                    {stat.suffix}
                  </span>
                </div>

                {/* Primary Metric Label */}
                <div className="mt-2 text-[13px] sm:text-[14.5px] font-bold text-[#1E3B27] tracking-tight leading-snug">
                  {stat.label}
                </div>

                {/* Supportive Subtext */}
                <div className="mt-0.5 text-xs text-[#5D6D5B] font-normal leading-relaxed max-w-[185px]">
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 WHO ARE WE Section */}
      <section
        ref={whoWeAreRef}
        data-who-we-are
        aria-labelledby="who-we-are-title"
        className="relative bg-[#FAF9F5] py-16 sm:py-20 lg:py-24 border-b border-[#243B2A]/10 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            
            {/* Left Column — Content (~48% width) */}
            <motion.div
              initial="hidden"
              animate={whoWeAreStarted ? "visible" : "hidden"}
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center"
            >
              
              {/* 1. Eyebrow Label: 700ms duration, 150ms initial delay */}
              <motion.div
                variants={{
                  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: shouldReduceMotion ? 0.01 : 0.7,
                      delay: shouldReduceMotion ? 0 : 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="flex items-center gap-3"
              >
                <span className="h-[2px] w-8 sm:w-10 rounded-full bg-[#46733B]" aria-hidden="true" />
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#46733B]">
                  WHO ARE WE
                </span>
              </motion.div>

              {/* 2. Bold Dark Forest Green Heading: 850ms duration, 350ms delay */}
              <motion.h2
                id="who-we-are-title"
                variants={{
                  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 22 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: shouldReduceMotion ? 0.01 : 0.85,
                      delay: shouldReduceMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="mt-4 text-3xl font-extrabold tracking-tight text-[#173322] sm:text-4xl lg:text-[42px] lg:leading-[1.18]"
              >
                A Safe Space to Understand Yourself and Grow.
              </motion.h2>

              {/* 3. Three Well-Spaced Paragraphs: 750ms each, staggered by ~200ms (550ms, 750ms, 950ms) */}
              <div className="mt-6 space-y-4 text-[15px] sm:text-[16px] leading-[1.68] text-[#556655]">
                <motion.p
                  variants={{
                    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0.01 : 0.75,
                        delay: shouldReduceMotion ? 0 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  At The Master Mind, we believe everyone deserves a safe, supportive space to explore their thoughts, understand their emotions, and discover their potential.
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0.01 : 0.75,
                        delay: shouldReduceMotion ? 0 : 0.75,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  Our approach focuses on compassionate guidance, personalised support, and practical strategies that help individuals navigate life&apos;s challenges with greater confidence and clarity.
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0.01 : 0.75,
                        delay: shouldReduceMotion ? 0 : 0.95,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  Whether you are seeking emotional support, personal development, life skills training, or career guidance, we aim to help you take meaningful steps towards a healthier, more balanced future.
                </motion.p>
              </div>

              {/* 4. Action Buttons: 700ms duration, ~1,150ms delay */}
              <motion.div
                variants={{
                  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: shouldReduceMotion ? 0.01 : 0.7,
                      delay: shouldReduceMotion ? 0 : 1.15,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <Link
                  to="/about#our-approach"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#3D6E35] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm shadow-[#3D6E35]/25 hover:bg-[#34622C] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D6E35]"
                >
                  <span>Discover Our Approach</span>
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-[#3D6E35]/40 bg-transparent px-6 py-3.5 text-sm sm:text-base font-semibold text-[#224424] hover:bg-[#E8F0E2] hover:border-[#3D6E35] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D6E35]"
                >
                  About Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column — Image with Backing Panel and Floating Card (~52% width) */}
            <div className="lg:col-span-6 xl:col-span-6 relative pb-6 sm:pb-8 lg:pb-0">
              <div className="relative mx-auto w-full max-w-[580px] lg:max-w-none">
                
                {/* Offset Pale Sage-Green Backing Panel */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 }}
                  animate={whoWeAreStarted ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.85,
                    ease: [0.22, 1, 0.36, 1],
                    delay: shouldReduceMotion ? 0 : 0.15,
                  }}
                  className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rounded-[26px] sm:rounded-[32px] bg-[#E3EBDC] -rotate-1 border border-[#D0DFC6]/70 pointer-events-none"
                />

                {/* Main Counselling Image Container with smooth clip-path: 1,300ms duration, 250ms delay */}
                <motion.div
                  initial={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    clipPath: shouldReduceMotion ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0% round 26px)",
                  }}
                  animate={
                    whoWeAreStarted
                      ? {
                          opacity: 1,
                          clipPath: "inset(0% 0% 0% 0% round 26px)",
                        }
                      : {}
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 1.3,
                    ease: [0.22, 1, 0.36, 1],
                    delay: shouldReduceMotion ? 0 : 0.25,
                  }}
                  className="relative rounded-[22px] sm:rounded-[28px] bg-white p-2.5 sm:p-3 shadow-[0_12px_36px_rgba(24,42,27,0.08)] border border-[#E1EAD8]"
                >
                  <img
                    src={whoWeAreImg}
                    alt="Compassionate counsellor speaking warmly with a client in a bright, modern therapy room"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[16px] sm:rounded-[22px] object-cover object-center"
                  />
                </motion.div>

                {/* 6. Floating Dark Forest Green Information Card: 850ms duration, 800ms delay
                    Placed OUTSIDE the clip-path container so it is NEVER clipped at the bottom or sides */}
                <motion.div
                  initial={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    y: shouldReduceMotion ? 0 : 18,
                  }}
                  animate={
                    whoWeAreStarted
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.85,
                    ease: [0.22, 1, 0.36, 1],
                    delay: shouldReduceMotion ? 0 : 0.8,
                  }}
                  className="absolute bottom-1 left-2 sm:bottom-2 sm:left-2 z-30 flex items-center gap-3.5 sm:gap-4 rounded-2xl bg-[#3E7036] px-4 py-3 sm:px-5 sm:py-3.5 text-white shadow-2xl shadow-[#142A12]/30 border border-white/20 select-none"
                >
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center text-white">
                    <Icon name="communitySupport" className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div className="flex flex-col text-left leading-tight tracking-wider text-[11px] sm:text-[12px] font-extrabold uppercase text-white space-y-0.5">
                    <span>SUPPORTING</span>
                    <span>BRIGHTER</span>
                    <span>TOMORROWS</span>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
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
            className="mt-12 sm:mt-14 grid gap-x-6 sm:gap-x-7 lg:gap-x-8 gap-y-6 sm:gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
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
