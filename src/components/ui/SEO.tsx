import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
}

export function SEO({ title, description, image }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes("AXON") ? title : `${title} — AXON`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }

    setMeta("og:title", fullTitle, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:card", "summary_large_image");

    if (image) {
      setMeta("og:image", image, "property");
      setMeta("twitter:image", image);
    }
  }, [title, description, image]);

  return null;
}

export function NavigationProgressBar() {
  useEffect(() => {
    let progressBar: HTMLDivElement | null = null;
    let progressFill: HTMLDivElement | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const showProgress = () => {
      if (progressBar) return;

      progressBar = document.createElement("div");
      progressBar.className = cn(
        "fixed top-0 left-0 right-0 h-0.5 z-progress pointer-events-none",
        "bg-transparent"
      );
      progressFill = document.createElement("div");
      progressFill.className = "h-full bg-primary-500 transition-all duration-300 ease-out";
      progressFill.style.width = "0%";
      progressBar.appendChild(progressFill);
      document.body.appendChild(progressBar);

      requestAnimationFrame(() => {
        if (progressFill) progressFill.style.width = "80%";
      });

      timer = setTimeout(() => {
        if (progressFill) progressFill.style.width = "100%";
        setTimeout(() => {
          progressBar?.remove();
          progressBar = null;
          progressFill = null;
        }, 200);
      }, 300);
    };

    const handlePopState = () => showProgress();
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (timer) clearTimeout(timer);
      progressBar?.remove();
    };
  }, []);

  return null;
}
