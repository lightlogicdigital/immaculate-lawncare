import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { ArrowIcon, PinIcon, Stars } from "@/components/icons";
import {
  AboutTeaser,
  Faq,
  FinalCta,
  HowItWorks,
  RecentWork,
  Reviews,
  ServiceArea,
  ServicesGrid,
  TrustStrip,
} from "@/components/sections";
import { cities, heroStrip, reviews, site } from "@/lib/site";

/* Per-photo tilt and vertical offset for the fanned strip, matching the Paper design. */
const fan = [
  "-rotate-4 mt-6 md:mt-10",
  "rotate-2",
  "-rotate-2 mt-4 md:mt-7",
  "rotate-3",
  "-rotate-3 mt-5 md:mt-[34px]",
  "rotate-2 mt-1",
];

/** Direction D — "Neighborhood mosaic": centered pitch over a fan of real job photos. */
function Hero() {
  const quote = reviews[1];
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden pb-12 md:pb-16">
      <div className="container-site flex flex-col items-center gap-6 pt-10 text-center md:gap-[26px] md:pt-14">
        <p className="inline-flex items-center gap-2.5 rounded-full bg-surface py-1.5 pr-4 pl-1.5 text-[13px] font-semibold text-ink md:py-2 md:pr-[18px] md:pl-2 md:text-sm">
          <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <PinIcon size={14} />
          </span>
          <span className="md:hidden">Proudly serving Hampton Roads, VA</span>
          <span className="hidden md:inline">{cities.join(" · ")}</span>
        </p>

        <h1 id="hero-title" className="display-xl max-w-[1180px]">
          The lawn crew your neighbors recommend.
        </h1>

        <p className="max-w-[600px] text-lg leading-[29px] text-muted md:text-xl md:leading-8">
          Veteran-owned mowing, mulching and seasonal cleanups across Hampton Roads. Free quote within 24 hours.
        </p>

        <div className="hidden items-center gap-3.5 sm:flex">
          <ButtonLink href="/contact" size="lg">
            Get my free quote <ArrowIcon size={18} />
          </ButtonLink>
          <ButtonLink href="/#work" size="lg" variant="outline">
            See our work
          </ButtonLink>
        </div>

        {/* Phones: the floating chips don't fit, so show the proof inline instead. */}
        <p className="flex items-center gap-2 text-sm font-semibold text-ink md:hidden">
          <span className="font-extrabold">{site.clientsServed}</span>
          <span className="text-muted">happy clients</span>
        </p>
      </div>

      <div className="mt-10 flex justify-center md:mt-14">
        <div className="relative w-max shrink-0">
          <ul className="flex items-start gap-3 md:gap-[18px]">
            {heroStrip.map((photo, i) => (
              <li
                key={photo.alt}
                className={`relative h-[188px] w-[150px] shrink-0 overflow-hidden rounded-[18px] shadow-[0_12px_30px_rgba(23,21,18,0.10)] md:h-[300px] md:w-[240px] md:rounded-card ${fan[i]}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="eager"
                  sizes="(min-width: 768px) 240px, 150px"
                  className="object-cover"
                  style={"position" in photo ? { objectPosition: photo.position } : undefined}
                />
              </li>
            ))}
          </ul>

          <Link
            href="/#reviews"
            className="absolute top-[-16px] left-[310px] hidden -rotate-3 items-center gap-2.5 rounded-full bg-white py-2.5 pr-4 pl-2.5 shadow-[0_14px_34px_rgba(23,21,18,0.16)] transition-transform hover:-rotate-1 md:flex"
          >
            <span className="flex size-[34px] items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              {quote.name[0]}
            </span>
            <span className="flex flex-col items-start">
              <Stars size={12} className="text-star" />
              <span className="text-sm font-semibold text-ink">“The work was top notch.”</span>
            </span>
          </Link>

          <Link
            href="/#reviews"
            className="absolute top-[-28px] right-[240px] hidden rotate-3 items-center gap-2.5 rounded-full bg-ink px-[18px] py-3 shadow-[0_14px_34px_rgba(23,21,18,0.2)] transition-transform hover:rotate-1 md:flex"
          >
            <span className="font-display text-[22px] leading-none font-extrabold tracking-[-0.02em] text-white">
              {site.clientsServed}
            </span>
            <span className="text-sm font-semibold text-white/80">happy clients</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <HowItWorks />
      <AboutTeaser />
      <RecentWork />
      <Reviews />
      <ServiceArea />
      <Faq />
      <FinalCta />
    </>
  );
}
