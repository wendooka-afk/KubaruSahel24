import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Article, Category } from '../types';
import ArticleCard from './ArticleCard';
import { useLanguage } from '../contexts/LanguageContext';
import { getCategoryColor } from '../constants';

interface CategoryTabsProps {
    articles: Article[];
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ articles }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<Category>('Politique');

    const categoriesList: Category[] = ['Politique', 'Économie', 'Société', 'Culture', 'Régions', 'Sport', 'Tech'];

    const filteredArticles = useMemo(() => {
        return articles
            .filter(a => a.category === activeTab)
            .slice(0, 3);
    }, [articles, activeTab]);

    return (
        <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                    {t('home.newsByCategory') || "Nos actualités par thématique"}
                </h2>

                {/* Tabs Scrollable Container */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {categoriesList.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === cat
                                    ? 'text-white shadow-lg'
                                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                                }`}
                            style={activeTab === cat ? { backgroundColor: getCategoryColor(cat) } : {}}
                        >
                            {t(`categories.${cat}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Content */}
            <div className="bg-gray-50 rounded-3xl p-6 md:p-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map(article => (
                            <ArticleCard key={article.id} article={article} variant="vertical" />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400 font-serif italic">
                            Aucun article disponible dans cette catégorie pour le moment.
                        </div>
                    )}
                </div>

                {filteredArticles.length > 0 && (
                    <div className="mt-8 text-center md:text-right">
                        <Link
                            to={`/category/${activeTab}`}
                            className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
                        >
                            Voir tous les articles {t(`categories.${activeTab}`)} <ChevronRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryTabs;
