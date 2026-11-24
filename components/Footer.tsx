import Link from "next/link";
import { cities, services, site } from "@/lib/site";
import { Logo } from "./Logo";

const company = [
  { label: "About us", href: "/about-us" },
  { label: "Our work", href: "/#work" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-site flex flex-col gap-16 pt-20 pb-10 md:pt-[88px]">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-16">
          <div className="flex max-w-[340px] flex-col gap-5">
            <Logo tone="light" className="h-[84px] self-start" />
            <p className="leading-[26px] text-white/72">
              Serving Hampton Roads with honor &amp; excellence. Veteran and first-responder owned, licensed and
              insured.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 lg:flex lg:gap-20">
            <div className="flex flex-col gap-3.5 lg:w-[220px]">
              <h2 className="eyebrow !text-brand-bright">Services</h2>
              <ul className="flex flex-col gap-3.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="font-medium hover:text-brand-bright">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3.5 lg:w-[120px]">
              <h2 className="eyebrow !text-brand-bright">Company</h2>
              <ul className="flex flex-col gap-3.5">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="font-medium hover:text-brand-bright">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 flex flex-col gap-3.5 sm:col-span-1 lg:w-[220px]">
              <h2 className="eyebrow !text-brand-bright">Get in touch</h2>
              <a
                href={site.phoneHref}
                className="font-display text-2xl font-bold tracking-[-0.02em] hover:text-brand-bright"
              >
                {site.phoneDisplay}
              </a>
              <p className="leading-6 text-white/72">
                {site.hours}
                <br />
                {site.region}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/14 pt-7 text-sm font-medium text-white/60 md:flex-row md:justify-between">
          <p>© 2026 {site.legalName}</p>
          <p>{cities.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
