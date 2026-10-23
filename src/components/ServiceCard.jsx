import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function ServiceCard({ icon, title, description, to = "/therapy" }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-5 shadow-sm shadow-brand-900/5 transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md motion-safe:hover:shadow-brand-900/10 motion-reduce:transition-none sm:p-6">
      {/* Rounded-square pale-sage icon container */}
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-soft text-brand-600">
        <Icon name={icon} className="h-7 w-7" />
      </span>

      <h3 className="mt-5 text-lg font-bold leading-snug text-brand-900 sm:text-xl">
        {title}
      </h3>
      <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">
        {description}
      </p>

      <Link
        to={to}
        className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        Learn more
        <Icon
          name="arrow-right"
          className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
        />
        <span className="sr-only">about {title}</span>
      </Link>
    </article>
  );
}
