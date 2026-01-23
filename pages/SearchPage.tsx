import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types';
import Container from '../components/Container';

interface SearchPageProps {
  articles: Article[];
}

const SearchPage: React.FC<SearchPageProps> = ({ articles }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 2) {
      const filtered = articles.filter(
        article => 
          article.title.toLowerCase().includes(query.toLowerCase()) || 
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, articles]);

  return (
    <div className="min-h-screen bg-white">
      <Container size="page">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-primary">Recherche</h1>
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative max-w-3xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Rechercher un article, un sujet, un auteur..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-2xl p-4 border-b-2 border-gray-200 focus:border-primary outline-none font-serif placeholder:text-gray-300"
              autoFocus
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={28} />
          </div>

          <div className="max-w-4xl mx-auto">
            {query.length > 0 && query.length < 3 && (
              <p className="text-center text-gray-500">Saisissez au moins 3 caractères...</p>
            )}

            {query.length >= 3 && results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-2">Aucun résultat pour "{query}"</p>
                <p className="text-sm text-gray-400">Essayez avec d'autres mots-clés ou vérifiez l'orthographe.</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-6">
                <p className="text-sm font-bold text-gray-500 mb-6">{results.length} résultat(s) trouvé(s)</p>
                {results.map(article => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            )}
            
            {query.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Politique', 'Économie', 'Sahel', 'Culture'].map((tag) => (
                  <button 
                    key={tag}
                    className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100" 
                    onClick={() => setQuery(tag)}
                  >
                    <span className="font-bold text-primary">{tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;