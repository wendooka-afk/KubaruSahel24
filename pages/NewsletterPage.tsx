import React, { useState } from 'react';
import Container from '../components/Container';
import { Mail, Check, Bell, BookOpen, Calendar } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useLanguage } from '../contexts/LanguageContext';

const NewsletterPage: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      addToast(t('sidebar.subscribed'), 'success');
      setEmail('');
    } else {
      addToast('Invalid email address.', 'error');
    }
  };

  return (
    <Container size="page">
      <div className="py-12">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="md:w-1/2 bg-primary relative overflow-hidden p-8 flex flex-col justify-center text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary opacity-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
            
            <h2 className="font-serif text-3xl font-bold mb-4 relative z-10">{t('newsletter_page.title')}</h2>
            <p className="text-blue-100 mb-8 relative z-10 text-lg">
              {t('newsletter_page.desc')}
            </p>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full"><Bell size={18} /></div>
                <span className="text-sm font-medium">{t('newsletter_page.benefits.realtime')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full"><BookOpen size={18} /></div>
                <span className="text-sm font-medium">{t('newsletter_page.benefits.exclusive')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full"><Calendar size={18} /></div>
                <span className="text-sm font-medium">{t('newsletter_page.benefits.culture')}</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
             {isSubscribed ? (
               <div className="text-center py-8 animate-fade-in">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Check size={32} />
                 </div>
                 <h3 className="font-bold text-2xl text-gray-800 mb-2">{t('newsletter_page.successTitle')}</h3>
                 <p className="text-gray-600">
                   {t('newsletter_page.successDesc')}
                 </p>
                 <button 
                   onClick={() => setIsSubscribed(false)} 
                   className="mt-6 text-primary font-bold hover:underline text-sm"
                 >
                   {t('newsletter_page.another')}
                 </button>
               </div>
             ) : (
               <>
                 <h3 className="font-bold text-2xl text-gray-800 mb-2">{t('newsletter_page.join')}</h3>
                 <p className="text-gray-500 mb-8 text-sm">{t('newsletter_page.trust')}</p>
                 
                 <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-1">{t('contact.email')}</label>
                     <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                         placeholder="email@example.com"
                         required
                       />
                     </div>
                   </div>
                   
                   <button 
                     type="submit"
                     className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/10"
                   >
                     {t('sidebar.subscribe')}
                   </button>
                   
                   <p className="text-xs text-center text-gray-400 mt-4">
                     {t('sidebar.cgu')}
                   </p>
                 </form>
               </>
             )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewsletterPage;