import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Author } from '../../../types';
import { Users, Search, Plus, Edit2, Trash2, Mail, Phone, Calendar, FileText, CheckCircle, XCircle } from 'lucide-react';

interface TeamListPageProps {
    authors: Record<string, Author>;
    onNavigate: (view: string) => void;
    onLogout: () => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const TeamListPage: React.FC<TeamListPageProps> = ({ authors, onNavigate, onLogout, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

    const authorsList: Author[] = Object.values(authors);

    const filteredAuthors = authorsList.filter(author => {
        const matchesSearch = author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            author.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (author.email && author.email.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'all' || author.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const activeCount = authorsList.filter(a => a.status === 'active').length;
    const inactiveCount = authorsList.filter(a => a.status === 'inactive').length;

    return (
        <AdminLayout title="Gestion de l'Équipe" currentView="ADMIN_TEAM" onNavigate={onNavigate} onLogout={onLogout}>
            <div className="space-y-6">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Total Membres</p>
                                <h3 className="text-3xl font-bold text-gray-800 font-serif">{authorsList.length}</h3>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Users size={24} className="text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Actifs</p>
                                <h3 className="text-3xl font-bold text-green-600 font-serif">{activeCount}</h3>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <CheckCircle size={24} className="text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Inactifs</p>
                                <h3 className="text-3xl font-bold text-gray-400 font-serif">{inactiveCount}</h3>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <XCircle size={24} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, rôle ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            />
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="active">Actifs</option>
                                <option value="inactive">Inactifs</option>
                            </select>

                            <button
                                onClick={() => onNavigate('ADMIN_NEW_TEAM_MEMBER')}
                                className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-900 transition-colors whitespace-nowrap"
                            >
                                <Plus size={18} />
                                Ajouter un membre
                            </button>
                        </div>
                    </div>
                </div>

                {/* Team Members Table */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                                    <th className="p-4 pl-6">Membre</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Articles</th>
                                    <th className="p-4">Rejoint le</th>
                                    <th className="p-4">Statut</th>
                                    <th className="p-4 pr-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredAuthors.map((author) => (
                                    <tr key={author.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{author.name}</p>
                                                    <p className="text-xs text-gray-500">{author.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-1">
                                                {author.email && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Mail size={12} className="text-gray-400" />
                                                        {author.email}
                                                    </div>
                                                )}
                                                {author.phone && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Phone size={12} className="text-gray-400" />
                                                        {author.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <FileText size={14} className="text-gray-400" />
                                                {author.articlesCount || 0}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar size={12} className="text-gray-400" />
                                                {author.joinedDate ? new Date(author.joinedDate).toLocaleDateString('fr-FR') : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${author.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {author.status === 'active' ? 'Actif' : 'Inactif'}
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onEdit(author.id)}
                                                    className="p-2 hover:bg-blue-50 rounded text-primary transition-colors"
                                                    title="Modifier"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${author.name} ?`)) {
                                                            onDelete(author.id);
                                                        }
                                                    }}
                                                    className="p-2 hover:bg-red-50 rounded text-red-600 transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAuthors.length === 0 && (
                        <div className="text-center py-12">
                            <Users size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">Aucun membre trouvé</p>
                            <p className="text-gray-400 text-sm">Essayez de modifier vos filtres de recherche</p>
                        </div>
                    )}
                </div>

            </div>
        </AdminLayout>
    );
};

export default TeamListPage;
