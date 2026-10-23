import logo from "../assets/logo.png";

export default function BrandLogo({ footer = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`relative block shrink-0 overflow-hidden ${
          footer ? "h-9 w-8" : "h-11 w-8 sm:h-12 sm:w-9 lg:h-14 lg:w-10"
        }`}
      >
        <img
          src={logo}
          alt=""
          width="2170"
          height="725"
          loading={footer ? "lazy" : "eager"}
          decoding="async"
          className="absolute left-0 top-0 h-full w-auto max-w-none"
        />
      </span>
      <span
        className={
          footer
            ? "text-base font-extrabold leading-tight tracking-tight text-brand-900"
            : "text-[15px] font-extrabold leading-tight tracking-tight text-[#243B2A] sm:text-base"
        }
      >
        The Master Mind
      </span>
    </span>
  );
}
