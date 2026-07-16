import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { EntityImage } from "@/components/ui/EntityImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGallery } from "@/lib/data/queries";

export const metadata = {
  title: "Gallery",
  description:
    "Project and installation gallery from Velzon Trade Enterprise — warehouse roofing, PUF panels, and fabrication work across Tamil Nadu.",
};

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <SiteShell>
      <section className="bg-ivory py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Installations"
            title="Project gallery"
            description="Selected installs and material packages from Velzon Trade Enterprise projects."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <figure
                key={img.id}
                className="overflow-hidden rounded-lg border border-gold/15 bg-white shadow-card"
              >
                <div className="relative aspect-[4/3]">
                  <EntityImage
                    src={img.image_url}
                    alt={img.title || img.caption || "Velzon project installation"}
                    label={img.title || "Gallery"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <figcaption className="border-t border-gold/10 px-4 py-3">
                  <p className="font-medium text-ink">{img.title}</p>
                  {img.caption ? (
                    <p className="text-sm text-graphite">{img.caption}</p>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
