import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

/** Thumb-reachable Call / Quote bar shown on phones only. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-white px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(23,21,18,0.08)] lg:hidden">
      <a
        href={site.phoneHref}
        className="inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-ink font-bold text-ink"
      >
        <PhoneIcon size={18} />
        Call
      </a>
      <Link
        href="/contact"
        className="inline-flex h-[52px] flex-[1.6] items-center justify-center rounded-full bg-brand font-bold text-white"
      >
        Get a free quote
      </Link>
    </div>
  );
}
