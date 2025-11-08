import { useQuery } from '@tanstack/react-query';
import { eventsService, misiService, pelatihanService } from '../services/api';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => eventsService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useMisiOffers = () => {
  return useQuery({
    queryKey: ['misi-offers'],
    queryFn: () => misiService.getAll(),
    staleTime: 3 * 60 * 1000, // 3 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const usePelatihan = () => {
  return useQuery({
    queryKey: ['pelatihan'],
    queryFn: () => pelatihanService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};
