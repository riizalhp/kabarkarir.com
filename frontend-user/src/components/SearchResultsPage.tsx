import React, { useMemo } from 'react';
import { Job, CompanyProfile, BlogPost, MisiCuanOffer } from '../types';
import JobCard from './JobCard';
import CompanyCard from './CompanyCard';
import ArticleCard from './ArticleCard';
import OfferCard from './OfferCard';

interface SearchResultsPageProps {
  searchQuery: string;
  jobs: Job[];
  companies: CompanyProfile[];
  blogPosts: BlogPost[];
  misiOffers: MisiCuanOffer[];
  onSelectJob: (jobSlug: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectCompany: (companySlug: string) => void;
  onSelectArticle: (articleSlug: string) => void;
  onSelectMisi: (misiSlug: string) => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  searchQuery,
  jobs,
  companies,
  blogPosts,
  misiOffers,
  onSelectJob,
  onSelectCategory,
  onSelectCompany,
  onSelectArticle,
  onSelectMisi
}) => {
  // Filter results based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return {
        jobs: [],
        companies: [],
        articles: [],
        offers: []
      };
    }

    const query = searchQuery.toLowerCase().trim();

    const filteredJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.category.toLowerCase().includes(query) ||
      job.tags.some(tag => tag.toLowerCase().includes(query)) ||
      (job.majors && job.majors.some(major => major.toLowerCase().includes(query)))
    );

    const filteredCompanies = companies.filter(company =>
      company.name.toLowerCase().includes(query) ||
      company.description.toLowerCase().includes(query) ||
      company.type.toLowerCase().includes(query)
    );

    const filteredArticles = blogPosts.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );

    const filteredOffers = misiOffers.filter(offer =>
      offer.title.toLowerCase().includes(query) ||
      offer.company.toLowerCase().includes(query) ||
      offer.description.toLowerCase().includes(query)
    );

    return {
      jobs: filteredJobs,
      companies: filteredCompanies,
      articles: filteredArticles,
      offers: filteredOffers
    };
  }, [searchQuery, jobs, companies, blogPosts, misiOffers]);

  const totalResults = 
    searchResults.jobs.length + 
    searchResults.companies.length + 
    searchResults.articles.length + 
    searchResults.offers.length;

  if (!searchQuery || searchQuery.trim() === '') {
    return (
      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="text-center py-16">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-secondary mb-2">Cari Lowongan, Perusahaan, atau Artikel</h2>
            <p className="text-gray-500">Masukkan kata kunci di kolom pencarian untuk memulai</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 px-4">
      <div className="container mx-auto">
        {/* Search Header */}
        <div className="mb-4">
          <h1 className="text-base font-bold text-secondary mb-1">
            Hasil Pencarian: <span className="text-primary">"{searchQuery}"</span>
          </h1>
          <p className="text-xs text-gray-600">
            Ditemukan {totalResults} hasil
          </p>
        </div>

        {totalResults === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <i className="fas fa-search text-4xl text-gray-300 mb-3"></i>
            <h3 className="text-base font-semibold text-secondary mb-1">Tidak Ada Hasil Ditemukan</h3>
            <p className="text-sm text-gray-500">
              Coba gunakan kata kunci yang berbeda atau lebih umum
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Jobs Results */}
            {searchResults.jobs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-secondary">
                    <i className="fas fa-briefcase text-primary mr-1.5 text-xs"></i>
                    Lowongan Kerja ({searchResults.jobs.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                  {searchResults.jobs.slice(0, 8).map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSelectJob={onSelectJob}
                      onSelectCategory={onSelectCategory}
                      onSelectCompany={onSelectCompany}
                    />
                  ))}
                </div>
                {searchResults.jobs.length > 8 && (
                  <div className="text-center mt-3">
                    <button
                      onClick={() => onSelectCategory('Lowongan Terbaru')}
                      className="text-primary hover:text-blue-700 text-xs font-medium"
                    >
                      Lihat semua {searchResults.jobs.length} lowongan
                      <i className="fas fa-arrow-right ml-1 text-xs"></i>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Companies Results */}
            {searchResults.companies.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-secondary">
                    <i className="fas fa-building text-primary mr-1.5 text-xs"></i>
                    Perusahaan ({searchResults.companies.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                  {searchResults.companies.slice(0, 8).map(company => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      onSelectCompany={onSelectCompany}
                    />
                  ))}
                </div>
                {searchResults.companies.length > 8 && (
                  <div className="text-center mt-3">
                    <a
                      href="/perusahaan"
                      className="text-primary hover:text-blue-700 text-xs font-medium"
                    >
                      Lihat semua {searchResults.companies.length} perusahaan
                      <i className="fas fa-arrow-right ml-1 text-xs"></i>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Articles Results */}
            {searchResults.articles.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-secondary">
                    <i className="fas fa-newspaper text-primary mr-1.5 text-xs"></i>
                    Artikel & Tips ({searchResults.articles.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                  {searchResults.articles.slice(0, 8).map(article => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelectArticle={onSelectArticle}
                    />
                  ))}
                </div>
                {searchResults.articles.length > 8 && (
                  <div className="text-center mt-3">
                    <a
                      href="/blog"
                      className="text-primary hover:text-blue-700 text-xs font-medium"
                    >
                      Lihat semua {searchResults.articles.length} artikel
                      <i className="fas fa-arrow-right ml-1 text-xs"></i>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Misi Cuan Results */}
            {searchResults.offers.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-secondary">
                    <i className="fas fa-gift text-primary mr-2"></i>
                    Misi Cuan ({searchResults.offers.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.offers.slice(0, 4).map(offer => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      onSelectMisi={(offerId: number) => {
                        const selectedOffer = misiOffers.find(m => m.id === offerId);
                        if (selectedOffer && selectedOffer.slug) {
                          onSelectMisi(selectedOffer.slug);
                        }
                      }}
                    />
                  ))}
                </div>
                {searchResults.offers.length > 4 && (
                  <div className="text-center mt-4">
                    <a
                      href="/misi-cuan"
                      className="text-primary hover:text-blue-700 text-xs font-medium"
                    >
                      Lihat semua {searchResults.offers.length} misi cuan
                      <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
