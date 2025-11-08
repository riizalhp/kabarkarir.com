import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/api';

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => blogService.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useBlogPost = (slug?: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => slug ? blogService.getBySlug(slug) : null,
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
};
