import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import logo from "../assets/logo.png";
import { getWhatsAppUrl, SITE } from "../data/content.js";
import { HOW_WE_HELP } from "../data/services.js";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/therapy", label: "Therapy Services" },
  { to: "/contact", label: "Contact Us" },
];

const SOCIALS = [
  { name: "Instagram", icon: "instagram", href: "https://instagram.com" },
  { name: "Facebook", icon: "facebook", href: "https://facebook.com" },
  { name: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
  { name: "WhatsApp", icon: "whatsapp", href: getWhatsAppUrl() },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.address,
  )}`;

  return (
    <footer
      className="mt-auto border-t border-[#2F4A38]/50 bg-[#1B3024] text-[#D3DFCE]"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* 1. Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-6">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9D8AD]"
              aria-label={`${SITE.name} — go to homepage`}
            >
              <img
                src={logo}
                alt={SITE.name}
                width="2170"
                height="725"
                className="h-14 w-auto sm:h-16"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#B7C7B3]">
              {SITE.tagline} Confidential, compassionate, professional
              counselling for individuals, couples, teens, and families — online
              and in person.
            </p>

            <div className="mt-6">
              <span className="sr-only">Connect with us on social media</span>
              <ul className="flex flex-wrap items-center gap-2.5">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${SITE.name} on ${s.name} (opens in new tab)`}
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#3E5C46]/60 bg-[#253E2F]/80 text-[#C9D8AD] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6F955A]/80 hover:bg-[#32523E] hover:text-[#FAFAF7] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9D8AD] motion-reduce:transition-none motion-reduce:hover:transform-none"
                    >
                      <Icon
                        name={s.icon}
                        className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Quick Links Column */}
          <nav
            aria-label="Footer quick links"
            className="sm:col-span-1 lg:col-span-2 lg:pl-2"
          >
            <div className="group">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAFAF7]">
                Quick Links
              </h2>
              <span
                aria-hidden="true"
                className="mt-2 block h-[2px] w-7 rounded-full bg-[#7FA158]"
              />
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-block text-[#B7C7B3] transition-colors duration-150 hover:text-[#E4EFE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9D8AD]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Services Column */}
          <nav
            aria-label="Footer services"
            className="sm:col-span-1 lg:col-span-3 lg:pl-2"
          >
            <div className="group">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAFAF7]">
                Services
              </h2>
              <span
                aria-hidden="true"
                className="mt-2 block h-[2px] w-7 rounded-full bg-[#7FA158]"
              />
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {HOW_WE_HELP.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    to="/therapy"
                    className="inline-block text-[#B7C7B3] transition-colors duration-150 hover:text-[#E4EFE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9D8AD]"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 4. Get in Touch Column */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAFAF7]">
                Get in Touch
              </h2>
              <span
                aria-hidden="true"
                className="mt-2 block h-[2px] w-7 rounded-full bg-[#7FA158]"
              />
            </div>

            <ul className="mt-5 space-y-3.5 text-sm text-[#B7C7B3]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-3 transition-colors duration-150 hover:text-[#E4EFE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9D8AD]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#253E2F] text-[#C9D8AD] transition-colors group-hover:bg-[#32523E] group-hover:text-white">
                    <Icon name="mail" className="h-4 w-4" />
                  </span>
                  <span className="pt-1 break-all">{SITE.email}</span>
                </a>
              </li>

              <li>
                <a
                  href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}
                  className="group flex items-start gap-3 transition-colors duration-150 hover:text-[#E4EFE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9D8AD]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#253E2F] text-[#C9D8AD] transition-colors group-hover:bg-[#32523E] group-hover:text-white">
                    <Icon name="phone" className="h-4 w-4" />
                  </span>
                  <span className="pt-1">{SITE.phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 transition-colors duration-150 hover:text-[#E4EFE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9D8AD]"
                  title="View location on Google Maps"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#253E2F] text-[#C9D8AD] transition-colors group-hover:bg-[#32523E] group-hover:text-white">
                    <Icon name="pin" className="h-4 w-4" />
                  </span>
                  <span className="pt-1 leading-snug">{SITE.address}</span>
                </a>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#253E2F] text-[#C9D8AD]">
                  <Icon name="clock" className="h-4 w-4" />
                </span>
                <span className="pt-1 leading-snug">{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Crisis Support Banner */}
        <aside
          role="note"
          aria-label="Crisis support notice"
          className="relative my-2 overflow-hidden rounded-2xl border border-[#3E5C46]/70 bg-[#22392B]/90 px-5 py-4 sm:px-6 sm:py-4.5"
        >
          <div className="flex items-start gap-3.5 sm:items-center">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7FA158]/20 text-[#C9D8AD] sm:mt-0"
            >
              <Icon name="alert" className="h-4 w-4" />
            </span>
            <p className="text-xs leading-relaxed text-[#D8E4D3] sm:text-sm">
              <strong className="font-semibold text-[#FAFAF7]">
                Crisis support:{" "}
              </strong>
              If you are in immediate danger or experiencing a mental-health
              emergency, contact local emergency services or a crisis helpline
              immediately. This website is not monitored for emergencies.
            </p>
          </div>
        </aside>

        {/* 6. Bottom Copyright Row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3.5 border-t border-[#2F4A38]/70 py-6 text-xs text-[#9BB197] sm:flex-row">
          <p>© {year} The Master Mind. All Rights Reserved.</p>
          <a
            href="https://innomatricstech.com/"
            target="_blank"
            rel="noreferrer"
            className="text-center transition-colors hover:text-[#E4EFE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9D8AD] sm:text-right"
          >
            Powered by Innomatrics Tech
          </a>
        </div>
      </div>
    </footer>
  );
}
