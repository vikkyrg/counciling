import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "bg-brand-600 text-white shadow-md shadow-brand-600/20 hover:bg-brand-700",
  secondary:
    "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50 hover:border-brand-300",
  success:
    "bg-brand-600 text-white shadow-md shadow-brand-600/20 hover:bg-brand-700",
  outlineLight: "border border-white/70 text-white hover:bg-white/10",
  light: "bg-white text-brand-700 shadow-md hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60 disabled:pointer-events-none",
    VARIANTS[variant],
    SIZES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={rest.type || "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
