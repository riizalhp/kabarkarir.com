import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CompanyProfile } from '../types';
import { companiesService } from '../services/api';

type FilterType = 'Semua' | 'BUMN' | 'SWASTA' | 'INSTANSI';

interface UseCompaniesOptions {
  filter: FilterType;
  page: number;
  itemsPerPage: number;
}

interface UseCompaniesResult {
  data: CompanyProfile[];
  total: number;
}

export const useCompanies = ({ 
  filter, 
  page, 
  itemsPerPage 
}: UseCompaniesOptions): UseQueryResult<UseCompaniesResult, Error> => {
  return useQuery({
    queryKey: ['companies', filter, page, itemsPerPage],
    queryFn: async () => {
      const offset = (page - 1) * itemsPerPage;
      const result = await companiesService.getAll({
        type: filter === 'Semua' ? undefined : filter,
        limit: itemsPerPage,
        offset: offset,
      });
      
      return {
        data: result.data,
        total: result.total,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCompanyBySlug = (slug?: string) => {
  return useQuery({
    queryKey: ['company', slug],
    queryFn: () => slug ? companiesService.getBySlug(slug) : null,
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
