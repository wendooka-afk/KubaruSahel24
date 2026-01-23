import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import Container from '../components/Container';
import { useToast } from '../components/Toast';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    subject: t('contact.subjects.editorial'),
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      addToast(t('contact.required'), 'error');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(t('contact.success'), 'success');
      setFormData({
        prenom: '',
        nom: '',
        email: '',
        subject: t('contact.subjects.editorial'),
        message: ''
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container size="page">
      <div className="py-12">
        <h1 className="font-serif text-4xl font-bold text-primary mb-8 text-center">{t('contact.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="font-bold text-xl mb-6 text-gray-800">{t('contact.details')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/20 p-3 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{t('contact.address')}</h3>
                  <p className="text-gray-600">Immeuble Sahel 24<br/>Avenue de l'Indépendance<br/>Dakar, Sénégal</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-secondary/20 p-3 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{t('contact.phone')}</h3>
                  <p className="text-gray-600">+221 33 800 00 00<br/>+223 20 20 00 00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="bg-secondary/20 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{t('contact.email')}</h3>
                  <p className="text-gray-600">contact@kubarusahel24.com<br/>redaction@kubarusahel24.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-lg mb-2">{t('contact.becomeCorrespondent')}</h3>
              <p className="text-sm text-gray-600 mb-4">{t('contact.correspondentDesc')}</p>
              <button className="text-primary font-bold text-sm underline hover:text-secondary">{t('contact.learnMore')}</button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="font-bold text-xl mb-6 text-gray-800">{t('contact.sendMessage')}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.firstname')}</label>
                  <input name="prenom" value={formData.prenom} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.lastname')}</label>
                  <input name="nom" value={formData.nom} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.email')} <span className="text-red-500">*</span></label>
                <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.subject')}</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                  <option value={t('contact.subjects.editorial')}>{t('contact.subjects.editorial')}</option>
                  <option value={t('contact.subjects.partnership')}>{t('contact.subjects.partnership')}</option>
                  <option value={t('contact.subjects.support')}>{t('contact.subjects.support')}</option>
                  <option value={t('contact.subjects.other')}>{t('contact.subjects.other')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.message')} <span className="text-red-500">*</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} 
                {isSubmitting ? t('contact.submitting') : t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;