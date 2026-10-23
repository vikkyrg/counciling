export default function PageHero({ eyebrow, title, description }) {
  return (
    <section
      aria-labelledby="page-hero-title"
      className="bg-gradient-to-b from-brand-100 via-brand-50 to-background"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
        {eyebrow && (
          <p className="motion-safe:animate-fade-up text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
            {eyebrow}
          </p>
        )}
        <h1
          id="page-hero-title"
          className="motion-safe:animate-fade-up mt-4 text-4xl font-extrabold tracking-tight text-brand-900 sm:text-5xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="motion-safe:animate-fade-up mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
