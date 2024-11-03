import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/constants/articles';
import { Link } from 'next-view-transitions';

export const ExampleArticles = () => {
  return (
    <div className="mt-6 flex flex-wrap flex-col justify-center items-center gap-3 ">
      {articles.map((article) => (
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
