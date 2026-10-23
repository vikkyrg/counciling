import { useEffect, useState, useCallback } from "react";
import TestimonialCard from "./TestimonialCard.jsx";
import { TESTIMONIALS } from "../data/testimonials.js";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(1); // Default to item 1 so index-1 (0) is on left
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (next) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  // Indices for left, center, right cards
  const leftIdx = ((index - 1) % count + count) % count;
  const centerIdx = index;
  const rightIdx = (index + 1) % count;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="relative w-full max-w-7xl mx-auto px-2 sm:px-4"
    >
      {/* Cards Row with Navigation Arrows */}
      <div className="relative flex items-center justify-center">
        {/* Previous Button (Left of cards) */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
          className="absolute -left-3 sm:-left-5 lg:-left-6 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#8da785]/60 bg-white/95 text-[#355228] shadow-[0_4px_14px_rgba(40,65,45,0.08)] transition-all duration-300 hover:bg-[#f2f7ef] hover:border-[#608655] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#4d7c24]"
        >
          <svg
            className="h-5 w-5 rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        {/* 3-Card Layout on desktop / tablet, 1 card on mobile */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center px-6 sm:px-8">
          {/* Left Card: visible on md+ */}
          <div
            className="hidden md:block md:col-span-4 transition-all duration-500 ease-out cursor-pointer hover:opacity-100"
            onClick={() => go(index - 1)}
            aria-hidden="true"
          >
            <TestimonialCard
              testimonial={TESTIMONIALS[leftIdx]}
              isCenter={false}
              className="scale-[0.96] origin-right"
            />
          </div>

          {/* Center Card: highlighted, slightly larger, prominent */}
          <div className="col-span-1 md:col-span-4 z-10 transition-all duration-500 ease-out">
            <TestimonialCard
              testimonial={TESTIMONIALS[centerIdx]}
              isCenter={true}
              className="scale-100 md:scale-[1.04]"
            />
          </div>

          {/* Right Card: visible on md+ */}
          <div
            className="hidden md:block md:col-span-4 transition-all duration-500 ease-out cursor-pointer hover:opacity-100"
            onClick={() => go(index + 1)}
            aria-hidden="true"
          >
            <TestimonialCard
              testimonial={TESTIMONIALS[rightIdx]}
              isCenter={false}
              className="scale-[0.96] origin-left"
            />
          </div>
        </div>

        {/* Next Button (Right of cards) */}
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
          className="absolute -right-3 sm:-right-5 lg:-right-6 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#8da785]/60 bg-white/95 text-[#355228] shadow-[0_4px_14px_rgba(40,65,45,0.08)] transition-all duration-300 hover:bg-[#f2f7ef] hover:border-[#608655] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#4d7c24]"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Pagination dots below cards */}
      <div className="mt-9 sm:mt-10 flex items-center justify-center gap-2.5">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === index}
            className={`transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-[#4d7c24] ${
              i === index
                ? "h-2.5 w-2.5 bg-[#2d4d23] ring-2 ring-[#2d4d23] ring-offset-2 ring-offset-[#faf9f4]"
                : "h-2 w-2 bg-[#b6ccaF] hover:bg-[#8da785]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
