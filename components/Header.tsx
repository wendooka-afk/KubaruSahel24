import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, Bell, Globe, ChevronDown } from 'lucide-react';
import Container from './Container';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  breakingNews: { id: string; title: string }[];
}

const Header: React.FC<HeaderProps> = ({ breakingNews }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('nav.home'), path: '/', isActive: location.pathname === '/' },
    { label: t('nav.politics'), path: '/category/Politique', isActive: location.pathname === '/category/Politique' },
    { label: t('nav.economy'), path: '/category/Économie', isActive: location.pathname === '/category/Économie' },
    { label: t('nav.society'), path: '/category/Société', isActive: location.pathname === '/category/Société' },
    { label: t('nav.culture'), path: '/category/Culture', isActive: location.pathname === '/category/Culture' },
    { label: t('nav.regions'), path: '/category/Régions', isActive: location.pathname === '/category/Régions' },
    { label: t('nav.webtv'), path: '/webtv', isActive: location.pathname === '/webtv' },
    { label: t('nav.contact'), path: '/contact', isActive: location.pathname === '/contact' },
  ];

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'border-b border-gray-100'}`}>
      {/* Top Bar */}
      <div className="bg-primary text-white text-[10px] md:text-xs py-1.5 hidden md:block">
        <Container size="full">
          <div className="flex justify-between items-center opacity-90">
            <span className="font-medium">{new Date().toLocaleDateString(t('header.date'), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="flex gap-6 items-center">
              <Link to="/newsletter" className="hover:text-secondary transition-colors">{t('nav.newsletter')}</Link>
              <Link to="/about" className="hover:text-secondary transition-colors">{t('nav.about')}</Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">{t('nav.contact')}</Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <div className={`py-3 md:py-5 transition-all duration-300 ${scrolled ? 'py-2 md:py-3' : ''}`}>
        <Container size="full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 md:hidden">
              <button className="text-primary p-2 bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            <Link to="/" className="flex items-center group">
              <img
                src="/Logo Kubaru Sahel 24.png"
                alt="Kubaru Sahel 24"
                className="h-12 md:h-16 w-auto transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={toggleLanguage} className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-primary transition-all bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-100">
                <Globe size={16} className="text-gray-400" />
                <span className="w-16 text-left">{language === 'fr' ? 'English' : 'Français'}</span>
                <ChevronDown size={14} className="opacity-50" />
              </button>

              <div className="flex items-center gap-2">
                <Link to="/search" className="p-2.5 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-full transition-all" title={t('nav.search')}>
                  <Search size={20} />
                </Link>
                <button className="p-2.5 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-full transition-all relative">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
              </div>

              <div className="h-8 w-px bg-gray-100 mx-2"></div>

              <Link to="/admin/login" className="flex items-center gap-2 hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold text-primary border border-primary/10 transition-all bg-gray-50">
                <User size={16} />
                <span>{t('nav.account')}</span>
              </Link>
            </div>

            <Link to="/search" className="md:hidden text-primary p-2 bg-gray-50 rounded-lg"><Search size={20} /></Link>
          </div>
        </Container>
      </div>

      {/* Navigation - Tablet/Desktop */}
      <nav className="hidden md:block border-t border-gray-50 bg-white/80 backdrop-blur-sm">
        <Container size="full">
          <ul className="flex justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-500">
            {menuItems.map((item, index) => (
              <li key={index} className="relative py-4 group">
                <Link
                  to={item.path}
                  className={`transition-all duration-300 hover:text-secondary ${item.isActive ? 'text-primary' : ''}`}
                >
                  {item.label}
                </Link>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300 scale-x-0 group-hover:scale-x-100 ${item.isActive ? 'scale-x-100' : ''}`}></span>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-white transition-all duration-500 md:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-serif text-2xl font-black text-primary">MENU</h2>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-primary"><X size={24} /></button>
          </div>

          <ul className="space-y-6 flex-grow overflow-y-auto">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`text-2xl font-black block transition-colors ${item.isActive ? 'text-primary' : 'text-gray-400'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10 border-t border-gray-100">
            <button onClick={toggleLanguage} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-4 font-bold">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-primary" />
                <span>{language === 'fr' ? 'English' : 'Français'}</span>
              </div>
              <ChevronDown size={20} className="text-gray-400" />
            </button>
            <Link to="/admin/login" className="w-full flex items-center justify-center gap-3 p-4 bg-primary text-white rounded-2xl font-bold" onClick={() => setIsMenuOpen(false)}>
              <User size={20} />
              {t('nav.account')}
            </Link>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-primary text-white py-2 overflow-hidden flex items-center relative z-0">
        <div className="bg-secondary text-primary font-black px-4 py-1 ml-4 z-10 text-[10px] uppercase shadow-lg flex-shrink-0 rounded-sm">
          {t('header.live')}
        </div>
        <div className="whitespace-nowrap animate-marquee flex items-center gap-12 pl-6 w-full font-medium text-sm">
          {(() => {
            const limitedNews = breakingNews.slice(0, 3);
            const duplicatedNews = [...limitedNews, ...limitedNews];
            return duplicatedNews.map((item, idx) => (
              <React.Fragment key={`${item.id}-${idx}`}>
                <Link to={`/article/${item.id}`} className="hover:text-secondary transition-colors inline-block">
                  {item.title}
                </Link>
                <span className="text-secondary opacity-50 font-black text-lg">/</span>
              </React.Fragment>
            ));
          })()}
        </div>
      </div>
    </header>
  );
};

export default Header;