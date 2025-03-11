import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/constants/articles';
import { Link } from 'next-view-transitions';
import { createLatestScraper } from '@/lib/meta';

type Article = {
  title: string;
  slug: string;
};

const randomAmount = (max: number) => Math.floor(Math.random() * max);
const randomArticles = (amount: number, data: Article[] | undefined) => {
  if (!data) return articles;
  const uniqueArticles = new Set<Article>();
  while (uniqueArticles.size < amount) {
    uniqueArticles.add(data[randomAmount(data.length)]);
  }
  return Array.from(uniqueArticles);
};

export const ExampleArticles = async () => {
  const getLatestArticles = await fetch('https://omni.se/senaste', {
    next: { revalidate: 600 },
  });
  const latestArticles = await getLatestArticles.text();
  const { data, error } = await createLatestScraper(latestArticles);

  if (error) return null;
  const exampleArticles = randomArticles(3, data?.news);

  return (
    <div className="mt-6 flex flex-wrap flex-col justify-center items-center gap-3 ">
      {exampleArticles.map((article) => (
        <Link key={article.slug} href={article.slug}>
          <Badge
            variant="outline"
            className="gap-1 rounded-full bg-secondary/20 py-1 pr-2 hover:bg-secondary/50 backdrop-blur-md"
          >
            {article.title}
            <ArrowUpRight size={13} />
          </Badge>
        </Link>
      ))}
    </div>
  );
};
