import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Author } from '../types';
import OptimizedImage from './OptimizedImage';

interface AuthorProfileProps {
  author: Author;
  onNavigate?: (authorId: string) => void;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ author, onNavigate }) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-start">
      <OptimizedImage
        src={author.avatar}
        alt={author.name}
        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-gray-50 flex-shrink-0"
      />
      <div className="flex-1 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-primary">{author.name}</h3>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">{author.role}</p>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate(author.id)}
              className="text-sm font-bold text-gray-500 hover:text-primary flex items-center gap-2 transition-colors self-start md:self-auto"
            >
              Voir ses articles <ArrowRight size={16} />
            </button>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-0">
          {author.bio}
        </p>
      </div>
    </div>
  );
};

export default AuthorProfile;