import { useEffect, useRef, useState } from "react";

/**
 * The Mind Master brand cursor.
 *
 * A small forest-green dot with a soft sage ring that eases toward the pointer.
 * Renders only on devices with a precise pointer, never intercepts input, and
 * simplifies itself to a static position when the visitor prefers reduced motion.
 */

/* Elements that should read as clickable: ring expands, accent brightens. */
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  "label",
  "input",
  "select",
  "video",
  "audio",
  '[role="button"]',
  '[role="link"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="option"]',
  '[role="combobox"]',
  '[role="slider"]',
  '[tabindex]:not([tabindex="-1"])',
  "[data-cursor]",
].join(",");

/* Text entry surfaces keep the native I-beam instead of the brand cursor. */
const TEXT_INPUT_SELECTOR = [
  "input[type=text]",
  "input[type=email]",
  "input[type=tel]",
  "input[type=url]",
  "input[type=search]",
  "input[type=password]",
  'input:not([type])',
  "textarea",
  '[contenteditable="true"]',
  '[contenteditable=""]',
].join(",");

const RING_EASE = 0.2;
const DOT_EASE = 0.6;
const SETTLE_THRESHOLD = 0.05;

export default function Cursor() {
  const layerRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  /* Only on precise pointers — touch and hybrid tablets keep the standard cursor. */
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const layer = layerRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!layer || !ring || !dot) return undefined;

    const root = document.documentElement;
    root.classList.add("cursor-fx");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pointer.x, y: pointer.y };
    const dotPos = { x: pointer.x, y: pointer.y };
    let frame = null;
    let hasMoved = false;
    let currentElement = null;
    let scrollScheduled = false;

    const paint = () => {
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
    };

    const isSettled = () =>
      Math.abs(pointer.x - ringPos.x) < SETTLE_THRESHOLD &&
      Math.abs(pointer.y - ringPos.y) < SETTLE_THRESHOLD &&
      Math.abs(pointer.x - dotPos.x) < SETTLE_THRESHOLD &&
      Math.abs(pointer.y - dotPos.y) < SETTLE_THRESHOLD;

    const step = () => {
      /* Reduced motion: both parts sit exactly under the pointer, no trailing. */
      const ringEase = reduceMotion.matches ? 1 : RING_EASE;
      const dotEase = reduceMotion.matches ? 1 : DOT_EASE;

      ringPos.x += (pointer.x - ringPos.x) * ringEase;
      ringPos.y += (pointer.y - ringPos.y) * ringEase;
      dotPos.x += (pointer.x - dotPos.x) * dotEase;
      dotPos.y += (pointer.y - dotPos.y) * dotEase;

      paint();

      if (isSettled()) {
        ringPos.x = dotPos.x = pointer.x;
        ringPos.y = dotPos.y = pointer.y;
        paint();
        frame = null;
        return;
      }
      frame = window.requestAnimationFrame(step);
    };

    const startLoop = () => {
      if (frame === null) frame = window.requestAnimationFrame(step);
    };

    const applyState = (element) => {
      const isTextField = !!element?.closest(TEXT_INPUT_SELECTOR);
      const isInteractive =
        !isTextField && !!element?.closest(INTERACTIVE_SELECTOR);
      layer.classList.toggle("is-text", isTextField);
      layer.classList.toggle("is-hover", isInteractive);
    };

    const toElement = (event) => {
      const target = event.target;
      if (!target) return null;
      return target.nodeType === 1 ? target : target.parentElement;
    };

    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      /* Snap into place on the first movement so the cursor doesn't sweep in. */
      if (!hasMoved) {
        hasMoved = true;
        ringPos.x = dotPos.x = pointer.x;
        ringPos.y = dotPos.y = pointer.y;
        paint();
      }

      layer.classList.remove("is-hidden");

      /* Only re-walk the DOM when the pointer crosses onto a new element. */
      const element = toElement(event);
      if (element !== currentElement) {
        currentElement = element;
        applyState(element);
      }
      startLoop();
    };

    /* Scrolling moves elements underneath a still pointer — re-check the hover state. */
    const onScroll = () => {
      if (!hasMoved || scrollScheduled) return;
      scrollScheduled = true;
      window.requestAnimationFrame(() => {
        scrollScheduled = false;
        const element = document.elementFromPoint(pointer.x, pointer.y);
        if (element !== currentElement) {
          currentElement = element;
          applyState(element);
        }
      });
    };

    const onDown = (event) => {
      if (event.button !== 0) return;
      layer.classList.add("is-active");
    };

    const onUp = () => layer.classList.remove("is-active");

    /* Only fires once the pointer truly leaves the document. */
    const onLeave = () => {
      layer.classList.add("is-hidden");
      layer.classList.remove("is-hover", "is-active", "is-text");
      /* Forget the element so the state is re-read when the pointer returns. */
      currentElement = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    /* Losing window focus hides the cursor the same way leaving the window does. */
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    paint();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
      root.classList.remove("cursor-fx");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="cursor-layer is-hidden"
    >
      <div ref={ringRef} className="cursor-anchor">
        <span className="cursor-ring" />
      </div>
      <div ref={dotRef} className="cursor-anchor">
        <span className="cursor-dot" />
      </div>
    </div>
  );
}
