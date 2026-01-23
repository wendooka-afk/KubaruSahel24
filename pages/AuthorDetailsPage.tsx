
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Author, Article } from '../types';
import Container from '../components/Container';
import AuthorProfile from '../components/AuthorProfile';
import ArticleCard from '../components/ArticleCard';
import { ArrowLeft } from 'lucide-react';

interface AuthorDetailsPageProps {
  articles: Article[];
  authors: Record<string, Author>;
}

const AuthorDetailsPage: React.FC<AuthorDetailsPageProps> = ({ articles, authors }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Trouver l'auteur dans l'objet par ID (le mock est par clé, on cherche la valeur)
  // Fix: Explicitly cast to Author[] to avoid "Property 'id' does not exist on type 'unknown'"
  const author = (Object.values(authors) as Author[]).find(a => a.id === id);
  const authorArticles = articles.filter(a => a.author.id === id);

  if (!author) return <div className="py-20 text-center">Auteur non trouvé</div>;

  return (
    <Container size="page">
      <div className="py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 font-medium">
          <ArrowLeft size={16} /> Retour
        </button>

        <AuthorProfile author={author} />

        <div className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-primary mb-8 pb-4 border-b border-gray-200">Articles publiés ({authorArticles.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8 space-y-8">
               {authorArticles.map(article => (
                 <ArticleCard key={article.id} article={article} variant="horizontal" />
               ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuthorDetailsPage;
