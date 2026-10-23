import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";
import logo from "../assets/logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true, icon: "home" },
  { to: "/about", label: "About", icon: "users" },
  { to: "/therapy", label: "Therapy", icon: "heart" },
  { to: "/contact", label: "Contact Us", icon: "mail" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClasses = ({ isActive }) =>
    [
      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition-colors duration-150 lg:gap-2 lg:px-4 lg:text-sm",
      isActive
        ? "bg-[#EDF3E7] text-[#243B2A] font-bold shadow-xs"
        : "text-[#465044] hover:bg-[#EDF3E7]/60 hover:text-[#243B2A]",
    ].join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-[#243B2A]/10 bg-[#FAF9F4]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#FAF9F4]/90">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D7C24]"
          aria-label="The Mind Master — go to homepage"
        >
          <img
            src={logo}
            alt=""
            width="2170"
            height="725"
            className="h-11 w-auto sm:h-12 lg:h-14"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex lg:gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClasses}>
                <Icon
                  name={link.icon}
                  className="h-4 w-4 shrink-0 lg:h-[18px] lg:w-[18px]"
                />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button to="/contact" size="sm">
            Book a Session
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-800 hover:bg-brand-50 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-[#243B2A]/10 bg-[#FAF9F4] px-4 pb-6 pt-3 md:hidden shadow-lg"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold",
                      isActive
                        ? "bg-[#EDF3E7] text-[#243B2A] font-bold"
                        : "text-[#465044] hover:bg-[#EDF3E7]/60",
                    ].join(" ")
                  }
                >
                  <Icon name={link.icon} className="h-5 w-5 shrink-0" />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button to="/contact" className="w-full">
              Book a Session
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
