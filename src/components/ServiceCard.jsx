import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function ServiceCard({
  icon,
  title,
  description,
  backDescription,
  backLink = "Explore service",
  to = "/therapy",
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Toggle on tap/click for mobile and keyboard accessibility
  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className="group relative h-full min-h-[285px] sm:min-h-[295px] lg:min-h-[305px] w-full [perspective:1200px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative h-full w-full rounded-[24px] sm:rounded-3xl transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        }`}
      >
        {/* FRONT SIDE: Clean, compact, perfectly proportioned */}
        <article
          className="flex h-full w-full flex-col justify-between rounded-[24px] sm:rounded-3xl border border-brand-100 bg-white p-5 sm:p-6 shadow-sm shadow-brand-900/5 box-border [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
          aria-hidden={isFlipped ? "true" : "false"}
        >
          <div>
            {/* Rounded-square pale-green icon badge at top-left */}
            <span className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-surface-soft text-brand-600">
              <Icon name={icon} className="h-6 w-6 sm:h-[26px] sm:w-[26px]" />
            </span>

            {/* Service title ~20px below icon */}
            <h3 className="mt-5 text-lg font-bold leading-snug text-brand-900 sm:text-[19px]">
              {title}
            </h3>

            {/* Short description directly below title (8-10px spacing) */}
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
              {description}
            </p>
          </div>

          {/* Learn more link closer to description with natural breathing room */}
          <div className="mt-4 flex items-center justify-between pt-1">
            <Link
              to={to}
              tabIndex={isFlipped ? -1 : 0}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <span>Learn more</span>
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              />
              <span className="sr-only">about {title}</span>
            </Link>

            {/* Mobile / touch flip indicator button */}
            <button
              type="button"
              onClick={handleToggleFlip}
              className="lg:hidden text-xs font-semibold text-brand-600/80 hover:text-brand-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-600"
              aria-label={`Flip card for ${title} details`}
            >
              Details ↺
            </button>
          </div>
        </article>

        {/* BACK SIDE: Solid forest-green counselling information card */}
        <article
          className="absolute inset-0 flex h-full w-full flex-col justify-between rounded-[24px] sm:rounded-3xl border border-[#2C5223] bg-[#224424] p-5 sm:p-6 shadow-xl shadow-[#152B17]/20 box-border [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
          aria-hidden={!isFlipped ? "true" : "false"}
        >
          <div>
            {/* Outline pale-sage icon container matching front */}
            <span className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#CBE0BF] border border-white/15">
              <Icon name={icon} className="h-6 w-6 sm:h-[26px] sm:w-[26px] text-[#E2F0D8]" />
            </span>

            {/* Service title */}
            <h3 className="mt-5 text-lg font-bold leading-snug text-white sm:text-[19px]">
              {title}
            </h3>

            {/* In-depth back description */}
            <p className="mt-2 text-[13.5px] sm:text-[14px] leading-relaxed text-[#D2E4CA]">
              {backDescription || description}
            </p>
          </div>

          {/* Explore service link at the bottom without excessive gap */}
          <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10">
            <Link
              to={to}
              tabIndex={isFlipped ? 0 : -1}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-[#EBF5E5] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{backLink}</span>
              <Icon
                name="arrow-right"
                className="h-4 w-4 text-[#CBE0BF] transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              />
              <span className="sr-only">for {title}</span>
            </Link>

            {/* Mobile / touch flip back indicator button */}
            <button
              type="button"
              onClick={handleToggleFlip}
              className="lg:hidden text-xs font-semibold text-[#CBE0BF] hover:text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-white"
              aria-label={`Return to front of ${title} card`}
            >
              Back ↻
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
