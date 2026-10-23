import { useId, useState } from "react";
import Icon from "./Icon.jsx";

export default function FAQAccordion({ items, variant = "default" }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();
  const isHomeVariant = variant === "home";
  const isTherapyVariant = variant === "therapy";
  const hasAnimatedPanels = isHomeVariant || isTherapyVariant;

  return (
    <div
      className={
        isHomeVariant
          ? "overflow-hidden rounded-[26px] border border-[#E4EBDD] bg-white p-3 shadow-[0_12px_36px_rgba(32,59,43,0.07)]"
          : isTherapyVariant
            ? "space-y-3"
          : "divide-y divide-brand-100 overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm shadow-brand-900/5"
      }
    >
      {items.map((item, i) => {
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        const isOpen = openIndex === i;

        return (
          <div
            key={item.question}
            className={
              isHomeVariant
                ? "overflow-hidden rounded-[18px] border-b border-[#EDF1E8] last:border-b-0"
                : isTherapyVariant
                  ? "overflow-hidden rounded-[18px] border border-[#DDE8D3] bg-white shadow-[0_2px_8px_rgba(32,59,43,0.04)]"
                : undefined
            }
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className={
                  isHomeVariant
                    ? `flex w-full items-center gap-3 px-3 py-3 text-left text-base font-semibold text-[#294638] transition-colors duration-200 hover:bg-[#F7F9F4] sm:gap-4 sm:px-5 sm:py-3.5 sm:text-[18px] ${
                        isOpen ? "bg-[#F7F9F4]" : "bg-white"
                      }`
                    : isTherapyVariant
                      ? "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[#203B2B] transition-colors hover:bg-[#F8FAF6] sm:px-6 sm:py-[18px]"
                      : "flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-brand-900 transition hover:bg-brand-50 sm:px-7"
                }
              >
                {isHomeVariant && (
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF0E2] text-[19px] font-bold leading-none text-[#4D7C24]"
                  >
                    ?
                  </span>
                )}
                <span className={isHomeVariant ? "min-w-0 flex-1" : undefined}>
                  {item.question}
                </span>
                <span
                  className={
                    isHomeVariant
                      ? `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 motion-reduce:transition-none ${
                          isOpen
                            ? "rotate-180 bg-[#4D7C24] text-white"
                            : "bg-[#F0F4E9] text-[#4D7C24]"
                        }`
                      : isTherapyVariant
                        ? `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 motion-reduce:transition-none ${
                            isOpen
                              ? "rotate-180 bg-[#4B7F24] text-white"
                              : "bg-[#EAF1E3] text-[#4B7F24]"
                          }`
                      : `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 motion-reduce:transition-none ${
                          isOpen
                            ? "rotate-180 bg-brand-600 text-white"
                            : "bg-brand-50 text-brand-600"
                        }`
                  }
                  aria-hidden="true"
                >
                  <Icon name="chevron-down" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              className={
                hasAnimatedPanels
                  ? `grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`
                  : undefined
              }
            >
              <div className={hasAnimatedPanels ? "min-h-0 overflow-hidden" : undefined}>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  hidden={!hasAnimatedPanels && !isOpen}
                  className={
                    isHomeVariant
                      ? "px-3 pb-4 pl-[3.75rem] text-[15px] leading-[1.6] text-[#69776B] sm:px-5 sm:pb-5 sm:pl-[4.5rem] sm:text-base"
                      : isTherapyVariant
                        ? "px-5 pb-5 text-sm leading-relaxed text-[#596458] sm:px-6"
                        : "px-5 pb-6 text-sm leading-relaxed text-muted sm:px-7"
                  }
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
