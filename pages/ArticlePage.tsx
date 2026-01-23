import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, MessageSquare, Bookmark } from 'lucide-react';
import { Article } from '../types';
import Sidebar from '../components/Sidebar';
import CommentsSection from '../components/CommentsSection';
import AuthorProfile from '../components/AuthorProfile';
import Container from '../components/Container';
import AdBanner from '../components/AdBanner';
import ArticleCard from '../components/ArticleCard';
import OptimizedImage from '../components/OptimizedImage';
import { useLanguage } from '../contexts/LanguageContext';
import { getCategoryColor } from '../constants';

interface ArticlePageProps {
  articles: Article[];
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articles = [] }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  if (!articles || articles.length === 0) return null;

  // Find article by ID or Slug
  const article = articles.find(a => a.id === id || a.seo?.slug === id);

  if (!article) {
    return (
      <Container size="page">
        <div className="py-20 text-center">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Article non trouvé</h2>
          <button onClick={() => navigate('/')} className="text-accent font-bold underline">
            Retour à l'accueil
          </button>
        </div>
      </Container>
    );
  }

  const similarArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <Container size="page">
      <div className="py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={16} /> {t('common.back')}
        </button>

        <AdBanner format="horizontal" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <Link
                  to={`/category/${article.category}`}
                  className="text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest"
                  style={{ backgroundColor: getCategoryColor(article.category) }}
                >
                  {t(`categories.${article.category}`)}
                </Link>
                {article.isPremium && (
                  <span className="bg-secondary/20 text-primary px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                    Premium
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-black text-slate-900 leading-[1.15] mb-6">{article.title}</h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-serif italic mb-8 border-l-4 border-secondary pl-6">
                {article.excerpt}
              </p>

              <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-b border-gray-100 py-6 gap-6">
                <Link to={`/author/${article.author.id}`} className="flex items-center gap-4 group">
                  <OptimizedImage src={article.author.avatar} alt={article.author.name} className="w-12 h-12 rounded-full shadow-sm group-hover:ring-2 ring-secondary transition-all" />
                  <div>
                    <p className="text-sm font-black text-primary group-hover:text-accent transition-colors">{article.author.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.author.role}</p>
                  </div>
                </Link>
                <div className="flex items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-secondary" /> {new Date(article.publishedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-2"><Clock size={14} className="text-secondary" /> {article.readTime} {t('common.minutes')}</span>
                </div>
              </div>
            </header>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10">
              <OptimizedImage src={article.imageUrl} alt={article.title} className="w-full h-auto object-cover" />
            </div>

            <div className="max-w-2xl mx-auto">

              <div
                className="prose prose-lg prose-slate max-w-none font-serif mb-16 text-gray-800 leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <AuthorProfile author={article.author} onNavigate={(id) => navigate(`/author/${id}`)} />

              {similarArticles.length > 0 && (
                <div className="mb-16 border-t border-gray-100 pt-12">
                  <h3 className="font-serif text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                    {t('article.similar')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {similarArticles.map((similar) => (
                      <ArticleCard key={similar.id} article={similar} variant="vertical" />
                    ))}
                  </div>
                </div>
              )}

              <AdBanner format="horizontal" className="mb-12" />

              <CommentsSection articleId={article.id} />
            </div>
          </article>

          <aside className="lg:col-span-4">
            <Sidebar articles={articles} />
          </aside>
        </div>
      </div>
    </Container>
  );
};

export default ArticlePage;