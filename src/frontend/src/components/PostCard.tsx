import { Link } from '@tanstack/react-router';
import { Calendar, User } from 'lucide-react';
import type { Post } from '../backend';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(Number(post.datePublished));
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-primary/50">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {category}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-xl font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors">
          <Link to="/posts/$slug" params={{ slug: post.slug }} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {post.body.substring(0, 150)}...
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={date.toISOString()}>{formattedDate}</time>
          </div>
        </div>
      </div>
    </article>
  );
}
