import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { Author } from '../types';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthorsPageProps {
  authors: Author[];
}

const AuthorsPage: React.FC<AuthorsPageProps> = ({ authors }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Container size="page">
      <div className="py-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl font-black text-primary mb-4">{t('authors.title')}</h1>
          <p className="text-gray-600 text-lg">
            {t('authors.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <div 
              key={author.id} 
              onClick={() => navigate(`/author/${author.id}`)}
              className="group bg-white border border-gray-100 rounded-xl p-8 text-center hover:shadow-lg transition-all cursor-pointer flex flex-col items-center"
            >
              <div className="w-32 h-32 rounded-full p-1 border-2 border-dashed border-gray-200 mb-6 group-hover:border-secondary transition-colors">
                 <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              <h3 className="font-serif text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                {author.name}
              </h3>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">
                {author.role}
              </p>
              
              <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                {author.bio}
              </p>

              <button className="mt-auto text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                {t('authors.viewProfile')} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AuthorsPage;