import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Article, Category } from '../../../types';
import { Plus, Trash2, Edit, Search, Filter, ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

interface ArticlesListPageProps {
  articles: Article[];
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const ITEMS_PER_PAGE = 10;
const CATEGORIES: Category[] = ['Politique', 'Économie', 'Société', 'Culture', 'Régions', 'Sport', 'Tech'];

const ArticlesListPage: React.FC<ArticlesListPageProps> = ({ articles, onNavigate, onLogout, onDelete, onEdit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const authorName = article.author?.name || '';
      const matchesSearch = (article.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        authorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedArticles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedArticles.map(a => a.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} article(s) ?`)) {
      selectedIds.forEach(id => onDelete(id));
      setSelectedIds(new Set());
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  return (
    <AdminLayout title="Gestion des Articles" currentView="ADMIN_ARTICLES" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header with search and actions */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors ${showFilters || hasActiveFilters
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <Filter size={16} />
                Filtres
                {hasActiveFilters && (
                  <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                    {(searchQuery ? 1 : 0) + (selectedCategory !== 'all' ? 1 : 0)}
                  </span>
                )}
              </button>

              {/* New article button */}
              <button
                onClick={() => onNavigate('ADMIN_NEW_ARTICLE')}
                className="bg-primary text-white px-4 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-sm"
              >
                <Plus size={16} /> Nouvel Article
              </button>
            </div>
          </div>

          {/* Filter row */}
          {showFilters && (
            <div className="flex flex-wrap items-center gap-3 pt-2 animate-fade-in">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as Category | 'all');
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Toutes les catégories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <X size={14} /> Réinitialiser
                </button>
              )}

              <span className="text-sm text-gray-500 ml-auto">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} trouvé{filteredArticles.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Bulk actions bar */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in">
              <span className="text-sm font-bold text-primary">
                {selectedIds.size} sélectionné{selectedIds.size > 1 ? 's' : ''}
              </span>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-red-500 text-white rounded text-sm font-bold hover:bg-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 size={14} /> Supprimer
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Annuler
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={paginatedArticles.length > 0 && selectedIds.size === paginatedArticles.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                </th>
                <th className="p-4">Titre</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Auteur</th>
                <th className="p-4">Vues</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    {hasActiveFilters ? 'Aucun article ne correspond aux filtres' : 'Aucun article'}
                  </td>
                </tr>
              ) : (
                paginatedArticles.map(article => (
                  <tr key={article.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.has(article.id) ? 'bg-primary/5' : ''}`}>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(article.id)}
                        onChange={() => toggleSelect(article.id)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={article.imageUrl || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded object-cover" />
                        <p className="font-bold text-gray-900 line-clamp-1 max-w-[200px]">{article.title || 'Sans titre'}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-50 text-primary text-xs font-bold rounded">{article.category || 'Général'}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{article.author?.name || 'Inconnu'}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye size={12} className="text-gray-400" />
                        {(article.views || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(article.id)}
                          title="Modifier"
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                              onDelete(article.id);
                            }
                          }}
                          title="Supprimer"
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Page {currentPage} sur {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page: number;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${currentPage === page
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 text-gray-600'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ArticlesListPage;
