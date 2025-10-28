import React, { useEffect } from 'react';
import { BlogPost, Company, RecruitmentEvent } from '../types';
import Sidebar from './Sidebar';
import { viewTrackingService } from '../services/viewTracking';
import { injectJSONLD, updateMetaTags, generateArticleSchema, generateBreadcrumbSchema, generateSlug } from '../utils/seo';

interface ArticleDetailPageProps {
  post: BlogPost;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventId: number) => void;
  isPreviewMode?: boolean;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ post, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, isPreviewMode = false, trendingCompanies, latestArticles, allEvents }) => {
  // Track blog post view and inject SEO
  useEffect(() => {
    if (post && !isPreviewMode) {
      viewTrackingService.trackBlogPostView(post.id);
      
      // Update page meta tags
      updateMetaTags({
        title: `${post.title} | Blog KabarKarir.com`,
        description: post.description?.substring(0, 155) || `Baca artikel ${post.title} di blog KabarKarir.com. Temukan tips karir, panduan melamar kerja, dan informasi menarik seputar dunia kerja.`,
        keywords: `${post.title}, ${post.category}, tips karir, panduan kerja, blog karir`,
        canonical: `https://www.kabarkarir.com/blog/${post.id}/${generateSlug(post.title)}`,
        ogImage: post.image || 'https://www.kabarkarir.com/og-image.jpg',
        ogType: 'article'
      });

      // Inject Article structured data
      injectJSONLD(generateArticleSchema(post));

      // Inject Breadcrumb structured data
      injectJSONLD(generateBreadcrumbSchema([
        { name: 'Beranda', url: 'https://www.kabarkarir.com/' },
        { name: 'Blog', url: 'https://www.kabarkarir.com/blog' },
        { name: post.category, url: `https://www.kabarkarir.com/blog?category=${post.category}` },
        { name: post.title, url: window.location.href }
      ]));
    }
  }, [post, isPreviewMode]);

  const badgeColorClasses = {
    blue: 'bg-blue-100 text-primary',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-lg shadow">
            <article>
              <header className="mb-8">
                <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${badgeColorClasses[post.categoryColor]}`}>{post.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary mt-4">{post.title}</h1>
                <p className="text-gray-500 mt-3">Diposting {post.posted}</p>
              </header>

              <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
                <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead font-semibold">{post.description}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
              </div>
            </article>
          </div>
          <Sidebar isPreviewMode={isPreviewMode} onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
