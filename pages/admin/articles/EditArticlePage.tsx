import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import NewArticlePage from './NewArticlePage';
import { Article } from '../../../types';

interface EditArticlePageProps {
    articles: Article[];
    onNavigate: (view: string) => void;
    onLogout: () => void;
    onSubmit: (article: Article) => void;
}

const EditArticlePage: React.FC<EditArticlePageProps> = ({ articles, onNavigate, onLogout, onSubmit }) => {
    const { id } = useParams<{ id: string }>();

    const articleToEdit = useMemo(() =>
        articles.find(a => a.id === id),
        [articles, id]);

    if (!articleToEdit) {
        return <Navigate to="/admin/articles" replace />;
    }

    return (
        <NewArticlePage
            onNavigate={onNavigate}
            onLogout={onLogout}
            onSubmit={onSubmit}
            initialData={articleToEdit}
        />
    );
};

export default EditArticlePage;
