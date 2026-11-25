import type { Metadata } from "next";
import { FinalCta, PageHero, PhotoCollage, RecentWork, Reviews, Stats } from "@/components/sections";
import { collages, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Veteran-Owned Lawn Care in Hampton Roads",
  description:
    "Immaculate Lawncare is owned by local native Billy James and run by retired first responders and military veterans. Reliable lawn care across Hampton Roads, VA.",
  alternates: { canonical: "/about-us" },
};

const values = [
  {
    title: "Show up on time",
    body: "Same day, same crew, same crisp finish. Reliability is the whole point of hiring a lawn company.",
  },
  {
    title: "Respect your home",
    body: "We treat every property like our own and leave it cleaner than we found it, down to the last clipping.",
  },
  {
    title: "Never cut corners",
    body: "No rushed jobs and no shortcuts. Every visit meets the Immaculate Standard, every single time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Immaculate Lawncare"
        title="Hampton Roads' veteran-owned lawn care company."
        intro={<p>Built on a simple principle: service is in our DNA.</p>}
      />

      <section aria-labelledby="story-title" className="container-site pb-20 lg:pb-32">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
          <PhotoCollage photos={collages.about} smallInset eager />
          <div className="flex min-w-0 flex-1 flex-col gap-7">
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="display-lg">
              From the front lines to your front yard.
            </h2>
            <p className="text-lg leading-[30px] text-muted">
              Before we were transforming lawns, gardens and landscapes across Chesapeake, Virginia Beach and Norfolk,
              we were serving on the front lines. Immaculate Lawncare is owned and operated by local native{" "}
              {site.owner}, and our leadership team is made up of retired first responders and military veterans.
            </p>
            <p className="text-lg leading-[30px] text-muted">
              We spent our careers protecting our community and our country. Today we channel that same sense of duty,
              attention to detail and reliability into every lawn care, mulching and landscaping project we take on.
            </p>
            <p className="text-lg leading-[30px] text-muted">
              When you hire Immaculate, you aren&apos;t just getting a lawn crew. You&apos;re hiring a Hampton Roads
              team that shows up on time, respects your home, and refuses to cut corners.
            </p>
            <Stats />
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="px-3 md:px-6">
        <div className="mx-auto flex max-w-[1392px] flex-col gap-14 rounded-panel bg-ink px-5 py-20 md:px-10 lg:px-16 lg:py-28">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <p className="eyebrow !text-brand-bright">What we stand for</p>
            <h2 id="values-title" className="display-lg text-white">
              Three promises we make to every neighbor.
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title} className="flex flex-col gap-5 border-t border-white/18 pt-7">
                <span className="font-display text-[64px] leading-none font-extrabold tracking-[-0.045em] text-brand-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[26px] leading-[30px] font-bold tracking-[-0.02em] text-white">
                  {v.title}
                </h3>
                <p className="text-[17px] leading-7 text-white/74">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-20 lg:h-28" />
      <RecentWork />
      <Reviews />
      <FinalCta />
    </>
  );
}
