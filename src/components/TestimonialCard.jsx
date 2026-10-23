import Icon from "./Icon.jsx";

export default function TestimonialCard({ testimonial, className = "" }) {
  const { quote, name, context, rating } = testimonial;

  return (
    <figure
      className={`flex h-full flex-col rounded-[26px] border border-brand-200/60 bg-white p-7 shadow-[0_18px_50px_-24px_rgba(36,59,42,0.18)] sm:p-8 ${className}`}
    >
      <Icon name="quote" className="h-8 w-8 text-brand-300/80" />
      <blockquote className="mt-4 min-h-[6.5rem] flex-1 text-base leading-relaxed text-body sm:min-h-[7rem] sm:text-lg sm:leading-relaxed">
        “{quote}”
      </blockquote>
      <div
        className="mt-6 flex items-center gap-1"
        role="img"
        aria-label={`Rated ${rating} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <svg key={n} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              d="M12 3.6 14.5 9l5.5.6-4.1 3.8 1.1 5.5-5-2.9-5 2.9 1.1-5.5L4 9.6 9.5 9 12 3.6Z"
              fill={n <= rating ? "#f59e0b" : "#d5dfcd"}
            />
          </svg>
        ))}
      </div>
      <figcaption className="mt-5 border-t border-brand-100 pt-5">
        <span className="block text-base font-bold text-brand-900">{name}</span>
        <span className="mt-0.5 block text-sm text-muted">{context}</span>
      </figcaption>
    </figure>
  );
}
