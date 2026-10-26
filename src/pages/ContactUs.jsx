import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ContactForm from "../components/ContactForm.jsx";
import FAQAccordion from "../components/FAQAccordion.jsx";
import Icon from "../components/Icon.jsx";
import { CONTACT_CARDS, BOOKING_INFO } from "../data/content.js";
import { CONTACT_FAQS } from "../data/faqs.js";

export default function ContactUs() {
  return (
    <>
      <Seo
        title="Contact Us — We're Here to Listen"
        description="Request a counselling appointment with The Master Mind. Email, phone, WhatsApp, or the contact form — confidential replies within one working day."
      />

      {/* 1. Page hero */}
      <section
        aria-labelledby="contact-hero-title"
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
            Contact us
          </p>
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-px w-14 bg-[#6E9853]"
          />
          <h1
            id="contact-hero-title"
            className="motion-safe:animate-fade-up mx-auto mt-7 max-w-[1200px] text-[38px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#102F27] sm:text-[54px] lg:text-[64px]"
            style={{ animationDelay: "80ms" }}
          >
            We're Here to Listen
          </h1>
          <p
            className="motion-safe:animate-fade-up mx-auto mt-5 max-w-[820px] text-base leading-[1.6] text-[#69786F] sm:mt-6 sm:text-[20px]"
            style={{ animationDelay: "160ms" }}
          >
            Reaching out is the hardest part — making it count shouldn't. Choose
            whatever way feels easiest for you.
          </p>
        </div>
      </section>

      {/* 2 & 3. Form + contact details */}
      <section
        aria-labelledby="contact-details-title"
        className="relative isolate overflow-hidden bg-[#FAF9F5] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 top-[-180px] h-96 w-96 rounded-full border border-[#DDE8D3]/70" />
          <div className="absolute -right-32 bottom-[-180px] h-96 w-96 rounded-full bg-[#EEF2E8]/55" />
          <div className="absolute -right-28 bottom-[-150px] h-80 w-80 rounded-full border border-[#DDE8D3]/70" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-[1240px] items-start gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          <div className="min-w-0">
            <SectionHeading
              id="contact-form-title"
              align="left"
              eyebrow="Send an enquiry"
              title="Tell us a little about what you need"
              description="As much or as little as you're comfortable sharing. Everything stays confidential."
              titleClassName="text-[25px] font-bold leading-tight tracking-tight text-[#203B2B] sm:text-[30px]"
            />
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>

          <div className="min-w-0">
            <h2
              id="contact-details-title"
              className="text-xl font-bold tracking-tight text-[#203B2B] sm:text-[22px]"
            >
              Other ways to reach us
            </h2>
            <ul className="mt-4 space-y-3">
              {CONTACT_CARDS.map((card) => (
                <li
                  key={card.title}
                  className="flex items-start gap-3 rounded-[20px] border border-[#E4EBDD] bg-white/95 p-4 shadow-[0_3px_12px_rgba(32,59,43,0.045)] sm:gap-4 sm:p-[17px]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF4E9] text-[#4B7F24] sm:h-11 sm:w-11">
                    <Icon name={card.icon} className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#203B2B]">
                      {card.title}
                    </h3>
                    {card.href ? (
                      <a
                        href={card.href}
                        target={card.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-0.5 block break-words text-sm font-medium text-[#36591B] underline-offset-4 hover:underline"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-[#36591B]">
                        {card.value}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-[#687568]">{card.meta}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* 4. Interactive Google Map */}
            <div className="mt-5 overflow-hidden rounded-[22px] border border-[#DCE7D4] bg-white p-3 shadow-[0_4px_16px_rgba(32,59,43,0.06)]">
              <div className="relative h-64 w-full overflow-hidden rounded-[16px] sm:h-72">
                <iframe
                  title="The Master Mind Location Map"
                  src="https://maps.google.com/maps?q=13.0140946,77.5440868&hl=en&z=16&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1 text-xs text-[#596458]">
                <a
                  href="https://www.google.com/maps/place/12,+60+Feet+Rd,+Yeshwanthpur+Industrial+Suburb,+Mahalakshmi+Layout,+Bengaluru,+Karnataka+560096/@13.014287,77.5398441,1427m/data=!3m1!1e3!4m5!3m4!1s0x3bae3d743d5290e9:0x26ecf4c4bb467ea1!8m2!3d13.0140946!4d77.5440868?authuser=0&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#4B7F24] transition-colors hover:text-[#36591B] hover:underline"
                >
                  View larger map
                  <Icon name="arrow-right" className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 6. Booking info + privacy note */}
      <section aria-labelledby="booking-title" className="bg-surface-soft py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              id="booking-title"
              align="left"
              eyebrow="Booking"
              title="How to request an appointment"
            />
            <ol className="mt-8 space-y-4">
              {BOOKING_INFO.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-extrabold text-white"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-muted">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading
              id="privacy-title"
              align="left"
              eyebrow="Your privacy"
              title="Confidentiality, guaranteed"
            />
            <div className="mt-8 flex items-start gap-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-sm shadow-brand-900/5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon name="lock" className="h-6 w-6" />
              </span>
              <p className="text-sm leading-relaxed text-muted">
                Everything you share — in the form, on the phone, or in a
                session — is treated as strictly confidential. Your enquiry is
                used only to arrange your care and is never sold, shared for
                marketing, or discussed outside the practice. A full privacy
                policy is explained and agreed before your first session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. What happens after I submit? */}
      <section aria-labelledby="after-title" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          id="after-title"
          eyebrow="After you reach out"
          title="What happens after I submit?"
        />
        <div className="mt-10">
          <FAQAccordion items={CONTACT_FAQS} />
        </div>
      </section>

      {/* Emergency notice — moved below the form, just before the footer */}
      <div className="bg-[#FAF9F5] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div
          role="note"
          className="mx-auto flex max-w-7xl items-start gap-4 rounded-[20px] border border-[#EBDDD7] bg-[#FBF2EF] p-5 sm:p-6"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3DFD8] text-[#805449]">
            <Icon name="alert" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-[#633E35]">
              Do not use this form for emergencies
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[#75574F]">
              This form is checked during business hours only. If you or
              someone else is in immediate danger, or you are experiencing a
              mental-health crisis, contact local emergency services or a
              crisis helpline immediately. In many countries you can dial{" "}
              <strong>emergency services</strong> or a national{" "}
              <strong>mental-health crisis line</strong> (e.g., 988 in the US,
              112 in the EU) any time, day or night.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
