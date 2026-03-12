import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ─────────────────────────────────────────────────────────────────────────────
// Helpers pour le cookie googtrans (mécanisme officiel de Google Translate)
// ─────────────────────────────────────────────────────────────────────────────

/** Lit la langue cible depuis le cookie googtrans (ex: /fr/en → 'en') */
function readGoogTransCookie(): Language | null {
  try {
    const match = document.cookie.match(/googtrans=\/fr\/(\w+)/);
    if (match && match[1]) {
      return match[1] === 'en' ? 'en' : 'fr';
    }
  } catch { /* ignore */ }
  return null;
}

/** Pose le cookie googtrans pour activer Google Translate côté serveur/navigateur */
function setGoogTransCookie(targetLang: string) {
  const value = targetLang === 'fr' ? '/fr/fr' : `/fr/${targetLang}`;
  const domain = window.location.hostname;
  // Cookie pour le domaine courant
  document.cookie = `googtrans=${value}; path=/; SameSite=Lax`;
  // Cookie pour le domaine sans sous-domaine (nécessaire pour certains hébergeurs)
  if (domain !== 'localhost') {
    document.cookie = `googtrans=${value}; path=/; domain=.${domain}; SameSite=Lax`;
  }
}

/** Supprime le cookie googtrans pour revenir au français */
function clearGoogTransCookie() {
  document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
  const domain = window.location.hostname;
  if (domain !== 'localhost') {
    document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Déterminer la langue active en lisant le cookie googtrans OU localStorage
  const [language, setLanguageState] = useState<Language>(() => {
    const fromCookie = readGoogTransCookie();
    if (fromCookie) return fromCookie;
    try {
      return (localStorage.getItem('preferredLanguage') as Language) || 'fr';
    } catch {
      return 'fr';
    }
  });

  // Synchroniser l'attribut lang du document
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch { /* ignore */ }

    if (lang === 'en') {
      // Activer Google Translate : pose le cookie et recharge la page
      setGoogTransCookie('en');
      window.location.reload();
    } else {
      // Revenir au français : supprime le cookie et recharge
      clearGoogTransCookie();
      window.location.reload();
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = TRANSLATIONS[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};