"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PROJECT_TYPES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/constants";

export function ContactForm({ defaultProduct = "", projectTypes = PROJECT_TYPES }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      project_type: String(form.get("project_type") || "").trim(),
      message: String(form.get("message") || "").trim(),
      product_name: String(form.get("product_name") || "").trim() || null,
      status: "new",
    };

    if (!payload.name || !payload.phone || !payload.message) {
      setError("Please fill in name, phone, and message.");
      setStatus("idle");
      return;
    }

    if (!isSupabaseConfigured()) {
      setStatus("success");
      e.currentTarget.reset();
      return;
    }

    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from("enquiries").insert(payload);
      if (insertError) throw insertError;
      setStatus("success");
      e.currentTarget.reset();
      router.refresh();
    } catch (err) {
      setError(err.message || "Could not send enquiry. Please call us instead.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {defaultProduct ? (
        <input type="hidden" name="product_name" value={defaultProduct} />
      ) : null}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-md border border-graphite/25 bg-white px-3 py-2.5 text-charcoal focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="mt-1 w-full rounded-md border border-graphite/25 bg-white px-3 py-2.5 text-charcoal focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div>
        <label htmlFor="project_type" className="block text-sm font-medium text-ink">
          Project type
        </label>
        <select
          id="project_type"
          name="project_type"
          className="mt-1 w-full rounded-md border border-graphite/25 bg-white px-3 py-2.5 text-charcoal focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          defaultValue=""
        >
          <option value="">Select a segment</option>
          {projectTypes.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
          <option value="General enquiry">General enquiry</option>
        </select>
      </div>

      {!defaultProduct ? (
        <div>
          <label htmlFor="product_name" className="block text-sm font-medium text-ink">
            Product (optional)
          </label>
          <input
            id="product_name"
            name="product_name"
            className="mt-1 w-full rounded-md border border-graphite/25 bg-white px-3 py-2.5 text-charcoal focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </div>
      ) : (
        <p className="rounded-md border border-gold/25 bg-ivory px-3 py-2 text-sm text-charcoal">
          Enquiring about: <strong>{defaultProduct}</strong>
        </p>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md border border-graphite/25 bg-white px-3 py-2.5 text-charcoal focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      {status === "success" ? (
        <p className="text-sm text-green-800" role="status">
          Thank you — your enquiry was received. We will call you shortly.
          {!isSupabaseConfigured()
            ? " (Demo mode: connect Supabase to store submissions.)"
            : ""}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
