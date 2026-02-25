import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { clearAllData } from '../../utils/storage';
import { Article, Comment } from '../../types';
import {
    Settings as SettingsIcon,
    Globe,
    Bell,
    Download,
    Database,
    Shield,
    Mail,
    Clock,
    CheckCircle,
    FileText,
    MessageSquare
} from 'lucide-react';

interface SettingsPageProps {
    articles: Article[];
    comments: Comment[];
    onNavigate: (view: string) => void;
    onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ articles, comments, onNavigate, onLogout }) => {
    const [notifications, setNotifications] = useState({
        newComments: true,
        weeklyReport: true,
        systemAlerts: false
    });

    const [siteConfig, setSiteConfig] = useState({
        siteName: 'Kubaru Sahel 24',
        siteDescription: 'L\'actualité du Septentrion camerounais',
        contactEmail: 'contact@kubarusahel24.com'
    });

    const exportToCSV = (type: 'articles' | 'comments') => {
        let csvContent = '';
        let filename = '';

        if (type === 'articles') {
            csvContent = 'ID,Titre,Catégorie,Auteur,Date,Vues\n';
            articles.forEach(article => {
                csvContent += `"${article.id}","${article.title}","${article.category}","${article.author.name}","${article.publishedAt}",${article.views}\n`;
            });
            filename = `articles_export_${new Date().toISOString().split('T')[0]}.csv`;
        } else {
            csvContent = 'ID,Auteur,Contenu,Date,Statut\n';
            comments.forEach(comment => {
                csvContent += `"${comment.id}","${comment.author}","${comment.content.replace(/"/g, '""')}","${comment.date}","${comment.status}"\n`;
            });
            filename = `comments_export_${new Date().toISOString().split('T')[0]}.csv`;
        }

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AdminLayout
            title="Paramètres"
            currentView="ADMIN_SETTINGS"
            onNavigate={onNavigate}
            onLogout={onLogout}
        >
            <div className="space-y-6 max-w-4xl">

                {/* Site Configuration */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Globe size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Configuration du Site</h3>
                            <p className="text-xs text-gray-500">Paramètres généraux du site</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom du site</label>
                                <input
                                    type="text"
                                    value={siteConfig.siteName}
                                    onChange={(e) => setSiteConfig(prev => ({ ...prev, siteName: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email de contact</label>
                                <input
                                    type="email"
                                    value={siteConfig.contactEmail}
                                    onChange={(e) => setSiteConfig(prev => ({ ...prev, contactEmail: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
                            <textarea
                                value={siteConfig.siteDescription}
                                onChange={(e) => setSiteConfig(prev => ({ ...prev, siteDescription: e.target.value }))}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                            />
                        </div>
                        <div className="flex justify-end pt-2">
                            <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors flex items-center gap-2">
                                <CheckCircle size={16} />
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Bell size={20} className="text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Notifications</h3>
                            <p className="text-xs text-gray-500">Gérer les alertes et rapports</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <NotificationToggle
                            label="Nouveaux commentaires"
                            description="Recevoir une alerte quand un commentaire est en attente"
                            checked={notifications.newComments}
                            onChange={(checked) => setNotifications(prev => ({ ...prev, newComments: checked }))}
                            icon={<MessageSquare size={16} />}
                        />
                        <NotificationToggle
                            label="Rapport hebdomadaire"
                            description="Recevoir un résumé des statistiques chaque lundi"
                            checked={notifications.weeklyReport}
                            onChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReport: checked }))}
                            icon={<Clock size={16} />}
                        />
                        <NotificationToggle
                            label="Alertes système"
                            description="Notifications de maintenance et mises à jour"
                            checked={notifications.systemAlerts}
                            onChange={(checked) => setNotifications(prev => ({ ...prev, systemAlerts: checked }))}
                            icon={<Shield size={16} />}
                        />
                    </div>
                </div>

                {/* Data Export */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Database size={20} className="text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Export des Données</h3>
                            <p className="text-xs text-gray-500">Télécharger vos données au format CSV</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ExportCard
                                title="Articles"
                                count={articles.length}
                                icon={<FileText size={24} className="text-blue-500" />}
                                onExport={() => exportToCSV('articles')}
                            />
                            <ExportCard
                                title="Commentaires"
                                count={comments.length}
                                icon={<MessageSquare size={24} className="text-green-500" />}
                                onExport={() => exportToCSV('comments')}
                            />
                        </div>
                    </div>
                </div>

                {/* Maintenance & Reset */}
                <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-red-50 flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Shield size={20} className="text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Maintenance</h3>
                            <p className="text-xs text-gray-500">Actions système irréversibles</p>
                        </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Réinitialiser les données</p>
                            <p className="text-xs text-gray-500">Supprimer toutes vos modifications et restaurer les données d'origine</p>
                        </div>
                        <button
                            onClick={async () => {
                                if (window.confirm('Voulez-vous vraiment supprimer toutes vos données ? Cette action est irréversible.')) {
                                    try {
                                        await clearAllData();
                                        localStorage.removeItem('articles');
                                        localStorage.removeItem('videos');
                                        localStorage.removeItem('authors');
                                        localStorage.removeItem('comments');
                                        window.location.reload();
                                    } catch (e) {
                                        alert("Erreur lors de la réinitialisation");
                                    }
                                }
                            }}
                            className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                        >
                            Tout réinitialiser
                        </button>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

// Sub-components
const NotificationToggle = ({
    label,
    description,
    checked,
    onChange,
    icon
}: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon: React.ReactNode;
}) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
            <div className="text-gray-400">{icon}</div>
            <div>
                <p className="font-bold text-gray-800 text-sm">{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative w-12 h-6 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
        >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'left-7' : 'left-1'}`} />
        </button>
    </div>
);

const ExportCard = ({
    title,
    count,
    icon,
    onExport
}: {
    title: string;
    count: number;
    icon: React.ReactNode;
    onExport: () => void;
}) => (
    <div className="p-4 border border-gray-200 rounded-xl hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
            <div>
                <p className="font-bold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{count} entrées</p>
            </div>
        </div>
        <button
            onClick={onExport}
            className="w-full py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
        >
            <Download size={14} />
            Exporter CSV
        </button>
    </div>
);

export default SettingsPage;
