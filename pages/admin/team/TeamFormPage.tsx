import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Author, AuthorStatus } from '../../../types';
import { User, Mail, Phone, Briefcase, Calendar, Twitter, Facebook, Linkedin, Instagram, Save, X } from 'lucide-react';

interface TeamFormPageProps {
    author?: Author;
    onNavigate: (view: string) => void;
    onLogout: () => void;
    onSubmit: (author: Author) => void;
}

const TeamFormPage: React.FC<TeamFormPageProps> = ({ author, onNavigate, onLogout, onSubmit }) => {
    const isEdit = !!author;

    const [formData, setFormData] = useState<Partial<Author>>({
        id: author?.id || Date.now().toString(),
        name: author?.name || '',
        role: author?.role || '',
        email: author?.email || '',
        phone: author?.phone || '',
        bio: author?.bio || '',
        avatar: author?.avatar || `https://picsum.photos/seed/${Date.now()}/100/100`,
        status: author?.status || 'active',
        joinedDate: author?.joinedDate || new Date().toISOString().split('T')[0],
        articlesCount: author?.articlesCount || 0,
        socialMedia: {
            twitter: author?.socialMedia?.twitter || '',
            facebook: author?.socialMedia?.facebook || '',
            linkedin: author?.socialMedia?.linkedin || '',
            instagram: author?.socialMedia?.instagram || ''
        }
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleSocialMediaChange = (platform: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [platform]: value
            }
        }));
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name?.trim()) {
            newErrors.name = 'Le nom est requis';
        }
        if (!formData.role?.trim()) {
            newErrors.role = 'Le rôle est requis';
        }
        if (!formData.email?.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        if (!formData.bio?.trim()) {
            newErrors.bio = 'La biographie est requise';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit(formData as Author);
    };

    return (
        <AdminLayout
            title={isEdit ? 'Modifier un membre' : 'Ajouter un membre'}
            currentView="ADMIN_TEAM"
            onNavigate={onNavigate}
            onLogout={onLogout}
        >
            <form onSubmit={handleSubmit} className="max-w-4xl">

                {/* Header Actions */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                        {isEdit ? 'Modifiez les informations du membre de l\'équipe' : 'Ajoutez un nouveau membre à l\'équipe éditoriale'}
                    </p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => onNavigate('ADMIN_TEAM')}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <X size={16} />
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors flex items-center gap-2"
                        >
                            <Save size={16} />
                            {isEdit ? 'Mettre à jour' : 'Ajouter'}
                        </button>
                    </div>
                </div>

                {/* Main Form */}
                <div className="space-y-6">

                    {/* Informations de base */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                            <User size={20} className="text-primary" />
                            Informations de base
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Nom complet <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="Ex: Amadou Diallo"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Rôle <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => handleChange('role', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.role ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="Ex: Rédacteur en Chef"
                                />
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        placeholder="email@kubarusahel24.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Téléphone
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="+237 690 123 456"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Date d'arrivée
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        value={formData.joinedDate}
                                        onChange={(e) => handleChange('joinedDate', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Statut
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => handleChange('status', e.target.value as AuthorStatus)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="active">Actif</option>
                                    <option value="inactive">Inactif</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Biographie <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => handleChange('bio', e.target.value)}
                                rows={4}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${errors.bio ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                placeholder="Décrivez l'expertise et le parcours du membre..."
                            />
                            {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
                        </div>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                            <Briefcase size={20} className="text-primary" />
                            Réseaux sociaux
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Twitter
                                </label>
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.socialMedia?.twitter}
                                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="@username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Facebook
                                </label>
                                <div className="relative">
                                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.socialMedia?.facebook}
                                        onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    LinkedIn
                                </label>
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.socialMedia?.linkedin}
                                        onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Instagram
                                </label>
                                <div className="relative">
                                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.socialMedia?.instagram}
                                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="@username"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </AdminLayout>
    );
};

export default TeamFormPage;
