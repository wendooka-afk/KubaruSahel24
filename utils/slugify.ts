export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Split accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start
        .replace(/-+$/, ''); // Trim - from end
};

export const deslugify = (slug: string): string => {
    // Simple heuristic: capitalize first letter, replace dashes with spaces
    // Note: This won't restore accents perfectly, so use with caution for display
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Helper to map category slugs back to exact Category type
const KNOWN_CATEGORIES = ['Politique', 'Économie', 'Société', 'Culture', 'Régions', 'Sport', 'Tech'];

export const getCategoryFromSlug = (slug: string): string | undefined => {
    return KNOWN_CATEGORIES.find(cat => slugify(cat) === slug);
};
