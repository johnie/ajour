# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ajour is a Next.js 16 application for creating beautiful screenshots of Omni (omni.se) articles. It fetches article data from the Omni API, renders iOS-style notification previews, and exports them as PNG or SVG images.

**Important**: This is not an official Omni product.

## Development Commands

```bash
pnpm dev      # Development server with Turbopack
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run Ultracite (Biome) linter
```

**Package manager**: `pnpm`

## Architecture

### Core Data Flow

1. **Article Fetching** (`lib/api/omni.ts`): Fetches from `content.omni.se/v2/articles` API with Zod validation
2. **Slug Extraction** (`lib/get-article.ts`): Extracts 6-char article ID from URL pattern `/category/a/{id}`
3. **Preview Rendering** (`app/[...slugs]/_components/notification-preview.tsx`): Renders iOS-style notification
4. **Image Export** (`lib/image.ts`): Uses `html-to-image` to convert DOM nodes to PNG/SVG

### API Client (`lib/api/`)

- `types.ts`: Zod schemas for Omni API responses, `isTextResource` type guard
- `omni.ts`: `getArticleById(id)` and `getArticles()` with 1-hour cache (`revalidate: 3600`)

### URL-Based State Management

Uses `nuqs` for type-safe URL search params in `lib/params/controls.ts`:
- `theme`: String literal (graphite, default)
- `background`: Boolean (show/hide background)
- `darkMode`: Boolean (light/dark theme)
- `padding`: Number literal (128px default)
- `size`: Number literal (export resolution, 4x default)

Access via `useControls()` hook in client components.

### Routing

- `/` - Landing page with search form and example articles
- `/[...slugs]` - Article preview (e.g., `/nyheter/a/abc123`)
- `/api/og` - Open Graph image generation

### Key Technologies

- **Next.js 16**: App Router, React 19, Turbopack
- **next-intl**: Swedish translations in `messages/sv.json`
- **nuqs**: Type-safe URL search params
- **Zod**: API response validation
- **html-to-image**: DOM to image conversion
- **Radix UI + Tailwind CSS 4**: UI components with `class-variance-authority`

## Common Patterns

### Adding New Control Parameters

1. Define constant in `constants/`
2. Add parser to `CONTROLS_SEARCH_PARAMS` in `lib/params/controls.ts`
3. Create control component in `components/controls/`
4. Add to `Controls` component
5. Consume via `useControls()` hook

### Image Export

Images are generated client-side from DOM nodes:
1. `lib/image.ts` functions (`toPng`, `toSvg`, `toBlob`) render the DOM node
2. Elements with `data-ignore-in-export` are excluded
3. Runs twice to ensure fonts/styles are loaded (first render warms cache)

## Configuration

- **Path Alias**: `@/*` maps to project root
- **Image Domains**: `gfx.omni.se` whitelisted in `next.config.ts`
- **Linting**: Ultracite (Biome-based) - run `pnpm lint` or `npx ultracite fix`
- **Caching**: API fetches cached for 1 hour via Next.js ISR

## Contributing

- Conventional commits: `type(scope): description`
- Branch naming: `feature/my-feature` or `fix/my-bugfix`
