import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ServiceDetailCard from "../components/ServiceDetailCard.jsx";
import FAQAccordion from "../components/FAQAccordion.jsx";
import Icon from "../components/Icon.jsx";
import Button from "../components/Button.jsx";
import { DETAILED_SERVICES } from "../data/services.js";
import {
  THERAPY_ISSUES,
  THERAPY_PROCESS,
  SESSION_FORMATS,
  PRICING,
} from "../data/content.js";
import { THERAPY_FAQS } from "../data/faqs.js";

const THERAPY_ISSUE_ICONS = {
  Anxiety: "brain",
  Depression: "mood",
  Trauma: "shield",
  Grief: "heart",
  Anger: "bolt",
  "OCD-related concerns": "pattern",
  Panic: "alert",
  Loneliness: "person",
  "Academic pressure": "cap",
  "Workplace stress": "briefcase",
  "Relationship difficulties": "users",
  "Identity concerns": "badge",
  "Body image": "chat",
  "Life transitions": "spark",
};

export default function Therapy() {
  return (
    <>
      <Seo
        title="Therapy and Counselling Services"
        description="Explore therapy services: individual, couples, family, teen, career, stress and burnout support, self-esteem work, and online counselling."
      />

      {/* 1. Page hero */}
      <section
        aria-labelledby="therapy-hero-title"
        className="relative isolate flex min-h-[320px] items-center overflow-hidden bg-[#FAF9F5] sm:min-h-[360px] lg:min-h-[390px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(ellipse_at_50%_48%,#FFFDF8_0%,rgba(250,249,245,0.96)_48%,rgba(238,243,231,0.6)_100%)]"
        >
          <div className="absolute -left-[11%] top-[-58%] h-[88%] w-[42%] rounded-[50%] bg-[#EAF0E2]/65 blur-[1px]" />
          <div className="absolute -right-[8%] top-[4%] h-[70%] w-[28%] rounded-[50%] bg-[#E9EFDF]/65" />
          <div className="absolute -left-[12%] bottom-[-67%] h-[100%] w-[68%] rounded-[48%] bg-[#E7EDDD]/75" />
          <div className="absolute -right-[12%] bottom-[-74%] h-[104%] w-[56%] rounded-[48%] bg-[#E8EEDF]/70" />
          <div className="absolute left-[5%] top-[47%] h-32 w-32 rounded-full border border-[#D6E1CA]/70 sm:h-44 sm:w-44" />
          <div className="absolute right-[3%] top-[-17%] h-44 w-44 rounded-full border border-[#829966]/65 sm:h-64 sm:w-64" />
          <div className="absolute right-[3%] top-[47%] h-16 w-16 rounded-full bg-[#C5D5B7]/65 sm:h-20 sm:w-20" />
          <div className="absolute left-[8%] top-[16%] h-24 w-24 rounded-full bg-[#E8D9B5]/65 sm:h-28 sm:w-28" />
          <div className="absolute right-[2%] top-[46%] h-20 w-24 bg-[radial-gradient(circle,#AFC39D_1.8px,transparent_2px)] bg-[length:16px_16px] opacity-75" />
          <svg
            className="absolute inset-0 h-full w-full text-[#C2D4B5]/80"
            viewBox="0 0 1680 485"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M-40 160C170 85 195 385 470 390S685 280 830 310M-30 455C210 345 280 520 505 500S730 475 840 525M900 515C1120 430 1240 390 1390 425S1570 450 1710 350M1140-30C1270 115 1400 45 1510-5S1620-25 1710 20"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M-20 100C180 45 205 325 440 345S665 260 800 275M-30 430C180 335 285 485 485 475"
              stroke="#E4D5AA"
              strokeWidth="1.5"
              opacity=".8"
            />
          </svg>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-12 text-center sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <p className="motion-safe:animate-fade-up text-xs font-bold uppercase tracking-[0.24em] text-[#4B7F24] sm:text-[15px]">
            Our services
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-px w-14 bg-[#6E9853]"
          />
          <h1
            id="therapy-hero-title"
            className="motion-safe:animate-fade-up mx-auto mt-7 max-w-[1200px] text-[38px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#102F27] sm:text-[54px] lg:text-[64px]"
            style={{ animationDelay: "80ms" }}
          >
            Therapy and Counselling Services
          </h1>
          <p
            className="motion-safe:animate-fade-up mx-auto mt-5 max-w-[820px] text-base leading-[1.6] text-[#69786F] sm:mt-6 sm:text-[20px]"
            style={{ animationDelay: "160ms" }}
          >
            Whatever you're facing, there's a format that fits. Browse our
            services, then book directly — we'll match you with the right
            counsellor.
          </p>
        </div>
      </section>

      {/* 2 & 3. Service categories with details */}
      <section
        aria-labelledby="services-title"
        className="relative isolate overflow-hidden bg-[#FAF9F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-24 -z-10 h-72 w-72 rounded-full bg-[#F1F4EA]" />
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          title="Find the kind of support you need"
          description="Each service includes who it's for, what you'll work on, and what clients typically gain from it."
        />
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {DETAILED_SERVICES.map((service, index) => (
            <ServiceDetailCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* 4. Issues we can help with */}
      <section
        aria-labelledby="issues-title"
        className="relative isolate overflow-hidden border-y border-[#E8EDE2] bg-[#F7F8F2] py-16 sm:py-[76px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-28 -top-36 h-[390px] w-[390px] rounded-full bg-[#EDF2E7]/75" />
          <div className="absolute -left-24 -top-32 h-[350px] w-[350px] rounded-full border border-[#DCE6D3]/75" />
          <div className="absolute -right-32 -bottom-56 h-[420px] w-[420px] rounded-full bg-[#E8EFE0]/70" />
          <div className="absolute -right-24 -bottom-52 h-[350px] w-[350px] rounded-full border border-[#DCE6D3]/70" />
          <span className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-[#C9D8BC]/80" />
          <span className="absolute left-[11%] top-[24%] h-2 w-2 rounded-full bg-[#C9D8BC]/80" />
          <span className="absolute right-[10%] bottom-[26%] h-2 w-2 rounded-full bg-[#C9D8BC]/80" />
          <span className="absolute right-[13%] bottom-[20%] h-2 w-2 rounded-full bg-[#C9D8BC]/80" />
          <span className="absolute right-[19%] top-[17%] h-12 w-12 rounded-full bg-[#E8D9B5]/65" />
          <span className="absolute left-[16%] bottom-[20%] h-10 w-10 rounded-full bg-[#DCE6D3]/65" />
          <svg
            className="absolute inset-0 h-full w-full text-[#D7E3CD]/75"
            viewBox="0 0 1600 540"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M-40 300C170 300 175 500 390 510S590 500 720 560M1280-30C1360 100 1460 120 1640 150"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-[1120px] px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4B7F24] sm:text-[13px]">
            Support, without a diagnosis
          </p>
          <h2
            id="issues-title"
            className="mt-4 text-[34px] font-extrabold leading-tight tracking-[-0.03em] text-[#203B2B] sm:text-[46px]"
          >
            Issues We Can Help With
          </h2>
          <p className="mx-auto mt-4 max-w-[790px] text-base leading-relaxed text-[#687568] sm:text-[18px]">
            You don't need a diagnosis to deserve support. These are concerns we
            work with every week.
          </p>
          <ul className="mx-auto mt-9 flex max-w-[1100px] flex-wrap justify-center gap-3.5 sm:mt-10 sm:gap-4">
            {THERAPY_ISSUES.map((issue, index) => (
              <li key={issue}>
                <span className="inline-flex min-h-[50px] items-center gap-3 rounded-full border border-[#E4EBDD] bg-white/95 px-4 py-2.5 text-sm font-semibold text-[#203B2B] shadow-[0_5px_14px_rgba(61,90,45,0.06)] sm:px-[18px] sm:text-[16px]">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      index % 2 === 0
                        ? "bg-[#E5F0D9] text-[#4B7F24]"
                        : "bg-[#F3EBD9] text-[#92763B]"
                    }`}
                  >
                    <Icon
                      name={THERAPY_ISSUE_ICONS[issue] || "spark"}
                      className="h-[22px] w-[22px]"
                    />
                  </span>
                  {issue}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Therapy process */}
      <section
        aria-labelledby="process-title"
        className="relative isolate overflow-hidden bg-[#FAF9F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-36 -top-40 h-[440px] w-[440px] rounded-[48%] bg-[#EAF0E2]/75" />
          <div className="absolute -left-28 -top-32 h-[380px] w-[380px] rounded-full border border-[#DCE6D4]/80" />
          <div className="absolute -right-36 top-[25%] h-[430px] w-[430px] rounded-[48%] bg-[#EDF2E8]/70" />
          <div className="absolute -right-28 top-[31%] h-[360px] w-[360px] rounded-full border border-[#D8E4D0]/80" />
          <div className="absolute -bottom-[46%] left-[16%] h-[430px] w-[75%] rounded-[50%] bg-[#E9EFDF]/65" />
          <svg
            className="absolute inset-0 h-full w-full text-[#CFE0C5]/80"
            viewBox="0 0 1600 650"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M-40 70C150 40 200 240 390 250S560 160 700 185M950 145C1140 205 1310 25 1640 10M-30 540C200 445 265 630 490 610S710 560 840 620M1120 650C1320 560 1450 420 1640 385"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path d="M-20 580C180 480 280 650 500 640S700 600 800 650" stroke="#E4D5AA" strokeWidth="1.4" />
          </svg>
          <span className="absolute left-[3%] top-[11%] h-9 w-9 rounded-full bg-[#EAF0E2]" />
          <span className="absolute right-[10%] top-[17%] h-7 w-7 rounded-full bg-[#EAF0E2]" />
          <span className="absolute right-[4%] bottom-[10%] h-6 w-6 rounded-full bg-[#EDF1E7]" />
          <span className="absolute right-[5%] top-[14%] h-20 w-24 bg-[radial-gradient(circle,#B8CBAA_1.8px,transparent_2px)] bg-[length:16px_16px] opacity-70" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1480px]">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              id="process-title"
              eyebrow="What to expect"
              title="The therapy process, made clear"
              description="No mystery, no vague promises — here's exactly how therapy usually unfolds with us."
              titleClassName="text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#203B2B] sm:text-[42px] lg:text-[46px]"
            />
          </div>
          <ol
            data-reveal-stagger="220"
            className="relative mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[30px]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[8%] right-[8%] top-[148px] hidden h-[2px] bg-[#D1DFC8] lg:block"
            />
            {THERAPY_PROCESS.map((item) => (
              <li
                key={item.step}
                className="relative min-h-[205px] rounded-[22px] border border-[#DDE8D3] bg-white/95 p-4 shadow-[0_7px_20px_rgba(43,69,41,0.06)] sm:min-h-[215px] sm:p-5 lg:min-h-[220px]"
              >
                <span
                  aria-hidden="true"
                    className="absolute left-[37px] top-[29px] h-8 w-8 rounded-full bg-[#EAF1E3]"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#4B7F24] text-sm font-extrabold text-white shadow-[0_3px_8px_rgba(54,89,27,0.15)] sm:left-4 sm:top-4"
                >
                  {item.step}
                </span>
                <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#F0F5E9] text-[#4B7F24]">
                  <Icon
                    name={["chat", "badge", "users", "spark"][item.step - 1]}
                    className="h-8 w-8"
                  />
                </div>
                <h3 className="mt-3 text-base font-bold leading-snug text-[#203B2B] sm:text-[17px]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-[1.45] text-[#687568]">
                  {item.text}
                </p>
                {item.step < THERAPY_PROCESS.length && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[20px] top-[99px] z-20 hidden h-5 w-5 items-center justify-center rounded-full border-[5px] border-[#BFD2B4] bg-[#F4F7EF] lg:flex"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Session formats */}
      <section aria-labelledby="formats-title" className="relative isolate overflow-hidden bg-[#F1F4EA] py-16 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-[-140px] -z-10 h-72 w-72 rounded-full border border-[#D8E3CF]/80" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="formats-title"
            eyebrow="Formats"
            title="Sessions that fit your life"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {SESSION_FORMATS.map((format, index) => (
              <li
                key={format.title}
                className={`rounded-[22px] border p-7 text-center shadow-[0_5px_18px_rgba(32,59,43,0.045)] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none sm:p-8 ${
                  index === 1
                    ? "border-[#D8E3CF] bg-white"
                    : "border-[#E2E9DC] bg-[#FAF9F5]"
                }`}
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF1E3] text-[#4B7F24]">
                  <Icon name={format.icon} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#203B2B]">
                  {format.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#596458]">
                  {format.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Pricing placeholder */}
      <section aria-labelledby="pricing-title" className="relative isolate overflow-hidden bg-[#FAF9F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-[-150px] -z-10 h-80 w-80 rounded-full bg-[#F0F4E9]" />
        <SectionHeading
          id="pricing-title"
          eyebrow="Transparent pricing"
          title="Session fees at a glance"
          description="These are placeholder rates so you can plan ahead. Final pricing and availability are always confirmed during booking."
        />
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {PRICING.map((tier, index) => (
            <article
              key={tier.name}
              className={`flex flex-col rounded-[22px] border p-7 shadow-[0_5px_18px_rgba(32,59,43,0.05)] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none sm:p-8 ${
                tier.featured
                  ? "border-[#203B2B] bg-[#203B2B] text-white shadow-[0_12px_26px_rgba(32,59,43,0.16)]"
                  : "border-[#DDE8D3] bg-white"
              }`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <h3
                className={`text-sm font-bold uppercase tracking-wider ${
                  tier.featured ? "text-[#EAF1E3]" : "text-[#36591B]"
                }`}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-4xl font-extrabold tracking-tight">
                {tier.price}
              </p>
              <p
                className={`mt-1 text-sm ${
                  tier.featured ? "text-[#EAF1E3]" : "text-[#596458]"
                }`}
              >
                {tier.unit}
              </p>
              <p
                className={`mt-4 text-xs font-medium ${
                  tier.featured ? "text-[#EAF1E3]" : "text-[#596458]"
                }`}
              >
                {tier.note}
              </p>
              <div className="mt-6">
                <Button
                  to="/contact"
                  size="sm"
                  variant={tier.featured ? "light" : "secondary"}
                  className="w-full"
                >
                  Confirm Availability
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. Ethical disclaimer */}
      <section aria-label="Important ethical notice" className="bg-[#FAF9F5] px-4 pb-12 sm:px-6 lg:px-8">
        <div
          role="note"
          className="mx-auto flex max-w-7xl items-start gap-4 rounded-[20px] border border-[#E8E5D9] bg-[#F5F3EB] p-5 sm:p-6"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8D9B5] text-[#685C3C]">
            <Icon name="alert" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-[#3D493D]">
              Please note: what counselling is — and isn't
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[#596458]">
              Counselling is not a replacement for emergency medical or
              psychiatric care. If you are in crisis or considering harming
              yourself, contact emergency services or a crisis helpline
              immediately. We can work alongside your doctor or psychiatrist
              when appropriate.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section aria-labelledby="therapy-faq-title" className="relative isolate overflow-hidden bg-[#EAF1E3] py-16 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-[-100px] -z-10 h-72 w-72 rounded-full border border-[#D6E1CC]/70" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="therapy-faq-title" eyebrow="Common questions" title="Therapy questions, answered" titleClassName="text-3xl font-extrabold tracking-tight text-[#203B2B] sm:text-4xl" />
          <div className="mt-10">
            <FAQAccordion items={THERAPY_FAQS} variant="therapy" />
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="bg-[#FAF9F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[30px] bg-gradient-to-br from-[#203B2B] via-[#2D542D] to-[#4B6C2D] px-6 py-12 text-center shadow-[0_12px_32px_rgba(32,59,43,0.16)] sm:px-12 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-20 -bottom-40 -z-10 h-80 w-80 rounded-full bg-white/[0.04]" />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#DCE8D2]">A gentle first step</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Find the right support for you.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#EEF3E9]">
            Tell us what's going on and we'll recommend the service and
            counsellor that fit — or talk it through on a free enquiry call first.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/contact" variant="light" size="lg">
              Book a Session
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button to="/contact" variant="outlineLight" size="lg">
              Make an enquiry
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
