"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  deleteCategory,
  deleteProduct,
  upsertCategory,
  upsertProduct,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { isRemoteImageSrc, normalizeImageSrc } from "@/lib/media/image-url";

export function ProductsManager({ categories = [], products = [], demo }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  function run(action, formData, okMsg) {
    startTransition(async () => {
      const res = await action(formData);
      if (res?.error) setMessage(res.error);
      else {
        setMessage(okMsg);
        setEditingProduct(null);
        setEditingCategory(null);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-10">
      {demo ? (
        <p className="rounded-md border border-gold/30 bg-white px-3 py-2 text-sm text-graphite">
          Demo mode — forms need Supabase to persist. Showing local reference data structure.
        </p>
      ) : null}
      {message ? <p className="text-sm text-gold-dark">{message}</p> : null}

      <section className="rounded-lg border border-gold/20 bg-white p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">
          {editingCategory ? "Edit category" : "Add category"}
        </h2>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-2"
          action={(fd) => run(upsertCategory, fd, "Category saved")}
          key={editingCategory?.id || "new-cat"}
        >
          {editingCategory ? <input type="hidden" name="id" value={editingCategory.id} /> : null}
          <input
            name="name"
            required
            placeholder="Name"
            defaultValue={editingCategory?.name || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <input
            name="slug"
            placeholder="slug-optional"
            defaultValue={editingCategory?.slug || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            defaultValue={editingCategory?.description || ""}
            className="sm:col-span-2 rounded-md border border-graphite/25 px-3 py-2"
            rows={3}
          />
          <input
            name="sort_order"
            type="number"
            defaultValue={editingCategory?.sort_order ?? 0}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={editingCategory?.is_active !== false}
            />
            Active
          </label>
          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit" disabled={pending || demo}>
              Save category
            </Button>
            {editingCategory ? (
              <Button type="button" variant="ghost" onClick={() => setEditingCategory(null)}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>

        <ul className="mt-6 divide-y divide-gold/10">
          {categories.map((c) => (
            <li key={c.id || c.slug} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div className="flex items-center gap-3">
                {c.image_url ? (
                  <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded border border-gold/20">
                    <Image
                      src={normalizeImageSrc(c.image_url)}
                      alt=""
                      fill
                      unoptimized={isRemoteImageSrc(c.image_url)}
                      className="object-cover"
                      sizes="56px"
                    />
                  </span>
                ) : null}
                <div>
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-graphite">{c.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="secondary" onClick={() => setEditingCategory(c)}>
                  Edit
                </Button>
                {c.id ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={demo}
                    onClick={() =>
                      startTransition(async () => {
                        const res = await deleteCategory(c.id);
                        setMessage(res.error || "Category deleted");
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
      </section>

      <section className="rounded-lg border border-gold/20 bg-white p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">
          {editingProduct ? "Edit product" : "Add product"}
        </h2>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-2"
          action={(fd) => run(upsertProduct, fd, "Product saved")}
          key={editingProduct?.id || "new-prod"}
        >
          {editingProduct ? <input type="hidden" name="id" value={editingProduct.id} /> : null}
          <input type="hidden" name="image_url" value={editingProduct?.image_url || ""} />
          <input
            name="name"
            required
            placeholder="Name"
            defaultValue={editingProduct?.name || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <input
            name="slug"
            placeholder="slug-optional"
            defaultValue={editingProduct?.slug || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <select
            name="category_id"
            required={!demo}
            defaultValue={editingProduct?.category_id || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id || c.slug} value={c.id || ""}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            name="thickness_options"
            placeholder="Thicknesses comma-separated"
            defaultValue={(editingProduct?.thickness_options || []).join(", ")}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            defaultValue={editingProduct?.description || ""}
            className="sm:col-span-2 rounded-md border border-graphite/25 px-3 py-2"
            rows={3}
          />
          <textarea
            name="use_cases"
            placeholder="Use cases"
            defaultValue={editingProduct?.use_cases || ""}
            className="sm:col-span-2 rounded-md border border-graphite/25 px-3 py-2"
            rows={2}
          />
          <div className="sm:col-span-2 space-y-2">
            {editingProduct?.image_url ? (
              <div className="relative h-28 w-40 overflow-hidden rounded-md border border-gold/20">
                <Image
                  src={normalizeImageSrc(editingProduct.image_url)}
                  alt="Current product"
                  fill
                  unoptimized={isRemoteImageSrc(editingProduct.image_url)}
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
            defaultValue={editingProduct?.sort_order ?? 0}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={editingProduct?.is_active !== false}
            />
            Active
          </label>
          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit" disabled={pending || demo}>
              Save product
            </Button>
            {editingProduct ? (
              <Button type="button" variant="ghost" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>

        <ul className="mt-6 divide-y divide-gold/10">
          {products.map((p) => (
            <li key={p.id || p.slug} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div className="flex items-center gap-3">
                {p.image_url ? (
                  <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded border border-gold/20">
                    <Image
                      src={normalizeImageSrc(p.image_url)}
                      alt=""
                      fill
                      unoptimized={isRemoteImageSrc(p.image_url)}
                      className="object-cover"
                      sizes="56px"
                    />
                  </span>
                ) : null}
                <div>
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-graphite">
                    {(p.thickness_options || []).join(" · ")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="secondary" onClick={() => setEditingProduct(p)}>
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
                        const res = await deleteProduct(p.id);
                        setMessage(res.error || "Product deleted");
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
      </section>
    </div>
  );
}
