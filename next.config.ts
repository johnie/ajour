import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['gfx.omni.se'],
  },
  experimental: {
    mdxRs: true,
  },
};

export default withNextIntl(nextConfig);
