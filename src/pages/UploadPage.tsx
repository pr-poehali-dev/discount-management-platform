import { useState, useRef } from 'react';
import { useApp, UploadHistory } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

const REQUIRED_FIELDS = [
  'Название товара',
  'Категория',
  'Остаток на складе',
  'Цена продажи',
  'Дата истечения срока',
  'История продаж',
  'Артикул/SKU',
];

export default function UploadPage() {
  const { uploadHistory, addUploadHistory } = useApp();
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [detailItem, setDetailItem] = useState<UploadHistory | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext ?? '')) {
      setError('Поддерживаются только CSV и Excel (.xlsx, .xls)');
      return;
    }
    setFile(f);
    setError('');
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1500));

    // Simulate field check - randomly miss a field for demo or succeed
    const simulate = Math.random() > 0.2;
    if (simulate) {
      const item: UploadHistory = {
        id: `h${Date.now()}`,
        date: new Date().toLocaleString('ru-RU'),
        filename: file.name,
        records: Math.floor(1200 + Math.random() * 100),
        status: 'Успешно',
        fields: REQUIRED_FIELDS,
      };
      addUploadHistory(item);
      setSuccess(true);
    } else {
      const missing = REQUIRED_FIELDS[Math.floor(Math.random() * REQUIRED_FIELDS.length)];
      const item: UploadHistory = {
        id: `h${Date.now()}`,
        date: new Date().toLocaleString('ru-RU'),
        filename: file.name,
        records: 0,
        status: 'Ошибка',
        fields: [],
      };
      addUploadHistory(item);
      setError(`Ошибка: отсутствует обязательное поле «${missing}»`);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EEF4FF' }}>
          <Icon name="Upload" size={20} style={{ color: '#2A6DFF' }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Загрузка данных</h1>
          <p className="text-sm text-gray-500">Загрузите файл с товарами для анализа</p>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        onClick={() => fileRef.current?.click()}
        className="rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all"
        style={{ borderColor: dragOver ? '#2A6DFF' : '#E5E7EB', background: dragOver ? '#EEF4FF' : 'white' }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#EEF4FF' }}>
          <Icon name="CloudUpload" size={28} style={{ color: '#2A6DFF' }} />
        </div>
        {file ? (
          <>
            <div className="font-semibold text-gray-800 mb-1">{file.name}</div>
            <div className="text-sm text-gray-400">{(file.size / 1024).toFixed(1)} КБ</div>
          </>
        ) : (
          <>
            <div className="font-semibold text-gray-700 mb-1">Перетащите файл или нажмите для выбора</div>
            <div className="text-sm text-gray-400">CSV, Excel (.xlsx, .xls)</div>
          </>
        )}
        <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
      </div>

      {error && (
        <div className="flex items-start gap-2 p-4 rounded-xl text-sm" style={{ background: '#FFF0EE', color: '#FF3B30' }}>
          <Icon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-4 rounded-xl text-sm" style={{ background: '#ECFDF5', color: '#10B981' }}>
          <Icon name="CheckCircle" size={16} />
          Файл успешно загружен и обработан! Данные обновлены.
        </div>
      )}

      <button onClick={handleUpload} disabled={!file || loading}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-50 transition-all hover:opacity-90"
        style={{ background: '#2A6DFF' }}>
        {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Обработка...</> : <><Icon name="Zap" size={16} />Загрузить и обработать</>}
      </button>

      {/* Required fields */}
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Icon name="CheckSquare" size={18} style={{ color: '#2A6DFF' }} />
          Обязательные поля файла
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {REQUIRED_FIELDS.map(f => (
            <div key={f} className="flex items-center gap-2 p-2.5 rounded-xl text-sm" style={{ background: '#F0F7FF' }}>
              <Icon name="Check" size={14} style={{ color: '#2A6DFF' }} />
              <span className="text-gray-700">{f}</span>
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: '#FFE5E5', color: '#FF3B30' }}>обяз.</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">При отсутствии любого поля загрузка будет отклонена с указанием причины</p>
      </div>

      {/* Upload history */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Icon name="History" size={18} style={{ color: '#2A6DFF' }} />
            История загрузок
          </h3>
          <span className="text-xs text-gray-400">Последние {uploadHistory.length} загрузок</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#F8F9FA' }}>
                {['Дата загрузки', 'Имя файла', 'Записей', 'Статус', 'Действие'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map(item => (
                <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setDetailItem(item)}>
                  <td className="px-4 py-3 text-gray-600">{item.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Icon name="File" size={14} className="text-gray-400" />
                      <span className="font-medium text-gray-700">{item.filename}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{item.records > 0 ? item.records.toLocaleString('ru-RU') : '—'}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: item.status === 'Успешно' ? '#ECFDF5' : '#FFF0EE', color: item.status === 'Успешно' ? '#10B981' : '#FF3B30' }}>
                      {item.status === 'Успешно' ? '✓ Успешно' : '✗ Ошибка'}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <button onClick={() => { setFile(null); setSuccess(false); setError('Файл недоступен для повторной загрузки. Пожалуйста, выберите файл заново.'); }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
                      Повторить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {detailItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Детали загрузки</h3>
              <button onClick={() => setDetailItem(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><Icon name="X" size={16} className="text-gray-500" /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-400">Файл</span><span className="font-medium">{detailItem.filename}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Дата</span><span>{detailItem.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Записей</span><span>{detailItem.records}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Статус</span>
                <span style={{ color: detailItem.status === 'Успешно' ? '#10B981' : '#FF3B30' }}>{detailItem.status}</span>
              </div>
            </div>
            {detailItem.fields && detailItem.fields.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Загруженные поля:</p>
                <div className="space-y-1">
                  {detailItem.fields.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <Icon name="Check" size={12} style={{ color: '#10B981' }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
