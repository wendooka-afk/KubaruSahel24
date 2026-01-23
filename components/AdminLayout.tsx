import React from 'react';
import { LayoutDashboard, FileText, Video, LogOut, Users, MessageSquare } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, currentView, onNavigate, onLogout }) => {
  const menu = [
    { id: 'ADMIN_DASHBOARD', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'ADMIN_ARTICLES', label: 'Articles', icon: FileText },
    { id: 'ADMIN_VIDEOS', label: 'Vidéos', icon: Video },
    { id: 'ADMIN_TEAM', label: 'Équipe', icon: Users },
    { id: 'ADMIN_COMMENTS', label: 'Commentaires', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <img src="/Logo Kubaru Sahel 24.png" alt="Kubaru Sahel 24 Admin" className="h-10 w-auto bg-white/10 rounded p-1" />
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {menu.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === item.id || (currentView.startsWith(item.id.split('_').slice(0, 2).join('_'))) && currentView !== 'ADMIN_DASHBOARD'
                ? 'bg-secondary text-primary font-bold'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-white/5 hover:text-red-200 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Rédacteur en chef</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
              AU
            </div>
          </div>
        </header>
        <div className="flex-grow overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
