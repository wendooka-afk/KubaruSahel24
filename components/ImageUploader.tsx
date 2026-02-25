import React, { useState, useRef, useCallback } from 'react';
import {
    Upload, Link2, Image as ImageIcon, X, Check,
    Loader2, Crop, ZoomIn, Download, Trash2,
    ChevronLeft, ChevronRight, Grid
} from 'lucide-react';
import { optimizeImage } from '../utils/image';

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    aspectRatio?: 'video' | 'square' | 'portrait';
    label?: string;
    showGallery?: boolean;
}

// Sample gallery images (in production, these would come from an API)
const GALLERY_IMAGES = [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800',
    'https://images.unsplash.com/photo-1557992260-ec58e38d363c?w=800',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
];

const ImageUploader: React.FC<ImageUploaderProps> = ({
    value,
    onChange,
    aspectRatio = 'video',
    label = 'Image',
    showGallery = true
}) => {
    const [mode, setMode] = useState<'upload' | 'url' | 'gallery'>('upload');
    const [urlInput, setUrlInput] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showGalleryModal, setShowGalleryModal] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const aspectRatioClass = {
        'video': 'aspect-video',
        'square': 'aspect-square',
        'portrait': 'aspect-[3/4]'
    }[aspectRatio];

    // Handle file upload
    const handleFileChange = useCallback(async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Veuillez sélectionner une image valide');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('L\'image ne doit pas dépasser 5MB');
            return;
        }

        setIsLoading(true);
        setError(null);

        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = reader.result as string;
            try {
                const optimized = await optimizeImage(base64);
                onChange(optimized);
            } catch (err) {
                console.error("Optimization failed:", err);
                onChange(base64);
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            setError('Erreur lors du chargement de l\'image');
            setIsLoading(false);
        };
        reader.readAsDataURL(file);
    }, [onChange]);

    // Handle drag and drop
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileChange(file);
        }
    }, [handleFileChange]);

    // Handle URL input
    const handleUrlSubmit = () => {
        if (!urlInput.trim()) return;

        setIsLoading(true);
        setError(null);

        // Validate URL by trying to load the image
        const img = new Image();
        img.onload = () => {
            onChange(urlInput);
            setUrlInput('');
            setIsLoading(false);
        };
        img.onerror = () => {
            setError('URL invalide ou image inaccessible');
            setIsLoading(false);
        };
        img.src = urlInput;
    };

    // Handle gallery selection
    const handleGallerySelect = (url: string) => {
        onChange(url);
        setShowGalleryModal(false);
    };

    return (
        <div className="space-y-3">
            {/* Mode Tabs */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg w-fit">
                <TabButton
                    active={mode === 'upload'}
                    onClick={() => setMode('upload')}
                    icon={<Upload size={14} />}
                    label="Téléverser"
                />
                <TabButton
                    active={mode === 'url'}
                    onClick={() => setMode('url')}
                    icon={<Link2 size={14} />}
                    label="URL"
                />
                {showGallery && (
                    <TabButton
                        active={mode === 'gallery'}
                        onClick={() => { setMode('gallery'); setShowGalleryModal(true); }}
                        icon={<Grid size={14} />}
                        label="Galerie"
                    />
                )}
            </div>

            {/* Image Preview or Upload Area */}
            {value ? (
                <div className={`relative ${aspectRatioClass} rounded-xl overflow-hidden border border-gray-200 group bg-gray-50`}>
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                        <button
                            type="button"
                            onClick={() => window.open(value, '_blank')}
                            className="p-2.5 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                            title="Voir en grand"
                        >
                            <ZoomIn size={18} className="text-gray-700" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="p-2.5 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors"
                            title="Supprimer"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    {/* Image Info Badge */}
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Check size={12} className="text-green-400" />
                        Image chargée
                    </div>
                </div>
            ) : (
                <>
                    {/* Upload Mode */}
                    {mode === 'upload' && (
                        <div
                            ref={dropZoneRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`${aspectRatioClass} rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${isDragging
                                ? 'border-primary bg-primary/5 scale-[1.02]'
                                : 'border-gray-200 bg-gray-50 hover:border-primary hover:bg-white'
                                } ${isLoading ? 'pointer-events-none opacity-60' : ''}`}
                        >
                            {isLoading ? (
                                <Loader2 size={32} className="text-primary animate-spin" />
                            ) : (
                                <>
                                    <div className={`p-4 rounded-full transition-colors ${isDragging ? 'bg-primary/10' : 'bg-gray-100'}`}>
                                        <Upload size={28} className={isDragging ? 'text-primary' : 'text-gray-400'} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-gray-700">
                                            {isDragging ? 'Déposez l\'image ici' : 'Glissez-déposez une image'}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">ou cliquez pour parcourir</p>
                                        <p className="text-[10px] text-gray-300 mt-2">PNG, JPG, WEBP • Max 5MB</p>
                                    </div>
                                </>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                            />
                        </div>
                    )}

                    {/* URL Mode */}
                    {mode === 'url' && (
                        <div className={`${aspectRatioClass} rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-6`}>
                            <div className="w-full max-w-md space-y-4">
                                <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto">
                                    <Link2 size={24} className="text-gray-400" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="url"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                                        placeholder="https://exemple.com/image.jpg"
                                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleUrlSubmit}
                                        disabled={!urlInput.trim() || isLoading}
                                        className="absolute right-2 top-2 p-2 bg-primary text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 text-center">
                                    Collez l'URL directe d'une image
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                    <X size={14} />
                    {error}
                    <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
                        <X size={12} />
                    </button>
                </div>
            )}

            {/* Gallery Modal */}
            {showGalleryModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
                    onClick={() => setShowGalleryModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">Galerie d'images</h3>
                            <button
                                onClick={() => setShowGalleryModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh]">
                            {GALLERY_IMAGES.map((url, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleGallerySelect(url)}
                                    className="aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all hover:shadow-lg group"
                                >
                                    <img
                                        src={url}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </button>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
                            Sélectionnez une image de la galerie
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Tab Button Sub-component
const TabButton = ({
    active,
    onClick,
    icon,
    label
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${active
            ? 'bg-white text-primary shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
            }`}
    >
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </button>
);

export default ImageUploader;
