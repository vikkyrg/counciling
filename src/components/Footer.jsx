import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import logo from "../assets/logo.png";
import { SITE } from "../data/content.js";
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
  { name: "WhatsApp", icon: "whatsapp", href: "https://wa.me/917618751717" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-900 text-brand-100" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={`${SITE.name} — go to homepage`}
            >
              <img
                src={logo}
                alt=""
                width="2170"
                height="725"
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              A safe space to talk, heal, and grow. Confidential,
              compassionate, professional counselling for individuals, couples,
              teens, and families — online and in person.
            </p>
            <ul className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${SITE.name} on ${s.name} (opens in new tab)`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-100 transition hover:bg-white/20 hover:text-white"
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-brand-200 transition hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {HOW_WE_HELP.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    to="/therapy"
                    className="text-brand-200 transition hover:text-white hover:underline"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              Get in Touch
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-200">
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all hover:text-white hover:underline"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}
                  className="hover:text-white hover:underline"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          role="note"
          className="rounded-2xl border border-amber-300/40 bg-amber-400/10 px-5 py-4 text-sm leading-relaxed text-amber-100"
        >
          <strong className="font-bold text-amber-50">Crisis support: </strong>
          If you are in immediate danger or experiencing a mental-health
          emergency, contact local emergency services or a crisis helpline
          immediately. This website is not monitored for emergencies.
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-brand-300 sm:flex-row">
          <p>
            © {year} {SITE.name}. All rights reserved. Demo content
            and placeholder details.
          </p>
          <p>Made with care for mental wellbeing.</p>
        </div>
      </div>
    </footer>
  );
}
