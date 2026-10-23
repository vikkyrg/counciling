import { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import TherapistCard from "../components/TherapistCard.jsx";
import Icon from "../components/Icon.jsx";
import CTASection from "../components/CTASection.jsx";
import { THERAPISTS } from "../data/therapists.js";
import { CORE_VALUES, OUR_APPROACH, WHO_WE_SERVE } from "../data/content.js";

export default function About() {
  const missionCardsRef = useRef(null);
  const [missionCardsVisible, setMissionCardsVisible] = useState(false);

  useEffect(() => {
    const cards = missionCardsRef.current;
    if (
      !cards ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    document.documentElement.classList.add("has-mission-reveal-observer");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMissionCardsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );
    observer.observe(cards);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-mission-reveal-observer");
    };
  }, []);

  return (
    <>
      <Seo
        title="About Our Counselling Practice"
        description="Meet The Master Mind team, our mission, values, and client-centred, evidence-informed approach to mental wellbeing."
      />

      {/* 1. Page hero */}
      <section
        aria-labelledby="about-title"
        className="relative isolate overflow-hidden bg-[#FAF9F5] pb-12 pt-14 sm:pb-14 sm:pt-[58px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#F0F4EA_0%,rgba(250,249,245,0)_66%)]"
        >
          <span className="absolute -left-40 top-24 h-80 w-80 rounded-full bg-[#E7EEDD]/55" />
          <span className="absolute -right-44 top-28 h-96 w-96 rounded-full bg-[#E7EEDD]/50" />
          <span className="absolute -left-24 top-20 h-64 w-64 rounded-full border border-[#D9E3D0]/70" />
          <span className="absolute -right-24 top-24 h-72 w-72 rounded-full border border-[#D9E3D0]/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1120px] px-4 text-center sm:px-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#56794A] sm:text-[13px]">
            About us
          </p>
          <h1
            id="about-title"
            className="mt-4 text-[34px] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#233B2B] sm:text-[46px]"
          >
            About Our Counselling Practice
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-[16px] leading-[1.6] text-[#707D70] sm:text-[17px]">
            We're a team of certified counsellors on a simple mission: making
            quality mental-health support feel human, safe, and easy to access.
          </p>

          {/* 2. Mission & vision */}
          <div
            ref={missionCardsRef}
            data-mission-cards
            data-mission-visible={missionCardsVisible ? "true" : undefined}
            className="mt-8 grid items-stretch gap-5 text-left sm:mt-9 lg:grid-cols-2 lg:gap-[22px]"
          >
            <article data-mission-card="mission" className="relative isolate flex h-full flex-col overflow-hidden rounded-[24px] bg-[#3F7026] p-7 shadow-[0_12px_32px_rgba(35,59,43,0.12)] sm:rounded-[26px] sm:p-9">
              <span
                aria-hidden="true"
                data-mission-decoration
                className="pointer-events-none absolute -right-12 -top-14 -z-10 h-48 w-48 rounded-full bg-white/[0.05]"
              />
              <span
                aria-hidden="true"
                data-mission-decoration
                className="pointer-events-none absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full border border-[#E8D9B5]/25"
              />
              <div className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white/[0.16] text-white">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="h-9 w-9"
                >
                  <circle cx="18" cy="22" r="11" stroke="currentColor" strokeWidth="2" />
                  <circle cx="18" cy="22" r="6" stroke="currentColor" strokeWidth="2" />
                  <circle cx="18" cy="22" r="1.5" fill="currentColor" />
                  <path d="m19 21 11-11m-6 0h6v6m-12 6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="relative z-10 mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#EDF3E7]">
                Our mission
              </p>
              <h2
                id="mission-title"
                className="relative z-10 mt-2 text-[25px] font-bold leading-[1.18] tracking-tight text-white sm:text-[29px]"
              >
                Make mental wellness understandable, accessible, and a priority
              </h2>
              <p className="relative z-10 mt-3 text-[15px] leading-[1.62] text-[#F0F4E9] sm:text-base">
                Too many people wait until crisis to seek support. We remove the
                barriers — confusion, stigma, cost opacity, and waiting lists —
                so reaching out feels as normal as seeing a doctor.
              </p>
            </article>
            <article data-mission-card="vision" className="relative isolate flex h-full flex-col overflow-hidden rounded-[24px] border border-[#DFE7D8] bg-[#FFFEFC] p-7 shadow-[0_12px_32px_rgba(35,59,43,0.07)] sm:rounded-[26px] sm:p-9">
              <span
                aria-hidden="true"
                data-mission-decoration
                className="pointer-events-none absolute -right-10 -bottom-16 -z-10 h-48 w-48 rounded-full border border-[#DDE7D4]/80"
              />
              <span
                aria-hidden="true"
                data-mission-decoration
                className="pointer-events-none absolute right-10 top-11 -z-10 h-10 w-10 rounded-full bg-[#EDF2E6]"
              />
              <div className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#EAF0E2] text-[#557A41]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="h-9 w-9"
                >
                  <path d="M4 20s5.5-9 16-9 16 9 16 9-5.5 9-16 9S4 20 4 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 4v3m0 26v3M5 5l2 2m26 26 2 2M4 20h3m26 0h3M5 35l2-2M33 7l2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <p className="relative z-10 mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#56794A]">
                Our vision
              </p>
              <h2 className="relative z-10 mt-2 text-[25px] font-bold leading-[1.18] tracking-tight text-[#233B2B] sm:text-[29px]">
                A world where asking for help is strength, not stigma
              </h2>
              <p className="relative z-10 mt-3 text-[15px] leading-[1.62] text-[#687568] sm:text-base">
                We work toward communities where emotional wellbeing is talked
                about openly at homes, schools, and workplaces — and where
                support is available before breaking points, not after.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Our story */}
      <section aria-labelledby="story-title" className="bg-surface-soft py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="story-title"
            eyebrow="Our story"
            title="Built on a belief that everyone deserves to be heard"
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p>
              The Master Mind began with a small group of counsellors who
              kept meeting the same person: someone who had struggled for
              months, felt they "didn't have a big enough problem," and almost
              never came back. We built the practice we wished existed — warm,
              professional, transparent, and unhurried.
            </p>
            <p>
              Today we support adults, teenagers, couples, students, and
              families through everything from everyday stress to deep life
              transitions. Our commitment hasn't changed: supportive care
              without judgement, at a pace that respects you.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core values */}
      <section aria-labelledby="values-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          id="values-title"
          eyebrow="What guides us"
          title="Our core values"
          description="Six principles that shape every session, every booking, and every conversation."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value) => (
            <li
              key={value.title}
              className="flex items-start gap-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-sm shadow-brand-900/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon name={value.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-brand-900">{value.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {value.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Our approach */}
      <section
        aria-labelledby="approach-title"
        className="relative isolate overflow-hidden bg-[#F3F6EE] py-16 sm:py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-56 top-[-20%] h-[120%] w-[42%] rounded-[48%] bg-[#E7EEDD]/60" />
          <div className="absolute -left-48 top-[-15%] h-[112%] w-[38%] rounded-[48%] border border-[#D6E1CC]/60" />
          <div className="absolute -right-52 bottom-[-40%] h-[100%] w-[42%] rounded-[50%] bg-[#E7EEDD]/45" />
          <div className="absolute -right-40 bottom-[-35%] h-[94%] w-[38%] rounded-[50%] border border-[#D6E1CC]/60" />
          <svg
            className="absolute inset-0 h-full w-full text-[#E8D9B5]/70"
            viewBox="0 0 1600 620"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M-40 300C180 300 170 570 430 620M1280-40C1360 110 1460 120 1640 150"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <SectionHeading
              id="approach-title"
              align="left"
              eyebrow="Our approach"
              title="How we work with you"
              description="Therapy works best when it's consistent, collaborative, and grounded. That's how we practise — every day."
              titleClassName="text-3xl font-extrabold tracking-tight text-[#203B2B] sm:text-[40px] sm:leading-[1.15]"
            />
            <div className="flex flex-col gap-4">
              {OUR_APPROACH.map((item, i) => (
                <article
                  key={item.title}
                  className="flex min-h-[94px] items-start gap-4 rounded-[26px] border border-[#E2EBDD] bg-white/95 p-5 shadow-[0_2px_6px_rgba(35,59,43,0.05)] sm:items-center sm:gap-[18px] sm:px-6 sm:py-5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4D7C24] text-sm font-extrabold text-white"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-bold leading-snug text-[#203B2B]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#687568]">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Meet the team */}
      <section aria-labelledby="team-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          id="team-title"
          eyebrow="Meet the team"
          title="The counsellors you'll be talking to"
          description="Registered, supervised professionals — each with their own specialities, so the match feels right, not random."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {THERAPISTS.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
      </section>

      {/* 7. Who we serve */}
      <section aria-labelledby="serve-title" className="bg-surface-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="serve-title"
            eyebrow="Who we serve"
            title="Support for every stage and situation"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHO_WE_SERVE.map((group) => (
              <li
                key={group.title}
                className="flex items-center gap-4 rounded-3xl border border-line bg-white p-6 shadow-sm shadow-brand-900/5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={group.icon} />
                </span>
                <div>
                  <h3 className="font-bold text-brand-900">{group.title}</h3>
                  <p className="text-sm text-muted">{group.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. CTA */}
      <CTASection
        title="Meet us first. Commit later."
        text="A short consultation call tells you who you'd work with, how sessions run, and what it costs. No pressure, no obligation."
        primaryLabel="Book a Consultation"
        primaryTo="/contact"
        secondaryLabel="See Our Services"
        secondaryTo="/therapy"
      />
    </>
  );
}
