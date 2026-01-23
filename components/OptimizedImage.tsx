import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    showErrorIcon?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    fallbackSrc,
    showErrorIcon = true,
    ...props
}) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // If no src is provided, treat it as an error immediately
    if (!src && !fallbackSrc) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
                {showErrorIcon && <ImageOff size={24} />}
            </div>
        );
    }

    const handleError = () => {
        setError(true);
    };

    const handleLoad = () => {
        setLoaded(true);
    };

    if (error) {
        if (fallbackSrc) {
            return (
                <img
                    src={fallbackSrc}
                    alt={alt}
                    className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    onLoad={handleLoad}
                    {...props}
                />
            );
        }

        return (
            <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
                {showErrorIcon && <ImageOff size={24} />}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            onError={handleError}
            onLoad={handleLoad}
            loading="lazy"
            {...props}
        />
    );
};

export default OptimizedImage;
