/*
 * Quote request handling for the static site (GitHub Pages has no server).
 * The form posts JSON from the browser to NEXT_PUBLIC_FORM_ENDPOINT, a Formspree
 * (or similar) form URL set at build time. Without it, development logs the
 * request and production tells the visitor to call instead of dropping it.
 */

export type QuoteValues = {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  services: string[];
  message: string;
};

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "contact" | "city", string>>;
  /** Echoed back on error so React's post-action form reset doesn't wipe what the visitor typed. */
  values?: QuoteValues;
};

const CALL_US = "Please call (757) 477-4854 and we'll take care of you.";

const clean = (v: FormDataEntryValue | null, max = 500) => String(v ?? "").trim().slice(0, max);

export async function requestQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never see or fill this field.
  if (clean(formData.get("company"))) return { status: "success" };

  const data: QuoteValues = {
    name: clean(formData.get("name"), 120),
    phone: clean(formData.get("phone"), 40),
    email: clean(formData.get("email"), 200),
    city: clean(formData.get("city"), 60),
    address: clean(formData.get("address"), 200),
    services: formData.getAll("services").map((s) => clean(s, 60)).filter(Boolean),
    message: clean(formData.get("message"), 2000),
  };

  const errors: QuoteState["errors"] = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!data.phone && !data.email) errors.contact = "Add a phone number or email so we can reach you.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.contact = "That email doesn't look right.";
  if (!data.city) errors.city = "Pick the city closest to you.";
  if (Object.keys(errors).length) return { status: "error", errors, values: data, message: "Please fix the highlighted fields." };

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[quote request — NEXT_PUBLIC_FORM_ENDPOINT not set]", data);
      return { status: "success", message: "Dev mode: request logged to the browser console." };
    }
    return { status: "error", values: data, message: `Online requests are temporarily unavailable. ${CALL_US}` };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: `New quote request — ${data.name} (${data.city})`,
        name: data.name,
        phone: data.phone || "—",
        email: data.email || undefined,
        city: data.city,
        address: data.address || "—",
        services: data.services.join(", ") || "Not sure yet",
        message: data.message || "(no message)",
      }),
    });
    if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
  } catch (err) {
    console.error("Quote request failed", err);
    return { status: "error", values: data, message: `Something went wrong sending your request. ${CALL_US}` };
  }

  return { status: "success" };
}
