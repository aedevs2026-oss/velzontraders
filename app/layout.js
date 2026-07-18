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
  title: {
    default:
      "Velzon Trade Enterprises | Roofing Sheets & PUF Panels · Tamil Nadu",
    template: "%s | Velzon Trade Enterprises",
  },
  description:
    "Roofing material supplier and fabricator in Tamil Nadu. Metal roofing sheets, PUF panel supply & fabrication, warehouse and factory roofing from Coimbatore. Call +91 96000 65505.",
  keywords: [
    "Velzon Trade Enterprises",
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
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Velzon Trade Enterprises",
    title:
      "Velzon Trade Enterprises | Roofing & Fabrication Across Tamil Nadu",
    description:
      "Premium branded roofing sheets and PUF panels — supply and fabrication services across Tamil Nadu. Confidence | Growth | Trust.",
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
    title: "Velzon Trade Enterprises · Tamil Nadu",
    description:
      "Roofing sheets, PUF panels & fabrication — Confidence | Growth | Trust",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
