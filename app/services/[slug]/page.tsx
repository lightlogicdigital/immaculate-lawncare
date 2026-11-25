import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ButtonLink } from "@/components/Button";
import { ArrowIcon, PhoneIcon } from "@/components/icons";
import { Checklist, FinalCta, Reviews, SectionHeader } from "@/components/sections";
import { getService, services, site, type Service } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Hampton Roads, VA`,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

// Reading `params` happens inside <Suspense> so navigations stay instant (Partial Prefetching).
// The three known slugs are fully prerendered via generateStaticParams, so the fallback
// is only ever seen for unknown URLs on their way to the 404.
export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[80vh]" aria-busy="true" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="container-site pt-10 pb-16 md:pt-16 lg:pb-24">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm font-medium text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/services" className="hover:text-brand">
                Services
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {service.name}
            </li>
          </ol>
        </nav>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <p className="eyebrow">Hampton Roads, VA</p>
            <h1 className="display-xl">{service.title}</h1>
            <p className="max-w-[560px] text-lg leading-[30px] text-muted md:text-xl md:leading-8">{service.summary}</p>
            <div className="flex flex-wrap gap-3.5 pt-1">
              <ButtonLink href="/contact" size="lg">
                Get my free quote <ArrowIcon size={18} />
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="inline-flex h-[58px] items-center gap-2.5 rounded-full border-[1.5px] border-ink px-[26px] text-lg font-bold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <PhoneIcon size={18} />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-panel lg:w-[46%] lg:shrink-0">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              preload
              sizes="(min-width: 1024px) 46vw, 100vw"
              style={{ objectPosition: service.imagePosition }}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="included-title" className="bg-surface">
        <div className="container-site flex flex-col gap-10 py-20 lg:flex-row lg:gap-24 lg:py-28">
          <div className="flex flex-col gap-[18px] lg:sticky lg:top-32 lg:w-[400px] lg:shrink-0 lg:self-start">
            <p className="eyebrow">The Immaculate Standard</p>
            <h2 id="included-title" className="display-lg">
              What&apos;s included
            </h2>
            <Checklist items={service.included} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-12">
            {service.sections.map((sec) => (
              <article key={sec.heading} className="flex flex-col gap-4 border-t border-line pt-8 first:border-t-[1.5px] first:border-ink">
                <h3 className="display-md">{sec.heading}</h3>
                <p className="text-[17px] leading-[30px] text-muted">{sec.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfter service={service} />

      <JobPhotos service={service} />

      <Reviews />

      <section aria-labelledby="other-title" className="container-site pb-20 lg:pb-28">
        <h2 id="other-title" className="mb-8 font-display text-[32px] font-extrabold tracking-[-0.03em]">
          Other services
        </h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/services/${o.slug}`}
                className="group flex items-center gap-5 rounded-panel border-[1.5px] border-line p-4 pr-6 transition-colors hover:border-ink"
              >
                <span className="relative size-24 shrink-0 overflow-hidden rounded-2xl md:size-28">
                  <Image
                    src={o.image}
                    alt=""
                    fill
                    sizes="112px"
                    style={{ objectPosition: o.imagePosition }}
                    className="object-cover"
                  />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="display-md">{o.name}</span>
                  <span className="line-clamp-2 text-[15px] leading-6 text-muted">{o.card}</span>
                </span>
                <ArrowIcon size={20} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FinalCta />
    </>
  );
}

/** Bento grid of real job photos: the first is featured at 2×2 on desktop, full width on phones. */
function JobPhotos({ service }: { service: Service }) {
  const [featured, ...rest] = service.work ?? [];
  if (!featured) return null;
  return (
    <section aria-labelledby="job-photos-title" className="container-site flex flex-col gap-12 pt-20 lg:gap-14 lg:pt-28">
      <SectionHeader
        id="job-photos-title"
        eyebrow="Recent work"
        title="Fresh from the job site."
        aside={
          <p className="text-[17px] leading-7 text-muted">
            Real Hampton Roads properties, photographed by our crew on the job.
          </p>
        }
      />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        <li className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-card md:row-span-2 md:aspect-auto">
          <Image src={featured.src} alt={featured.alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
        </li>
        {rest.map((p, i) => (
          <li
            key={p.alt}
            // An odd count leaves the last photo alone on phones; let it span the row.
            className={`relative aspect-[3/2] overflow-hidden rounded-card ${
              rest.length % 2 && i === rest.length - 1 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              style={{ objectPosition: p.position }}
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Two-up before/after of the same spot. Labels sit on the photos; the alt text describes each one. */
function BeforeAfter({ service }: { service: Service }) {
  const ba = service.beforeAfter;
  if (!ba) return null;
  const pair = [
    { label: "Before", photo: ba.before, pill: "bg-white text-ink" },
    { label: "After", photo: ba.after, pill: "bg-brand text-white" },
  ];
  return (
    <section aria-labelledby="before-after-title" className="container-site flex flex-col gap-12 pt-20 lg:gap-14 lg:pt-28">
      <SectionHeader
        id="before-after-title"
        eyebrow="Before & after"
        title={ba.title}
        aside={<p className="text-[17px] leading-7 text-muted">{ba.caption}</p>}
      />
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        {pair.map(({ label, photo, pill }) => (
          <figure key={label} className="relative aspect-[4/5] overflow-hidden rounded-card md:aspect-square">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="50vw"
              style={{ objectPosition: photo.position }}
              className="object-cover"
            />
            <figcaption
              className={`absolute top-3 left-3 rounded-full px-3 py-1.5 text-[13px] font-bold tracking-[0.08em] uppercase md:top-5 md:left-5 ${pill}`}
            >
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
