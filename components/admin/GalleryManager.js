"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import {
  deleteGalleryImage,
  toggleGalleryActive,
  upsertGalleryImage,
} from "@/app/admin/actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Button } from "@/components/ui/Button";
import { isRemoteImageSrc, normalizeImageSrc } from "@/lib/media/image-url";

export function GalleryManager({ images = [], demo }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);
  const mediaApi = useRef(null);

  return (
    <div className="space-y-6">
      {demo ? (
        <p className="rounded-md border border-gold/30 bg-white px-3 py-2 text-sm text-graphite">
          Demo mode — uploads require Supabase Storage bucket <code>media</code>.
        </p>
      ) : null}
      {message ? <p className="text-sm text-gold-dark">{message}</p> : null}

      <form
        key={editing?.id || "new"}
        className="grid gap-3 rounded-lg border border-gold/20 bg-white p-5 shadow-card sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          mediaApi.current?.appendToFormData(fd);
          const file = fd.get("image_file_0");
          if (file && typeof file === "object" && file.size > 0) {
            fd.set("file", file);
          }
          const metaRaw = fd.get("images_meta");
          if (metaRaw) {
            try {
              const meta = JSON.parse(String(metaRaw));
              if (Array.isArray(meta) && meta[0]?.url && !(file && file.size > 0)) {
                fd.set("image_url", meta[0].url);
              }
            } catch {
              /* ignore */
            }
          }
          startTransition(async () => {
            const res = await upsertGalleryImage(fd);
            setMessage(res.error || (editing ? "Image updated" : "Image added"));
            if (!res.error) {
              setEditing(null);
              router.refresh();
            }
          });
        }}
      >
        <h2 className="font-display text-xl font-semibold text-ink sm:col-span-2">
          {editing ? "Edit gallery image" : "Add gallery image"}
        </h2>
        {editing?.id ? <input type="hidden" name="id" value={editing.id} /> : null}
        <input type="hidden" name="image_url" value={editing?.image_url || ""} />
        <input type="hidden" name="storage_path" value={editing?.storage_path || ""} />
        <input
          name="title"
          placeholder="Title"
          defaultValue={editing?.title || ""}
          className="rounded-md border border-graphite/25 px-3 py-2"
        />
        <input
          name="caption"
          placeholder="Caption"
          defaultValue={editing?.caption || ""}
          className="rounded-md border border-graphite/25 px-3 py-2"
        />
        <input
          name="sort_order"
          type="number"
          defaultValue={editing?.sort_order ?? 0}
          className="rounded-md border border-graphite/25 px-3 py-2"
        />
        {editing ? (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={editing?.is_active !== false}
            />
            Active
          </label>
        ) : (
          <div />
        )}
        <div className="sm:col-span-2">
          <MediaUploader
            key={`gallery-media-${editing?.id || "new"}`}
            apiRef={mediaApi}
            label="Gallery image"
            maxFiles={1}
            initialImages={
              editing?.image_url ? [{ url: editing.image_url, alt: editing.title || "" }] : []
            }
          />
        </div>
        <div className="flex gap-2 sm:col-span-2">
          <Button type="submit" disabled={pending || demo}>
            {editing ? "Save changes" : "Upload / add"}
          </Button>
          {editing ? (
            <Button type="button" variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => {
          const src = normalizeImageSrc(img.image_url);
          return (
            <div
              key={img.id}
              className="overflow-hidden rounded-lg border border-gold/20 bg-white shadow-card"
            >
              <div className="relative aspect-[4/3]">
                {src ? (
                  <Image
                    src={src}
                    alt={img.title || "Gallery"}
                    fill
                    unoptimized={isRemoteImageSrc(img.image_url)}
                    className="object-cover"
                    sizes="33vw"
                  />
                ) : null}
              </div>
              <div className="space-y-2 p-3">
                <p className="font-medium text-ink">{img.title || "Untitled"}</p>
                <p className="text-xs text-graphite">{img.is_active ? "Active" : "Hidden"}</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditing(img)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    disabled={demo}
                    onClick={() =>
                      startTransition(async () => {
                        const res = await toggleGalleryActive(img.id, !img.is_active);
                        setMessage(res.error || "Updated");
                        if (!res.error) router.refresh();
                      })
                    }
                  >
                    {img.is_active ? "Hide" : "Show"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={demo}
                    onClick={() =>
                      startTransition(async () => {
                        const res = await deleteGalleryImage(img.id, img.storage_path);
                        setMessage(res.error || "Deleted");
                        if (!res.error) {
                          if (editing?.id === img.id) setEditing(null);
                          router.refresh();
                        }
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
