import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Comment, Article } from '../../../types';
import { MessageSquare, Search, CheckCircle, XCircle, Trash2, Eye, X, ArrowUpDown } from 'lucide-react';

interface CommentsManagementPageProps {
    comments: Comment[];
    articles?: Article[];
    onNavigate: (view: string) => void;
    onLogout: () => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onDelete: (id: string) => void;
}

const CommentsManagementPage: React.FC<CommentsManagementPageProps> = ({
    comments,
    articles = [],
    onNavigate,
    onLogout,
    onApprove,
    onReject,
    onDelete
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    // Get article title by ID
    const getArticleTitle = (articleId: string) => {
        const article = articles.find(a => a.id === articleId);
        return article ? article.title : `Article #${articleId}`;
    };

    const filteredComments = useMemo(() => {
        let result = comments.filter(comment => {
            const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (comment.email && comment.email.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesStatus = filterStatus === 'all' || comment.status === filterStatus;
            return matchesSearch && matchesStatus;
        });

        // Sort by date (simulated based on id order for demo)
        if (sortOrder === 'oldest') {
            result = [...result].reverse();
        }

        return result;
    }, [comments, searchTerm, filterStatus, sortOrder]);

    const pendingCount = comments.filter(c => c.status === 'pending').length;
    const approvedCount = comments.filter(c => c.status === 'approved').length;
    const rejectedCount = comments.filter(c => c.status === 'rejected').length;

    // Selection handlers
    const toggleSelectAll = () => {
        if (selectedIds.size === filteredComments.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredComments.map(c => c.id)));
        }
    };

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleBulkApprove = () => {
        selectedIds.forEach(id => onApprove(id));
        setSelectedIds(new Set());
    };

    const handleBulkReject = () => {
        selectedIds.forEach(id => onReject(id));
        setSelectedIds(new Set());
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedIds.size} commentaire(s) ?`)) {
            selectedIds.forEach(id => onDelete(id));
            setSelectedIds(new Set());
        }
    };

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
        <AdminLayout
            title="Modération des Commentaires"
            currentView="ADMIN_COMMENTS"
            onNavigate={onNavigate}
            onLogout={onLogout}
            pendingComments={pendingCount}
        >
            <div className="space-y-6">

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <StatCard
                        label="Total"
                        value={comments.length}
                        icon={<MessageSquare size={24} className="text-primary" />}
                        bgColor="bg-blue-50"
                        textColor="text-gray-800"
                        onClick={() => setFilterStatus('all')}
                        isActive={filterStatus === 'all'}
                    />
                    <StatCard
                        label="En attente"
                        value={pendingCount}
                        icon={<Eye size={24} className="text-yellow-600" />}
                        bgColor="bg-yellow-50"
                        textColor="text-yellow-600"
                        onClick={() => setFilterStatus('pending')}
                        isActive={filterStatus === 'pending'}
                    />
                    <StatCard
                        label="Approuvés"
                        value={approvedCount}
                        icon={<CheckCircle size={24} className="text-green-600" />}
                        bgColor="bg-green-50"
                        textColor="text-green-600"
                        onClick={() => setFilterStatus('approved')}
                        isActive={filterStatus === 'approved'}
                    />
                    <StatCard
                        label="Rejetés"
                        value={rejectedCount}
                        icon={<XCircle size={24} className="text-red-600" />}
                        bgColor="bg-red-50"
                        textColor="text-red-600"
                        onClick={() => setFilterStatus('rejected')}
                        isActive={filterStatus === 'rejected'}
                    />
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher par auteur, contenu ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50"
                            >
                                <ArrowUpDown size={14} />
                                {sortOrder === 'newest' ? 'Plus récents' : 'Plus anciens'}
                            </button>
                        </div>
                    </div>

                    {/* Bulk Actions Bar */}
                    {selectedIds.size > 0 && (
                        <div className="flex flex-wrap items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in">
                            <span className="text-sm font-bold text-primary">
                                {selectedIds.size} sélectionné{selectedIds.size > 1 ? 's' : ''}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={handleBulkApprove}
                                    className="px-3 py-1.5 bg-green-500 text-white rounded text-sm font-bold hover:bg-green-600 transition-colors flex items-center gap-1"
                                >
                                    <CheckCircle size={14} /> Approuver
                                </button>
                                <button
                                    onClick={handleBulkReject}
                                    className="px-3 py-1.5 bg-red-500 text-white rounded text-sm font-bold hover:bg-red-600 transition-colors flex items-center gap-1"
                                >
                                    <XCircle size={14} /> Rejeter
                                </button>
                                <button
                                    onClick={handleBulkDelete}
                                    className="px-3 py-1.5 bg-gray-700 text-white rounded text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-1"
                                >
                                    <Trash2 size={14} /> Supprimer
                                </button>
                            </div>
                            <button
                                onClick={() => setSelectedIds(new Set())}
                                className="ml-auto text-sm text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Annuler
                            </button>
                        </div>
                    )}

                    {/* Select All Option */}
                    {filteredComments.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <input
                                type="checkbox"
                                checked={filteredComments.length > 0 && selectedIds.size === filteredComments.length}
                                onChange={toggleSelectAll}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <span>Sélectionner tous ({filteredComments.length})</span>
                        </div>
                    )}
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {filteredComments.map((comment) => (
                        <div
                            key={comment.id}
                            className={`bg-white p-4 md:p-6 rounded-xl border shadow-sm hover:shadow-md transition-all ${selectedIds.has(comment.id)
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-gray-100'
                                }`}
                        >
                            <div className="flex items-start gap-3 md:gap-4">
                                {/* Checkbox */}
                                <div className="pt-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.has(comment.id)}
                                        onChange={() => toggleSelect(comment.id)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                                    />
                                </div>

                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold flex-shrink-0">
                                    {comment.author.charAt(0).toUpperCase()}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className="font-bold text-gray-900">{comment.author}</h4>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(comment.status)}`}>
                                            {getStatusLabel(comment.status)}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 mb-3">{comment.email || 'Email non fourni'}</p>

                                    <p className="text-gray-700 mb-4 leading-relaxed">{comment.content}</p>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                            <span className="bg-gray-100 px-2 py-1 rounded truncate max-w-[200px]" title={getArticleTitle(comment.articleId)}>
                                                {getArticleTitle(comment.articleId).substring(0, 30)}...
                                            </span>
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
                                                    <span className="hidden md:inline">Approuver</span>
                                                </button>
                                            )}

                                            {comment.status !== 'rejected' && (
                                                <button
                                                    onClick={() => onReject(comment.id)}
                                                    className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-1"
                                                >
                                                    <XCircle size={14} />
                                                    <span className="hidden md:inline">Rejeter</span>
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
                                            </button>
                                        </div>
                                    </div>
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

// Sub-component for stat cards
const StatCard = ({
    label,
    value,
    icon,
    bgColor,
    textColor,
    onClick,
    isActive
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
    bgColor: string;
    textColor: string;
    onClick: () => void;
    isActive: boolean;
}) => (
    <button
        onClick={onClick}
        className={`bg-white p-4 md:p-6 rounded-xl border shadow-sm text-left transition-all hover:shadow-md ${isActive ? 'ring-2 ring-primary border-primary' : 'border-gray-100'
            }`}
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-xs font-bold uppercase mb-1">{label}</p>
                <h3 className={`text-2xl md:text-3xl font-bold ${textColor} font-serif`}>{value}</h3>
            </div>
            <div className={`p-2 md:p-3 ${bgColor} rounded-lg hidden md:block`}>
                {icon}
            </div>
        </div>
    </button>
);

export default CommentsManagementPage;
