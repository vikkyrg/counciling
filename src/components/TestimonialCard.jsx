export default function TestimonialCard({
  testimonial,
  isCenter = false,
  className = "",
}) {
  const { quote, name, context, rating, image } = testimonial;

  // Extract initial(s) for avatar fallback
  const getInitials = (str) => {
    if (!str) return "MM";
    const parts = str.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const isFiveStar = rating === 5;

  return (
    <figure
      className={`relative flex h-full flex-col justify-between rounded-[32px] sm:rounded-[36px] border border-[#d2ded0]/80 bg-white/95 backdrop-blur-sm transition-all duration-500 ${
        isCenter
          ? "p-8 sm:p-9 md:p-10 shadow-[0_20px_50px_-15px_rgba(40,65,45,0.12),0_8px_20px_-6px_rgba(40,65,45,0.06)] ring-1 ring-[#c2d6be]/50"
          : "p-7 sm:p-8 md:p-8 shadow-[0_12px_36px_-12px_rgba(40,65,45,0.08)] opacity-95"
      } ${className}`}
    >
      {/* Decorative leaf branch in the bottom right corner of center card (matching reference) */}
      {isCenter && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 -right-1 z-0 overflow-hidden rounded-br-[32px] sm:rounded-br-[36px]"
        >
          <svg
            className="h-28 w-28 text-[#789d70]/25 sm:h-32 sm:w-32"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path
              d="M110 110 C85 85, 60 55, 62 15 C75 35, 95 65, 110 110 Z"
              fill="currentColor"
              opacity="0.5"
            />
            <path
              d="M95 95 C75 75, 40 70, 25 50 C45 52, 75 68, 95 95 Z"
              fill="currentColor"
              opacity="0.4"
            />
            <path
              d="M75 105 C60 88, 30 92, 10 80 C28 75, 55 86, 75 105 Z"
              fill="currentColor"
              opacity="0.35"
            />
            <path
              d="M105 75 C92 58, 85 30, 80 10 C75 28, 86 55, 105 75 Z"
              fill="currentColor"
              opacity="0.35"
            />
          </svg>
        </div>
      )}

      {/* Top Header: Soft-green quote circle on left, Star rating on right */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Soft-green circular quotation-mark icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dbe8d6]/80 text-[#527d42] transition-colors">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {/* Elegant double quote glyph */}
            <path d="M9.5 7C7.5 7 6 8.6 6 10.8c0 1.8 1.2 3.1 2.9 3.2-.2 1.4-1.2 2.6-2.6 3l-.3.1v1.9c3 0 5-2.2 5-5.5V7.5c0-.3-.2-.5-.5-.5zm7.5 0c-2 0-3.5 1.6-3.5 3.8 0 1.8 1.2 3.1 2.9 3.2-.2 1.4-1.2 2.6-2.6 3l-.3.1v1.9c3 0 5-2.2 5-5.5V7.5c0-.3-.2-.5-.5-.5z" />
          </svg>
        </div>

        {/* Star rating (rendered from testimonial rating, e.g. 5 or 4 out of 5 stars) */}
        {rating && rating > 0 && (
          <div
            className="flex items-center gap-1"
            role="img"
            aria-label={`Rated ${rating} out of 5 stars`}
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                viewBox="0 0 20 20"
                fill={s <= rating ? "#f59e0b" : "#dbe8d6"}
                className={`h-4 w-4 ${
                  s <= rating
                    ? "drop-shadow-[0_1px_1px_rgba(245,158,11,0.25)]"
                    : "opacity-60"
                }`}
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.065 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
        )}
      </div>

      {/* Testimonial quote — site body font and text token, like all other copy */}
      <blockquote className="relative z-10 my-6 flex-1">
        <p
          className={`font-sans text-body font-normal leading-relaxed tracking-normal ${
            isCenter
              ? "text-[1.05rem] sm:text-[1.12rem] md:text-[1.16rem]"
              : "text-[0.96rem] sm:text-[1.02rem]"
          }`}
        >
          “{quote}”
        </p>
      </blockquote>

      {/* Reviewer identity: circular portrait / initials avatar + Name + Therapy format */}
      <figcaption className="relative z-10 flex items-center gap-3.5 pt-2">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-12 w-12 shrink-0 aspect-square rounded-full object-cover ring-2 ring-[#e0ece0] shadow-xs"
          />
        ) : (
          <div
            role="img"
            aria-label={`Initials avatar for ${name}`}
            className="flex h-12 w-12 shrink-0 aspect-square items-center justify-center rounded-full bg-[#dbe8d6] font-sans text-sm font-bold tracking-tight text-[#2d4d23] ring-2 ring-[#e0ece0] shadow-xs"
          >
            {getInitials(name)}
          </div>
        )}

        <div className="flex flex-col min-w-0">
          <span className="font-sans text-sm sm:text-[0.95rem] font-bold text-[#1a2e1d] leading-snug truncate">
            {name}
          </span>
          <span className="font-sans text-xs sm:text-[0.82rem] font-medium text-[#657d62] leading-tight mt-0.5 truncate">
            {context}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

