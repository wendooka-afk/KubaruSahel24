import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Lock } from 'lucide-react';
import Container from './Container';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer translate="no" className="bg-primary text-white pt-16 pb-8">
      <Container size="full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <img src="/logo.png" alt="Kubaru Sahel 24" className="h-16 w-auto mb-6 bg-white/10 rounded-lg p-2" />
            <p className="text-blue-100 text-sm leading-relaxed mb-6">{t('footer.brandDesc')}</p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"><Twitter size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"><Instagram size={16} /></a>
            </div>
          </div>

          <div className="hidden md:block"></div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-6 text-secondary">{t('footer.usefulLinks')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-100">
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/authors" className="hover:text-white transition-colors">{t('footer.journalists')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
              </ul>
              <ul className="space-y-3">
                <li><Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link></li>
                <li><Link to="/newsletter" className="hover:text-white transition-colors">{t('nav.newsletter')}</Link></li>
                <li>
                  <Link to="/admin/login" className="flex items-center gap-2 text-blue-300 hover:text-secondary transition-colors mt-4 pt-4 border-t border-white/10">
                    <Lock size={14} /> {t('footer.proArea')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200">
          <p>© 2024 Kubaru Sahel 24. {t('footer.rights')}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "white" }}>
            {t('footer.designedBy')} <span style={{ color: "red" }}>&#10084;</span> {language === 'fr' ? 'par' : 'by'} <a href="https://wendooka.com" style={{ color: "white" }} target="_blank" rel="noopener noreferrer">wendooka</a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;