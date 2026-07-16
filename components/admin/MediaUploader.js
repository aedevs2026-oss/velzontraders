"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  MEDIA_UPLOAD_ACCEPT,
  MEDIA_UPLOAD_HINT,
} from "@/lib/media/upload-client";
import { normalizeImageSrc } from "@/lib/media/image-url";

/**
 * Reusable local image uploader (Categories, Products, Accessories, Gallery, etc.).
 * Call `apiRef.current.appendToFormData(fd)` before invoking a server action.
 */
export function MediaUploader({
  apiRef,
  initialImages = [],
  maxFiles = 12,
  allowAlt = false,
  label = "Images",
  className = "",
}) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [items, setItems] = useState(() =>
    (initialImages || [])
      .filter((img) => img?.url)
      .map((img, index) => ({
        key: `existing-${index}-${img.url}`,
        url: img.url,
        alt: img.alt || "",
        preview: normalizeImageSrc(img.url),
        file: null,
      })),
  );
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const single = maxFiles === 1;

  const commit = useCallback(
    (next) => {
      setItems(next.slice(0, maxFiles));
      setError("");
    },
    [maxFiles],
  );

  useEffect(() => {
    if (!apiRef) return;
    apiRef.current = {
      appendToFormData(fd) {
        const meta = items.map((item, sort_order) => ({
          url: item.url || "",
          alt: item.alt || "",
          sort_order,
        }));
        fd.set("images_meta", JSON.stringify(meta));
        items.forEach((item, index) => {
          if (item.file) fd.append(`image_file_${index}`, item.file, item.file.name);
        });
      },
      getPrimaryUrl() {
        return items[0]?.url || null;
      },
      reset(nextImages = []) {
        commit(
          (nextImages || [])
            .filter((img) => img?.url)
            .map((img, index) => ({
              key: `existing-${index}-${img.url}`,
              url: img.url,
              alt: img.alt || "",
              preview: normalizeImageSrc(img.url),
              file: null,
            })),
        );
      },
    };
  }, [apiRef, items, commit]);

  function validateFile(file) {
    const ext = (file.name?.split(".").pop() || "").toLowerCase();
    const okType =
      ["image/jpeg", "image/png", "image/webp", "image/svg+xml"].includes(file.type) ||
      ["jpg", "jpeg", "png", "webp", "svg"].includes(ext);
    if (!okType) return "Only JPG, JPEG, PNG, WebP, or SVG allowed";
    if (file.size > 5 * 1024 * 1024) return "Each image must be 5 MB or smaller";
    return null;
  }

  function addFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    const room = maxFiles - items.length;
    if (!single && room <= 0) {
      setError(`Maximum ${maxFiles} images`);
      return;
    }
    const next = single ? [] : [...items];
    for (const file of files.slice(0, single ? 1 : Math.max(room, 1))) {
      const err = validateFile(file);
      if (err) {
        setError(err);
        continue;
      }
      next.push({
        key: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        url: "",
        alt: "",
        preview: URL.createObjectURL(file),
        file,
      });
    }
    commit(next);
  }

  function removeAt(index) {
    const target = items[index];
    if (target?.preview?.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(target.preview);
      } catch {
        /* ignore */
      }
    }
    commit(items.filter((_, i) => i !== index));
  }

  function move(index, dir) {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    const [row] = next.splice(index, 1);
    next.splice(j, 0, row);
    commit(next);
  }

  function replaceAt(index, file) {
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setError(err);
      return;
    }
    const next = [...items];
    const prev = next[index];
    if (prev?.preview?.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(prev.preview);
      } catch {
        /* ignore */
      }
    }
    next[index] = {
      ...prev,
      key: `repl-${Date.now()}`,
      url: "",
      preview: URL.createObjectURL(file),
      file,
    };
    commit(next);
  }

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-graphite">{MEDIA_UPLOAD_HINT}</p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`rounded-lg border border-dashed px-4 py-6 text-center transition ${
          dragOver ? "border-gold bg-gold/10" : "border-graphite/30 bg-ivory/60"
        }`}
      >
        <p className="text-sm text-charcoal">
          Drag & drop images here, or{" "}
          <button
            type="button"
            className="font-semibold text-gold-dark underline focus-gold"
            onClick={() => inputRef.current?.click()}
          >
            browse
          </button>
        </p>
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={MEDIA_UPLOAD_ACCEPT}
          multiple={!single}
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      {items.length ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item, index) => (
            <li
              key={item.key}
              className="flex gap-3 rounded-md border border-gold/20 bg-white p-2"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded border border-gold/15 bg-graphite/10">
                {item.preview ? (
                  <Image
                    src={item.preview}
                    alt={item.alt || "Preview"}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="112px"
                  />
                ) : null}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                {allowAlt ? (
                  <input
                    type="text"
                    value={item.alt}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...item, alt: e.target.value };
                      setItems(next);
                    }}
                    placeholder="Alt text"
                    className="rounded border border-graphite/25 px-2 py-1 text-xs"
                  />
                ) : null}
                <div className="mt-auto flex flex-wrap gap-1">
                  {!single ? (
                    <>
                      <button
                        type="button"
                        className="rounded border border-graphite/25 px-2 py-0.5 text-xs disabled:opacity-40"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="rounded border border-graphite/25 px-2 py-0.5 text-xs disabled:opacity-40"
                        onClick={() => move(index, 1)}
                        disabled={index === items.length - 1}
                      >
                        ↓
                      </button>
                    </>
                  ) : null}
                  <label className="cursor-pointer rounded border border-graphite/25 px-2 py-0.5 text-xs">
                    Replace
                    <input
                      type="file"
                      accept={MEDIA_UPLOAD_ACCEPT}
                      className="sr-only"
                      onChange={(e) => {
                        replaceAt(index, e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="rounded border border-graphite/25 px-2 py-0.5 text-xs text-red-700"
                    onClick={() => removeAt(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-graphite">No images yet — upload from your computer.</p>
      )}
    </div>
  );
}
