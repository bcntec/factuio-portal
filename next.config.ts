import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Servidor Node propio (no export estático): la ruta /api/waitlist llama a Brevo con una clave secreta.
  output: "standalone",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  // Plugin passed as a module specifier string (not an imported function) so
  // Turbopack's loader config stays serializable across the Rust/JS boundary.
  options: { remarkPlugins: ["remark-gfm"] },
});

export default withMDX(nextConfig);
