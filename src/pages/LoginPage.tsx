import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(email, password);
    setLoading(false);
    if (ok) {
      navigate('/discount-management');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F9FA' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#2A6DFF' }}>
              <Icon name="Tag" size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold" style={{ color: '#1a1a2e' }}>Умные скидки</span>
          </div>
          <p className="text-gray-500 text-sm">ML-платформа управления скидками</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Вход в систему</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Логин</label>
              <div className="relative">
                <Icon name="Mail" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@smartdiscount.ru"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': '#2A6DFF' } as React.CSSProperties}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Icon name={showPass ? 'EyeOff' : 'Eye'} size={16} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl text-sm" style={{ background: '#FFF0EE', color: '#FF3B30' }}>
                <Icon name="AlertCircle" size={15} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
              style={{ background: '#2A6DFF' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} />
                  Войти
                </>
              )}
            </button>
          </form>

          <div className="mt-5 p-3 rounded-xl text-xs text-gray-500" style={{ background: '#F8F9FA' }}>
            <p className="font-medium mb-1 text-gray-600">Демо-доступ:</p>
            <p>Логин: admin@smartdiscount.ru</p>
            <p>Пароль: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
