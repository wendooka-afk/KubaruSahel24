import React from 'react';
import Container from '../components/Container';
import { Target, Shield, Users, Map } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Container size="page">
      <div className="py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl font-black text-primary mb-6">{t('about.title')}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('about.tagline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">{t('about.missionTitle')}</h2>
            <div className="w-12 h-1 bg-secondary mb-6"></div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('about.missionP1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('about.missionP2')}
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-8 border border-gray-200">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center text-center">
                   <div className="bg-white p-4 rounded-full shadow-sm mb-3 text-primary"><Target size={24} /></div>
                   <h3 className="font-bold text-gray-900">{t('about.values.verified')}</h3>
                   <p className="text-xs text-gray-500 mt-1">{t('about.values.verifiedDesc')}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                   <div className="bg-white p-4 rounded-full shadow-sm mb-3 text-primary"><Shield size={24} /></div>
                   <h3 className="font-bold text-gray-900">{t('about.values.independence')}</h3>
                   <p className="text-xs text-gray-500 mt-1">{t('about.values.independenceDesc')}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                   <div className="bg-white p-4 rounded-full shadow-sm mb-3 text-primary"><Users size={24} /></div>
                   <h3 className="font-bold text-gray-900">{t('about.values.proximity')}</h3>
                   <p className="text-xs text-gray-500 mt-1">{t('about.values.proximityDesc')}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                   <div className="bg-white p-4 rounded-full shadow-sm mb-3 text-primary"><Map size={24} /></div>
                   <h3 className="font-bold text-gray-900">{t('about.values.regional')}</h3>
                   <p className="text-xs text-gray-500 mt-1">{t('about.values.regionalDesc')}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-primary text-white rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="font-serif text-2xl font-bold mb-6">{t('about.historyTitle')}</h2>
             <p className="leading-relaxed text-blue-100 mb-4">
               {t('about.historyP1')}
             </p>
             <p className="leading-relaxed text-blue-100">
               {t('about.historyP2')}
             </p>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="text-center">
           <h2 className="font-serif text-2xl font-bold text-primary mb-4">{t('about.who')}</h2>
           <p className="text-gray-600 max-w-2xl mx-auto mb-8">
             {t('about.whoDesc')}
           </p>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;