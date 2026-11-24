import type { StaticImageData } from "next/image";

import hero from "@/assets/images/hero-trimming.jpg";
import billy from "@/assets/images/billy-on-site.jpg";
import frontLawn from "@/assets/images/job-front-lawn.jpg";
import mulchFence from "@/assets/images/job-mulch-fence.jpg";
import sideYard from "@/assets/images/job-side-yard.jpg";
import trimmingFence from "@/assets/images/job-trimming-fence.jpg";
import curvedBed from "@/assets/images/job-curved-bed.jpg";
import lawnMower from "@/assets/images/service-lawn-mower.jpg";
import mulching from "@/assets/images/service-mulching.jpg";
import hedge from "@/assets/images/service-hedge.jpg";
import amber from "@/assets/images/avatar-amber.png";
import houseCurb from "@/assets/images/house-curb.jpg";

export const site = {
  name: "Immaculate Lawncare",
  legalName: "Immaculate Lawncare, LLC",
  owner: "Billy James",
  tagline: "Serving Hampton Roads with honor & excellence.",
  phoneDisplay: "(757) 477-4854",
  phoneHref: "tel:+17574774854",
  hours: "Mon – Fri, 9am – 5pm",
  region: "Hampton Roads, Virginia",
  /** Set NEXT_PUBLIC_SITE_URL to the production domain before launch. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  yearsInBusiness: 6,
  clientsServed: "300+",
  rating: "4.9",
} as const;

export const cities = [
  "Virginia Beach",
  "Chesapeake",
  "Norfolk",
  "Portsmouth",
  "Hampton",
  "Suffolk",
] as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/#work" },
  { label: "About", href: "/about-us" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/contact" },
] as const;

export const images = { hero, billy, curvedBed, amber, houseCurb };

/** Real job photos fanned across the homepage hero (Paper: "Hero D — Neighborhood Mosaic"). */
export const heroStrip = [
  { src: sideYard, alt: "Shaped shrubs and clean beds along a brick home's side yard" },
  { src: frontLawn, alt: "Freshly mowed front lawn of a brick home" },
  { src: mulchFence, alt: "Fresh mulch bed curving along a wooden fence" },
  { src: billy, alt: "Billy James, owner of Immaculate Lawncare, on a job site", position: "50% 100%" },
  { src: curvedBed, alt: "Striped lawn beside a mulched bed and iron fence" },
  { src: trimmingFence, alt: "Crew member trimming a backyard along the fence line" },
] as const;

export type Service = {
  slug: string;
  name: string;
  badge?: string;
  card: string;
  title: string;
  summary: string;
  metaDescription: string;
  image: StaticImageData;
  imageAlt: string;
  included: string[];
  sections: { heading: string; body: string }[];
};

export const services: Service[] = [
  {
    slug: "full-service-lawn-care",
    name: "Lawn Care & Maintenance",
    badge: "Most popular",
    card: "Weekly or bi-weekly mowing, string trimming, crisp edging and a full blow-off of every hard surface.",
    title: "Full-Service Lawn Care & Maintenance",
    summary:
      "Consistent, professional mowing, edging, trimming and turf care for homes in Virginia Beach, Chesapeake, Norfolk and the surrounding area.",
    metaDescription:
      "Weekly and bi-weekly lawn mowing, edging, trimming and turf care across Hampton Roads, VA. Veteran-owned, licensed and insured. Free quotes in 24 hours.",
    image: lawnMower,
    imageAlt: "Lawn mower cutting fresh green grass",
    included: [
      "Mowing at the right height for your grass type",
      "String trimming around fences, beds and trees",
      "Crisp edging along sidewalks and driveways",
      "Clippings blown off every hard surface",
      "Weed and turf-health check on every visit",
    ],
    sections: [
      {
        heading: "Lawn care built for Hampton Roads",
        body: "Our lawn maintenance program is designed for the climate, soil and seasons of Hampton Roads. From coastal lawns in Virginia Beach to suburban turf in Chesapeake and Norfolk, our licensed and insured team keeps your property looking its best year-round. Every visit includes mowing, edging, string trimming and hard-surface cleanup: the Immaculate Standard, every single time.",
      },
      {
        heading: "Local conditions, local know-how",
        body: "High humidity, clay-heavy soil, salt air near the coast and warm-season grasses all demand a different approach than turf elsewhere in Virginia. We know how to care for Bermuda, Zoysia, Centipede and Fescue across Virginia Beach, Chesapeake, Norfolk, Portsmouth, Hampton and Suffolk, so your lawn gets the right treatment at the right time.",
      },
      {
        heading: "Weed control and turf health",
        body: "A great lawn takes more than mowing. We keep an eye out for encroaching weeds, disease pressure and heat or drought stress on every visit, flag what we see, and recommend a fix. We treat your lawn like it's our own, because our reputation depends on it.",
      },
      {
        heading: "Scheduling you can count on",
        body: "The most common complaint about lawn companies is inconsistency. Immaculate was built to fix that. As a veteran and first-responder owned business, showing up on time and doing the job right is non-negotiable, for residential and commercial properties alike.",
      },
    ],
  },
  {
    slug: "mulching",
    name: "Mulching & Garden Beds",
    card: "Old mulch and weeds out, fresh premium mulch in at the right depth, and every bed re-edged clean.",
    title: "Mulching & Garden Bed Care",
    summary:
      "Fresh mulch installs, clean bed edging and ongoing garden bed care that gives your Hampton Roads home instant curb appeal.",
    metaDescription:
      "Professional mulching and garden bed care in Virginia Beach, Chesapeake, Norfolk and across Hampton Roads, VA. Bed cleanup, re-edging and fresh premium mulch.",
    image: mulching,
    imageAlt: "Crew shoveling fresh mulch into a wheelbarrow",
    included: [
      "Old mulch, debris and weeds cleared out",
      "Fresh, even layer of premium mulch at the right depth",
      "Every bed re-edged for a crisp border",
      "Weeding and weed-barrier installation",
      "Plant trimming, pruning and seasonal bed cleanup",
    ],
    sections: [
      {
        heading: "Why mulch matters here",
        body: "Hot summers, heavy rain and clay-rich soil make mulching especially important in Hampton Roads. A fresh layer regulates soil temperature, holds moisture through dry spells, suppresses weeds and prevents erosion during downpours. It's one of the best investments you can make in the long-term health of your trees, shrubs and beds.",
      },
      {
        heading: "Our mulching process",
        body: "We don't just dump mulch and leave. Every job starts by clearing and cleaning the beds — old mulch, debris and weeds out — before we lay a fresh, even layer of premium mulch at the correct depth. Then we re-edge every bed for a clean, defined border. Neighbors notice the difference right away.",
      },
      {
        heading: "Ongoing garden bed care",
        body: "Beyond mulching, we offer ongoing bed care: weeding and weed barrier, plant trimming and pruning, edging and border definition, and seasonal bed cleanup across Virginia Beach, Norfolk, Chesapeake and the rest of the region.",
      },
    ],
  },
  {
    slug: "seasonal-clean-ups",
    name: "Seasonal Cleanups",
    card: "Spring and fall leaf removal, pruning, bed prep and debris hauling, so your yard is ready for every season.",
    title: "Seasonal Lawn Cleanup & Leaf Removal",
    summary:
      "Spring and fall cleanups across Hampton Roads: leaf removal, pruning, garden bed prep and debris hauling, tailored to your yard.",
    metaDescription:
      "Spring and fall lawn cleanups, leaf removal, pruning and debris hauling in Virginia Beach, Chesapeake, Norfolk and across Hampton Roads, VA.",
    image: hedge,
    imageAlt: "Hedge trimmer shaping a green hedge",
    included: [
      "Leaf and winter debris removal",
      "Pruning shrubs and ornamental grasses",
      "Clearing and prepping garden beds",
      "Cutting back spent perennials",
      "Debris hauled away, not left at the curb",
    ],
    sections: [
      {
        heading: "Spring cleanup",
        body: "As your lawn wakes up from winter, spring is the most important time for a fresh start. We remove winter debris and dead foliage, prune shrubs and ornamental grasses, prep garden beds, dethatch where needed and check for signs of winter damage or disease.",
      },
      {
        heading: "Summer upkeep",
        body: "Hampton Roads summers bring intense heat, humidity and fast growth. We handle weeding, deadheading, mulch top-ups and turf monitoring to catch heat stress or pests early. Summer lawn care is all about consistency.",
      },
      {
        heading: "Fall cleanup",
        body: "Fall is our busiest season. Leaf removal, cutting back spent perennials, cleaning out beds and prepping turf for winter dormancy are all essential to a healthy spring. We haul the debris away so your property looks cared-for heading into the cooler months.",
      },
      {
        heading: "A plan for your yard",
        body: "No two yards are alike. Whether it's a large Virginia Beach property with mature trees or a tidy Chesapeake townhome that just needs a seasonal refresh, we build a cleanup plan around your yard and your schedule.",
      },
    ],
  },
];

export const gallery = [
  { src: frontLawn, alt: "Freshly mowed and edged front lawn of a brick home", caption: "Weekly mow & edge" },
  { src: mulchFence, alt: "Fresh dark mulch bed curving along a wooden fence line", caption: "Fresh mulch along the fence line" },
  { src: sideYard, alt: "Neatly shaped shrubs and clean beds along a side yard path", caption: "Shrub shaping & bed cleanup" },
  { src: trimmingFence, alt: "Crew member string trimming a backyard beside a fence", caption: "String trimming, crew on site" },
] as const;

export const reviews = [
  {
    quote:
      "True professionals. Trustworthy and experts at their craft. Highly recommended for anyone needing residential or commercial landscaping services in the Hampton Roads area.",
    name: "Brandon D.",
    source: "Trustpilot",
  },
  {
    quote:
      "Immaculate was super easy to contact and get a service scheduled. The work was top notch and pricing was very fair. Highly recommend!",
    name: "Tara J.",
    source: "Google",
  },
  {
    quote: "Super happy with Immaculate Lawn Care!",
    name: "Amber T.",
    source: "Google",
    avatar: amber,
  },
] as const;

/*
 * The first answer is the client's own copy. The rest were drafted from
 * statements elsewhere on the current site — confirm with Billy before launch.
 */
export const faqs = [
  {
    q: "What's included in a standard lawn care visit?",
    a: "Our “Immaculate Standard” covers mowing all turf areas, string trimming around fences, flower beds and trees, edging along sidewalks and driveways for a crisp finish, and blowing all debris off hard surfaces. We leave your property looking immaculate every single time.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. There's no obligation and no long-term commitment. You stay with us because you're happy with the work.",
  },
  {
    q: "Is your team licensed and insured?",
    a: "Yes. Immaculate Lawncare is fully licensed and insured, so your home and property are covered on every visit.",
  },
  {
    q: "How often should I schedule lawn maintenance?",
    a: "Most Hampton Roads lawns do best on a weekly or bi-weekly schedule during the growing season. We'll recommend the right rhythm for your grass type when we give you a quote.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Always. Call (757) 477-4854 or send the quote form and we'll get back to you within 24 hours with a free, no-obligation estimate.",
  },
  {
    q: "Can I book a one-time service instead of a plan?",
    a: "Yes. One-time mulching, seasonal cleanups and single visits are welcome. There's no recurring plan required.",
  },
] as const;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
