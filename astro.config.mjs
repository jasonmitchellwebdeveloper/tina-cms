// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// Prefer an explicit SITE_URL; otherwise use the URL the platform injects so
// zero-config deploys still emit absolute URLs (sitemap, RSS, OpenGraph).
// Cloudflare Workers exposes no such var — set SITE_URL there for correct
// canonicals. Local builds fall back to localhost.
function getSiteUrl() {
    if (process.env.SITE_URL) return process.env.SITE_URL;
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (process.env.CF_PAGES_URL) return process.env.CF_PAGES_URL;
    if (process.env.NETLIFY && process.env.URL) return process.env.URL;

    return 'http://localhost:4321';
}

/**
 * Registers Tina's visual-editing island endpoint in dev only.
 * Production is fully static, so the route never ships.
 * @type {import('astro').AstroIntegration}
 */
const tinaIslandDevOnly = {
    name: 'tina-island-dev-only',
    hooks: {
        'astro:config:setup': ({ command, injectRoute }) => {
            if (command === 'dev') {
                injectRoute({
                    pattern: '/tina-island/[name]',
                    entrypoint: './src/lib/tina-island-route.ts',
                });
            }
        },
    },
};

// https://astro.build/config
export default defineConfig({
    site: getSiteUrl(),
    output: 'static',
    redirects: { '/home': '/' },
    integrations: [mdx(), sitemap(), icon(), tina(), react(), tinaIslandDevOnly],
    build: {
        // Inline the (~10 KiB) bundled CSS into a <style> in <head> instead of a
        // separate render-blocking <link>. Astro's default ('auto') only inlines
        // stylesheets under ~4 KiB, leaving ours blocking first paint on mobile.
        inlineStylesheets: 'always',
    },
    image: {
        layout: 'constrained',
    },
    vite: {
        plugins: [tailwindcss(), tinaAdminDevRedirect()],
        // Bundle @tinacms/astro into the SSR build instead of resolving it
        // per-module on every cold request — otherwise each
        // `import TinaMarkdown from '@tinacms/astro/TinaMarkdown.astro'`
        // triggers a full Vite resolve + Astro-plugin compile of the
        // package's source `.astro` files on the first request.
        ssr: {
            noExternal: ['@tinacms/astro', '@tinacms/bridge'],
        },
        build: {
            rollupOptions: {
                onwarn(warning, warn) {
                    if (warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
                        warning.exporter === 'tinacms/dist/client') {
                        return;
                    }
                    warn(warning);
                }
            }
        }
    }
});