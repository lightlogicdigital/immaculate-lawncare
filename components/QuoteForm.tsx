"use client";

import { useActionState } from "react";
import { requestQuote, type QuoteState } from "@/lib/quote";
import { cities, services, site } from "@/lib/site";
import { ArrowIcon, CheckIcon } from "./icons";

const initial: QuoteState = { status: "idle" };

const field =
  "h-[54px] w-full rounded-2xl border-[1.5px] border-line bg-white px-4 text-[17px] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-brand";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-[15px] font-bold text-ink">
      {children}
      {optional ? <span className="ml-1.5 font-medium text-muted">(optional)</span> : null}
    </label>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="text-sm font-semibold text-brand">
      {msg}
    </p>
  );
}

export function QuoteForm() {
  const [state, action, pending] = useActionState(requestQuote, initial);
  const e = state.errors ?? {};
  const v = state.values;

  if (state.status === "success") {
    return (
      <div
        role="status"
        // Bring the confirmation into view; on phones the taller form collapsing leaves it above the viewport.
        ref={(el) => el?.scrollIntoView({ block: "center" })}
        className="flex scroll-mt-28 flex-col items-start gap-5 rounded-panel bg-surface p-8 md:p-10"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white">
          <CheckIcon size={26} />
        </span>
        <h2 className="display-md">Thanks! We&apos;ll be in touch within 24 hours.</h2>
        <p className="text-[17px] leading-7 text-muted">
          A member of our team will reach out to schedule your free estimate. Need us sooner? Call{" "}
          <a href={site.phoneHref} className="font-bold whitespace-nowrap text-ink">
            {site.phoneDisplay}
          </a>
          .
        </p>
        {state.message ? <p className="text-sm text-muted">{state.message}</p> : null}
      </div>
    );
  }

  return (
    <form
      key={v ? JSON.stringify(v) : "blank"}
      action={action}
      noValidate
      className="flex flex-col gap-6 rounded-panel border-[1.5px] border-line p-6 md:p-10">
      <div className="flex flex-col gap-2">
        <h2 className="display-md">Request your free quote</h2>
        <p className="text-[15px] leading-6 text-muted">No obligation, no long-term commitment. We reply within 24 hours.</p>
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-2xl bg-brand/8 px-4 py-3 text-[15px] font-semibold text-brand">
          {state.message}
        </p>
      ) : null}

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Your name</Label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          defaultValue={v?.name}
          className={field}
          aria-invalid={!!e.name}
          aria-describedby={e.name ? "name-error" : undefined}
        />
        <FieldError id="name-error" msg={e.name} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone</Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={v?.phone}
            className={field}
            aria-invalid={!!e.contact}
            aria-describedby={e.contact ? "contact-error" : undefined}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={v?.email}
            className={field}
            aria-invalid={!!e.contact}
            aria-describedby={e.contact ? "contact-error" : undefined}
          />
        </div>
        <div className="sm:col-span-2">
          <FieldError id="contact-error" msg={e.contact} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="city">City</Label>
          <select
            id="city"
            name="city"
            defaultValue={v?.city ?? ""}
            className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23171512%22 stroke-width=%222.5%22 stroke-linecap=%22round%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat pr-10`}
            aria-invalid={!!e.city}
            aria-describedby={e.city ? "city-error" : undefined}
          >
            <option value="" disabled>
              Choose your city
            </option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Somewhere else nearby</option>
          </select>
          <FieldError id="city-error" msg={e.city} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="address" optional>
            Street address
          </Label>
          <input
            id="address"
            name="address"
            autoComplete="street-address"
            defaultValue={v?.address}
            className={field}
          />
        </div>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-[15px] font-bold text-ink">What can we help with?</legend>
        <div className="flex flex-wrap gap-2.5">
          {[...services.map((s) => s.name), "Not sure yet"].map((label) => (
            <label key={label} className="cursor-pointer">
              <input
                type="checkbox"
                name="services"
                value={label}
                defaultChecked={v?.services.includes(label)}
                className="peer sr-only"
              />
              <span className="inline-flex h-11 items-center rounded-full border-[1.5px] border-line px-4 text-[15px] font-semibold text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" optional>
          Anything else we should know?
        </Label>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={v?.message}
          className={`${field} h-auto resize-y py-3.5 leading-7`}
          placeholder="Lot size, gate codes, how often you'd like service…"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-[58px] items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-lg font-bold text-white transition-colors hover:bg-brand-hover disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send my quote request"}
        {pending ? null : <ArrowIcon size={18} />}
      </button>
    </form>
  );
}
