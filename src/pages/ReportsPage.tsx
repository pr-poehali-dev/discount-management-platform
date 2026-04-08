import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Area, AreaChart, ComposedChart
} from 'recharts';

const REPORTS = [
  { id: 'summary', title: 'Сводный отчёт по скидкам', icon: 'BarChart3', color: '#2A6DFF' },
  { id: 'illiquid', title: 'Анализ неликвидов', icon: 'PackageX', color: '#FF6B2C' },
  { id: 'expired', title: 'Просроченные товары', icon: 'AlertOctagon', color: '#FF3B30' },
  { id: 'efficiency', title: 'Эффективность скидок', icon: 'TrendingUp', color: '#10B981' },
  { id: 'categories', title: 'Отчёт по категориям', icon: 'PieChart', color: '#8B5CF6' },
  { id: 'forecast', title: 'Прогноз продаж', icon: 'Activity', color: '#F59E0B' },
];

const summaryPieData = [
  { name: '0–20%', value: 35, color: '#93C5FD' },
  { name: '21–40%', value: 42, color: '#2A6DFF' },
  { name: '41–60%', value: 23, color: '#1E40AF' },
];

const cumulativeData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  revenue: Math.round(5000 + i * 800 + Math.sin(i / 3) * 1500),
}));

const illiquidWeekData = [
  { day: 'Пн', count: 42 }, { day: 'Вт', count: 38 }, { day: 'Ср', count: 55 },
  { day: 'Чт', count: 47 }, { day: 'Пт', count: 63 }, { day: 'Сб', count: 71 }, { day: 'Вс', count: 58 },
];

const illiquidCatData = [
  { category: 'Молочные', share: 32 }, { category: 'Мясо/Рыба', share: 24 },
  { category: 'Овощи', share: 19 }, { category: 'Хлеб', share: 14 }, { category: 'Бакалея', share: 11 },
];

const expiredStructureData = [
  { name: 'До 50 шт', value: 45, color: '#FCA5A5' },
  { name: '50–100 шт', value: 31, color: '#F87171' },
  { name: '>100 шт', value: 24, color: '#EF4444' },
];

const expiredDynamicsData = [
  { week: 'Нед 1', count: 38 }, { week: 'Нед 2', count: 45 }, { week: 'Нед 3', count: 41 }, { week: 'Нед 4', count: 43 },
];

const revenuePerRubleData = [
  { month: 'Янв', value: 3.2 }, { month: 'Фев', value: 3.8 }, { month: 'Мар', value: 4.1 },
  { month: 'Апр', value: 3.9 }, { month: 'Май', value: 4.5 }, { month: 'Июн', value: 4.8 },
];

const additionalSalesData = [
  { category: 'Молочные', sales: 248 }, { category: 'Хлеб', sales: 195 },
  { category: 'Мясо/Рыба', sales: 172 }, { category: 'Овощи', sales: 143 }, { category: 'Бакалея', sales: 98 },
];

const categoryCompareData = [
  { category: 'Молочные', turnover: 520, discounts: 85 },
  { category: 'Мясо/Рыба', turnover: 430, discounts: 62 },
  { category: 'Овощи', turnover: 280, discounts: 48 },
  { category: 'Хлеб', turnover: 210, discounts: 38 },
  { category: 'Бакалея', turnover: 175, discounts: 22 },
];

const topLossData = [
  { category: 'Молочные', loss: 12800 }, { category: 'Мясо/Рыба', loss: 9400 },
  { category: 'Овощи', loss: 7200 }, { category: 'Хлеб', loss: 5100 }, { category: 'Бакалея', loss: 3600 },
];

const forecastConfData = Array.from({ length: 14 }, (_, i) => ({
  day: i + 1,
  forecast: Math.round(280 + i * 12 + Math.sin(i / 2) * 20),
  upper: Math.round(320 + i * 12 + Math.sin(i / 2) * 20),
  lower: Math.round(240 + i * 12 + Math.sin(i / 2) * 20),
}));

const radarData = [
  { factor: 'Сезонность', value: 78 }, { factor: 'Скидки', value: 92 },
  { factor: 'День нед.', value: 65 }, { factor: 'Остатки', value: 85 }, { factor: 'Цена', value: 72 },
];

function ReportContent({ reportId }: { reportId: string }) {
  switch (reportId) {
    case 'summary': return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Доля скидок по диапазонам</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={summaryPieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {summaryPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(val) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Накопленная выручка от скидок по дням</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={cumulativeData.slice(0, 20)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2A6DFF" fill="rgba(42,109,255,0.15)" strokeWidth={2} name="Выручка ₽" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
    case 'illiquid': return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Неликвиды по дням недели</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={illiquidWeekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#FF6B2C" radius={[4, 4, 0, 0]} name="Неликвиды" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Доля неликвидов по категориям</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={illiquidCatData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} unit="%" />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#9CA3AF' }} width={70} />
                <Tooltip formatter={(val) => `${val}%`} />
                <Bar dataKey="share" fill="#FDBA74" radius={[0, 4, 4, 0]} name="Доля %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
    case 'expired': return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Структура просрочки по остаткам</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={expiredStructureData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {expiredStructureData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(val) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Динамика просроченных за 4 недели</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={expiredDynamicsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#FF3B30" strokeWidth={2.5} dot={{ r: 5 }} name="Просрочено" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
    case 'efficiency': return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Прирост выручки на рубль скидки</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenuePerRubleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} name="₽ выручки на ₽ скидки" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Доп. продажи по категориям</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={additionalSalesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#9CA3AF' }} width={70} />
                <Tooltip />
                <Bar dataKey="sales" fill="#10B981" radius={[0, 4, 4, 0]} name="Доп. продаж" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
    case 'categories': return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Оборот и сумма скидок по категориям</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryCompareData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="turnover" name="Оборот (тыс. ₽)" fill="#2A6DFF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="discounts" name="Скидки (тыс. ₽)" fill="#FF6B2C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Топ категорий по потерям</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topLossData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#9CA3AF' }} width={70} />
                <Tooltip formatter={(val) => `₽${val}`} />
                <Bar dataKey="loss" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="Потери ₽" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
    case 'forecast': return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Доверительный интервал прогноза</h4>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={forecastConfData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <Tooltip />
                <Area type="monotone" dataKey="upper" fill="rgba(42,109,255,0.1)" stroke="none" />
                <Area type="monotone" dataKey="lower" fill="white" stroke="none" />
                <Line type="monotone" dataKey="forecast" stroke="#2A6DFF" strokeWidth={2.5} dot={false} name="Прогноз" />
                <Line type="monotone" dataKey="upper" stroke="#93C5FD" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Верхняя граница" />
                <Line type="monotone" dataKey="lower" stroke="#93C5FD" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Нижняя граница" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Влияние факторов на прогноз</h4>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Radar name="Влияние" dataKey="value" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
    default: return null;
  }
}

export default function ReportsPage() {
  const { schedules, updateSchedule } = useApp();
  const location = useLocation();
  const [openReport, setOpenReport] = useState<string | null>(null);
  const [openSchedule, setOpenSchedule] = useState<string | null>(null);
  const [scheduleForm, setScheduleForm] = useState<{ email: string; time: string; enabled: boolean; format: 'PDF' | 'Excel' }>({ email: '', time: '', enabled: true, format: 'PDF' });

  const handleOpenSchedule = (id: string) => {
    const s = schedules.find(s => s.id === id);
    if (s) { setScheduleForm({ email: s.email, time: s.time, enabled: s.enabled, format: s.format }); }
    setOpenSchedule(id);
  };

  const handleSaveSchedule = () => {
    if (openSchedule) { updateSchedule(openSchedule, scheduleForm); }
    setOpenSchedule(null);
  };

  const openSched = schedules.find(s => s.id === openSchedule);
  const openRep = REPORTS.find(r => r.id === openReport);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-800">Отчёты</h1>

      {/* Report cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map(r => (
          <div key={r.id} className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${r.color}15` }}>
                <Icon name={r.icon} size={20} style={{ color: r.color }} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm leading-tight">{r.title}</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setOpenReport(r.id)} className="flex-1 py-2 rounded-xl text-xs font-medium text-white hover:opacity-90 transition-opacity" style={{ background: r.color }}>
                Открыть отчёт
              </button>
              <button onClick={() => alert('Формируем PDF...')} className="px-2.5 py-2 rounded-xl text-xs border border-gray-200 hover:bg-gray-50" title="Скачать PDF">
                <Icon name="FileDown" size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-send block */}
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Send" size={18} style={{ color: '#2A6DFF' }} />
          <h3 className="font-semibold text-gray-800">Автоматическая отправка отчётов</h3>
        </div>
        <div className="space-y-3">
          {schedules.map(s => (
            <button key={s.id} onClick={() => handleOpenSchedule(s.id)} className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.enabled ? '#EEF4FF' : '#F3F4F6' }}>
                <Icon name="Calendar" size={18} style={{ color: s.enabled ? '#2A6DFF' : '#9CA3AF' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-800">{s.frequency} · {s.time}</div>
                <div className="text-xs text-gray-400">{s.report} → {s.email}</div>
                {s.lastSent && <div className="text-xs text-gray-400">Последняя отправка: {s.lastSent}</div>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: s.format === 'PDF' ? '#EEF4FF' : '#ECFDF5', color: s.format === 'PDF' ? '#2A6DFF' : '#10B981' }}>{s.format}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: s.enabled ? '#ECFDF5' : '#F3F4F6', color: s.enabled ? '#10B981' : '#9CA3AF' }}>{s.enabled ? 'Вкл' : 'Выкл'}</span>
                <Icon name="ChevronRight" size={16} className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Report modal */}
      {openReport && openRep && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${openRep.color}15` }}>
                  <Icon name={openRep.icon} size={18} style={{ color: openRep.color }} />
                </div>
                <h3 className="font-bold text-gray-800">{openRep.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => alert('Скачать PDF')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-gray-200 hover:bg-gray-50">
                  <Icon name="FileDown" size={13} />PDF
                </button>
                <button onClick={() => alert('Скачать Excel')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-gray-200 hover:bg-gray-50">
                  <Icon name="Table2" size={13} />Excel
                </button>
                <button onClick={() => setOpenReport(null)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <Icon name="X" size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <ReportContent reportId={openReport} />
            </div>
          </div>
        </div>
      )}

      {/* Schedule modal */}
      {openSchedule && openSched && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">Настройка расписания</h3>
              <button onClick={() => setOpenSchedule(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><Icon name="X" size={16} className="text-gray-500" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Отчёт</label>
                <div className="px-3 py-2.5 rounded-xl bg-gray-50 text-sm text-gray-600">{openSched.report}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Получатель (email)</label>
                <input type="email" value={scheduleForm.email} onChange={e => setScheduleForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Время отправки</label>
                <input type="text" value={scheduleForm.time} onChange={e => setScheduleForm(p => ({ ...p, time: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Формат</label>
                <div className="flex gap-2">
                  {(['PDF', 'Excel'] as const).map(f => (
                    <button key={f} onClick={() => setScheduleForm(p => ({ ...p, format: f }))}
                      className="flex-1 py-2 rounded-xl text-sm font-medium transition-all border"
                      style={{ background: scheduleForm.format === f ? '#EEF4FF' : 'white', borderColor: scheduleForm.format === f ? '#2A6DFF' : '#E5E7EB', color: scheduleForm.format === f ? '#2A6DFF' : '#6B7280' }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8F9FA' }}>
                <span className="text-sm font-medium text-gray-700">Отправка включена</span>
                <button onClick={() => setScheduleForm(p => ({ ...p, enabled: !p.enabled }))}
                  className="w-10 h-6 rounded-full transition-all relative"
                  style={{ background: scheduleForm.enabled ? '#2A6DFF' : '#E5E7EB' }}>
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all" style={{ left: scheduleForm.enabled ? '22px' : '4px' }} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setOpenSchedule(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Отмена
              </button>
              <button onClick={handleSaveSchedule} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: '#2A6DFF' }}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
