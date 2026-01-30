import { ArrowUpRight } from "lucide-react";
import { Link } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/constants/articles";
import { type ArticleListItem, getArticles } from "@/lib/api/omni";

const randomAmount = (max: number) => Math.floor(Math.random() * max);
const randomArticles = (
  amount: number,
  data: ArticleListItem[] | undefined
) => {
  if (!data || data.length === 0) {
    return articles;
  }
  const uniqueArticles = new Set<ArticleListItem>();
  while (uniqueArticles.size < amount && uniqueArticles.size < data.length) {
    uniqueArticles.add(data[randomAmount(data.length)]);
  }
  return Array.from(uniqueArticles);
};

export const ExampleArticles = async () => {
  try {
    const latestArticles = await getArticles();
    const exampleArticles = randomArticles(3, latestArticles);

    return (
      <div className="mt-6 flex flex-col flex-wrap items-center justify-center gap-3">
        {exampleArticles.map((article) => (
          <Link href={article.slug} key={article.slug}>
            <Badge
              className="gap-1 rounded-full bg-secondary/20 py-1 pr-2 backdrop-blur-md hover:bg-secondary/50"
              variant="outline"
            >
              {article.title}
              <ArrowUpRight size={13} />
            </Badge>
          </Link>
        ))}
      </div>
    );
  } catch {
    return null;
  }
};
