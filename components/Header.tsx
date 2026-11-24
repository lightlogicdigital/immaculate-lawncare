"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    // Solid background on purpose: backdrop-filter would become the containing
    // block for the fixed mobile menu below and collapse it.
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-site flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
        <Logo className="h-[56px] lg:h-[70px]" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-ink transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 font-bold text-ink hover:text-brand">
            <PhoneIcon size={18} />
            {site.phoneDisplay}
          </a>
          <ButtonLink href="/contact">Get a free quote</ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[76px] bottom-0 overflow-y-auto bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex flex-col pt-4 pb-10">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between py-5 font-display text-[28px] font-bold tracking-[-0.02em] text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href="/contact" size="lg" onClick={close}>
              Get my free quote
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex h-[58px] items-center justify-center gap-2.5 rounded-full border-[1.5px] border-ink text-lg font-bold text-ink"
            >
              <PhoneIcon size={18} />
              {site.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 text-center text-sm text-muted">{site.hours} · Free quotes within 24 hours</p>
        </nav>
      </div>
    </header>
  );
}
