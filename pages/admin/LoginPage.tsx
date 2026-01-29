import React, { useState } from 'react';
import { Lock, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email === 'admin@kubarusahel24.com' && password === 'Sahel2024!') {
        onLogin();
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent opacity-10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <button
        onClick={onBack}
        className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 font-bold transition-all hover:-translate-x-1"
      >
        <ArrowLeft size={20} /> Retour au site
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 w-full max-w-md relative z-10 animate-fade-in border border-white/10">
        <div className="text-center mb-10">
          <img src="/logo.png" alt="Kubaru Sahel 24 Admin" className="h-16 w-auto mx-auto mb-6" />
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Portail de Gestion Sécurisé</p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl flex items-center gap-3 text-sm font-medium animate-slide-in">
            <AlertCircle size={18} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Administratif</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all font-bold text-gray-800 placeholder:text-gray-300"
              placeholder="votre.nom@kubaru.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Code d'accès</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all font-bold text-gray-800 placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:bg-blue-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Lock size={20} className="group-hover:scale-110 transition-transform" />}
            {loading ? 'AUTHENTIFICATION...' : 'ACCÉDER AU PANEL'}
          </button>
        </form>

        <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest text-center">Démo</p>
          <div className="space-y-1 text-xs text-gray-500 font-medium">
            <p className="flex justify-between"><span>User:</span> <span className="text-primary font-bold">admin@kubarusahel24.com</span></p>
            <p className="flex justify-between"><span>Pass:</span> <span className="text-primary font-bold">Sahel2024!</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;