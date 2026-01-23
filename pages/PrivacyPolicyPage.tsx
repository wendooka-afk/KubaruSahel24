import React from 'react';
import Container from '../components/Container';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Container size="article">
      <div className="py-12">
        <h1 className="font-serif text-3xl font-black text-primary mb-8">{t('privacy.title')}</h1>
        
        <div className="prose prose-slate max-w-none text-sm text-gray-700">
          <p className="text-gray-500 italic mb-6">{t('privacy.lastUpdate')}</p>

          <h3>{t('privacy.s1_title')}</h3>
          <p>{t('privacy.s1_text')}</p>

          <h3>{t('privacy.s2_title')}</h3>
          <p>{t('privacy.s2_text')}</p>

          <h3>{t('privacy.s3_title')}</h3>
          <p>{t('privacy.s3_text')}</p>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;