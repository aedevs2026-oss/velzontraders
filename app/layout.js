import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
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
      "Velzon Trade Enterprise | Roofing & Fabrication Materials · Coimbatore",
    template: "%s | Velzon Trade Enterprise",
  },
  description:
    "Velzon Trade Enterprise sources, fabricates, and supplies roofing sheets, PUFF panels, and fabrication materials across Coimbatore, Tamil Nadu. Confidence | Growth | Trust.",
  keywords: [
    "Velzon Trade Enterprise",
    "roofing sheets Coimbatore",
    "fabrication materials Tamil Nadu",
    "galvalume sheets",
    "PUFF panels",
    "decking sheet",
    "Coimbatore roofing supplier",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Velzon Trade Enterprise",
    title:
      "Velzon Trade Enterprise | Roofing & Fabrication Materials · Coimbatore",
    description:
      "Premium roofing and fabrication materials trading from Coimbatore. Sourced, fabricated, and supplied with confidence.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Velzon Trade Enterprise — Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velzon Trade Enterprise · Coimbatore",
    description:
      "Roofing & fabrication materials — Confidence | Growth | Trust",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans">
        {children}
      </body>
    </html>
  );
}
