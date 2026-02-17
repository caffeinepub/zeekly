import { useParams, Link } from '@tanstack/react-router';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { usePost } from '../hooks/usePosts';

export default function PostDetailPage() {
  const { slug } = useParams({ from: '/posts/$slug' });
  const { data: post, isLoading, error } = usePost(slug);

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="h-12 bg-muted animate-pulse rounded" />
          <div className="h-6 bg-muted animate-pulse rounded w-2/3" />
          <div className="space-y-4">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-3xl font-bold">Article Not Found</h1>
          <p className="text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/posts"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to articles
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(Number(post.datePublished));
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/posts"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to articles
        </Link>

        <header className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                <Tag className="mr-1 h-3 w-3" />
                {category}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b border-border py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={date.toISOString()}>{formattedDate}</time>
            </div>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.body.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-border">
          <Link
            to="/posts"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>
        </footer>
      </div>
    </article>
  );
}
