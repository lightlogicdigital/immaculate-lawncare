import { ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="container-site flex flex-col items-start gap-6 py-28">
      <p className="eyebrow">404</p>
      <h1 className="display-xl max-w-[760px]">This patch of lawn doesn&apos;t exist.</h1>
      <p className="max-w-[540px] text-lg leading-[30px] text-muted">
        The page you&apos;re looking for has moved or never existed. Head home, or call us at {site.phoneDisplay}.
      </p>
      <ButtonLink href="/" size="lg">
        Back to the homepage
      </ButtonLink>
    </section>
  );
}
