import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, ArrowLeft, Filter } from 'lucide-react';
import { Video, WebTVCategory, Article } from '../types';
import Container from '../components/Container';
import { slugify } from '../utils/slugify';

interface WebTVPageProps {
  selectedCategory?: string | null;
  videos: Video[];
  articles: Article[];
}

const CATEGORIES: WebTVCategory[] = [
  "Journal Télévisé",
  "Reportage de Terrain",
  "Débats & Analyses",
  "Magazines",
  "Vox Pop",
  "Opinion",
  "Documentaires",
  "Verbatim"
];

const WebTVPage: React.FC<WebTVPageProps> = ({ selectedCategory, videos, articles }) => {
  const [activeCategory, setActiveCategory] = useState<WebTVCategory | 'Tout'>('Tout');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory as WebTVCategory);
    } else {
      setActiveCategory('Tout');
    }
  }, [selectedCategory]);

  const filteredVideos = activeCategory === 'Tout'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const featuredVideo = filteredVideos.length > 0 ? filteredVideos[0] : null;
  const playlist = filteredVideos.length > 1 ? filteredVideos.slice(1) : [];

  const recentArticles = articles.slice(0, 3);

  return (
    <div className="bg-slate-900 min-h-screen text-white pb-12 flex flex-col">
      <div className="border-b border-white/10">
        <Container size="full">
          <div className="py-6 flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <PlayCircle className="text-secondary" size={32} />
              <div>
                <h1 className="font-serif text-2xl font-bold leading-none">KUBARU <span className="text-secondary">WEB TV</span></h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Le Sahel en images</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Retour au site
            </button>
          </div>
        </Container>
      </div>

      <div className="border-b border-white/5 bg-black/20 sticky top-0 z-20 backdrop-blur-md">
        <Container size="full">
          <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
            <button
              onClick={() => setActiveCategory('Tout')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === 'Tout' ? 'bg-secondary text-primary' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}
            >
              Tout voir
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? 'bg-secondary text-primary' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Container size="full">
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-6 text-secondary">
                <span className="w-1 h-6 bg-secondary"></span>
                <h2 className="text-xl font-serif font-bold uppercase">{activeCategory === 'Tout' ? 'À la une' : activeCategory}</h2>
              </div>

              {featuredVideo ? (
                <>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative group mb-8">
                    <img src={featuredVideo.thumbnailUrl} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle size={80} className="text-white/90 fill-current opacity-90 group-hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                      <span className="bg-secondary text-primary text-xs font-bold px-2 py-1 rounded mb-2 inline-block">{featuredVideo.category}</span>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 leading-tight">{featuredVideo.title}</h2>
                      <p className="text-gray-300 text-sm md:text-base line-clamp-2">Regardez le dernier épisode complet maintenant.</p>
                    </div>
                  </div>

                  {playlist.length > 0 && (
                    <>
                      <h3 className="text-lg font-bold mb-4 text-gray-300">Dans la même rubrique</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {playlist.map(video => (
                          <div key={video.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer group flex gap-3">
                            <div className="w-32 aspect-video bg-black rounded relative flex-shrink-0 overflow-hidden">
                              <img src={video.thumbnailUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                              <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded">{video.duration}</span>
                            </div>
                            <div className="flex flex-col justify-center">
                              <span className="text-secondary text-[10px] font-bold uppercase mb-1">{video.category}</span>
                              <h4 className="font-medium text-sm leading-tight group-hover:text-blue-200 line-clamp-2">{video.title}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <Filter size={48} className="mb-4 opacity-50" />
                  <p>Aucune vidéo disponible pour cette catégorie pour le moment.</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-primary rounded-xl p-6 border border-white/10">
                <h4 className="font-serif font-bold text-lg mb-4 text-white">Programme à venir</h4>
                <ul className="space-y-4">
                  {[
                    { time: "14:00", title: "Le Journal du Sahel", host: "Aïssa Maïga" },
                    { time: "16:30", title: "Eco & Finance", host: "Marchés agricoles" },
                    { time: "20:00", title: "Le Grand Débat", host: "Politique" }
                  ].map((prog, i) => (
                    <li key={i} className="flex gap-4 items-start pb-4 border-b border-white/10 last:border-0">
                      <span className="font-mono text-secondary font-bold">{prog.time}</span>
                      <div>
                        <h5 className="font-bold text-sm text-gray-200">{prog.title}</h5>
                        <p className="text-xs text-gray-400">{prog.host}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-gray-400 text-sm uppercase">Derniers articles</h4>
                <div className="space-y-4">
                  {recentArticles.map(article => (
                    <div
                      key={article.id}
                      className="flex gap-3 cursor-pointer group"
                      onClick={() => navigate(`/${slugify(article.category)}/${article.seo?.slug || slugify(article.title)}`)}
                    >
                      <div className="w-20 h-16 bg-gray-700 rounded flex-shrink-0 overflow-hidden">
                        <img src={article.imageUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium leading-tight group-hover:text-secondary line-clamp-2 text-gray-300">{article.title}</h5>
                        <span className="text-[10px] text-gray-500 mt-1 block flex items-center gap-1"><Clock size={10} /> 5 min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WebTVPage;