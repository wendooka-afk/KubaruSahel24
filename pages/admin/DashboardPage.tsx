import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Article, Video } from '../../types';
import { 
  BarChart3, Users, FileText, Video as VideoIcon, 
  ArrowUpRight, ArrowDownRight, Clock, MoreHorizontal,
  PlusCircle, Activity, Server
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

interface DashboardPageProps {
  articles: Article[];
  videos: Video[];
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ articles, videos, onNavigate, onLogout }) => {
  // Calculs des KPIs
  const totalViews = articles.reduce((acc, curr) => acc + curr.views, 0);
  const avgViews = Math.round(totalViews / articles.length);
  const totalComments = 1240; // Simulé car les commentaires sont mockés séparément
  
  // Données simulées pour le graphique
  const trafficData = [
    { name: 'Lun', vues: 4000, unqiue: 2400 },
    { name: 'Mar', vues: 3000, unqiue: 1398 },
    { name: 'Mer', vues: 2000, unqiue: 9800 },
    { name: 'Jeu', vues: 2780, unqiue: 3908 },
    { name: 'Ven', vues: 1890, unqiue: 4800 },
    { name: 'Sam', vues: 2390, unqiue: 3800 },
    { name: 'Dim', vues: 3490, unqiue: 4300 },
  ];

  const recentArticles = articles.slice(0, 5);

  return (
    <AdminLayout title="Tableau de bord" currentView="ADMIN_DASHBOARD" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="space-y-6">
        
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
            title="Vues Totales" 
            value={totalViews.toLocaleString()} 
            icon={<BarChart3 size={24} className="text-blue-500" />} 
            trend="+12.5%" 
            isPositive={true}
          />
          <KPICard 
            title="Articles Publiés" 
            value={articles.length.toString()} 
            icon={<FileText size={24} className="text-secondary" />} 
            trend="+4" 
            isPositive={true}
            trendLabel="cette semaine"
          />
          <KPICard 
            title="Vidéos en ligne" 
            value={videos.length.toString()} 
            icon={<VideoIcon size={24} className="text-purple-500" />} 
            trend="0" 
            isPositive={true}
            trendLabel="cette semaine"
          />
          <KPICard 
            title="Engagement" 
            value="4.8%" 
            icon={<Users size={24} className="text-green-500" />} 
            trend="-0.5%" 
            isPositive={false}
          />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Traffic Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Trafic de la semaine</h3>
                <p className="text-xs text-gray-500">Comparé à la semaine précédente</p>
              </div>
              <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs px-3 py-2 outline-none">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorVues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B2C55" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0B2C55" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#0B2C55', strokeWidth: 1, strokeDasharray: '5 5' }}
                  />
                  <Area type="monotone" dataKey="vues" stroke="#0B2C55" strokeWidth={3} fillOpacity={1} fill="url(#colorVues)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions & System Status */}
          <div className="flex flex-col gap-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary to-blue-900 rounded-xl p-6 text-white shadow-lg">
               <h3 className="font-bold text-lg mb-1">Actions Rapides</h3>
               <p className="text-blue-200 text-xs mb-6">Gérez votre contenu en un clic</p>
               
               <div className="space-y-3">
                 <button 
                  onClick={() => onNavigate('ADMIN_NEW_ARTICLE')}
                  className="w-full bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-lg flex items-center gap-3 text-sm font-bold border border-white/10"
                 >
                   <div className="bg-secondary p-1.5 rounded text-primary"><PlusCircle size={16} /></div>
                   Nouvel Article
                 </button>
                 <button 
                  onClick={() => onNavigate('ADMIN_NEW_VIDEO')}
                  className="w-full bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-lg flex items-center gap-3 text-sm font-bold border border-white/10"
                 >
                   <div className="bg-purple-400 p-1.5 rounded text-white"><VideoIcon size={16} /></div>
                   Ajouter une Vidéo
                 </button>
               </div>
            </div>

            {/* System Status */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1">
               <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                 <Activity size={18} className="text-gray-400" />
                 État du Système
               </h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-600">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     Base de données
                   </div>
                   <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">Opérationnel</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-600">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     API Server (Next.js)
                   </div>
                   <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">Opérationnel</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-600">
                     <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                     Cache (Redis)
                   </div>
                   <span className="text-yellow-600 font-bold text-xs bg-yellow-50 px-2 py-1 rounded">Maintenance</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* RECENT ARTICLES TABLE */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">Dernières publications</h3>
              <button onClick={() => onNavigate('ADMIN_ARTICLES')} className="text-sm text-primary font-bold hover:underline">Voir tout</button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                   <th className="p-4 pl-6">Article</th>
                   <th className="p-4">Statut</th>
                   <th className="p-4">Auteur</th>
                   <th className="p-4">Vues</th>
                   <th className="p-4">Date</th>
                   <th className="p-4 pr-6 text-right">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {recentArticles.map((article) => (
                   <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                     <td className="p-4 pl-6">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                           <img src={article.imageUrl} className="w-full h-full object-cover" />
                         </div>
                         <div>
                           <p className="font-bold text-gray-900 text-sm line-clamp-1 max-w-[200px]">{article.title}</p>
                           <p className="text-xs text-gray-500">{article.category}</p>
                         </div>
                       </div>
                     </td>
                     <td className="p-4">
                       <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                         Publié
                       </span>
                     </td>
                     <td className="p-4 text-sm text-gray-600">
                       <div className="flex items-center gap-2">
                         <img src={article.author.avatar} className="w-5 h-5 rounded-full" />
                         {article.author.name.split(' ')[0]}
                       </div>
                     </td>
                     <td className="p-4 text-sm font-mono text-gray-600">{article.views}</td>
                     <td className="p-4 text-sm text-gray-500">
                       <div className="flex items-center gap-1">
                         <Clock size={12} />
                         {new Date(article.publishedAt).toLocaleDateString()}
                       </div>
                     </td>
                     <td className="p-4 pr-6 text-right">
                       <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                         <MoreHorizontal size={16} />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </AdminLayout>
  );
};

// Sub-component for KPI Cards
const KPICard = ({ title, value, icon, trend, isPositive, trendLabel = "vs mois dernier" }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase mb-1 tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 mb-2 font-serif">{value}</h3>
      <div className="flex items-center gap-2">
        <span className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
        <span className="text-xs text-gray-400">{trendLabel}</span>
      </div>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg">
      {icon}
    </div>
  </div>
);

export default DashboardPage;