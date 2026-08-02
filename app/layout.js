import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { InitialLoader } from "@/components/layout/InitialLoader";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://velzontrade.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default:
      "Velzon Trade Enterprises | Roofing Sheets & PUF Panels · Coimbatore, Tamil Nadu",
    template: "%s | Velzon Trade Enterprises",
  },
  description:
    "Coimbatore-based roofing material supplier and fabricator for Tamil Nadu. Metal roofing sheets, PUF panel supply, fabrication, warehouse roofing and factory roofing services. Call +91 96000 65505.",
  keywords: [
    "Velzon Trade Enterprises",
    "Roofing Sheet Supplier in Coimbatore",
    "Roofing Sheet Supplier in Chennai",
    "Roofing Contractors Tamil Nadu",
    "PUF Panel Supplier",
    "PUF Panel Fabrication",
    "Industrial Roofing Solutions",
    "Metal Roofing Sheets",
    "Roofing Installation",
    "Roofing Contractors Chennai",
    "Roofing Sheet Fabrication",
    "Warehouse Roofing",
    "Factory Roofing",
    "Roofing Material Supplier Tamil Nadu",
    "Coimbatore roofing supplier",
    "Tamil Nadu roofing contractor",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Velzon Trade Enterprises",
    title:
      "Velzon Trade Enterprises | Roofing & Fabrication Across Tamil Nadu",
    description:
      "Premium branded roofing sheets and PUF panels — supply and fabrication services from Coimbatore across Tamil Nadu. Confidence | Growth | Trust.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Velzon Trade Enterprises — Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velzon Trade Enterprises · Coimbatore, Tamil Nadu",
    description:
      "Roofing sheets, PUF panels & fabrication — Confidence | Growth | Trust",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore, Tamil Nadu",
    "geo.position": "10.9970;76.9615",
    ICBM: "10.9970, 76.9615",
    "theme-color": "#FAF8F3",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans">
        <InitialLoader />
        {children}
      </body>
    </html>
  );
}
