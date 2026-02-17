import { ArrowRight, Sparkles, Code, Rocket, TrendingUp } from 'lucide-react';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

export default function HomePage() {
  const { data: posts, isLoading } = usePosts();

  const featuredPosts = posts?.slice(0, 3) || [];
  const latestPosts = posts?.slice(3, 9) || [];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: 'url(/assets/generated/zeekly-hero-bg.dim_2400x1200.png)' }}
        />
        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Technology Insights & Innovation</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Zeekly
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Your premier destination for high-quality tech articles, digital innovation content, 
              software guides, startup insights, and trending technology news.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/posts"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Explore Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle CTA Section */}
      <section className="border-b border-border/40 bg-accent/30">
        <div className="container py-12">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Explore Beyond Technology
            </h2>
            <p className="text-muted-foreground">
              Discover lifestyle content, trends, and insights that complement your tech journey.
            </p>
            <div className="pt-2">
              <a
                href="https://zeekly.co.uk/"
                className="inline-flex items-center justify-center rounded-md bg-foreground px-8 py-3 text-sm font-medium text-background shadow-sm transition-all hover:bg-foreground/90 hover:shadow-md"
              >
                Lifestyle
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border/40 bg-muted/20">
        <div className="container py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Software Guides</h3>
              <p className="text-sm text-muted-foreground">
                In-depth tutorials and guides for developers and tech enthusiasts.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-4">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Startup Insights</h3>
              <p className="text-sm text-muted-foreground">
                Expert analysis and advice for building successful tech startups.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Tech Trends</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with the latest technology news and innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="border-b border-border/40">
          <div className="container py-16 md:py-24">
            <div className="mb-12 text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Articles</h2>
              <p className="text-muted-foreground">
                Handpicked stories from our community of tech writers
              </p>
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="bg-muted/20">
          <div className="container py-16 md:py-24">
            <div className="mb-12 flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Latest Articles</h2>
                <p className="text-muted-foreground">
                  Fresh insights and updates from the tech world
                </p>
              </div>
              <a
                href="/posts"
                className="hidden sm:inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            <div className="mt-12 text-center sm:hidden">
              <a
                href="/posts"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                View all articles
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
