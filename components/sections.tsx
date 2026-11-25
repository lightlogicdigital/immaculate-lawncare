import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cities, faqs, gallery, images, reviews, services, site } from "@/lib/site";
import { ScriptPatch } from "./Brand";
import { ButtonLink, TextLink } from "./Button";
import {
  ArrowIcon,
  CheckIcon,
  ClockIcon,
  LicenseIcon,
  NoContractIcon,
  PhoneIcon,
  PinIcon,
  PlusIcon,
  ShieldIcon,
  Stars,
} from "./icons";

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */

export function SectionHeader({
  eyebrow,
  title,
  aside,
  tone = "dark",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  tone?: "dark" | "light";
  id?: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-16">
      <div className="flex max-w-[760px] flex-col gap-[18px]">
        <p className={`eyebrow ${tone === "light" ? "!text-brand-bright" : ""}`}>{eyebrow}</p>
        <h2 id={id} className={`display-lg ${tone === "light" ? "text-white" : "text-ink"}`}>
          {title}
        </h2>
      </div>
      {aside ? <div className="flex max-w-[400px] flex-col gap-[18px] lg:pb-1.5">{aside}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

const trust = [
  { icon: ShieldIcon, title: "Veteran-owned & operated", body: "Service is in our DNA." },
  { icon: LicenseIcon, title: "Licensed & insured", body: "Fully covered on every visit." },
  { icon: NoContractIcon, title: "No long-term contracts", body: "Stay because you want to." },
  { icon: ClockIcon, title: "Free quotes within 24 hrs", body: "Call or use the quick form." },
];

export function TrustStrip() {
  return (
    <section aria-label="Why homeowners choose us" className="container-site pb-6">
      <ul className="grid grid-cols-1 gap-6 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex items-start gap-4 lg:pr-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-surface text-ink">
              <Icon size={24} />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-[17px] font-bold text-ink">{title}</span>
              <span className="text-[15px] leading-[22px] text-muted">{body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services grid                                                       */
/* ------------------------------------------------------------------ */

export function ServicesGrid({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section aria-labelledby="services-title" className="container-site flex flex-col gap-14 py-20 lg:py-28">
      {withHeader ? (
        <SectionHeader
          id="services-title"
          eyebrow="What we do"
          title="Three services. One standard: immaculate."
          aside={
            <>
              <p className="text-[17px] leading-7 text-muted">
                Whether it&apos;s a weekly cut or a one-time spring refresh, every visit gets the same attention to
                detail.
              </p>
              <div>
                <TextLink href="/services">See all services</TextLink>
              </div>
            </>
          }
        />
      ) : null}
      <ul className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-7">
        {services.map((s, i) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="group flex flex-col gap-[22px]">
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-card">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  style={{ objectPosition: s.imagePosition }}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-[18px] left-[18px] rounded-full bg-white px-3 py-1.5 text-[13px] font-bold tracking-[0.08em] text-ink uppercase">
                  {String(i + 1).padStart(2, "0")}
                  {s.badge ? ` · ${s.badge}` : ""}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 pr-3">
                <h3 className="display-md text-ink">{s.name}</h3>
                <p className="leading-[26px] text-muted">{s.card}</p>
              </div>
              <span className="inline-flex items-center gap-2 font-bold text-ink transition-colors group-hover:text-brand">
                Learn more <ArrowIcon size={16} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

const steps = [
  {
    title: "Tell us about your yard",
    body: `Call ${site.phoneDisplay} or send the quick form. A real person gets back to you within 24 hours.`,
  },
  {
    title: "Get an honest, free quote",
    body: "We walk the property with you and give you a clear price. No pressure and no long-term contract.",
  },
  {
    title: "We show up. Every time.",
    body: "Same day each week, the same crisp finish, from a crew that respects your home and your time.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="px-3 md:px-6">
      <div className="mx-auto flex max-w-[1392px] flex-col gap-14 rounded-panel bg-ink px-5 py-20 md:px-10 lg:gap-[72px] lg:px-16 lg:pt-[104px] lg:pb-28">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <p className="eyebrow !text-brand-bright">How it works</p>
            <h2 id="how-title" className="display-lg text-white">
              A great lawn shouldn&apos;t be a hassle. Here&apos;s how easy it is.
            </h2>
          </div>
          <div>
            <ButtonLink href="/contact" size="lg">
              Start with step one <ArrowIcon size={18} />
            </ButtonLink>
          </div>
        </div>
        <ol className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-5 border-t border-white/18 pt-7">
              <span className="font-display text-[64px] leading-none font-extrabold tracking-[-0.045em] text-brand-bright lg:text-[72px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[26px] leading-[30px] font-bold tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="text-[17px] leading-7 text-white/74">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About teaser                                                        */
/* ------------------------------------------------------------------ */

export function Stats() {
  const stats = [
    { value: `${site.yearsInBusiness} yrs`, label: "Caring for local lawns" },
    { value: site.clientsServed, label: "Happy clients served" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-4 border-t border-line pt-8">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse gap-1">
          <dt className="text-sm font-medium text-muted md:text-[15px]">{s.label}</dt>
          <dd className="font-display text-[34px] leading-none font-extrabold tracking-[-0.035em] text-ink md:text-[48px]">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function PhotoCollage() {
  return (
    <div className="relative mx-auto aspect-[560/620] w-full max-w-[560px] shrink-0">
      <div className="absolute top-0 right-0 h-[84%] w-[72%] overflow-hidden rounded-panel">
        <Image
          src={images.billy}
          alt="Billy James, owner of Immaculate Lawncare, smiling on a job site"
          fill
          sizes="(min-width: 1024px) 400px, 72vw"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 h-[52%] w-[45%] -rotate-4 overflow-hidden rounded-card border-[6px] border-white shadow-[0_18px_40px_rgba(23,21,18,0.14)] md:border-8">
        <Image
          src={images.curvedBed}
          alt="Freshly mulched bed with ornamental grasses beside a striped lawn"
          fill
          sizes="(min-width: 1024px) 250px, 45vw"
          className="object-cover"
        />
      </div>
      <ScriptPatch className="absolute top-[3%] left-[1%] w-[36%] -rotate-8 drop-shadow-[0_14px_24px_rgba(23,21,18,0.22)]" />
    </div>
  );
}

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-title" className="container-site py-20 lg:py-32">
      <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
        <PhotoCollage />
        <div className="flex min-w-0 flex-1 flex-col gap-7">
          <p className="eyebrow">Meet the owner</p>
          <h2 id="about-title" className="display-lg">
            Service is in our DNA.
          </h2>
          <p className="text-lg leading-[30px] text-muted">
            Before we were caring for lawns in Chesapeake, Virginia Beach and Norfolk, we were serving on the front
            lines. Immaculate is owned and run by local native {site.owner}, with a team of retired first responders
            and military veterans.
          </p>
          <p className="text-lg leading-[30px] text-muted">
            We bring that same sense of duty to your yard: show up on time, respect your home, and never cut corners.
          </p>
          <Stats />
          <div>
            <TextLink href="/about-us">Read our story</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Recent work                                                         */
/* ------------------------------------------------------------------ */

export function RecentWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-surface">
      <div className="container-site flex flex-col gap-14 py-20 lg:pt-28 lg:pb-[120px]">
        <SectionHeader
          id="work-title"
          eyebrow="Recent work"
          title="Real yards. Real neighbors. Right here at home."
          aside={
            <p className="text-[17px] leading-7 text-muted">
              A few recent Hampton Roads properties, photographed by our crew on the job.
            </p>
          }
        />
        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:items-start md:gap-6 md:overflow-visible md:px-0">
          {gallery.map((g, i) => (
            <li
              key={g.caption}
              className={`flex w-[72vw] shrink-0 snap-start flex-col gap-3.5 md:w-auto ${i % 2 ? "md:pt-14" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-card">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 25vw, 72vw" className="object-cover" />
              </div>
              <p className="text-[15px] font-semibold text-ink">{g.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

function Initial({ name, tone }: { name: string; tone: "brand" | "light" }) {
  return (
    <span
      aria-hidden
      className={`flex size-11 shrink-0 items-center justify-center rounded-full text-base font-bold ${
        tone === "light" ? "bg-white text-brand" : "bg-brand text-white"
      }`}
    >
      {name[0]}
    </span>
  );
}

export function Reviews() {
  const [featured, second, third] = reviews;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="container-site py-20 lg:py-[120px]">
      <div className="flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <p className="eyebrow">Reviews</p>
            <h2 id="reviews-title" className="display-lg">
              Don&apos;t take our word for it. Take your neighbors&apos;.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr]">
          <figure className="flex flex-col justify-between gap-10 rounded-panel bg-brand p-8 text-white md:p-10">
            <div className="flex flex-col gap-5">
              <Stars size={22} />
              <blockquote className="font-display text-[24px] leading-[32px] font-bold tracking-[-0.02em] md:text-[28px] md:leading-9">
                “{featured.quote}”
              </blockquote>
            </div>
            <figcaption className="flex items-center gap-3">
              <Initial name={featured.name} tone="light" />
              <span className="flex flex-col">
                <span className="font-bold">{featured.name}</span>
                <span className="text-sm font-medium text-white/85">Review on {featured.source}</span>
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-6">
            <figure className="flex flex-col gap-6 rounded-panel border-[1.5px] border-line p-8">
              <Stars className="text-star" />
              <blockquote className="text-[19px] leading-[30px] font-medium text-ink">“{second.quote}”</blockquote>
              <figcaption className="flex items-center gap-3">
                <Initial name={second.name} tone="brand" />
                <span className="flex flex-col">
                  <span className="text-[15px] font-bold">{second.name}</span>
                  <span className="text-sm font-medium text-muted">{second.source} review</span>
                </span>
              </figcaption>
            </figure>
            <figure className="flex flex-col gap-4 rounded-panel bg-surface px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                {"avatar" in third && third.avatar ? (
                  <Image src={third.avatar} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                ) : null}
                <span className="flex flex-col gap-1">
                  <blockquote className="text-lg font-semibold text-ink">“{third.quote}”</blockquote>
                  <figcaption className="text-sm font-medium text-muted">
                    {third.name} · {third.source} review
                  </figcaption>
                </span>
              </div>
              <Stars size={16} className="shrink-0 text-star" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Service area                                                        */
/* ------------------------------------------------------------------ */

export function ServiceArea() {
  return (
    <section aria-labelledby="area-title" className="container-site pb-20 lg:pb-[120px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
        <div className="flex flex-col gap-[18px] lg:w-[520px] lg:shrink-0">
          <p className="eyebrow">Service area</p>
          <h2 id="area-title" className="font-display text-[36px] leading-[1.08] font-extrabold tracking-[-0.035em] md:text-[48px]">
            Proudly serving all of Hampton Roads.
          </h2>
          <p className="text-[17px] leading-7 text-muted">
            Don&apos;t see your neighborhood? Give us a call. If we can get a mower there, we&apos;ll make it work.
          </p>
        </div>
        <ul className="flex flex-1 flex-wrap gap-3 md:gap-3.5">
          {cities.map((city) => (
            <li
              key={city}
              className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-ink py-3 pr-5 pl-4 md:py-4 md:pr-[26px] md:pl-5"
            >
              <PinIcon className="text-brand" />
              <span className="font-display text-xl font-bold tracking-[-0.02em] md:text-2xl">{city}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-surface">
      <div className="container-site flex flex-col gap-12 py-20 lg:flex-row lg:items-start lg:gap-24 lg:py-28">
        <div className="flex flex-col gap-[18px] lg:sticky lg:top-32 lg:w-[440px] lg:shrink-0">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="display-lg">
            Good questions. Straight answers.
          </h2>
          <p className="text-[17px] leading-7 text-muted">
            Still wondering about something? Call{" "}
            <a href={site.phoneHref} className="font-bold whitespace-nowrap text-ink underline-offset-4 hover:underline">
              {site.phoneDisplay}
            </a>{" "}
            and you&apos;ll talk to a real person, not a phone tree.
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col border-t-[1.5px] border-ink">
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-line" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-xl leading-[1.3] font-bold tracking-[-0.015em] text-ink md:text-[23px]">
                  {f.q}
                </h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink text-ink transition-all group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white">
                  <PlusIcon size={16} />
                </span>
              </summary>
              <p className="-mt-2 pr-4 pb-7 text-[17px] leading-7 text-muted md:pr-16">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="p-3 md:p-6">
      <div className="mx-auto flex max-w-[1392px] flex-col items-center justify-between gap-12 overflow-hidden rounded-panel bg-brand px-6 py-16 md:px-10 lg:flex-row lg:gap-16 lg:px-16 lg:py-[88px]">
        <div className="flex max-w-[720px] flex-col gap-6">
          <h2
            id="cta-title"
            className="font-display text-[44px] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance text-white md:text-[72px]"
          >
            Ready for the best lawn on the block?
          </h2>
          <p className="text-lg leading-[30px] text-white/88 md:text-[19px]">
            Free quote within 24 hours. Serving {cities.slice(0, -1).join(", ")} and {cities.at(-1)}.
          </p>
          <div className="flex flex-col gap-3.5 pt-2 sm:flex-row">
            <ButtonLink href="/contact" variant="white" size="lg">
              Get my free quote <ArrowIcon size={18} />
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex h-[58px] items-center justify-center gap-2.5 rounded-full border-[1.5px] border-white/70 px-7 text-lg font-bold text-white transition-colors hover:bg-white hover:text-ink"
            >
              <PhoneIcon size={18} />
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="relative hidden aspect-[340/420] w-[340px] shrink-0 rotate-4 overflow-hidden rounded-card border-8 border-white md:block">
          <Image
            src={images.houseCurb}
            alt="Neatly kept front lawn and garden beds outside a brick home"
            fill
            sizes="340px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Inner-page hero                                                     */
/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="container-site pt-14 pb-14 md:pt-20 lg:pb-20">
      <div className="flex max-w-[920px] flex-col gap-6">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-xl">{title}</h1>
        {intro ? <div className="max-w-[640px] text-lg leading-[30px] text-muted md:text-xl md:leading-8">{intro}</div> : null}
        {children}
      </div>
    </section>
  );
}

export function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[17px] leading-7 text-ink">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <CheckIcon size={14} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
