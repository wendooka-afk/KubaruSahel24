import { Category } from './types';

export const CATEGORY_COLORS: Record<Category, string> = {
    'Politique': '#1d4ed8', // blue-700
    'Économie': '#059669', // emerald-600
    'Société': '#ea580c', // orange-600
    'Culture': '#7c3aed', // violet-600
    'Régions': '#4f46e5', // indigo-600
    'Sport': '#dc2626', // red-600
    'Tech': '#0891b2', // cyan-600
};

export const getCategoryColor = (category: string) => {
    return CATEGORY_COLORS[category as Category] || '#1e293b'; // slate-800 default
};
