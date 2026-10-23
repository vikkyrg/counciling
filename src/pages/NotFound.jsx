import Seo from "../components/Seo.jsx";
import Button from "../components/Button.jsx";
import Icon from "../components/Icon.jsx";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you were looking for could not be found. Return home or explore our counselling services."
      />
      <section aria-labelledby="notfound-title" className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Icon name="leaf" className="h-8 w-8" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          404 — Page not found
        </p>
        <h1
          id="notfound-title"
          className="mt-4 text-4xl font-extrabold tracking-tight text-brand-900 sm:text-5xl"
        >
          This path doesn't lead anywhere
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          The page you're looking for may have moved. Take a breath — here are
          a few helpful directions instead.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/">
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
            Back to Home
          </Button>
          <Button to="/therapy" variant="secondary">
            Explore Therapy
          </Button>
          <Button to="/contact" variant="ghost">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
}
