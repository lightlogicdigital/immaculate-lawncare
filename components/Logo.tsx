import Link from "next/link";
import { ScriptWordmark } from "./Brand";

/** Site logo: the Hometown Script wordmark, linked home. */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" aria-label="Immaculate Lawncare home" className={`inline-flex shrink-0 ${className}`}>
      <ScriptWordmark tone={tone} title="Immaculate Lawncare" className="h-full w-auto" />
    </Link>
  );
}
