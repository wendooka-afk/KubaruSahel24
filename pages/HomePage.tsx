
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { getCategoryColor } from '../constants';
import Sidebar from '../components/Sidebar';
import CategoryTabs from '../components/CategoryTabs';
import AdBanner from '../components/AdBanner';
import { Article, Video } from '../types';
import { PlayCircle, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import { useLanguage } from '../contexts/LanguageContext';
import { slugify } from '../utils/slugify';

interface HomePageProps {
  articles: Article[];
  videos: Video[];
}

const HomePage: React.FC<HomePageProps> = ({ articles = [], videos = [] }) => {
  const { t } = useLanguage();

  // Memoize split logic to avoid unnecessary recalculations
  const { featuredArticle, secondaryArticles, latestArticles } = useMemo(() => {
    if (!articles || articles.length === 0) {
      return { featuredArticle: null, secondaryArticles: [], latestArticles: [] };
    }

    // Sort by date descending (ensure most recent is first)
    const sortedArticles = [...articles].sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Most recent is ALWAYS the featured/hero article
    const featured = sortedArticles[0];

    // Next 3 are secondary (Editor's Pick)
    const secondary = sortedArticles.slice(1, 4);

    // Next 3 are latest news list
    const latest = sortedArticles.slice(4, 7);

    return { featuredArticle: featured, secondaryArticles: secondary, latestArticles: latest };
  }, [articles]);

  if (!articles || articles.length === 0) {
    return (
      <Container size="full">
        <div className="py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-serif italic">
            {t('common.loading') || "Chargement des actualités..."}
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container size="full">
      <div className="py-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 border-b border-gray-100 pb-12">
          <div className="lg:col-span-8 group">
            {featuredArticle && (
              <Link to={`/${slugify(featuredArticle.category)}/${featuredArticle.seo?.slug || slugify(featuredArticle.title)}`} className="relative h-[450px] md:h-[550px] rounded-xl overflow-hidden shadow-sm block bg-gray-100">
                <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-secondary text-primary text-xs font-bold px-3 py-1.5 rounded uppercase shadow-lg">
                    {featuredArticle.isBreaking ? t('header.live') : t('home.featured')}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary/80 to-transparent pt-32 pb-8 px-6 md:px-8">
                  <div className="md:w-11/12">
                    <span
                      className="text-white font-bold uppercase text-xs tracking-widest mb-3 inline-block px-2 py-1 rounded"
                      style={{ backgroundColor: getCategoryColor(featuredArticle.category) }}
                    >
                      {t(`categories.${featuredArticle.category}`)}
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl font-black mb-3 leading-tight text-white group-hover:text-secondary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-blue-100 line-clamp-2 text-lg font-serif opacity-90">{featuredArticle.excerpt}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="font-black text-primary uppercase tracking-[0.2em] text-[10px] border-b border-gray-100 pb-3 flex items-center justify-between">
              {t('home.editorsPick')}
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
            </h3>
            <div className="flex flex-col gap-4">
              {secondaryArticles.map(article => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </div>
        </section>

        <AdBanner format="horizontal" className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                  {t('home.latestNews')}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {latestArticles.map(article => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            </div>

            <CategoryTabs articles={articles} />

            <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white mb-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 relative z-10">
                <h2 className="font-serif text-3xl font-bold flex items-center gap-4">
                  <PlayCircle className="text-secondary" size={36} />
                  {t('nav.webtv')}
                </h2>
                <Link to="/webtv" className="text-secondary hover:text-white transition-colors text-sm font-bold flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  {t('home.directReplay')} <ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {videos.slice(0, 3).map(video => (
                  <Link to="/webtv" key={video.id} className="group flex flex-col">
                    <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden mb-4 shadow-lg border border-white/5">
                      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <PlayCircle className="text-white scale-110" size={48} />
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/60 text-[10px] px-2 py-1 rounded-md font-mono">{video.duration}</span>
                    </div>
                    <span className="text-secondary text-[10px] font-black uppercase tracking-widest mb-1">{video.category}</span>
                    <h4 className="font-bold text-sm leading-snug group-hover:text-secondary transition-colors line-clamp-2">{video.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <Sidebar articles={articles} />
          </aside>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
