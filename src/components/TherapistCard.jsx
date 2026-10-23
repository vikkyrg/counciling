import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

function SectionLabel({ icon, children }) {
  return (
    <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-900 sm:text-xs">
      <Icon name={icon} className="h-4 w-4 shrink-0 text-brand-600" />
      {children}
    </h4>
  );
}

export default function TherapistCard({ therapist }) {
  const bookHref = `/contact?therapist=${encodeURIComponent(therapist.name)}`;
  const lastName = therapist.name.split(" ").slice(-1)[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm shadow-brand-900/5 transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md motion-safe:hover:shadow-brand-900/10">
      {/* Profile header — pale sage band with initials avatar */}
      <div className="relative flex min-h-28 items-center gap-4 border-b border-brand-100/70 bg-brand-50 p-5 sm:p-6">
        <Icon
          name="leaf"
          className="pointer-events-none absolute -left-3 top-1/2 h-24 w-24 -translate-y-1/2 rotate-12 text-brand-200/70"
        />
        <span
          role="img"
          aria-label={`Placeholder portrait for ${therapist.name}`}
          className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-brand-700 text-xl font-extrabold text-white shadow-sm"
        >
          {therapist.initials}
        </span>
        <div className="relative min-w-0">
          <h3 className="text-lg font-bold leading-snug text-brand-900">
            {therapist.name}
          </h3>
          <p className="text-sm font-semibold leading-snug text-brand-700">
            {therapist.role}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
            <Icon name="briefcase" className="h-4 w-4 shrink-0" />
            {therapist.experience} of experience
          </p>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-muted">{therapist.bio}</p>

        <div>
          <SectionLabel icon="leaf">Areas of focus</SectionLabel>
          <ul
            className="mt-2 flex flex-wrap gap-2"
            aria-label={`Focus areas for ${therapist.name}`}
          >
            {therapist.focus.map((f) => (
              <li
                key={f}
                className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionLabel icon="cap">Qualifications</SectionLabel>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {therapist.qualifications.join(" · ")}
          </p>
        </div>

        <div>
          <SectionLabel icon="globe">Languages</SectionLabel>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {therapist.languages.join(", ")}
          </p>
        </div>

        <div className="mt-auto pt-1">
          <Link
            to={bookHref}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-colors duration-200 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Book with {lastName}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
