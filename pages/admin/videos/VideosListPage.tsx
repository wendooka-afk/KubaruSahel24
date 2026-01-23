import React from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Video } from '../../../types';
import { Plus, Trash2, Search } from 'lucide-react';

interface VideosListPageProps {
  videos: Video[];
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onDelete: (id: string) => void;
}

const VideosListPage: React.FC<VideosListPageProps> = ({ videos, onNavigate, onLogout, onDelete }) => {
  return (
    <AdminLayout title="Gestion des Vidéos" currentView="ADMIN_VIDEOS" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-64">
             <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          <button 
            onClick={() => onNavigate('ADMIN_NEW_VIDEO')}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-900 transition-colors"
          >
            <Plus size={16} /> Nouvelle Vidéo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
           {videos.map(video => (
             <div key={video.id} className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                   <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                   <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">{video.duration}</span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-secondary uppercase mb-1 block">{video.category}</span>
                  <h4 className="font-bold text-sm text-gray-900 mb-4 line-clamp-2">{video.title}</h4>
                  <button 
                    onClick={() => onDelete(video.id)}
                    className="w-full py-2 border border-red-100 text-red-500 rounded text-sm font-bold hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={14} /> Supprimer
                  </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default VideosListPage;
