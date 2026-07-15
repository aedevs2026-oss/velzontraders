"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProject, upsertProject } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { isRemoteImageSrc, normalizeImageSrc } from "@/lib/media/image-url";

export function ProjectsManager({ projects = [], demo }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);

  return (
    <div className="space-y-6">
      {demo ? (
        <p className="rounded-md border border-gold/30 bg-white px-3 py-2 text-sm text-graphite">
          Demo mode — connect Supabase to persist project content.
        </p>
      ) : null}
      {message ? <p className="text-sm text-gold-dark">{message}</p> : null}

      <section className="rounded-lg border border-gold/20 bg-white p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">
          {editing ? "Edit project type" : "Add project type"}
        </h2>
        <form
          key={editing?.id || "new"}
          className="mt-4 grid gap-3"
          action={(fd) => {
            startTransition(async () => {
              const res = await upsertProject(fd);
              setMessage(res.error || "Project saved");
              if (!res.error) {
                setEditing(null);
                router.refresh();
              }
            });
          }}
        >
          {editing?.id ? <input type="hidden" name="id" value={editing.id} /> : null}
          <input type="hidden" name="image_url" value={editing?.image_url || ""} />
          <input
            name="name"
            required
            placeholder="Name"
            defaultValue={editing?.name || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <input
            name="slug"
            placeholder="slug"
            defaultValue={editing?.slug || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Description"
            defaultValue={editing?.description || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <div className="space-y-2">
            {editing?.image_url ? (
              <div className="relative h-28 w-40 overflow-hidden rounded-md border border-gold/20">
                <Image
                  src={normalizeImageSrc(editing.image_url)}
                  alt="Current project"
                  fill
                  unoptimized={isRemoteImageSrc(editing.image_url)}
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            ) : null}
            <label className="block text-sm text-graphite">
              Image (JPG / PNG / WebP, max 5 MB)
              <input
                name="file"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="mt-1 block w-full text-sm"
              />
            </label>
          </div>
          <input
            name="sort_order"
            type="number"
            defaultValue={editing?.sort_order ?? 0}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_active" defaultChecked={editing?.is_active !== false} />
            Active
          </label>
          <div className="flex gap-2">
            <Button type="submit" disabled={pending || demo}>
              Save
            </Button>
            {editing ? (
              <Button type="button" variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </section>

      <ul className="divide-y divide-gold/10 rounded-lg border border-gold/20 bg-white shadow-card">
        {projects.map((p) => (
          <li key={p.id || p.slug} className="flex flex-wrap items-start justify-between gap-3 p-4">
            <div className="flex max-w-xl gap-3">
              {p.image_url ? (
                <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded border border-gold/20">
                  <Image
                    src={normalizeImageSrc(p.image_url)}
                    alt=""
                    fill
                    unoptimized={isRemoteImageSrc(p.image_url)}
                    className="object-cover"
                    sizes="80px"
                  />
                </span>
              ) : null}
              <div>
                <p className="font-display text-lg font-semibold text-ink">{p.name}</p>
                <p className="mt-1 text-sm text-graphite line-clamp-2">{p.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="secondary" onClick={() => setEditing(p)}>
                Edit
              </Button>
              {p.id ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  disabled={demo}
                  onClick={() =>
                    startTransition(async () => {
                      const res = await deleteProject(p.id);
                      setMessage(res.error || "Deleted");
                      if (!res.error) router.refresh();
                    })
                  }
                >
                  Delete
                </Button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
