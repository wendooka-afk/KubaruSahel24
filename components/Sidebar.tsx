import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ChevronRight, Hash } from 'lucide-react';
import ArticleCard from './ArticleCard';
import AdBanner from './AdBanner';
import { Article, Category } from '../types';
import { useToast } from './Toast';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  articles: Article[];
}

const Sidebar: React.FC<SidebarProps> = ({ articles = [] }) => {
  const popularArticles = articles && articles.length > 0
    ? [...articles].sort((a, b) => b.views - a.views).slice(0, 4)
    : [];

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();
  const { t } = useLanguage();

  const categoriesList: Category[] = ['Politique', 'Économie', 'Société', 'Culture', 'Régions', 'Sport', 'Tech'];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      addToast(t('sidebar.subscribed'), 'success');
      setEmail('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Newsletter */}
      <div className="bg-primary text-white rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <h4 className="font-serif font-bold text-xl mb-3 relative z-10">{t('sidebar.newsletterTitle')}</h4>
        <p className="text-blue-100/70 text-sm mb-6 relative z-10 leading-relaxed">{t('sidebar.newsletterDesc')}</p>
        <form className="space-y-3 relative z-10" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder={t('sidebar.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-white/95"
          />
          <button type="submit" className="w-full bg-secondary text-primary font-black py-3 rounded-xl text-sm hover:bg-yellow-400 transition-colors shadow-lg shadow-secondary/10">
            <Mail size={16} className="inline mr-2" /> {t('sidebar.subscribe')}
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-black text-primary text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
          <Hash size={18} className="text-secondary" /> {t('sidebar.categories')}
        </h4>
        <ul className="space-y-2">
          {categoriesList.map(cat => (
            <li key={cat}>
              <Link to={`/category/${cat}`} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group text-sm transition-all">
                <span className="font-bold text-gray-600 group-hover:text-primary transition-colors">{t(`categories.${cat}`)}</span>
                <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-1 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Ad Banner */}
      <AdBanner format="rectangle" className="shadow-sm border border-gray-100" />

      {/* Most Read */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-black text-primary text-[10px] uppercase tracking-[0.2em] mb-6 pb-4 border-b border-gray-50">
          {t('sidebar.mostRead')}
        </h4>
        <div className="flex flex-col gap-6">
          {popularArticles.map(article => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;