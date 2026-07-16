"use client";

import { useState, useTransition } from "react";
import { updateSettings } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";

export function SettingsForm({ settings, demo }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  return (
    <form
      className="max-w-xl space-y-4 rounded-lg border border-gold/20 bg-white p-6 shadow-card"
      action={(fd) => {
        startTransition(async () => {
          const res = await updateSettings(fd);
          setMessage(res.error || "Settings saved");
        });
      }}
    >
      {demo ? (
        <p className="text-sm text-graphite">
          Demo mode — values shown from defaults until Supabase is connected.
        </p>
      ) : null}
      {[
        ["company_name", "Company name"],
        ["tagline", "Tagline"],
        ["phone", "Primary phone"],
        ["phone_secondary", "Secondary phone"],
        ["email", "Email"],
        ["address", "Address"],
      ].map(([key, label]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-ink">
            {label}
          </label>
          <input
            id={key}
            name={key}
            defaultValue={settings[key] || ""}
            className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2"
          />
        </div>
      ))}
      {message ? <p className="text-sm text-gold-dark">{message}</p> : null}
      <Button type="submit" disabled={pending || demo}>
        Save settings
      </Button>
    </form>
  );
}
