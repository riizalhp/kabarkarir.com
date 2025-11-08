import { useQuery } from '@tanstack/react-query';
import { Job } from '../types';
import { jobsService } from '../services/api';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobsService.getAll(),
    staleTime: 3 * 60 * 1000, // 3 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useJobById = (id?: number) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => id ? jobsService.getById(id) : null,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
