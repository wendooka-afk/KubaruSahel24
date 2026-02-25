import React, { useState, useRef, useCallback } from 'react';
import {
    Upload, Link2, X, Check, Loader2, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';
import { optimizeImage } from '../utils/image';

interface InlineImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (html: string) => void;
}

const InlineImageModal: React.FC<InlineImageModalProps> = ({ isOpen, onClose, onInsert }) => {
    const [mode, setMode] = useState<'upload' | 'url'>('upload');
    const [imageUrl, setImageUrl] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [caption, setCaption] = useState('');
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
    const [size, setSize] = useState<'small' | 'medium' | 'full'>('full');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const reset = () => {
        setImageUrl('');
        setUrlInput('');
        setCaption('');
        setAlignment('center');
        setSize('full');
        setError(null);
        setMode('upload');
    };

    const handleClose = () => {
        reset();
        onClose();
    };

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
                setImageUrl(optimized);
            } catch (err) {
                console.error("Optimization failed:", err);
                setImageUrl(base64);
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            setError('Erreur lors du chargement');
            setIsLoading(false);
        };
        reader.readAsDataURL(file);
    }, []);

    const handleUrlSubmit = () => {
        if (!urlInput.trim()) return;

        setIsLoading(true);
        setError(null);

        const img = new Image();
        img.onload = () => {
            setImageUrl(urlInput);
            setIsLoading(false);
        };
        img.onerror = () => {
            setError('URL invalide ou image inaccessible');
            setIsLoading(false);
        };
        img.src = urlInput;
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileChange(file);
    }, [handleFileChange]);

    const handleInsert = async () => {
        if (!imageUrl || isLoading) return;

        setIsLoading(true);
        const widthClass = {
            'small': 'max-w-sm',
            'medium': 'max-w-lg',
            'full': 'w-full'
        }[size];

        const alignClass = {
            'left': 'mr-auto',
            'center': 'mx-auto',
            'right': 'ml-auto'
        }[alignment];

        const html = caption
            ? `<figure class="my-6 ${alignClass} text-center">
          <img src="${imageUrl}" alt="${caption}" class="${widthClass} rounded-xl shadow-lg mx-auto" />
          <figcaption class="text-center text-sm text-gray-400 mt-2 italic font-sans">${caption}</figcaption>
        </figure>`
            : `<img src="${imageUrl}" alt="Image" class="${widthClass} ${alignClass} rounded-xl shadow-lg my-6 block" />`;

        onInsert(html);
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">Insérer une image</h3>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    {!imageUrl ? (
                        <>
                            {/* Mode Tabs */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setMode('upload')}
                                    className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${mode === 'upload' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Upload size={16} /> Téléverser
                                </button>
                                <button
                                    onClick={() => setMode('url')}
                                    className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${mode === 'url' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Link2 size={16} /> URL
                                </button>
                            </div>

                            {/* Upload Area */}
                            {mode === 'upload' && (
                                <div
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:border-primary'
                                        }`}
                                >
                                    {isLoading ? (
                                        <Loader2 size={32} className="text-primary animate-spin" />
                                    ) : (
                                        <>
                                            <Upload size={32} className={isDragging ? 'text-primary' : 'text-gray-400'} />
                                            <p className="text-sm text-gray-600 font-medium">
                                                {isDragging ? 'Déposez l\'image' : 'Glissez-déposez ou cliquez'}
                                            </p>
                                            <p className="text-xs text-gray-400">PNG, JPG, WEBP • Max 5MB</p>
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

                            {/* URL Input */}
                            {mode === 'url' && (
                                <div className="space-y-3">
                                    <div className="relative">
                                        <input
                                            type="url"
                                            value={urlInput}
                                            onChange={(e) => setUrlInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                                            placeholder="https://exemple.com/image.jpg"
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleUrlSubmit}
                                            disabled={!urlInput.trim() || isLoading}
                                            className="absolute right-2 top-2 p-2 bg-primary text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors"
                                        >
                                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Preview */}
                            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                                <button
                                    onClick={() => setImageUrl('')}
                                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Caption */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Légende (optionnel)</label>
                                <input
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="Description de l'image..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Alignment */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Alignement</label>
                                    <div className="flex bg-gray-100 rounded-lg p-1">
                                        <button
                                            type="button"
                                            onClick={() => setAlignment('left')}
                                            className={`flex-1 p-2 rounded ${alignment === 'left' ? 'bg-white shadow' : ''}`}
                                        >
                                            <AlignLeft size={16} className="mx-auto text-gray-600" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAlignment('center')}
                                            className={`flex-1 p-2 rounded ${alignment === 'center' ? 'bg-white shadow' : ''}`}
                                        >
                                            <AlignCenter size={16} className="mx-auto text-gray-600" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAlignment('right')}
                                            className={`flex-1 p-2 rounded ${alignment === 'right' ? 'bg-white shadow' : ''}`}
                                        >
                                            <AlignRight size={16} className="mx-auto text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Size */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Taille</label>
                                    <select
                                        value={size}
                                        onChange={(e) => setSize(e.target.value as any)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                                    >
                                        <option value="small">Petite</option>
                                        <option value="medium">Moyenne</option>
                                        <option value="full">Pleine largeur</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2">
                            <X size={14} />
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleInsert}
                        disabled={!imageUrl || isLoading}
                        className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        {isLoading && <Loader2 size={16} className="animate-spin" />}
                        {isLoading ? 'Traitement...' : 'Insérer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InlineImageModal;
