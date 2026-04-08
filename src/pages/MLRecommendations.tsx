import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function calcProbability(discount: number, mlDiscount: number, base: number): number {
  const diff = Math.abs(discount - mlDiscount);
  return Math.max(20, Math.min(99, base - diff * 0.8));
}

export default function MLRecommendations() {
  const { products, applyDiscount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const focusProduct = location.state?.product;
  const [discounts, setDiscounts] = useState<Record<number, number>>({});
  const [applied, setApplied] = useState<Record<number, boolean>>({});

  const mlProducts = products.filter(p => p.status !== 'Норма');

  const getDiscount = (id: number, mlDiscount: number) => discounts[id] ?? mlDiscount;

  const handleApply = (id: number) => {
    const d = getDiscount(id, products.find(p => p.id === id)!.mlDiscount);
    applyDiscount(id, d);
    setApplied(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setApplied(prev => ({ ...prev, [id]: false })), 2000);
  };

  const handleResetML = (id: number) => {
    setDiscounts(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EEF4FF' }}>
          <Icon name="BrainCircuit" size={20} style={{ color: '#2A6DFF' }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">ML-рекомендации</h1>
          <p className="text-sm text-gray-500">Оптимальные скидки рассчитаны на основе данных о продажах, остатках и сроках годности</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="rounded-2xl p-4 text-sm" style={{ background: '#EEF4FF', color: '#2A6DFF' }}>
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
          <p>ML-модель анализирует историю продаж, остатки на складе и срок годности. Рекомендации обновляются ежедневно. Вы можете применить скидку или скорректировать её вручную.</p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mlProducts.map(p => {
          const discount = getDiscount(p.id, p.mlDiscount);
          const prob = calcProbability(discount, p.mlDiscount, p.probability);
          const discountedPrice = (p.price * (1 - discount / 100));
          const isApplied = applied[p.id];
          const isFocused = focusProduct === p.name;

          const chartData = Array.from({ length: 15 }, (_, i) => {
            const d = i * 5;
            return { discount: d, prob: Math.max(15, Math.min(99, p.probability - Math.abs(d - p.mlDiscount) * 0.7)) };
          });

          return (
            <div key={p.id} className="bg-white rounded-2xl p-5 transition-shadow hover:shadow-md"
              style={{ boxShadow: isFocused ? '0 0 0 2px #2A6DFF, 0 4px 20px rgba(42,109,255,0.15)' : '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{p.name}</h3>
                  <span className="text-xs text-gray-400">{p.category} · {p.sku}</span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ background: p.status === 'Просрочен' ? '#FFE5E5' : '#FFF0E5', color: p.status === 'Просрочен' ? '#FF3B30' : '#FF6B2C' }}>
                  {p.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="rounded-xl p-2.5 text-center" style={{ background: '#F8F9FA' }}>
                  <div className="text-lg font-bold text-gray-800">₽{p.price}</div>
                  <div className="text-xs text-gray-400">Цена</div>
                </div>
                <div className="rounded-xl p-2.5 text-center" style={{ background: '#FFF4EE' }}>
                  <div className="text-lg font-bold" style={{ color: '#FF6B2C' }}>-{p.mlDiscount}%</div>
                  <div className="text-xs text-gray-400">ML-скидка</div>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Ваша скидка: <strong style={{ color: '#2A6DFF' }}>-{discount}%</strong></span>
                  <button onClick={() => handleResetML(p.id)} className="text-xs hover:underline" style={{ color: '#FF6B2C' }}>Вернуть ML</button>
                </div>
                <input type="range" min={0} max={70} value={discount}
                  onChange={e => setDiscounts(prev => ({ ...prev, [p.id]: +e.target.value }))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #2A6DFF ${(discount / 70) * 100}%, #E5E7EB ${(discount / 70) * 100}%)` }}
                />
              </div>

              {/* Mini chart */}
              <div className="mb-3 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="prob" stroke="#2A6DFF" strokeWidth={1.5} dot={false} />
                    <XAxis dataKey="discount" hide />
                    <YAxis hide />
                    <Tooltip formatter={(val) => [`${Math.round(val as number)}%`, 'Вероятность']} labelFormatter={(l) => `Скидка ${l}%`} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="rounded-xl p-2" style={{ background: '#F0F7FF' }}>
                  <div className="text-sm font-bold" style={{ color: '#2A6DFF' }}>₽{discountedPrice.toFixed(0)}</div>
                  <div className="text-xs text-gray-400">Со скидкой</div>
                </div>
                <div className="rounded-xl p-2" style={{ background: '#F0FDF4' }}>
                  <div className="text-sm font-bold" style={{ color: '#10B981' }}>{Math.round(prob)}%</div>
                  <div className="text-xs text-gray-400">Вероятность</div>
                </div>
                <div className="rounded-xl p-2" style={{ background: '#F8F9FA' }}>
                  <div className="text-sm font-bold text-gray-700">{p.confidence}%</div>
                  <div className="text-xs text-gray-400">Уверенность</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleApply(p.id)} className="flex-1 py-2 rounded-xl text-sm font-medium text-white transition-all"
                  style={{ background: isApplied ? '#10B981' : '#2A6DFF' }}>
                  {isApplied ? '✓ Применено' : 'Применить'}
                </button>
                <button onClick={() => navigate('/discount-tester', { state: { productId: p.id } })} className="px-3 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Icon name="TestTube2" size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
