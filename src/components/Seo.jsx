import { useEffect } from "react";

const SITE_NAME = "The Master Mind";

function setMetaTag(kind, key, value) {
  let meta = document.querySelector(`meta[${kind}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(kind, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", value);
}

/**
 * Sets the document title and meta description per route for SEO.
 * Render once at the top of each page component.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    setMetaTag("name", "description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:title", document.title);
    setMetaTag("property", "og:description", description);
    setMetaTag("name", "twitter:card", "summary");
    setMetaTag("name", "twitter:title", document.title);
    setMetaTag("name", "twitter:description", description);
  }, [title, description]);

  return null;
}
