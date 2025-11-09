# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ajour is a Next.js 16 application for creating beautiful screenshots of Omni (omni.se) articles. It scrapes article metadata, renders iOS-style notification previews, and exports them as PNG or SVG images.

**Important**: This is not an official Omni product.

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

**Note**: The project uses `pnpm` as the package manager.

## Architecture

### Core Data Flow

1. **Article Fetching** (`lib/get-article.ts`): Fetches HTML from `https://omni.se/{slug}` and uses `xscrape` to extract metadata (title, description, author, timestamps)
2. **Metadata Scraping** (`lib/meta.ts`): Defines two scrapers:
   - `createMetaScraper`: Extracts article metadata from Open Graph and meta tags
   - `createLatestScraper`: Extracts latest news from Omni's homepage
3. **Preview Rendering** (`app/[...slugs]/_components/notification-preview.tsx`): Renders iOS-style notification with article data
4. **Image Export** (`lib/image.ts`): Uses `html-to-image` to convert DOM nodes to PNG/SVG

### URL-Based State Management

The app uses `nuqs` for type-safe URL search params defined in `lib/params/controls.ts`:
- `theme`: String literal (graphite, default)
- `background`: Boolean (show/hide background)
- `darkMode`: Boolean (light/dark theme)
- `padding`: Number literal (128px default)
- `size`: Number literal (export resolution, 4x default)

Access these params via `lib/params/use-controls.tsx` hook in client components.

### Routing Structure

- `/` - Landing page with search form and example articles
- `/[...slugs]` - Dynamic article preview page (e.g., `/nyheter/a/abc123`)
  - Fetches article on server-side
  - Generates Open Graph images via `/api/og` route
  - Renders controls and preview

### Key Technologies

- **Next.js 16**: App router with React 19, Turbopack dev server
- **next-intl**: Internationalization (currently Swedish in `messages/sv.json`)
- **nuqs**: Type-safe URL search params with server-side parsing
- **xscrape**: HTML scraping with Zod schema validation
- **html-to-image**: DOM to image conversion
- **Radix UI + Tailwind CSS 4**: UI components with `class-variance-authority`

### Component Structure

```
components/
├── controls/          # Control panel UI (theme, padding, download)
├── ui/               # Shadcn-style Radix UI primitives
├── preview.tsx       # Wrapper for notification preview
└── search-form.tsx   # Landing page article URL input

app/
├── page.tsx          # Landing page
├── [...slugs]/       # Article preview route
│   ├── page.tsx      # Server component
│   └── _components/  # Notification preview components
└── api/og/           # Open Graph image generation
```

## Common Patterns

### Adding New Control Parameters

1. Define constant in `constants/` (e.g., `NEW_OPTIONS`)
2. Add parser to `CONTROLS_SEARCH_PARAMS` in `lib/params/controls.ts`
3. Create control component in `components/controls/controls-new.tsx`
4. Add to `Controls` component
5. Consume via `useControls()` hook in client components

### Working with Scraping

The project scrapes Omni.se. If Omni changes their HTML structure:
- Update selectors in `lib/meta.ts`
- Validate schema still matches with Zod
- Test with `getArticle(slug)` function

### Image Export

Images are generated client-side from DOM nodes. The export flow:
1. User clicks download in `ControlsDownload`
2. `lib/image.ts` functions (`toPng`, `toSvg`, `toBlob`) are called
3. `html-to-image` renders the DOM node (excluding elements with `data-ignore-in-export`)
4. File is downloaded via browser

**Note**: Runs twice to ensure fonts and styles are loaded (first render warms cache).

## Configuration Notes

- **Path Alias**: `@/*` maps to project root (see `tsconfig.json`)
- **Image Domains**: `gfx.omni.se` is whitelisted in `next.config.ts`
- **MDX Support**: Enabled with experimental `mdxRs` flag
- **ESLint**: Uses Next.js core-web-vitals and TypeScript configs
- **Revalidation**: Article fetches are cached for 600 seconds (10 minutes)

## Internationalization

Uses `next-intl` with messages in `messages/sv.json`. Translations are accessed via `useTranslations()` hook.

## Contributing Guidelines

From `CONTRIBUTING.md`:
- Use conventional commits: `type(scope): description`
- Format code with Prettier (though no script exists in package.json)
- Branch naming: `feature/my-feature` or `fix/my-bugfix`
