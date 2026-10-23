export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  eyebrowLines = false,
  titleClassName = "text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl",
  as: Heading = "h2",
}) {
  const alignment =
    align === "center"
      ? "text-center mx-auto items-center"
      : "text-left items-start";

  return (
    <div className={`max-w-2xl ${alignment} flex flex-col gap-3`}>
      {eyebrow &&
        (eyebrowLines && align === "center" ? (
          <p className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
            <span aria-hidden="true" className="h-px w-12 bg-brand-300/80" />
            {eyebrow}
            <span aria-hidden="true" className="h-px w-12 bg-brand-300/80" />
          </p>
        ) : (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
            {eyebrow}
          </p>
        ))}
      <Heading id={id} className={titleClassName}>
        {title}
      </Heading>
      {description && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
