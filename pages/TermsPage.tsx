import React from 'react';
import Container from '../components/Container';
import { useLanguage } from '../contexts/LanguageContext';

const TermsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Container size="article">
      <div className="py-12">
        <h1 className="font-serif text-3xl font-black text-primary mb-8">{t('terms.title')}</h1>
        
        <div className="prose prose-slate max-w-none text-sm text-gray-700">
          <p className="text-gray-500 italic mb-6">{t('terms.lastUpdate')}</p>

          <h3>{t('terms.s1_title')}</h3>
          <p>{t('terms.s1_text')}</p>

          <h3>{t('terms.s2_title')}</h3>
          <p>{t('terms.s2_text')}</p>

          <h3>{t('terms.s3_title')}</h3>
          <p>{t('terms.s3_text')}</p>
        </div>
      </div>
    </Container>
  );
};

export default TermsPage;