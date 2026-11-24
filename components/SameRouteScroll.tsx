"use client";

import { useEffect } from "react";

const trimSlash = (path: string) => path.replace(/\/+$/, "");

/**
 * Next's router does nothing when a link points at the URL you're already on:
 * the logo on the home page, "Contact" on /contact, or "Our work" while the URL
 * is already /#work. A browser would scroll to the top of the page or back to
 * the section, so this restores that. Every other link is left to Next.
 */
export function SameRouteScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;

      const to = new URL(link.href);
      const here = window.location;
      const samePage =
        to.origin === here.origin && trimSlash(to.pathname) === trimSlash(here.pathname) && to.search === here.search;
      if (!samePage || to.hash !== here.hash) return;

      // No behavior option: the CSS scroll-behavior applies, so this is smooth
      // unless the visitor prefers reduced motion.
      const target = to.hash ? document.getElementById(decodeURIComponent(to.hash.slice(1))) : null;
      if (target) target.scrollIntoView();
      else window.scrollTo({ top: 0 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
