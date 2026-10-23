import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard.jsx";
import Icon from "./Icon.jsx";
import { TESTIMONIALS } from "../data/testimonials.js";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (!auto) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(timer);
  }, [auto, count]);

  const go = (next) => {
    setAuto(false);
    setIndex(((next % count) + count) % count);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setAuto(false)}
      onFocus={() => setAuto(false)}
    >
      <div className="overflow-hidden" aria-live={auto ? "polite" : "off"}>
        <div
          key={index}
          className="animate-fade-slide motion-reduce:animate-none"
          role="group"
          aria-roledescription="slide"
          aria-label={`Testimonial ${index + 1} of ${count}`}
        >
          <TestimonialCard
            testimonial={TESTIMONIALS[index]}
            className="mx-auto w-full max-w-[960px]"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-50 motion-reduce:transition-none"
        >
          <Icon name="arrow-right" className="h-5 w-5 rotate-180" />
        </button>
        <ul className="flex items-center gap-2" aria-hidden="true">
          {TESTIMONIALS.map((t, i) => (
            <li key={t.id}>
              <button
                type="button"
                tabIndex={-1}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all motion-reduce:transition-none ${
                  i === index
                    ? "w-7 bg-brand-600"
                    : "w-2.5 bg-brand-200 hover:bg-brand-300"
                }`}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-50 motion-reduce:transition-none"
        >
          <Icon name="arrow-right" className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
