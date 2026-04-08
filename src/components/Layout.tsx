import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

const NAV_ITEMS = [
  { path: '/discount-management', label: 'Управление скидками', icon: 'LayoutDashboard' },
  { path: '/products', label: 'Анализ товаров', icon: 'PackageSearch' },
  { path: '/ml-recommendations', label: 'ML-рекомендации', icon: 'BrainCircuit' },
  { path: '/discount-tester', label: 'Тестер скидок', icon: 'TestTube2' },
  { path: '/upload', label: 'Загрузка данных', icon: 'Upload' },
  { path: '/reports', label: 'Отчёты', icon: 'FileBarChart' },
  { path: '/support', label: 'Поддержка', icon: 'LifeBuoy' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { lastUpload, totalProducts } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F8F9FA' }}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-100 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`} style={{ width: 240, boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}>
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <Link to="/discount-management" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#2A6DFF' }}>
              <Icon name="Tag" size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight" style={{ color: '#1a1a2e' }}>Умные скидки</div>
              <div className="text-xs text-gray-400">ML-аналитика</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-0.5">
            {NAV_ITEMS.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
                  style={{
                    background: active ? '#EEF4FF' : 'transparent',
                    color: active ? '#2A6DFF' : '#6b7280',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#F8F9FA'; (e.currentTarget as HTMLElement).style.color = '#2A6DFF'; }}
                  onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#6b7280'; } }}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                  {active && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#2A6DFF' }} />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-400 text-center">
            Загружено: {lastUpload}<br />{totalProducts} товаров
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-5 py-3 flex items-center gap-4 flex-shrink-0" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
          <button className="md:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name="Menu" size={20} className="text-gray-600" />
          </button>

          <div className="flex-1 hidden sm:block">
            <span className="text-xs text-gray-400">
              <Icon name="Clock" size={12} className="inline mr-1" />
              Данные загружены: {lastUpload}, {totalProducts} товаров
            </span>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: '#2A6DFF' }}>
                {user?.initials}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
              <Icon name="ChevronDown" size={14} className="text-gray-400 hidden sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                <div className="p-4 border-b border-gray-100" style={{ background: '#EEF4FF' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: '#2A6DFF' }}>
                      {user?.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: '#F8F9FA' }}>
                    <span className="text-xs text-gray-500">Роль</span>
                    <span className="text-xs font-medium" style={{ color: '#2A6DFF' }}>{user?.role}</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: '#F8F9FA' }}>
                    <span className="text-xs text-gray-500">Последний вход</span>
                    <span className="text-xs font-medium text-gray-700">{user?.lastLogin}</span>
                  </div>
                </div>

                <div className="p-3 pt-0 space-y-1">
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Icon name="Settings" size={16} className="text-gray-400" />
                    Редактировать профиль
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: '#FF3B30' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FFF0EE'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <Icon name="LogOut" size={16} />
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-5 py-2.5 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-gray-400">© 2026 Умные скидки</span>
          <span className="text-xs text-gray-400">
            <Icon name="Database" size={11} className="inline mr-1" />
            Последняя загрузка: {lastUpload} · {totalProducts} товаров
          </span>
        </footer>
      </div>
    </div>
  );
}