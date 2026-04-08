import { useState } from 'react';
import Icon from '@/components/ui/icon';

const FAQ = [
  {
    q: 'Как ML рассчитывает оптимальную скидку?',
    a: 'ML-модель анализирует историю продаж товара, текущий остаток на складе, срок до истечения годности, ценовую эластичность и аналогичные товары в категории. На основе этих данных строится прогноз вероятности продажи при каждом уровне скидки. Оптимальной считается скидка, максимизирующая ожидаемую выручку (вероятность × цена × остаток).',
  },
  {
    q: 'Какие форматы файлов поддерживаются для загрузки?',
    a: 'Поддерживаются форматы CSV и Excel (.xlsx, .xls). Все 7 обязательных полей должны присутствовать в файле: Название товара, Категория, Остаток на складе, Цена продажи, Дата истечения срока, История продаж, Артикул/SKU. При отсутствии любого поля загрузка будет отклонена с указанием причины.',
  },
  {
    q: 'Могу ли я изменить рекомендацию ML вручную?',
    a: 'Да! В разделе «ML-рекомендации» вы можете перемещать ползунок скидки для каждого товара. Система покажет, как изменится вероятность продажи и ожидаемая выручка. Также можно использовать «Тестер скидок» для детального анализа. После применения скидка фиксируется для товара.',
  },
  {
    q: 'Как часто обновляются данные на дашборде?',
    a: 'Данные обновляются при каждой загрузке файла в разделе «Загрузка данных». ML-прогнозы пересчитываются автоматически после каждого обновления. Рекомендуется загружать актуальные данные ежедневно для наиболее точных рекомендаций.',
  },
  {
    q: 'Что делать, если статус загрузки показывает «Ошибка»?',
    a: 'Проверьте, что в вашем файле присутствуют все обязательные поля. В сообщении об ошибке будет указано, какое именно поле отсутствует. Также убедитесь, что файл сохранён в формате CSV или Excel, и не содержит объединённых ячеек в заголовке.',
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Вопрос', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!form.email.trim()) e.email = 'Введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Некорректный email';
    if (!form.message.trim()) e.message = 'Введите сообщение';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    const saved = JSON.parse(localStorage.getItem('sd_messages') || '[]');
    saved.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem('sd_messages', JSON.stringify(saved));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', subject: 'Вопрос', message: '' });
    setErrors({});
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EEF4FF' }}>
          <Icon name="LifeBuoy" size={20} style={{ color: '#2A6DFF' }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Поддержка</h1>
          <p className="text-sm text-gray-500">Мы готовы помочь вам в рабочее время</p>
        </div>
      </div>

      {/* Contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="mailto:support@smartdiscount.ru" className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow group" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EEF4FF' }}>
            <Icon name="Mail" size={22} style={{ color: '#2A6DFF' }} />
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-0.5">Email</div>
            <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">support@smartdiscount.ru</div>
            <div className="text-xs text-gray-400">Ответ в течение 2 часов</div>
          </div>
        </a>
        <a href="tel:+78001234567" className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow group" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#ECFDF5' }}>
            <Icon name="Phone" size={22} style={{ color: '#10B981' }} />
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-0.5">Телефон</div>
            <div className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">+7 (800) 123-45-67</div>
            <div className="text-xs text-gray-400">Пн–Пт 9:00–18:00 МСК</div>
          </div>
        </a>
      </div>

      {/* Contact form */}
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Icon name="MessageSquare" size={18} style={{ color: '#2A6DFF' }} />
          Написать нам
        </h3>

        {sent && (
          <div className="flex items-center gap-2 p-4 rounded-xl text-sm mb-4" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <Icon name="CheckCircle" size={16} />
            Сообщение отправлено. Мы ответим вам в течение 2 часов.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Имя <span style={{ color: '#FF3B30' }}>*</span></label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Иван Петров"
                className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: errors.name ? '#FF3B30' : '#E5E7EB' }} />
              {errors.name && <p className="text-xs mt-1" style={{ color: '#FF3B30' }}>{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span style={{ color: '#FF3B30' }}>*</span></label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="ivan@example.com"
                className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: errors.email ? '#FF3B30' : '#E5E7EB' }} />
              {errors.email && <p className="text-xs mt-1" style={{ color: '#FF3B30' }}>{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Тема</label>
            <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white">
              <option>Вопрос</option>
              <option>Проблема</option>
              <option>Предложение</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Сообщение <span style={{ color: '#FF3B30' }}>*</span></label>
            <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              rows={4} placeholder="Опишите вашу ситуацию подробно..."
              className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 resize-none transition-all"
              style={{ borderColor: errors.message ? '#FF3B30' : '#E5E7EB' }} />
            {errors.message && <p className="text-xs mt-1" style={{ color: '#FF3B30' }}>{errors.message}</p>}
          </div>

          <button type="submit" disabled={sending}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-all"
            style={{ background: '#2A6DFF' }}>
            {sending ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Отправка...</>
            ) : (
              <><Icon name="Send" size={15} />Отправить сообщение</>
            )}
          </button>
        </form>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Icon name="HelpCircle" size={18} style={{ color: '#2A6DFF' }} />
            Частые вопросы
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {FAQ.map((item, i) => (
            <div key={i}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors">
                <span className="font-medium text-gray-800 text-sm pr-4">{item.q}</span>
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform"
                  style={{ background: openFaq === i ? '#EEF4FF' : '#F3F4F6', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>
                  <Icon name="ChevronDown" size={14} style={{ color: openFaq === i ? '#2A6DFF' : '#9CA3AF' }} />
                </div>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" style={{ background: '#FAFBFF' }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
