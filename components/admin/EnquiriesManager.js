"use client";

import { useTransition, useState } from "react";
import { deleteEnquiry, updateEnquiryStatus } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { ENQUIRY_STATUSES } from "@/lib/constants";

export function EnquiriesManager({ enquiries = [], demo }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-4">
      {demo ? (
        <p className="rounded-md border border-gold/30 bg-white px-3 py-2 text-sm text-graphite">
          Demo mode — live enquiries appear after Supabase is connected.
        </p>
      ) : null}
      {message ? <p className="text-sm text-gold-dark">{message}</p> : null}

      <div className="overflow-x-auto rounded-lg border border-gold/20 bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gold/15 bg-ivory text-xs uppercase tracking-wide text-graphite">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-graphite">
                  No enquiries yet.
                </td>
              </tr>
            ) : (
              enquiries.map((row) => (
                <tr key={row.id} className="border-b border-gold/10 align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{row.name}</p>
                    <p className="mt-1 max-w-xs text-xs text-graphite">{row.message}</p>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`tel:${row.phone}`} className="text-gold-dark hover:underline">
                      {row.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-graphite">{row.project_type || "—"}</td>
                  <td className="px-4 py-3 text-graphite">{row.product_name || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={row.status}
                      disabled={demo || pending}
                      className="rounded border border-graphite/25 px-2 py-1"
                      onChange={(e) =>
                        startTransition(async () => {
                          const res = await updateEnquiryStatus(row.id, e.target.value);
                          setMessage(res.error || "Status updated");
                        })
                      }
                    >
                      {ENQUIRY_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={demo}
                      onClick={() =>
                        startTransition(async () => {
                          const res = await deleteEnquiry(row.id);
                          setMessage(res.error || "Deleted");
                        })
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
