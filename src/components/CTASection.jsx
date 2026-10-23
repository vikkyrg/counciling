import Icon from "./Icon.jsx";
import Button from "./Button.jsx";

export default function CTASection({
  title = "Take the first step toward feeling better.",
  text = "Reaching out is courage, not weakness. We're here to listen — confidentially and without judgement.",
  primaryLabel = "Book a Session",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section
      aria-labelledby="cta-title"
      className="bg-[#F8F7F2] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-gradient-to-br from-[#203B2B] via-[#2D542D] to-[#60783A] px-6 py-11 text-center shadow-[0_14px_34px_rgba(32,59,43,0.16)] sm:rounded-[40px] sm:px-12 sm:py-14">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full border border-white/10"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -bottom-40 -z-10 h-80 w-80 rounded-full bg-white/[0.035]"
        />
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
          <Icon name="heart" className="h-7 w-7" />
        </span>
        <h2
          id="cta-title"
          className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:mt-6 sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#F0F3EB]">
          {text}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            to={primaryTo}
            variant="light"
            size="lg"
            className="min-w-[190px] shadow-[0_5px_14px_rgba(15,35,22,0.16)]"
          >
            {primaryLabel}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
          {secondaryLabel && secondaryTo && (
            <Button
              to={secondaryTo}
              variant="outlineLight"
              size="lg"
              className="min-w-[190px] border-white/70"
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
