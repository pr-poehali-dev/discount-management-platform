import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

const TABS = ['Все товары', 'Просроченные', 'Неликвидные'];
const PAGE_SIZE = 8;

export default function ProductsPage() {
  const { products, applyDiscount, categoryFilter, setCategoryFilter } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    if (categoryFilter) {
      setActiveTab(0);
    }
  }, [categoryFilter]);

  const filtered = products.filter(p => {
    if (categoryFilter && p.category !== categoryFilter) return false;
    if (activeTab === 1) return p.status === 'Просрочен';
    if (activeTab === 2) return p.status === 'Неликвид';
    return true;
  });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleTabChange = (i: number) => {
    setActiveTab(i);
    setPage(1);
    setCategoryFilter(null);
  };

  const openModal = (id: number, currentDiscount: number) => {
    setSelectedProduct(id);
    setDiscountValue(currentDiscount);
  };

  const confirmDiscount = () => {
    if (selectedProduct !== null) {
      applyDiscount(selectedProduct, discountValue);
      setSelectedProduct(null);
    }
  };

  const selectedProd = products.find(p => p.id === selectedProduct);

  const expiredCount = products.filter(p => p.status === 'Просрочен').length;
  const illiquidCount = products.filter(p => p.status === 'Неликвид').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Анализ товаров</h1>
        {categoryFilter && (
          <button onClick={() => setCategoryFilter(null)} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl border" style={{ borderColor: '#2A6DFF', color: '#2A6DFF' }}>
            <Icon name="X" size={14} />
            Фильтр: {categoryFilter}
          </button>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div className="text-2xl font-bold" style={{ color: '#FF3B30' }}>{expiredCount}</div>
          <div className="text-sm font-medium text-gray-700">Просроченных товаров</div>
          <div className="text-xs text-gray-400">Списание до конца дня</div>
        </div>
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div className="text-2xl font-bold" style={{ color: '#FF6B2C' }}>{illiquidCount}</div>
          <div className="text-sm font-medium text-gray-700">Неликвидных товаров</div>
          <div className="text-xs text-gray-400">Низкая скорость продаж</div>
        </div>
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div className="text-2xl font-bold" style={{ color: '#2A6DFF' }}>₽48 200</div>
          <div className="text-sm font-medium text-gray-700">Потенц. потери</div>
          <div className="text-xs text-gray-400">Без применения скидок</div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-5">
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => handleTabChange(i)} className="px-4 py-4 text-sm font-medium border-b-2 transition-all mr-2"
              style={{ borderColor: activeTab === i ? '#2A6DFF' : 'transparent', color: activeTab === i ? '#2A6DFF' : '#6B7280' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#F8F9FA' }}>
                {['Товар', 'Категория', 'Остаток', 'До срока', 'Статус', 'Цена', 'Тек. скидка', 'ML-скидка', 'Действие'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(p => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
                  style={{ background: p.status === 'Просрочен' ? '#FFF5F5' : p.status === 'Неликвид' ? '#FFF8F5' : undefined }}>
                  <td className="px-4 py-3">
                    <button onClick={() => navigate('/ml-recommendations', { state: { product: p.name } })} className="font-medium hover:underline text-left" style={{ color: '#2A6DFF' }}>
                      {p.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.category}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{p.stock} шт</td>
                  <td className="px-4 py-3">
                    <span style={{ color: p.daysLeft <= 0 ? '#FF3B30' : p.daysLeft <= 2 ? '#FF6B2C' : '#374151' }}>
                      {p.daysLeft <= 0 ? 'Просрочен' : `${p.daysLeft} дн.`}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: p.status === 'Просрочен' ? '#FFE5E5' : p.status === 'Неликвид' ? '#FFF0E5' : '#E5F7EF',
                        color: p.status === 'Просрочен' ? '#FF3B30' : p.status === 'Неликвид' ? '#FF6B2C' : '#10B981'
                      }}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">₽{p.price}</td>
                  <td className="px-4 py-3 text-gray-600">{p.currentDiscount > 0 ? `-${p.currentDiscount}%` : '—'}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: '#FF6B2C' }}>-{p.mlDiscount}%</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openModal(p.id, p.mlDiscount)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                      style={{ background: '#2A6DFF' }}>
                      Применить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <span className="text-sm text-gray-500">{filtered.length} товаров</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <Icon name="ChevronLeft" size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  style={{ background: page === i + 1 ? '#2A6DFF' : 'transparent', color: page === i + 1 ? 'white' : '#6B7280' }}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
                <Icon name="ChevronRight" size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProduct !== null && selectedProd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-gray-800 mb-1">Применить скидку</h3>
            <p className="text-sm text-gray-500 mb-4">{selectedProd.name}</p>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Текущая цена</span>
                <span className="font-medium">₽{selectedProd.price}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Скидка</span>
                  <span className="font-bold" style={{ color: '#FF6B2C' }}>-{discountValue}%</span>
                </div>
                <input type="range" min={0} max={70} value={discountValue} onChange={e => setDiscountValue(+e.target.value)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0%</span><span className="text-blue-500">ML: {selectedProd.mlDiscount}%</span><span>70%</span></div>
              </div>
              <div className="flex justify-between text-sm font-medium p-3 rounded-xl" style={{ background: '#F0F7FF' }}>
                <span>Цена со скидкой</span>
                <span style={{ color: '#2A6DFF' }}>₽{(selectedProd.price * (1 - discountValue / 100)).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSelectedProduct(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Отмена
              </button>
              <button onClick={confirmDiscount} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: '#2A6DFF' }}>
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
