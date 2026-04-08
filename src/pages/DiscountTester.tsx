import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function DiscountTester() {
  const { products, applyDiscount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number>(products[0]?.id ?? 1);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (location.state?.productId) {
      const p = products.find(pr => pr.id === location.state.productId);
      if (p) { setSelectedId(p.id); setDiscount(p.mlDiscount); }
    }
  }, []);

  const product = products.find(p => p.id === selectedId) ?? products[0];

  const mlOpt = product?.mlDiscount ?? 30;
  const basePrice = product?.price ?? 100;
  const stock = product?.stock ?? 10;
  const baseProb = product?.probability ?? 80;

  const calcProb = (d: number) => Math.max(5, Math.min(99, baseProb - Math.abs(d - mlOpt) * 0.7));
  const calcRevenue = (d: number) => Math.round((basePrice * (1 - d / 100)) * calcProb(d) / 100 * stock);

  const chartData = Array.from({ length: 15 }, (_, i) => {
    const d = i * 5;
    return { discount: d, probability: Math.round(calcProb(d)), revenue: calcRevenue(d) };
  });

  const currentProb = Math.round(calcProb(discount));
  const currentRevenue = calcRevenue(discount);
  const mlRevenue = calcRevenue(mlOpt);
  const discountedPrice = basePrice * (1 - discount / 100);
  const savings = basePrice - discountedPrice;

  const handleApply = () => {
    applyDiscount(product.id, discount);
    navigate('/ml-recommendations');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFF0E5' }}>
          <Icon name="TestTube2" size={20} style={{ color: '#FF6B2C' }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Тестер скидок</h1>
          <p className="text-sm text-gray-500">Смоделируйте эффект скидки перед применением</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 className="font-semibold text-gray-800 mb-3">Выбор товара</h3>
            <select value={selectedId} onChange={e => { setSelectedId(+e.target.value); setDiscount(0); }}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white">
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {product && (
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 className="font-semibold text-gray-800 mb-3">Параметры товара</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Категория', value: product.category },
                  { label: 'Остаток', value: `${product.stock} шт` },
                  { label: 'До срока', value: product.daysLeft <= 0 ? 'Просрочен' : `${product.daysLeft} дн.` },
                  { label: 'Цена', value: `₽${product.price}` },
                  { label: 'Артикул', value: product.sku },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{row.label}</span>
                    <span className="font-medium text-gray-700">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slider */}
          <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 className="font-semibold text-gray-800 mb-3">Ваша скидка</h3>
            <div className="text-3xl font-bold mb-3 text-center" style={{ color: '#2A6DFF' }}>-{discount}%</div>
            <input type="range" min={0} max={70} value={discount} onChange={e => setDiscount(+e.target.value)}
              className="w-full mb-2"
              style={{ accentColor: '#2A6DFF' }}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0%</span>
              <span style={{ color: '#FF6B2C' }}>ML-оптимум: {mlOpt}%</span>
              <span>70%</span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm p-2.5 rounded-xl" style={{ background: '#F0F7FF' }}>
                <span className="text-gray-500">Цена со скидкой</span>
                <span className="font-bold" style={{ color: '#2A6DFF' }}>₽{discountedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm p-2.5 rounded-xl" style={{ background: '#F0FDF4' }}>
                <span className="text-gray-500">Вероятность продажи</span>
                <span className="font-bold" style={{ color: '#10B981' }}>{currentProb}%</span>
              </div>
              <div className="flex justify-between text-sm p-2.5 rounded-xl" style={{ background: '#FFF8F0' }}>
                <span className="text-gray-500">Ожид. выручка</span>
                <span className="font-bold" style={{ color: '#FF6B2C' }}>₽{currentRevenue.toLocaleString('ru-RU')}</span>
              </div>
              <div className="flex justify-between text-sm p-2.5 rounded-xl" style={{ background: '#F8F9FA' }}>
                <span className="text-gray-500">Экономия покупателя</span>
                <span className="font-bold text-gray-700">₽{savings.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button onClick={handleApply} className="w-full py-3 rounded-xl text-white font-medium text-sm hover:opacity-90 transition-opacity" style={{ background: '#2A6DFF' }}>
            Применить выбранную скидку
          </button>
        </div>

        {/* Right panel - Charts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 className="font-semibold text-gray-800 mb-4">Вероятность продажи vs Скидка</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="discount" tick={{ fontSize: 11, fill: '#9CA3AF' }} unit="%" />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} unit="%" />
                <Tooltip formatter={(val) => [`${val}%`, 'Вероятность']} labelFormatter={(l) => `Скидка ${l}%`} />
                <ReferenceLine x={mlOpt} stroke="#FF6B2C" strokeDasharray="4 4" label={{ value: 'ML', fill: '#FF6B2C', fontSize: 11 }} />
                <ReferenceLine x={discount} stroke="#2A6DFF" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="probability" stroke="#2A6DFF" strokeWidth={2.5} dot={false} name="Вероятность" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 className="font-semibold text-gray-800 mb-4">Выручка vs Скидка</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="discount" tick={{ fontSize: 11, fill: '#9CA3AF' }} unit="%" />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <Tooltip formatter={(val) => [`₽${val}`, 'Выручка']} labelFormatter={(l) => `Скидка ${l}%`} />
                <ReferenceLine x={mlOpt} stroke="#FF6B2C" strokeDasharray="4 4" label={{ value: 'ML-пик', fill: '#FF6B2C', fontSize: 11 }} />
                <ReferenceLine x={discount} stroke="#2A6DFF" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2.5} dot={false} name="Выручка" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 className="font-semibold text-gray-800 mb-4">Сравнение: Ваша скидка vs ML-рекомендация</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4 text-center border-2" style={{ borderColor: '#2A6DFF' }}>
                <div className="text-xs text-gray-400 mb-1">Ваша скидка</div>
                <div className="text-2xl font-bold" style={{ color: '#2A6DFF' }}>-{discount}%</div>
                <div className="text-sm text-gray-600 mt-2">{currentProb}% вер-ть</div>
                <div className="text-sm font-medium mt-0.5" style={{ color: '#10B981' }}>₽{currentRevenue.toLocaleString('ru-RU')}</div>
              </div>
              <div className="rounded-xl p-4 text-center border-2" style={{ borderColor: '#FF6B2C' }}>
                <div className="text-xs text-gray-400 mb-1">ML-рекомендация</div>
                <div className="text-2xl font-bold" style={{ color: '#FF6B2C' }}>-{mlOpt}%</div>
                <div className="text-sm text-gray-600 mt-2">{Math.round(calcProb(mlOpt))}% вер-ть</div>
                <div className="text-sm font-medium mt-0.5" style={{ color: '#10B981' }}>₽{mlRevenue.toLocaleString('ru-RU')}</div>
              </div>
            </div>
            {currentRevenue < mlRevenue && (
              <div className="mt-3 text-xs text-center p-2 rounded-xl" style={{ background: '#FFF0E5', color: '#FF6B2C' }}>
                ML-рекомендация принесёт на ₽{(mlRevenue - currentRevenue).toLocaleString('ru-RU')} больше выручки
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
