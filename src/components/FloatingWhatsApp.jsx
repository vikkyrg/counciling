import { getWhatsAppUrl, SITE } from "../data/content.js";

export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${SITE.name} on WhatsApp (opens in a new tab)`}
      className="fixed bottom-6 right-6 z-[60] flex h-[55px] w-[55px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-8 sm:right-8 sm:h-[65px] sm:w-[65px] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 sm:h-8 sm:w-8"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M16.003 3.2c-7.05 0-12.8 5.72-12.8 12.75 0 2.25.59 4.44 1.72 6.36L3.2 28.8l6.67-1.75a12.8 12.8 0 0 0 6.13 1.56h.01c7.05 0 12.79-5.72 12.79-12.76 0-3.4-1.33-6.6-3.74-9.01A12.72 12.72 0 0 0 16.003 3.2Zm0 23.3h-.01c-1.89 0-3.74-.5-5.35-1.46l-.38-.22-3.96 1.04 1.06-3.86-.25-.4a10.62 10.62 0 0 1-1.63-5.65c0-5.85 4.78-10.61 10.65-10.61 2.84 0 5.51 1.1 7.51 3.11a10.53 10.53 0 0 1 3.11 7.5c0 5.85-4.78 10.61-10.65 10.61Zm5.84-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.51-.16-.72-.16-.22 0-.43.22-.65.54-.22.33-.83 1.04-1.02 1.25-.18.22-.36.25-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.61-1.92-1.8-2.24-.18-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.53-.72-.54h-.61c-.22 0-.57.08-.87.41-.29.33-1.14 1.11-1.14 2.7 0 1.6 1.17 3.14 1.33 3.36.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.87.69.78.25 1.49.21 2.05.13.63-.09 1.89-.77 2.16-1.52.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.62-.38Z"
        />
      </svg>
    </a>
  );
}
