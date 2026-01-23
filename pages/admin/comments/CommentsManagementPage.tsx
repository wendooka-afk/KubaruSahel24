import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Comment } from '../../../types';
import { MessageSquare, Search, CheckCircle, XCircle, Trash2, Eye, Filter } from 'lucide-react';

interface CommentsManagementPageProps {
    comments: Comment[];
    onNavigate: (view: string) => void;
    onLogout: () => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onDelete: (id: string) => void;
}

const CommentsManagementPage: React.FC<CommentsManagementPageProps> = ({
    comments,
    onNavigate,
    onLogout,
    onApprove,
    onReject,
    onDelete
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

    const filteredComments = comments.filter(comment => {
        const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (comment.email && comment.email.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'all' || comment.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const pendingCount = comments.filter(c => c.status === 'pending').length;
    const approvedCount = comments.filter(c => c.status === 'approved').length;
    const rejectedCount = comments.filter(c => c.status === 'rejected').length;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'approved':
                return 'Approuvé';
            case 'rejected':
                return 'Rejeté';
            case 'pending':
                return 'En attente';
            default:
                return status;
        }
    };

    return (
        <AdminLayout title="Modération des Commentaires" currentView="ADMIN_COMMENTS" onNavigate={onNavigate} onLogout={onLogout}>
            <div className="space-y-6">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Total</p>
                                <h3 className="text-3xl font-bold text-gray-800 font-serif">{comments.length}</h3>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <MessageSquare size={24} className="text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase mb-1">En attente</p>
                                <h3 className="text-3xl font-bold text-yellow-600 font-serif">{pendingCount}</h3>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <Eye size={24} className="text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Approuvés</p>
                                <h3 className="text-3xl font-bold text-green-600 font-serif">{approvedCount}</h3>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <CheckCircle size={24} className="text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Rejetés</p>
                                <h3 className="text-3xl font-bold text-red-600 font-serif">{rejectedCount}</h3>
                            </div>
                            <div className="p-3 bg-red-50 rounded-lg">
                                <XCircle size={24} className="text-red-600" />
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
                                placeholder="Rechercher par auteur, contenu ou email..."
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
                                <option value="pending">En attente</option>
                                <option value="approved">Approuvés</option>
                                <option value="rejected">Rejetés</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {filteredComments.map((comment) => (
                        <div key={comment.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                                        {comment.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{comment.author}</h4>
                                        <p className="text-xs text-gray-500">{comment.email || 'Email non fourni'}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(comment.status)}`}>
                                    {getStatusLabel(comment.status)}
                                </span>
                            </div>

                            <p className="text-gray-700 mb-4 leading-relaxed">{comment.content}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>Article ID: {comment.articleId}</span>
                                    <span>•</span>
                                    <span>{comment.date}</span>
                                    <span>•</span>
                                    <span>{comment.likes} likes</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {comment.status !== 'approved' && (
                                        <button
                                            onClick={() => onApprove(comment.id)}
                                            className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors flex items-center gap-1"
                                        >
                                            <CheckCircle size={14} />
                                            Approuver
                                        </button>
                                    )}

                                    {comment.status !== 'rejected' && (
                                        <button
                                            onClick={() => onReject(comment.id)}
                                            className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-1"
                                        >
                                            <XCircle size={14} />
                                            Rejeter
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
                                                onDelete(comment.id);
                                            }
                                        }}
                                        className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors flex items-center gap-1"
                                    >
                                        <Trash2 size={14} />
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredComments.length === 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                        <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">Aucun commentaire trouvé</p>
                        <p className="text-gray-400 text-sm">Essayez de modifier vos filtres de recherche</p>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
};

export default CommentsManagementPage;
