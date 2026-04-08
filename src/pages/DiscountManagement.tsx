import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const revenueData = [
  { month: 'Янв', revenue: 1850, discounts: 120 },
  { month: 'Фев', revenue: 1920, discounts: 145 },
  { month: 'Мар', revenue: 2050, discounts: 180 },
  { month: 'Апр', revenue: 1980, discounts: 160 },
  { month: 'Май', revenue: 2100, discounts: 210 },
  { month: 'Июн', revenue: 2180, discounts: 195 },
];

const categoryData = [
  { name: 'Молочные', value: 28, color: '#2A6DFF' },
  { name: 'Мясо/Рыба', value: 22, color: '#FF6B2C' },
  { name: 'Овощи/Фрукты', value: 18, color: '#10B981' },
  { name: 'Хлеб/Выпечка', value: 15, color: '#F59E0B' },
  { name: 'Бакалея', value: 10, color: '#8B5CF6' },
  { name: 'Прочее', value: 7, color: '#6B7280' },
];

const illiquidData = [
  { category: 'Молочные', nelikv: 28, norma: 72 },
  { category: 'Мясо/Рыба', nelikv: 22, norma: 78 },
  { category: 'Овощи', nelikv: 18, norma: 82 },
  { category: 'Хлеб', nelikv: 15, norma: 85 },
];

const generateDailyData = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date('2026-03-09');
    date.setDate(date.getDate() + i);
    return {
      date: `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2,'0')}`,
      count: Math.floor(40 + Math.random() * 80 + Math.sin(i / 4) * 20),
    };
  });
};
const dailyData = generateDailyData();

const roiData = [
  { category: 'Молочные', roi: 244 },
  { category: 'Хлеб', roi: 210 },
  { category: 'Мясо/Рыба', roi: 180 },
  { category: 'Бакалея', roi: 150 },
  { category: 'Овощи', roi: 95 },
];

const top5Data = [
  { name: 'Батон нарезной', savings: 12500 },
  { name: 'Молоко 3.2%', savings: 9200 },
  { name: 'Сметана 20%', savings: 7800 },
  { name: 'Курица целая', savings: 6500 },
  { name: 'Йогурт фруктовый', savings: 4300 },
];

const forecastData = [
  { day: 'Ср', withDiscount: 285, withoutDiscount: 220 },
  { day: 'Чт', withDiscount: 310, withoutDiscount: 235 },
  { day: 'Пт', withDiscount: 370, withoutDiscount: 260 },
  { day: 'Сб', withDiscount: 420, withoutDiscount: 290 },
  { day: 'Вс', withDiscount: 390, withoutDiscount: 275 },
  { day: 'Пн', withDiscount: 295, withoutDiscount: 210 },
  { day: 'Вт', withDiscount: 320, withoutDiscount: 240 },
];

const METRICS = [
  { label: 'Товаров в базе', value: '1 248', sub: 'Обновлено сегодня', icon: 'Package', color: '#2A6DFF', bg: '#EEF4FF' },
  { label: 'Неликвидов', value: '187', sub: 'Требуют внимания', icon: 'AlertTriangle', color: '#FF6B2C', bg: '#FFF4EE' },
  { label: 'Просроченных', value: '43', sub: 'Срочно к списанию', icon: 'AlertOctagon', color: '#FF3B30', bg: '#FFF0EE' },
  { label: 'Экономия от скидок', value: '₽128 000', sub: 'За текущий месяц', icon: 'TrendingUp', color: '#10B981', bg: '#ECFDF5' },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 text-sm">
        <p className="font-medium text-gray-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DiscountManagement() {
  const navigate = useNavigate();
  const { setCategoryFilter } = useApp();

  const handleCategoryClick = (cat: string) => {
    setCategoryFilter(cat);
    navigate('/products');
  };

  const handleRoiClick = (data: { category: string }) => {
    navigate('/reports', { state: { reportId: 'efficiency', category: data.category } });
  };

  const handleTop5Click = (name: string) => {
    navigate('/ml-recommendations', { state: { product: name } });
  };

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EEF4FF' }}>
            <Icon name="Sparkles" size={20} style={{ color: '#2A6DFF' }} />
          </div>
          <div>
            <h1 className="font-bold text-gray-800">Добро пожаловать!</h1>
            <p className="text-sm text-gray-500">ML-платформа для продуктовых магазинов. Умные скидки — больше продаж, меньше потерь.</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map(m => (
          <div key={m.label} className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                <Icon name={m.icon} size={18} style={{ color: m.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</div>
            <div className="text-sm text-gray-700 font-medium mt-0.5">{m.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 className="font-semibold text-gray-800 mb-4">Выручка и влияние скидок</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#2A6DFF" strokeWidth={2.5} dot={{ r: 4 }} name="Выручка (тыс. ₽)" fill="rgba(42,109,255,0.1)" />
              <Line type="monotone" dataKey="discounts" stroke="#FF6B2C" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Скидки (тыс. ₽)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 className="font-semibold text-gray-800 mb-4">Категории товаров</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={65} dataKey="value"
                onClick={(d) => handleCategoryClick(d.name)}>
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} style={{ cursor: 'pointer' }} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `${val}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {categoryData.map(c => (
              <button key={c.name} onClick={() => handleCategoryClick(c.name)} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors text-left">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <span>{c.name} {c.value}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Illiquid stacked + Daily dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 className="font-semibold text-gray-800 mb-4">Неликвиды и просроченные по категориям</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={illiquidData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} unit="%" />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#9CA3AF' }} width={70} />
              <Tooltip formatter={(val) => `${val}%`} />
              <Bar dataKey="nelikv" name="Неликвиды" fill="#FF6B2C" radius={[0, 4, 4, 0]}
                onClick={(d) => handleCategoryClick(d.category)} style={{ cursor: 'pointer' }} />
              <Bar dataKey="norma" name="Норма" fill="#E5E7EB" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 className="font-semibold text-gray-800 mb-4">Динамика применения скидок за 30 дней</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9CA3AF' }} interval={4} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="count" stroke="#2A6DFF" strokeWidth={2} dot={false} name="Товаров со скидкой" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI + Top5 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 className="font-semibold text-gray-800 mb-4">ROI скидок по категориям</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={roiData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} unit="%" />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#9CA3AF' }} width={70} />
              <Tooltip formatter={(val) => `${val}%`} />
              <Bar dataKey="roi" name="ROI" fill="#2A6DFF" radius={[0, 6, 6, 0]}
                onClick={handleRoiClick} style={{ cursor: 'pointer' }}>
                {roiData.map((_, i) => (
                  <Cell key={i} fill={roiData[i].roi >= 200 ? '#2A6DFF' : roiData[i].roi >= 150 ? '#6B9EFF' : '#93BBFF'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 className="font-semibold text-gray-800 mb-4">Топ-5 товаров по экономии от скидок</h3>
          <div className="space-y-3">
            {top5Data.map((item, i) => (
              <button key={item.name} onClick={() => handleTop5Click(item.name)} className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 transition-colors group">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: i === 0 ? '#FF6B2C' : '#2A6DFF' }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 text-left">{item.name}</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${(item.savings / 12500) * 100}%`, background: i === 0 ? '#FF6B2C' : '#2A6DFF' }} />
                  </div>
                </div>
                <div className="text-sm font-bold flex-shrink-0" style={{ color: '#10B981' }}>₽{item.savings.toLocaleString('ru-RU')}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 className="font-semibold text-gray-800 mb-4">Прогноз эффективности скидок на следующую неделю</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} unit=" тыс." />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="withDiscount" stroke="#2A6DFF" strokeWidth={2.5} dot={{ r: 4 }} name="Со скидками (ML)" />
            <Line type="monotone" dataKey="withoutDiscount" stroke="#E5E7EB" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Без скидок" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Управление скидками', path: '/discount-management', icon: 'LayoutDashboard', color: '#2A6DFF' },
          { label: 'ML-рекомендации', path: '/ml-recommendations', icon: 'BrainCircuit', color: '#8B5CF6' },
          { label: 'Тестер скидок', path: '/discount-tester', icon: 'TestTube2', color: '#FF6B2C' },
        ].map(btn => (
          <button key={btn.path} onClick={() => navigate(btn.path)} className="bg-white rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${btn.color}15` }}>
              <Icon name={btn.icon} size={16} style={{ color: btn.color }} />
            </div>
            <span className="text-sm font-medium text-gray-700">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
