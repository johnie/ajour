import { createMetaScraper } from '@/lib/meta';

export async function GET() {
  const res = await fetch('https://omni.se/apple-uppges-jobba-pa-app-store-app-enbart-for-spel/a/pPKWKW');
  const html = await res.text();
  const scrapeMetaData = createMetaScraper({});

  const meta = await scrapeMetaData(html);

  return Response.json({ meta });
}
