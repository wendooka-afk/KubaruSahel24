/**
 * Slugify a string for use in URLs
 * Handles French accents and special characters
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        // Normalize unicode characters and remove accents
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Replace non-alphanumeric characters with hyphens
        .replace(/[^a-z0-9]+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-+|-+$/g, '')
        // Limit length to 100 characters
        .substring(0, 100)
        // Remove trailing hyphen if substring cut in the middle
        .replace(/-+$/, '');
}

/**
 * Generate a unique slug from a title
 * Optionally append a number if slug already exists
 */
export function generateUniqueSlug(title: string, existingSlugs: string[] = []): string {
    let slug = slugify(title);
    let counter = 1;
    const originalSlug = slug;

    while (existingSlugs.includes(slug)) {
        slug = `${originalSlug}-${counter}`;
        counter++;
    }

    return slug;
}
