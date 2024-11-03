import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMdx from '@next/mdx';

const withNextIntl = createNextIntlPlugin();
const withMdx = createMdx();

const composePlugins =
  (...plugins: any[]) =>
  (config: any) =>
    plugins.reduce((acc, plugin) => plugin(acc), config);

const nextConfig: NextConfig = {
  images: {
    domains: ['gfx.omni.se'],
  },
  experimental: {
    mdxRs: true,
  },
};

export default composePlugins(withNextIntl, withMdx)(nextConfig);
