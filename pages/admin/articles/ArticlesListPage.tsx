import React from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Article } from '../../../types';
import { Plus, Trash2, Edit, Search } from 'lucide-react';

interface ArticlesListPageProps {
  articles: Article[];
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onDelete: (id: string) => void;
}

const ArticlesListPage: React.FC<ArticlesListPageProps> = ({ articles, onNavigate, onLogout, onDelete }) => {
  return (
    <AdminLayout title="Gestion des Articles" currentView="ADMIN_ARTICLES" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-64">
             <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          <button 
            onClick={() => onNavigate('ADMIN_NEW_ARTICLE')}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-900 transition-colors"
          >
            <Plus size={16} /> Nouvel Article
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                <th className="p-4">Titre</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Auteur</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map(article => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-900 line-clamp-1">{article.title}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-50 text-primary text-xs font-bold rounded">{article.category}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{article.author.name}</td>
                  <td className="p-4 text-sm text-gray-600">{new Date(article.publishedAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Edit size={16} /></button>
                       <button 
                         onClick={() => onDelete(article.id)}
                         className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                       ><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ArticlesListPage;
