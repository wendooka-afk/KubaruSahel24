import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Video, WebTVCategory } from '../../../types';
import { Plus, Trash2, Edit, Search, Filter, X, Play, Eye } from 'lucide-react';

interface VideosListPageProps {
  videos: Video[];
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onDelete: (id: string) => void;
}

const CATEGORIES: WebTVCategory[] = [
  'Journal Télévisé',
  'Reportage de Terrain',
  'Débats & Analyses',
  'Magazines',
  'Vox Pop',
  'Opinion',
  'Documentaires',
  'Verbatim'
];

const VideosListPage: React.FC<VideosListPageProps> = ({ videos, onNavigate, onLogout, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WebTVCategory | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null);

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [videos, searchQuery, selectedCategory]);

  // Selection handlers
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
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} vidéo(s) ?`)) {
      selectedIds.forEach(id => onDelete(id));
      setSelectedIds(new Set());
    }
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  return (
    <AdminLayout title="Gestion des Vidéos" currentView="ADMIN_VIDEOS" onNavigate={onNavigate} onLogout={onLogout}>
      {/* Preview Modal */}
      {previewVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-900 relative">
              <img
                src={previewVideo.thumbnailUrl}
                alt={previewVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={32} className="text-primary ml-1" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
                {previewVideo.duration}
              </span>
            </div>
            <div className="p-5">
              <span className="text-xs font-bold text-secondary uppercase">{previewVideo.category}</span>
              <h3 className="font-bold text-lg text-gray-800 mt-1">{previewVideo.title}</h3>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    onDelete(previewVideo.id);
                    setPreviewVideo(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Rechercher une vidéo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
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

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as WebTVCategory | 'all')}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Toutes les catégories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <button
                onClick={() => onNavigate('ADMIN_NEW_VIDEO')}
                className="bg-primary text-white px-4 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-900 transition-colors"
              >
                <Plus size={16} /> Nouvelle Vidéo
              </button>
            </div>
          </div>

          {/* Bulk actions */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
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

          {hasActiveFilters && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {filteredVideos.length} vidéo{filteredVideos.length !== 1 ? 's' : ''} trouvée{filteredVideos.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <X size={14} /> Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredVideos.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              {hasActiveFilters ? 'Aucune vidéo ne correspond aux filtres' : 'Aucune vidéo'}
            </div>
          ) : (
            filteredVideos.map(video => (
              <div
                key={video.id}
                className={`group relative border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all ${selectedIds.has(video.id) ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                  }`}
              >
                {/* Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(video.id)}
                    onChange={() => toggleSelect(video.id)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 bg-white"
                  />
                </div>

                {/* Thumbnail */}
                <div
                  className="aspect-video bg-gray-100 relative cursor-pointer"
                  onClick={() => setPreviewVideo(video)}
                >
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                      <Play size={24} className="text-primary ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">{video.duration}</span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="text-xs font-bold text-secondary uppercase mb-1 block">{video.category}</span>
                  <h4 className="font-bold text-sm text-gray-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewVideo(video)}
                      className="flex-1 py-2 border border-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-1"
                    >
                      <Eye size={14} /> Voir
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
                          onDelete(video.id);
                        }
                      }}
                      className="py-2 px-3 border border-red-100 text-red-500 rounded text-sm font-bold hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default VideosListPage;
