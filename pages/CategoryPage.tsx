
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import Container from '../components/Container';
import AdBanner from '../components/AdBanner';
import { useLanguage } from '../contexts/LanguageContext';

interface CategoryPageProps {
  articles: Article[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ articles = [] }) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  const categoryId = useMemo(() => id ? decodeURIComponent(id) : '', [id]);

  const categoryArticles = useMemo(() => {
    if (!articles) return [];
    return articles.filter(a =>
      a.category.trim().toLowerCase() === categoryId.trim().toLowerCase()
    );
  }, [articles, categoryId]);

  return (
    <Container size="page">
      <div className="py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
          <div>
            <h1 className="font-serif text-4xl font-black text-primary uppercase tracking-tight mb-2">
              {t(`categories.${categoryId}`) !== `categories.${categoryId}` ? t(`categories.${categoryId}`) : categoryId}
            </h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">
              {categoryArticles.length} {categoryArticles.length > 1 ? 'articles publiés' : 'article publié'}
            </p>
            <AdBanner format="horizontal" className="mt-12" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {categoryArticles.length > 0 ? (
              <div className="grid grid-cols-1 gap-10">
                {categoryArticles.map(article => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM7 8h10M7 12h10M7 16h6" />
                  </svg>
                </div>
                <p className="text-gray-400 font-serif italic text-lg">Aucun article n'a été publié dans cette rubrique pour le moment.</p>
              </div>
            )}
            <AdBanner format="horizontal" className="mt-12" />
          </div>

          <aside className="lg:col-span-4">
            <Sidebar articles={articles} />
          </aside>
        </div>
      </div>
    </Container>
  );
};

export default CategoryPage;
