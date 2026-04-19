import { useEffect } from "react";

function setMeta(selector, attr, value) {
  if (!value) return;
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const [attrName, attrValue] = selector.match(/\[([^=]+)="([^"]+)"\]/).slice(1);
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
}

function setCanonical(url) {
  if (!url) return;
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", url);
}

export default function useSeoMeta({ title, description }) {
  useEffect(() => {
    if (!title && !description) return;

    const url = window.location.href;

    if (title) document.title = title;

    setMeta('meta[name="description"]',        "content", description);
    setMeta('meta[property="og:title"]',       "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]',         "content", url);
    setMeta('meta[name="twitter:title"]',      "content", title);
    setMeta('meta[name="twitter:description"]',"content", description);
    setCanonical(url);
  }, [title, description]);
}
