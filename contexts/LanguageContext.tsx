import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Dictionnaire de traductions simples pour l'accès direct via le contexte si nécessaire
// Note: Le gros des traductions est dans data/translations.ts, mais on peut garder un helper ici
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  // Helper pour récupérer une traduction
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = TRANSLATIONS[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Retourne la clé si traduction manquante
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