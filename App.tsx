import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import WebTVPage from './pages/WebTVPage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';
import AuthorsPage from './pages/AuthorsPage';
import AuthorDetailsPage from './pages/AuthorDetailsPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NewsletterPage from './pages/NewsletterPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ArticlesListPage from './pages/admin/articles/ArticlesListPage';
import NewArticlePage from './pages/admin/articles/NewArticlePage';
import VideosListPage from './pages/admin/videos/VideosListPage';
import NewVideoPage from './pages/admin/videos/NewVideoPage';
import TeamListPage from './pages/admin/team/TeamListPage';
import TeamFormPage from './pages/admin/team/TeamFormPage';
import CommentsManagementPage from './pages/admin/comments/CommentsManagementPage';

import ScrollToTop from './components/ScrollToTop';
import { ToastProvider } from './components/Toast';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

import {
  ARTICLES_FR, ARTICLES_EN,
  VIDEOS_FR, VIDEOS_EN,
  BREAKING_NEWS_FR, BREAKING_NEWS_EN,
  AUTHORS_FR, AUTHORS_EN,
  COMMENTS_FR, COMMENTS_EN
} from './data/mockData';
import { Article, Video, Author, Comment } from './types';

// Wrapper pour les routes admin
const AdminRoute: React.FC<{ children: React.ReactNode; isAdminLoggedIn: boolean }> = ({ children, isAdminLoggedIn }) => {
  return isAdminLoggedIn ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// Composant pour scroller en haut à chaque changement de page
const ScrollManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Initialisation sécurisée des données
  const [articles, setArticles] = useState<Article[]>(() => language === 'en' ? ARTICLES_EN : ARTICLES_FR);
  const [videos, setVideos] = useState<Video[]>(() => language === 'en' ? VIDEOS_EN : VIDEOS_FR);
  const [authors, setAuthors] = useState<Record<string, Author>>(() => language === 'en' ? AUTHORS_EN : AUTHORS_FR);
  const [comments, setComments] = useState<Comment[]>(() => language === 'en' ? COMMENTS_EN : COMMENTS_FR);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('isAdminLoggedIn') === 'true';
    } catch {
      return false;
    }
  });

  // Mise à jour réactive lors du changement de langue
  useEffect(() => {
    setArticles(language === 'en' ? ARTICLES_EN : ARTICLES_FR);
    setVideos(language === 'en' ? VIDEOS_EN : VIDEOS_FR);
    setAuthors(language === 'en' ? AUTHORS_EN : AUTHORS_FR);
    setComments(language === 'en' ? COMMENTS_EN : COMMENTS_FR);
  }, [language]);

  const breakingNews = useMemo(() =>
    articles
      .filter(a => a.isBreaking)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    , [articles]);

  const handleLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('isAdminLoggedIn', 'true');
    navigate('/admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const handleAddArticle = (newArticle: Article) => {
    setArticles(prev => [newArticle, ...prev]);
    navigate('/admin/articles');
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleAddVideo = (newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
    navigate('/admin/videos');
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  // Team handlers
  const handleDeleteTeamMember = (id: string) => {
    setAuthors(prev => {
      const newAuthors = { ...prev };
      delete newAuthors[id];
      return newAuthors;
    });
  };

  const handleEditTeamMember = (id: string) => {
    // For now, just navigate - full edit form would be implemented in TeamFormPage
    console.log('Edit team member:', id);
  };

  // Comments handlers
  const handleApproveComment = (id: string) => {
    setComments(prev => prev.map(c =>
      c.id === id ? { ...c, status: 'approved' as const } : c
    ));
  };

  const handleRejectComment = (id: string) => {
    setComments(prev => prev.map(c =>
      c.id === id ? { ...c, status: 'rejected' as const } : c
    ));
  };

  const handleDeleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const handleAddTeamMember = (newMember: Author) => {
    setAuthors(prev => ({
      ...prev,
      [newMember.id]: newMember
    }));
    navigate('/admin/team');
  };

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <>
      <ScrollManager />
      <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white selection:bg-secondary selection:text-primary">
        {!isAdminPath && <Header breakingNews={breakingNews} />}

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage articles={articles} videos={videos} />} />
            <Route path="/category/:id" element={<CategoryPage articles={articles} />} />
            <Route path="/article/:id" element={<ArticlePage articles={articles} />} />
            <Route path="/webtv" element={<WebTVPage videos={videos} articles={articles} />} />
            <Route path="/authors" element={<AuthorsPage authors={Object.values(authors)} />} />
            <Route path="/author/:id" element={<AuthorDetailsPage articles={articles} authors={authors} />} />
            <Route path="/search" element={<SearchPage articles={articles} />} />

            {/* Static Pages */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={
              <LoginPage onLogin={handleLogin} onBack={() => navigate('/')} />
            } />

            <Route path="/admin" element={
              <AdminRoute isAdminLoggedIn={isAdminLoggedIn}>
                <DashboardPage
                  articles={articles}
                  videos={videos}
                  onNavigate={(view) => {
                    const paths: Record<string, string> = {
                      'ADMIN_DASHBOARD': '/admin',
                      'ADMIN_ARTICLES': '/admin/articles',
                      'ADMIN_NEW_ARTICLE': '/admin/articles/new',
                      'ADMIN_VIDEOS': '/admin/videos',
                      'ADMIN_NEW_VIDEO': '/admin/videos/new',
                      'ADMIN_TEAM': '/admin/team',
                      'ADMIN_COMMENTS': '/admin/comments'
                    };
                    navigate(paths[view] || '/admin');
                  }}
                  onLogout={handleLogout}
                />
              </AdminRoute>
            } />
            <Route path="/admin/articles" element={
              <AdminRoute isAdminLoggedIn={isAdminLoggedIn}>
                <ArticlesListPage
                  articles={articles}
                  onNavigate={(view) => navigate(view === 'ADMIN_NEW_ARTICLE' ? '/admin/articles/new' : '/admin')}
                  onLogout={handleLogout}
                  onDelete={handleDeleteArticle}
                />
              </AdminRoute>
            } />
            <Route path="/admin/articles/new" element={
              <AdminRoute isAdminLoggedIn={isAdminLoggedIn}>
                <NewArticlePage
                  onNavigate={() => navigate('/admin/articles')}
                  onLogout={handleLogout}
                  onSubmit={handleAddArticle}
                />
              </AdminRoute>
            } />
            <Route path="/admin/videos" element={
              <AdminRoute isAdminLoggedIn={isAdminLoggedIn}>
                <VideosListPage
                  videos={videos}
                  onNavigate={(view) => navigate(view === 'ADMIN_NEW_VIDEO' ? '/admin/videos/new' : '/admin')}
                  onLogout={handleLogout}
                  onDelete={handleDeleteVideo}
                />
              </AdminRoute>
            } />
            <Route path="/admin/videos/new" element={
              <AdminRoute isAdminLoggedIn={isAdminLoggedIn}>
                <NewVideoPage
                  onNavigate={() => navigate('/admin/videos')}
                  onLogout={handleLogout}
                  onSubmit={handleAddVideo}
                />
              </AdminRoute>
            } />

            <Route path="/admin/team" element={
              <AdminRoute isAdminLoggedIn={isAdminLoggedIn}>
                <TeamListPage
                  authors={authors}
                  onNavigate={(view) => navigate(view === 'ADMIN_NEW_TEAM_MEMBER' ? '/admin/team/new' : '/admin')}
                  onLogout={handleLogout}
                  onDelete={handleDeleteTeamMember}
                  onEdit={handleEditTeamMember}
                />
              </AdminRoute>
            } />

            <Route path="/admin/team/new" element={
              <AdminRoute isAdminLoggedIn={isAdminLoggedIn}>
                <TeamFormPage
                  onNavigate={(view) => navigate('/admin/team')}
                  onLogout={handleLogout}
                  onSubmit={handleAddTeamMember}
                />
              </AdminRoute>
            } />

            <Route path="/admin/comments" element={
              <AdminRoute isAdminLoggedIn={isAdminLoggedIn}>
                <CommentsManagementPage
                  comments={comments}
                  onNavigate={(view) => navigate('/admin')}
                  onLogout={handleLogout}
                  onApprove={handleApproveComment}
                  onReject={handleRejectComment}
                  onDelete={handleDeleteComment}
                />
              </AdminRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {!isAdminPath && <Footer />}
        <ScrollToTop />
      </div>
    </>
  );
};

const App: React.FC = () => (
  <ToastProvider>
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  </ToastProvider>
);

export default App;