import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { ArrowIcon } from "@/components/icons";
import { Checklist, Faq, FinalCta, HowItWorks, PageHero, TrustStrip } from "@/components/sections";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lawn Care, Mulching & Cleanup Services in Hampton Roads, VA",
  description:
    "Weekly lawn care, mulching and garden bed care, and seasonal cleanups across Virginia Beach, Chesapeake, Norfolk, Portsmouth, Hampton and Suffolk. Veteran-owned, licensed and insured.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything your yard needs. Nothing it doesn't."
        intro={
          <p>
            From weekly mowing to seasonal cleanups and fresh mulch, every service comes from a veteran-owned team
            that&apos;s licensed, insured and shows up exactly when we say we will. Not sure what you need? Call{" "}
            <a href={site.phoneHref} className="font-bold whitespace-nowrap text-ink hover:text-brand">
              {site.phoneDisplay}
            </a>{" "}
            for a free estimate.
          </p>
        }
      />
      <TrustStrip />

      <div className="container-site flex flex-col gap-20 py-20 lg:gap-28 lg:py-28">
        {services.map((s, i) => (
          <section
            key={s.slug}
            aria-labelledby={`svc-${s.slug}`}
            className={`flex flex-col gap-10 lg:items-center lg:gap-20 ${i % 2 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
          >
            <div className="relative aspect-[4/3.2] w-full overflow-hidden rounded-panel lg:w-[46%] lg:shrink-0">
              <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
              <span className="absolute top-5 left-5 rounded-full bg-white px-3 py-1.5 text-[13px] font-bold tracking-[0.08em] text-ink uppercase">
                {String(i + 1).padStart(2, "0")}
                {s.badge ? ` · ${s.badge}` : ""}
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <h2 id={`svc-${s.slug}`} className="display-lg">
                {s.name}
              </h2>
              <p className="text-lg leading-[30px] text-muted">{s.summary}</p>
              <Checklist items={s.included} />
              <div className="flex flex-wrap gap-3.5 pt-2">
                <ButtonLink href={`/services/${s.slug}`} size="lg">
                  Learn more <ArrowIcon size={18} />
                </ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="outline">
                  Get a free quote
                </ButtonLink>
              </div>
            </div>
          </section>
        ))}
      </div>

      <HowItWorks />
      <div className="h-20 lg:h-28" />
      <Faq />
      <FinalCta />
    </>
  );
}
