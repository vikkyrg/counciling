import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Cursor from "./components/Cursor.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Therapy from "./pages/Therapy.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({
          behavior: prefersReducedMotion ? "instant" : "smooth",
          block: "start",
        });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function ScrollRevealObserver() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal-visible", "");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    const revealSelector = [
      "main section:not(:first-of-type) > div:not([aria-hidden='true'])",
      "main section article",
      "main section ul.grid > li",
      "main section ol.grid > li",
      "main section ul.flex > li",
      "main section ul.space-y-3 > li",
      "main section form",
      "footer > div",
    ].join(", ");
    const observedTargets = new Set();

    const observeTarget = (element) => {
      if (
        element.hasAttribute("data-reveal") ||
        element.closest("[data-journey-sequence], [data-mission-cards]")
      ) {
        return;
      }
      element.setAttribute("data-reveal", "");
      observedTargets.add(element);

      const parent = element.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter((child) =>
          child.matches(revealSelector),
        );
        const index = siblings.indexOf(element);
        const staggerInterval = Number(
          parent.getAttribute("data-reveal-stagger"),
        );
        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(Math.max(index, 0), 5) * (staggerInterval || 70)}ms`,
        );
      }
      revealObserver.observe(element);
    };

    const scan = (root) => {
      if (root instanceof Element && root.matches(revealSelector)) {
        observeTarget(root);
      }
      root.querySelectorAll?.(revealSelector).forEach(observeTarget);
    };

    scan(document);
    document.documentElement.classList.add("has-scroll-reveal");

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
      });
    });
    mutationObserver.observe(document.getElementById("root"), {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      observedTargets.forEach((element) => {
        element.removeAttribute("data-reveal");
        element.removeAttribute("data-reveal-visible");
        element.style.removeProperty("--reveal-delay");
      });
      document.documentElement.classList.remove("has-scroll-reveal");
    };
  }, []);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ScrollRevealObserver />
      <Cursor />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/therapy" element={<Therapy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
