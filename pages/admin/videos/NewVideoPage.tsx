import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Video, WebTVCategory } from '../../../types';
import { Save } from 'lucide-react';

interface NewVideoPageProps {
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onSubmit: (video: Video) => void;
}

const NewVideoPage: React.FC<NewVideoPageProps> = ({ onNavigate, onLogout, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [category, setCategory] = useState<string>('Journal Télévisé');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Map simplified selection to actual types
    let mappedCategory: WebTVCategory = 'Journal Télévisé';
    if (category === 'Débat') mappedCategory = 'Débats & Analyses';
    if (category === 'Reportage') mappedCategory = 'Reportage de Terrain';

    const newVideo: Video = {
      id: Date.now().toString(),
      title: title,
      duration: '15:00', // Default duration since input was removed
      category: mappedCategory,
      // Auto-generate YouTube thumbnail
      thumbnailUrl: youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : 'https://picsum.photos/600/400'
    };
    
    onSubmit(newVideo);
  };

  return (
    <AdminLayout title="Nouvelle Vidéo" currentView="ADMIN_VIDEOS" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
           
           {/* Titre */}
           <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Titre</label>
             <input 
               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
               placeholder="Titre de la vidéo"
               value={title}
               onChange={e => setTitle(e.target.value)}
               required
             />
           </div>

           {/* YouTube ID */}
           <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Identifiant YouTube</label>
             <input 
               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
               placeholder="Ex: dQw4w9WgXcQ"
               value={youtubeId}
               onChange={e => setYoutubeId(e.target.value)}
               required
             />
             <p className="text-xs text-gray-400 mt-1">La miniature sera générée automatiquement.</p>
           </div>

           {/* Select */}
           <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
             <select 
               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
               value={category}
               onChange={e => setCategory(e.target.value)}
             >
               <option value="Journal Télévisé">Journal Télévisé</option>
               <option value="Débat">Débat</option>
               <option value="Reportage">Reportage</option>
             </select>
           </div>

           <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => onNavigate('ADMIN_VIDEOS')}
              className="px-6 py-2 text-gray-600 font-bold hover:text-gray-900"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors"
            >
              <Save size={18} /> Publier
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewVideoPage;
