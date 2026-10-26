import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";
import { DETAILED_SERVICES } from "../data/services.js";
import { getWhatsAppUrl, SITE } from "../data/content.js";

const INITIAL = {
  fullName: "",
  email: "",
  phone: "",
  contactMethod: "email",
  service: "",
  sessionType: "online",
  message: "",
  consent: false,
};

function validate(values) {
  const errors = {};
  if (!values.fullName.trim() || values.fullName.trim().length < 2)
    errors.fullName = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^\+?[\d\s\-()]{7,16}$/.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!values.service) errors.service = "Please choose a service.";
  if (!values.message.trim() || values.message.trim().length < 10)
    errors.message = "Please share a little more (at least 10 characters).";
  if (!values.consent)
    errors.consent = "Please accept the privacy policy to continue.";
  return errors;
}

const inputClasses =
  "w-full rounded-xl border bg-white px-3 py-2 text-sm text-[#465044] placeholder:text-[#788276] transition focus:outline-none focus:ring-2 focus:ring-[#4B7F24]/25";
const okBorder = "border-border";
const errBorder = "border-rose-400";
const labelClasses = "mb-1.5 block text-xs font-semibold text-[#203B2B]";
const requiredMark = (
  <span className="text-rose-500" aria-hidden="true">
    {" "}
    *
  </span>
);

function FieldError({ name, errors }) {
  if (!errors[name]) return null;
  return (
    <p
      id={`${name}-error`}
      role="alert"
      className="mt-1.5 text-xs font-semibold text-rose-600"
    >
      {errors[name]}
    </p>
  );
}

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  const therapist = searchParams.get("therapist") || "";

  const [values, setValues] = useState(() => ({
    ...INITIAL,
    service: DETAILED_SERVICES.some((s) => s.title === preselectedService)
      ? preselectedService
      : "",
    message: therapist ? `I would like to book a session with ${therapist}. ` : "",
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const submissionInProgress = useRef(false);

  const setField = (name) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    submissionInProgress.current = false;
    setStatus("idle");
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);
  const invalid = (name) => (errors[name] ? true : undefined);

  function handleSubmit(e) {
    e.preventDefault();
    if (submissionInProgress.current) return;

    setStatus("idle");
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = document.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    const whatsappUrl = getWhatsAppUrl();
    if (!whatsappUrl) {
      setStatus("error");
      return;
    }

    const contactMethods = {
      email: "Email",
      phone: "Phone call",
      whatsapp: "WhatsApp",
    };
    const sessionTypes = {
      online: "Online",
      "in-person": "In-person",
      either: "Either / not sure",
    };
    const message = [
      `Hello ${SITE.name},`,
      "",
      "I would like to enquire about your counselling services.",
      "",
      `Full Name: ${values.fullName.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone Number: ${values.phone.trim()}`,
      `Interested Service: ${values.service}`,
      `Preferred Contact Method: ${contactMethods[values.contactMethod]}`,
      `Preferred Session Type: ${sessionTypes[values.sessionType]}`,
      "",
      "Message:",
      values.message.trim(),
      "",
      "Please let me know the next steps for booking a session.",
    ].join("\n");
    const enquiryUrl = getWhatsAppUrl(message);

    submissionInProgress.current = true;
    setStatus("opening");
    try {
      const whatsappWindow = window.open(enquiryUrl, "_blank");
      if (!whatsappWindow) {
        submissionInProgress.current = false;
        setStatus("error");
        return;
      }

      whatsappWindow.opener = null;
      setStatus("prepared");
    } catch (error) {
      console.error("Unable to open WhatsApp enquiry.", error);
      submissionInProgress.current = false;
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Counselling enquiry form"
      className="rounded-[22px] border border-[#E1E9DA] bg-white/95 p-5 shadow-[0_8px_24px_rgba(32,59,43,0.06)] sm:p-6"
    >
      {status === "error" && (
        <div
          role="alert"
          className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
        >
          {SITE.whatsapp.replace(/\D/g, "")
            ? "WhatsApp could not be opened. Please allow pop-ups for this site and try again, or contact us directly."
            : "The business WhatsApp number is not configured. Please contact us directly."}
        </div>
      )}

      <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClasses}>
            Full name{requiredMark}
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            aria-invalid={invalid("fullName")}
            aria-describedby={describedBy("fullName")}
            value={values.fullName}
            onChange={setField("fullName")}
            placeholder="Your name"
            className={`${inputClasses} ${errors.fullName ? errBorder : okBorder}`}
          />
          <FieldError name="fullName" errors={errors} />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email{requiredMark}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
            value={values.email}
            onChange={setField("email")}
            placeholder="you@example.com"
            className={`${inputClasses} ${errors.email ? errBorder : okBorder}`}
          />
          <FieldError name="email" errors={errors} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone number{requiredMark}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={invalid("phone")}
            aria-describedby={describedBy("phone")}
            value={values.phone}
            onChange={setField("phone")}
            placeholder="+1 555 000 0000"
            className={`${inputClasses} ${errors.phone ? errBorder : okBorder}`}
          />
          <FieldError name="phone" errors={errors} />
        </div>

        <div>
          <label htmlFor="service" className={labelClasses}>
            Service you're interested in{requiredMark}
          </label>
          <select
            id="service"
            name="service"
            required
            aria-invalid={invalid("service")}
            aria-describedby={describedBy("service")}
            value={values.service}
            onChange={setField("service")}
            className={`${inputClasses} ${errors.service ? errBorder : okBorder}`}
          >
            <option value="">Select a service…</option>
            {DETAILED_SERVICES.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — happy to be guided</option>
          </select>
          <FieldError name="service" errors={errors} />
        </div>
      </div>

      <fieldset className="mt-4">
        <legend className={labelClasses}>Preferred contact method</legend>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "email", label: "Email" },
            { value: "phone", label: "Phone call" },
            { value: "whatsapp", label: "WhatsApp" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-[#DDE8D3] bg-white px-3 py-1.5 text-xs font-medium text-[#465044] transition has-[:checked]:border-[#AFC79F] has-[:checked]:bg-[#F0F5E9] has-[:checked]:text-[#36591B]"
            >
              <input
                type="radio"
                name="contactMethod"
                value={option.value}
                checked={values.contactMethod === option.value}
                onChange={setField("contactMethod")}
                className="h-3.5 w-3.5 accent-[#4B7F24]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className={labelClasses}>Preferred session type</legend>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "online", label: "Online" },
            { value: "in-person", label: "In-person" },
            { value: "either", label: "Either / not sure" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-[#DDE8D3] bg-white px-3 py-1.5 text-xs font-medium text-[#465044] transition has-[:checked]:border-[#AFC79F] has-[:checked]:bg-[#F0F5E9] has-[:checked]:text-[#36591B]"
            >
              <input
                type="radio"
                name="sessionType"
                value={option.value}
                checked={values.sessionType === option.value}
                onChange={setField("sessionType")}
                className="h-3.5 w-3.5 accent-[#4B7F24]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4">
        <label htmlFor="message" className={labelClasses}>
          Message{requiredMark}
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message")}
          value={values.message}
          onChange={setField("message")}
          placeholder="Briefly share what's on your mind — as much or as little as you're comfortable with."
          className={`${inputClasses} resize-y ${errors.message ? errBorder : okBorder}`}
        />
        <FieldError name="message" errors={errors} />
      </div>

      <div className="mt-4">
        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[#687568]">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={setField("consent")}
            required
            aria-invalid={invalid("consent")}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#BFD1B2] accent-[#4B7F24]"
          />
          <span>
            I understand my information will be handled confidentially and I
            agree to the privacy policy.{requiredMark}
          </span>
        </label>
        <FieldError name="consent" errors={errors} />
      </div>

      {status === "prepared" && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-[#DDE8D3] bg-[#F4F7EF] px-4 py-3 text-sm leading-relaxed text-[#36591B]"
        >
          WhatsApp is open with your enquiry ready. Review it there and press
          Send when you’re ready. Your message has not been sent yet.
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status === "opening" || status === "prepared"}
          className="w-full bg-[#4B7F24] px-6 py-3 text-sm shadow-[0_5px_12px_rgba(75,127,36,0.18)] transition hover:bg-[#3F7026] sm:w-auto"
        >
          {status === "opening" ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-hidden="true"
              />
              Opening WhatsApp…
            </>
          ) : status === "prepared" ? (
            "WhatsApp Opened"
          ) : (
            <>
              Send Enquiry
              <Icon name="arrow-right" className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="text-[11px] leading-relaxed text-[#687568]">
          Please do not use this form for emergencies — see the emergency
          notice on this page.
        </p>
      </div>
    </form>
  );
}
