import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Lock } from 'lucide-react';
import { Article } from '../types';
import OptimizedImage from './OptimizedImage';
import { useLanguage } from '../contexts/LanguageContext';
import { getCategoryColor } from '../constants';

interface ArticleCardProps {
  article: Article;
  variant?: 'vertical' | 'horizontal' | 'compact';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'vertical' }) => {
  const { t, language } = useLanguage();

  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.seo?.slug || article.id}`} className="group flex gap-4 items-start border-b border-gray-100 pb-4 last:border-0 hover:bg-gray-50/80 p-2 rounded-lg transition-all duration-300">
        <div className="w-[100px] h-[65px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 shadow-sm">
          <OptimizedImage
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-wider"
              style={{ backgroundColor: getCategoryColor(article.category) }}
            >
              {t(`categories.${article.category}`)}
            </span>
            {article.isPremium && <Lock size={10} className="text-secondary" />}
          </div>
          <h4 className="font-serif font-semibold text-sm leading-tight text-primary mt-1 group-hover:text-accent line-clamp-2 transition-colors">{article.title}</h4>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${article.seo?.slug || article.id}`} className="group grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-center bg-white p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="md:col-span-5 h-52 md:h-56 overflow-hidden rounded-xl bg-gray-200 relative shadow-md">
          <div
            className="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10 uppercase tracking-widest"
            style={{ backgroundColor: getCategoryColor(article.category) }}
          >
            {t(`categories.${article.category}`)}
          </div>
          {article.isPremium && (
            <div className="absolute top-3 right-3 bg-primary/90 text-white p-1.5 rounded-full z-10 shadow-lg">
              <Lock size={14} />
            </div>
          )}
          <OptimizedImage
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3 text-[11px] text-gray-500 font-medium">
            <span className="text-primary font-bold uppercase tracking-wider">{article.author.name}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime} {t('common.minutes')}</span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-accent leading-tight transition-colors line-clamp-2">{article.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm md:text-base">{article.excerpt}</p>
          <div className="text-xs text-gray-400 mt-auto font-medium">{new Date(article.publishedAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.seo?.slug || article.id}`} className="group flex flex-col h-full bg-white rounded-2xl border border-transparent hover:border-gray-50 hover:shadow-xl transition-all duration-300 p-2">
      <div className="h-48 overflow-hidden rounded-xl bg-gray-200 relative mb-4 shadow-sm">
        <div
          className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase tracking-widest bg-opacity-95"
          style={{ backgroundColor: getCategoryColor(article.category) }}
        >
          {t(`categories.${article.category}`)}
        </div>
        {article.isPremium && (
          <div className="absolute top-2 right-2 bg-secondary text-primary p-1.5 rounded-full z-10 shadow-lg">
            <Lock size={12} />
          </div>
        )}
        <OptimizedImage
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="px-2 pb-4 flex flex-col flex-grow">
        <h3 className="font-serif text-lg font-bold text-primary mb-2 group-hover:text-accent leading-snug line-clamp-2 transition-colors">{article.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow leading-relaxed">{article.excerpt}</p>
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-auto border-t border-gray-100 pt-3 font-medium">
          <span className="flex items-center gap-1"><Clock size={12} /> {new Date(article.publishedAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</span>
          <span className="flex items-center gap-1"><Eye size={12} /> {article.views.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;