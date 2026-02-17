import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Post } from '../backend';
import { samplePosts } from '../content/samplePosts';

export function usePosts() {
  const { actor, isFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      if (!actor) return samplePosts;
      try {
        const posts = await actor.getAllPosts();
        return posts.length > 0 ? posts : samplePosts;
      } catch (error) {
        console.error('Error fetching posts:', error);
        return samplePosts;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePost(slug: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Post | null>({
    queryKey: ['post', slug],
    queryFn: async () => {
      if (!actor) {
        return samplePosts.find((p) => p.slug === slug) || null;
      }
      try {
        const post = await actor.getPost(slug);
        if (!post) {
          return samplePosts.find((p) => p.slug === slug) || null;
        }
        return post;
      } catch (error) {
        console.error('Error fetching post:', error);
        return samplePosts.find((p) => p.slug === slug) || null;
      }
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function usePostsByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ['posts', 'category', category],
    queryFn: async () => {
      if (!actor) {
        return samplePosts.filter((p) => p.categories.includes(category));
      }
      try {
        const posts = await actor.getPostsByCategory(category);
        if (posts.length === 0) {
          return samplePosts.filter((p) => p.categories.includes(category));
        }
        return posts;
      } catch (error) {
        console.error('Error fetching posts by category:', error);
        return samplePosts.filter((p) => p.categories.includes(category));
      }
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function usePostCount() {
  const { actor, isFetching } = useActor();

  return useQuery<number>({
    queryKey: ['postCount'],
    queryFn: async () => {
      if (!actor) return samplePosts.length;
      try {
        const count = await actor.getPostCount();
        return Number(count);
      } catch (error) {
        console.error('Error fetching post count:', error);
        return samplePosts.length;
      }
    },
    enabled: !!actor && !isFetching,
  });
}
