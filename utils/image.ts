
/**
 * Optimizes an image (base64 or URL) by resizing and compressing it.
 * Useful for handling large user uploads without crashing the browser.
 */
export const optimizeImage = (base64: string, maxWidth = 1000, quality = 0.6): Promise<string> => {
    return new Promise((resolve) => {
        // If it's not a data URI, just return it
        if (!base64.startsWith('data:image/')) {
            resolve(base64);
            return;
        }

        const img = new Image();
        // crossOrigin is not needed for data URIs and can cause issues
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(base64);
                return;
            }

            // Fill with white background to handle transparency (PNG -> JPEG)
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);

            ctx.drawImage(img, 0, 0, width, height);

            // Export as compressed JPEG
            resolve(canvas.toDataURL('image/jpeg', quality));
        };

        img.onerror = () => resolve(base64);
        img.src = base64;
    });
};
