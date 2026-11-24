import type { Metadata } from "next";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { cities, images, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Lawn Care Quote in Hampton Roads, VA",
  description:
    "Request a free lawn care, mulching or seasonal cleanup quote from Immaculate Lawncare. We reply within 24 hours. Serving Virginia Beach, Chesapeake, Norfolk and beyond.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="container-site pt-12 pb-20 md:pt-20 lg:pb-28">
      <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-20">
        <div className="flex min-w-0 flex-col gap-8 lg:sticky lg:top-32 lg:w-[44%] lg:shrink-0">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">Free quote</p>
            <h1 className="display-xl">Let&apos;s get your lawn looking immaculate.</h1>
            <p className="text-lg leading-[30px] text-muted md:text-xl md:leading-8">
              Weekly mowing in Virginia Beach, mulch in Chesapeake, a fall cleanup in Norfolk — tell us what you need
              and a real person from our team will get back to you within 24 hours.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-line border-y border-line">
            <li>
              <a href={site.phoneHref} className="group flex items-center gap-4 py-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-brand text-white">
                  <PhoneIcon size={22} />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-muted">Prefer to talk? Give us a call</span>
                  <span className="font-display text-2xl font-bold tracking-[-0.02em] group-hover:text-brand">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 py-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-surface text-ink">
                <ClockIcon size={22} />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-muted">Office hours</span>
                <span className="text-lg font-bold">{site.hours}</span>
              </span>
            </li>
            <li className="flex items-center gap-4 py-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-surface text-ink">
                <PinIcon size={22} />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-muted">Serving</span>
                <span className="text-lg leading-7 font-bold">{cities.join(", ")}</span>
              </span>
            </li>
          </ul>

          <div className="flex items-center gap-4 rounded-card bg-surface p-4">
            <Image
              src={images.billy}
              alt="Billy James"
              width={64}
              height={64}
              className="size-16 shrink-0 rounded-2xl object-cover object-[50%_78%]"
            />
            <p className="text-[15px] leading-6 text-muted">
              <span className="block font-bold text-ink">Locally owned by {site.owner}.</span>
              Veteran and first-responder owned, licensed and insured, with no long-term contracts.
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
