/** @type {import('next').NextConfig} */

function supabaseHostname() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return url ? new URL(url).hostname : null;
  } catch {
    return null;
  }
}

const hostname = supabaseHostname();

const remotePatterns = [
  {
    protocol: "https",
    hostname: "*.supabase.co",
    pathname: "/storage/v1/object/public/**",
  },
];

if (hostname) {
  remotePatterns.unshift({
    protocol: "https",
    hostname,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Admin image uploads are up to 5 MB; default Server Action body limit is 1 MB.
  serverActions: {
    bodySizeLimit: "6mb",
  },
  images: {
    // Local Windows/DNS64 can resolve *.supabase.co via 64:ff9b::… which Next 16
    // treats as private and blocks in the image optimizer during `next dev`.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns,
  },
};

export default nextConfig;
