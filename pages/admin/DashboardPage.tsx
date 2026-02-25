import React, { useMemo } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ActivityLog from '../../components/ActivityLog';
import { Article, Video, Comment } from '../../types';
import {
  BarChart3, Users, FileText, Video as VideoIcon,
  ArrowUpRight, ArrowDownRight, Clock, MoreHorizontal,
  PlusCircle, Activity, TrendingUp, Eye, MessageSquare,
  AlertCircle, CheckCircle
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

interface DashboardPageProps {
  articles: Article[];
  videos: Video[];
  comments: Comment[];
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const COLORS = ['#0B2C55', '#D4A853', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

const DashboardPage: React.FC<DashboardPageProps> = ({ articles, videos, comments, onNavigate, onLogout }) => {
  const { t } = useLanguage();

  // Calculs des KPIs
  const totalViews = useMemo(() => articles.reduce((acc, curr) => acc + (curr.views || 0), 0), [articles]);
  const pendingComments = useMemo(() => comments.filter(c => c.status === 'pending').length, [comments]);
  const approvedComments = useMemo(() => comments.filter(c => c.status === 'approved').length, [comments]);

  // Données pour le graphique par catégorie (Pie Chart)
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach(article => {
      const cat = article.category || 'Non classé';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [articles]);

  // Données pour le graphique par auteur (Bar Chart)
  const authorData = useMemo(() => {
    const counts: Record<string, { name: string; articles: number; views: number }> = {};
    articles.forEach(article => {
      const authorName = article.author?.name ? article.author.name.split(' ')[0] : 'Inconnu';
      if (!counts[authorName]) {
        counts[authorName] = { name: authorName, articles: 0, views: 0 };
      }
      counts[authorName].articles += 1;
      counts[authorName].views += (article.views || 0);
    });
    return Object.values(counts).slice(0, 5);
  }, [articles]);

  // Données simulées pour le graphique de trafic
  const trafficData = [
    { name: 'Lun', vues: 4000, visiteurs: 2400 },
    { name: 'Mar', vues: 3000, visiteurs: 1398 },
    { name: 'Mer', vues: 5200, visiteurs: 3200 },
    { name: 'Jeu', vues: 2780, visiteurs: 1908 },
    { name: 'Ven', vues: 4890, visiteurs: 2800 },
    { name: 'Sam', vues: 3390, visiteurs: 2100 },
    { name: 'Dim', vues: 4490, visiteurs: 2700 },
  ];

  // Données pour l'activité récente
  const activityItems = useMemo(() => {
    const items = [
      ...articles.slice(0, 3).map(article => ({
        id: `article-${article.id}`,
        type: 'article' as const,
        action: 'Nouvel article publié',
        title: article.title || 'Sans titre',
        timestamp: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR') : 'Date inconnue',
        user: article.author?.name ? article.author.name.split(' ')[0] : 'Admin'
      })),
      ...comments.filter(c => c.status === 'pending').slice(0, 2).map(comment => ({
        id: `comment-${comment.id}`,
        type: 'comment' as const,
        action: 'Commentaire en attente',
        title: comment.content.substring(0, 50) + '...',
        timestamp: comment.date,
        user: comment.author
      }))
    ];
    return items.sort(() => Math.random() - 0.5).slice(0, 5);
  }, [articles, comments]);

  const recentArticles = articles.slice(0, 5);

  // Articles du jour (simulé - articles des dernières 24h)
  const todayArticles = articles.filter(a => {
    const articleDate = new Date(a.publishedAt);
    const now = new Date();
    const diff = now.getTime() - articleDate.getTime();
    return diff < 24 * 60 * 60 * 1000 * 30; // Last 30 days for demo
  }).length;

  return (
    <AdminLayout
      title={t('admin.dashboard.title')}
      currentView="ADMIN_DASHBOARD"
      onNavigate={onNavigate}
      onLogout={onLogout}
      pendingComments={pendingComments}
    >
      <div className="space-y-6">

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title={t('admin.dashboard.totalViews')}
            value={totalViews.toLocaleString()}
            icon={<Eye size={24} className="text-blue-500" />}
            trend="+12.5%"
            isPositive={true}
          />
          <KPICard
            title={t('admin.dashboard.publishedArticles')}
            value={articles.length.toString()}
            icon={<FileText size={24} className="text-secondary" />}
            trend={`+${todayArticles}`}
            isPositive={true}
            trendLabel="ce mois"
          />
          <KPICard
            title={t('admin.dashboard.onlineVideos')}
            value={videos.length.toString()}
            icon={<VideoIcon size={24} className="text-purple-500" />}
            trend="+2"
            isPositive={true}
            trendLabel="cette semaine"
          />
          <KPICard
            title={t('admin.layout.comments')}
            value={approvedComments.toString()}
            icon={<MessageSquare size={24} className="text-green-500" />}
            trend={pendingComments > 0 ? `${pendingComments} ${t('comments.pending')}` : 'À jour'}
            isPositive={pendingComments === 0}
            trendLabel=""
          />
        </div>

        {/* Quick Stats Banner */}
        {pendingComments > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
            <div className="bg-amber-100 p-2 rounded-lg">
              <AlertCircle size={20} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-amber-800">
                {pendingComments} {t('admin.dashboard.pendingComments')}
              </p>
              <p className="text-sm text-amber-600">{t('admin.dashboard.manageContent')}</p>
            </div>
            <button
              onClick={() => onNavigate('ADMIN_COMMENTS')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
            >
              {t('comments.moderate')}
            </button>
          </div>
        )}

        {/* CHARTS SECTION - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Traffic Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{t('admin.dashboard.traffic')}</h3>
                <p className="text-xs text-gray-500">{t('admin.dashboard.views')} & {t('admin.dashboard.visitors')}</p>
              </div>
              <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
                <option>Ce mois</option>
              </select>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorVues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B2C55" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0B2C55" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorVisiteurs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4A853" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#D4A853" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#0B2C55', strokeWidth: 1, strokeDasharray: '5 5' }}
                  />
                  <Area type="monotone" dataKey="vues" stroke="#0B2C55" strokeWidth={2} fillOpacity={1} fill="url(#colorVues)" name={t('admin.dashboard.views')} />
                  <Area type="monotone" dataKey="visiteurs" stroke="#D4A853" strokeWidth={2} fillOpacity={1} fill="url(#colorVisiteurs)" name={t('admin.dashboard.visitors')} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions & System Status */}
          <div className="flex flex-col gap-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary to-blue-900 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-1">{t('admin.dashboard.quickActions')}</h3>
              <p className="text-blue-200 text-xs mb-5">{t('admin.dashboard.manageContent')}</p>

              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('ADMIN_NEW_ARTICLE')}
                  className="w-full bg-white/10 hover:bg-white/20 transition-all p-3 rounded-lg flex items-center gap-3 text-sm font-bold border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="bg-secondary p-1.5 rounded text-primary"><PlusCircle size={16} /></div>
                  {t('admin.dashboard.newArticle')}
                </button>
                <button
                  onClick={() => onNavigate('ADMIN_NEW_VIDEO')}
                  className="w-full bg-white/10 hover:bg-white/20 transition-all p-3 rounded-lg flex items-center gap-3 text-sm font-bold border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="bg-purple-400 p-1.5 rounded text-white"><VideoIcon size={16} /></div>
                  {t('admin.dashboard.addVideo')}
                </button>
                <button
                  onClick={() => onNavigate('ADMIN_TEAM')}
                  className="w-full bg-white/10 hover:bg-white/20 transition-all p-3 rounded-lg flex items-center gap-3 text-sm font-bold border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="bg-green-400 p-1.5 rounded text-white"><Users size={16} /></div>
                  {t('admin.dashboard.manageTeam')}
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex-1">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
                <Activity size={16} className="text-gray-400" />
                {t('admin.dashboard.systemStatus')}
              </h3>
              <div className="space-y-3">
                <StatusItem label="Serveur Web" status="ok" />
                <StatusItem label="Base de données" status="ok" />
                <StatusItem label="Stockage média" status="ok" />
                <StatusItem label="API (Vercel)" status="ok" />
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS SECTION - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">{t('admin.dashboard.categoryDist')}</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value} articles`, name]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Author Performance Bar Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">{t('admin.dashboard.authorPerf')}</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={authorData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#374151', fontWeight: 600 }} width={60} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number, name: string) => [value, name === 'articles' ? t('admin.layout.articles') : t('admin.dashboard.views')]}
                  />
                  <Bar dataKey="articles" fill="#0B2C55" radius={[0, 4, 4, 0]} name={t('admin.layout.articles')} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Log */}
          <ActivityLog
            items={activityItems}
            maxItems={4}
            onViewAll={() => onNavigate('ADMIN_COMMENTS')}
          />
        </div>

        {/* RECENT ARTICLES TABLE */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-lg">{t('admin.dashboard.recentPosts')}</h3>
            <button onClick={() => onNavigate('ADMIN_ARTICLES')} className="text-sm text-primary font-bold hover:underline">{t('home.seeAll')}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                  <th className="p-4 pl-6">Article</th>
                  <th className="p-4">{t('common.status')}</th>
                  <th className="p-4">{t('article.by')}</th>
                  <th className="p-4">{t('admin.dashboard.views')}</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6 text-right">{t('common.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm line-clamp-1 max-w-[200px] group-hover:text-primary transition-colors">{article.title}</p>
                          <p className="text-xs text-gray-500">{article.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={10} />
                        Publié
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <img src={article.author.avatar} alt={article.author.name} className="w-5 h-5 rounded-full" />
                        {article.author.name.split(' ')[0]}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Eye size={12} className="text-gray-400" />
                        <span className="font-mono text-gray-600">{article.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(article.publishedAt).toLocaleDateString(t('header.date'))}
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors">
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

// Sub-component for KPI Cards with animations
const KPICard = ({ title, value, icon, trend, isPositive, trendLabel = "vs mois dernier" }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between hover:shadow-md hover:border-gray-200 transition-all duration-300 group cursor-default">
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase mb-1 tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 mb-2 font-serif group-hover:text-primary transition-colors">{value}</h3>
      <div className="flex items-center gap-2">
        <span className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
        {trendLabel && <span className="text-xs text-gray-400">{trendLabel}</span>}
      </div>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
      {icon}
    </div>
  </div>
);

// Sub-component for System Status Item
const StatusItem = ({ label, status }: { label: string; status: 'ok' | 'warning' | 'error' }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 text-gray-600">
      <div className={`w-2 h-2 rounded-full ${status === 'ok' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
      {label}
    </div>
    <span className={`font-bold text-xs px-2 py-1 rounded ${status === 'ok' ? 'bg-green-50 text-green-600' :
      status === 'warning' ? 'bg-yellow-50 text-yellow-600' :
        'bg-red-50 text-red-600'
      }`}>
      {status === 'ok' ? 'Opérationnel' : status === 'warning' ? 'Maintenance' : 'Erreur'}
    </span>
  </div>
);

export default DashboardPage;