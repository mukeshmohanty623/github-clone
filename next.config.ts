import type { NextConfig } from "next";
import withMarkdoc from '@markdoc/next.js';

const nextConfig: NextConfig = {
  /* config options here */
  ...withMarkdoc({mode:'server',schemaPath: './src/markdoc',})({
    pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx']
  }),
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
