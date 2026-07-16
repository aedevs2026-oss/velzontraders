"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { deleteAccessory, upsertAccessory } from "@/app/admin/actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Button } from "@/components/ui/Button";
import { isRemoteImageSrc, normalizeImageSrc } from "@/lib/media/image-url";

function linesFromArray(arr) {
  return (arr || []).join("\n");
}

function jsonPretty(value, fallback) {
  try {
    return JSON.stringify(value ?? fallback, null, 2);
  } catch {
    return JSON.stringify(fallback, null, 2);
  }
}

const EMPTY_COLORS = [
  { name: "Bare / Mill", hex: "#C0C0C0" },
  { name: "Off White", hex: "#F5F2E8" },
];

const EMPTY_FEATURES = [
  { title: "System matched", description: "", icon: "layers" },
];

const EMPTY_DOWNLOADS = {
  brochure: "",
  datasheet: "",
  installation_guide: "",
  warranty: "",
};

const EMPTY_RELATED = [
  { name: "Roofing Sheets", href: "/products/roofing-sheets", image_url: "/products/roofing-sheets.jpg" },
  { name: "PUF Panels", href: "/products/puff-sheets", image_url: "/products/puff-sheets.jpg" },
  { name: "Polycarbonate Sheets", href: "/contact?product=Polycarbonate%20Sheets", image_url: "" },
  { name: "Standing Seam", href: "/contact?product=Standing%20Seam", image_url: "" },
  { name: "Decking Sheets", href: "/products/decking-sheet-gi", image_url: "/products/decking-sheet-gi.jpg" },
  { name: "C & Z Purlins", href: "/contact?product=C%20%26%20Z%20Purlins", image_url: "" },
  { name: "Turbo Ventilators", href: "/products/roofing-accessories/turbo-ventilator", image_url: "" },
];

export function AccessoriesManager({ categories = [], accessories = [], demo }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);
  const mediaApi = useRef(null);
  const formKey = editing?.id || "new-accessory";

  const accessoryCategory =
    categories.find((c) => c.slug === "roofing-accessories") || categories[0];

  function startEdit(row) {
    setEditing(row);
    setMessage("");
  }

  function cancelEdit() {
    setEditing(null);
    setMessage("");
  }

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    mediaApi.current?.appendToFormData(fd);
    startTransition(async () => {
      const res = await upsertAccessory(fd);
      if (res?.error) setMessage(res.error);
      else {
        setMessage("Accessory saved");
        setEditing(null);
        router.refresh();
      }
    });
  }

  const d = editing || {};
  const detail = d.description_detail || {};
  const spec = d.specifications || {};

  return (
    <div className="space-y-8">
      {demo ? (
        <p className="rounded-md border border-gold/30 bg-white px-3 py-2 text-sm text-graphite">
          Demo mode — Supabase required to persist roofing accessories.
        </p>
      ) : null}
      {message ? <p className="text-sm text-gold-dark">{message}</p> : null}

      <section className="rounded-lg border border-gold/20 bg-white p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">
          {editing ? `Edit: ${editing.name}` : "Add roofing accessory"}
        </h2>
        <form key={formKey} className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          {editing?.id ? <input type="hidden" name="id" value={editing.id} /> : null}

          <input
            name="name"
            required
            placeholder="Name"
            defaultValue={d.name || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <input
            name="slug"
            placeholder="slug-optional"
            defaultValue={d.slug || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <select
            name="category_id"
            required={!demo}
            defaultValue={d.category_id || accessoryCategory?.id || ""}
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
            name="sort_order"
            type="number"
            defaultValue={d.sort_order ?? 0}
            className="rounded-md border border-graphite/25 px-3 py-2"
            placeholder="Display order"
          />
          <input
            name="short_description"
            placeholder="Short description (carousel card)"
            defaultValue={d.short_description || ""}
            className="sm:col-span-2 rounded-md border border-graphite/25 px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Summary description"
            defaultValue={d.description || ""}
            className="sm:col-span-2 rounded-md border border-graphite/25 px-3 py-2"
            rows={2}
          />

          <div className="sm:col-span-2">
            <MediaUploader
              key={`media-${formKey}`}
              apiRef={mediaApi}
              label="Product images (multiple)"
              maxFiles={12}
              allowAlt
              initialImages={
                Array.isArray(d.images) && d.images.length
                  ? d.images
                  : d.image_url
                    ? [{ url: d.image_url, alt: d.alt_text || "" }]
                    : []
              }
            />
          </div>

          <fieldset className="sm:col-span-2 grid gap-2 rounded-md border border-gold/15 p-3 sm:grid-cols-2">
            <legend className="px-1 text-sm font-semibold text-ink">Description sections</legend>
            {[
              ["desc_overview", "Overview", detail.overview],
              ["desc_purpose", "Purpose", detail.purpose],
              ["desc_benefits", "Benefits", detail.benefits],
              ["desc_installation", "Installation", detail.installation],
              ["desc_compatibility", "Compatibility", detail.compatibility],
              ["desc_corrosion", "Corrosion resistance", detail.corrosion_resistance],
              ["desc_weather", "Weather resistance", detail.weather_resistance],
              ["desc_usage", "Industrial / commercial usage", detail.industrial_commercial_usage],
            ].map(([name, label, value]) => (
              <label key={name} className="block text-xs text-graphite sm:col-span-2">
                {label}
                <textarea
                  name={name}
                  defaultValue={value || ""}
                  rows={2}
                  className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 text-sm text-ink"
                />
              </label>
            ))}
          </fieldset>

          <fieldset className="sm:col-span-2 grid gap-2 rounded-md border border-gold/15 p-3 sm:grid-cols-2">
            <legend className="px-1 text-sm font-semibold text-ink">Specifications</legend>
            {[
              ["spec_material", "Material", spec.material],
              ["spec_thickness", "Thickness", spec.thickness],
              ["spec_dimensions", "Dimensions", spec.dimensions],
              ["spec_finish", "Finish", spec.finish],
              ["spec_coating", "Coating", spec.coating],
              ["spec_surface_finish", "Surface finish", spec.surface_finish],
              ["spec_weight", "Weight", spec.weight],
              ["spec_uv", "UV resistance", spec.uv_resistance],
              ["spec_weather", "Weather resistance", spec.weather_resistance],
              ["spec_water", "Water resistance", spec.water_resistance],
              ["spec_heat", "Heat resistance", spec.heat_resistance],
              ["spec_fastening", "Fastening", spec.fastening],
              ["spec_compatible", "Compatible roofing sheets", spec.compatible_roofing_sheets],
              ["spec_maintenance", "Maintenance", spec.maintenance],
              ["spec_warranty", "Warranty", spec.warranty],
              ["spec_standard", "Manufacturing standard", spec.manufacturing_standard],
            ].map(([name, label, value]) => (
              <label key={name} className="block text-xs text-graphite">
                {label}
                <input
                  name={name}
                  defaultValue={value || ""}
                  className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 text-sm text-ink"
                />
              </label>
            ))}
          </fieldset>

          <label className="block text-xs text-graphite sm:col-span-2">
            Applications (one per line)
            <textarea
              name="applications"
              defaultValue={linesFromArray(d.applications)}
              rows={4}
              className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 text-sm text-ink"
              placeholder={"Industrial\nCommercial\nWarehouse"}
            />
          </label>

          <label className="block text-xs text-graphite sm:col-span-2">
            Colors JSON — [{`{ "name", "hex", "image_url?" }`}]
            <textarea
              name="colors_json"
              defaultValue={jsonPretty(d.colors?.length ? d.colors : EMPTY_COLORS, [])}
              rows={5}
              className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 font-mono text-xs text-ink"
            />
          </label>

          <label className="block text-xs text-graphite sm:col-span-2">
            Profiles JSON — [{`{ "name", "description", "image_url" }`}]
            <textarea
              name="profiles_json"
              defaultValue={jsonPretty(d.profiles || [], [])}
              rows={4}
              className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 font-mono text-xs text-ink"
            />
          </label>

          <label className="block text-xs text-graphite sm:col-span-2">
            Features JSON — [{`{ "title", "description", "icon" }`}]
            <textarea
              name="features_json"
              defaultValue={jsonPretty(d.features?.length ? d.features : EMPTY_FEATURES, [])}
              rows={4}
              className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 font-mono text-xs text-ink"
            />
          </label>

          <label className="block text-xs text-graphite sm:col-span-2">
            Downloads JSON — brochure, datasheet, installation_guide, warranty (URLs)
            <textarea
              name="downloads_json"
              defaultValue={jsonPretty(
                d.downloads && Object.keys(d.downloads).length ? d.downloads : EMPTY_DOWNLOADS,
                EMPTY_DOWNLOADS,
              )}
              rows={5}
              className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 font-mono text-xs text-ink"
            />
          </label>

          <label className="block text-xs text-graphite sm:col-span-2">
            Related products JSON — [{`{ "name", "href", "image_url" }`}]
            <textarea
              name="related_json"
              defaultValue={jsonPretty(
                d.related_items?.length ? d.related_items : EMPTY_RELATED,
                [],
              )}
              rows={8}
              className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 font-mono text-xs text-ink"
            />
          </label>

          <label className="block text-xs text-graphite sm:col-span-2">
            FAQs JSON — [{`{ "question", "answer" }`}]
            <textarea
              name="faqs_json"
              defaultValue={jsonPretty(d.faqs || [], [])}
              rows={4}
              className="mt-1 w-full rounded-md border border-graphite/25 px-3 py-2 font-mono text-xs text-ink"
            />
          </label>

          <input
            name="seo_title"
            placeholder="SEO title"
            defaultValue={d.seo_title || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <input
            name="alt_text"
            placeholder="Primary alt text"
            defaultValue={d.alt_text || ""}
            className="rounded-md border border-graphite/25 px-3 py-2"
          />
          <textarea
            name="meta_description"
            placeholder="Meta description"
            defaultValue={d.meta_description || ""}
            className="sm:col-span-2 rounded-md border border-graphite/25 px-3 py-2"
            rows={2}
          />
          <input
            name="keywords"
            placeholder="Keywords (comma-separated)"
            defaultValue={d.keywords || ""}
            className="sm:col-span-2 rounded-md border border-graphite/25 px-3 py-2"
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_active" defaultChecked={d.is_active !== false} />
            Active (published)
          </label>

          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <Button type="submit" disabled={pending || demo}>
              {editing ? "Save changes" : "Create accessory"}
            </Button>
            {editing ? (
              <Button type="button" variant="ghost" onClick={cancelEdit}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-gold/20 bg-white p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold text-ink">All accessories</h2>
        <ul className="mt-4 divide-y divide-gold/10">
          {accessories.map((row) => {
            const thumb =
              row.images?.[0]?.url || row.image_url || null;
            return (
              <li
                key={row.id || row.slug}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded border border-gold/20 bg-graphite/10">
                    {thumb ? (
                      <Image
                        src={normalizeImageSrc(thumb)}
                        alt=""
                        fill
                        unoptimized={isRemoteImageSrc(thumb)}
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : null}
                  </span>
                  <div>
                    <p className="font-medium text-ink">
                      {row.name}{" "}
                      <span className="text-xs font-normal text-graphite">
                        #{row.sort_order ?? 0}
                        {row.is_active === false ? " · draft" : ""}
                      </span>
                    </p>
                    <p className="text-xs text-graphite">{row.slug}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    href={`/products/roofing-accessories/${row.slug}`}
                  >
                    View
                  </Button>
                  <Button type="button" size="sm" variant="secondary" onClick={() => startEdit(row)}>
                    Edit
                  </Button>
                  {row.id ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={demo || pending}
                      onClick={() =>
                        startTransition(async () => {
                          const res = await deleteAccessory(row.id, row.slug);
                          setMessage(res.error || "Accessory deleted");
                          if (!res.error) {
                            if (editing?.id === row.id) setEditing(null);
                            router.refresh();
                          }
                        })
                      }
                    >
                      Delete
                    </Button>
                  ) : null}
                </div>
              </li>
            );
          })}
          {!accessories.length ? (
            <li className="py-4 text-sm text-graphite">
              No accessories yet. Run <code>supabase/seed-roofing-accessories.sql</code> or add one
              above.
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}
