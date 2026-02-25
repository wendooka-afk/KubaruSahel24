import React, { useState } from 'react';
import { LayoutDashboard, FileText, Video, LogOut, Users, MessageSquare, Bell, Menu, X, Settings, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  pendingComments?: number;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  currentView,
  onNavigate,
  onLogout,
  pendingComments = 0
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const menu = [
    { id: 'ADMIN_DASHBOARD', label: t('admin.layout.dashboard'), icon: LayoutDashboard },
    { id: 'ADMIN_ARTICLES', label: t('admin.layout.articles'), icon: FileText },
    { id: 'ADMIN_VIDEOS', label: t('admin.layout.videos'), icon: Video },
    { id: 'ADMIN_TEAM', label: t('admin.layout.team'), icon: Users },
    { id: 'ADMIN_COMMENTS', label: t('admin.layout.comments'), icon: MessageSquare, badge: pendingComments },
    { id: 'ADMIN_SETTINGS', label: t('admin.layout.settings'), icon: Settings },
  ];

  const isActiveItem = (itemId: string) => {
    if (itemId === 'ADMIN_DASHBOARD') return currentView === 'ADMIN_DASHBOARD';
    return currentView.startsWith(itemId.split('_').slice(0, 2).join('_')) && currentView !== 'ADMIN_DASHBOARD';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-primary text-white flex flex-col flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <img src="/logo.png" alt="Kubaru Sahel 24 Admin" className="h-10 w-auto bg-white/10 rounded p-1" />
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          {menu.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${isActiveItem(item.id)
                ? 'bg-secondary text-primary font-bold shadow-lg'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                {item.label}
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center animate-pulse">
                  {item.badge}
                </span>
              ) : isActiveItem(item.id) ? (
                <ChevronRight size={16} className="opacity-50" />
              ) : null}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-white/5 hover:text-red-200 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {t('admin.layout.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden w-full lg:w-auto">
        <header className="bg-white border-b border-gray-200 py-4 px-4 lg:px-8 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Notification Bell */}
            <button
              onClick={() => onNavigate('ADMIN_COMMENTS')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={t('admin.dashboard.pendingComments')}
            >
              <Bell size={20} className="text-gray-500" />
              {pendingComments > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {pendingComments > 9 ? '9+' : pendingComments}
                </span>
              )}
            </button>

            <div className="hidden md:flex items-center gap-3 pl-2 lg:pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">{t('admin.layout.role')}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                AU
              </div>
            </div>
          </div>
        </header>
        <div className="flex-grow overflow-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
