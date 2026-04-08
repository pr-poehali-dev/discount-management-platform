import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  daysLeft: number;
  status: 'Просрочен' | 'Неликвид' | 'Норма';
  price: number;
  currentDiscount: number;
  mlDiscount: number;
  sku: string;
  probability: number;
  confidence: number;
}

export interface UploadHistory {
  id: string;
  date: string;
  filename: string;
  records: number;
  status: 'Успешно' | 'Ошибка';
  fields?: string[];
}

export interface ScheduleItem {
  id: string;
  frequency: string;
  time: string;
  report: string;
  email: string;
  enabled: boolean;
  format: 'PDF' | 'Excel';
  lastSent?: string;
}

interface AppContextType {
  products: Product[];
  totalProducts: number;
  lastUpload: string;
  uploadHistory: UploadHistory[];
  schedules: ScheduleItem[];
  appliedDiscounts: Record<number, number>;
  applyDiscount: (productId: number, discount: number) => void;
  addUploadHistory: (item: UploadHistory) => void;
  updateSchedule: (id: string, updates: Partial<ScheduleItem>) => void;
  categoryFilter: string | null;
  setCategoryFilter: (cat: string | null) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Молоко 3.2% 1л', category: 'Молочные', stock: 48, daysLeft: 2, status: 'Неликвид', price: 89, currentDiscount: 0, mlDiscount: 35, sku: 'MLK001', probability: 87, confidence: 94 },
  { id: 2, name: 'Батон нарезной', category: 'Хлеб/Выпечка', stock: 32, daysLeft: 1, status: 'Просрочен', price: 38, currentDiscount: 0, mlDiscount: 50, sku: 'BRD001', probability: 95, confidence: 91 },
  { id: 3, name: 'Сметана 20% 400г', category: 'Молочные', stock: 25, daysLeft: 3, status: 'Неликвид', price: 120, currentDiscount: 15, mlDiscount: 30, sku: 'SMT001', probability: 82, confidence: 88 },
  { id: 4, name: 'Курица целая 1.5кг', category: 'Мясо/Рыба', stock: 18, daysLeft: 1, status: 'Просрочен', price: 320, currentDiscount: 0, mlDiscount: 40, sku: 'CHK001', probability: 91, confidence: 96 },
  { id: 5, name: 'Йогурт фруктовый', category: 'Молочные', stock: 60, daysLeft: 4, status: 'Неликвид', price: 65, currentDiscount: 10, mlDiscount: 25, sku: 'YGT001', probability: 78, confidence: 85 },
  { id: 6, name: 'Помидоры кг', category: 'Овощи/Фрукты', stock: 42, daysLeft: 2, status: 'Неликвид', price: 180, currentDiscount: 0, mlDiscount: 45, sku: 'TOM001', probability: 89, confidence: 92 },
  { id: 7, name: 'Кефир 1% 1л', category: 'Молочные', stock: 35, daysLeft: 0, status: 'Просрочен', price: 75, currentDiscount: 0, mlDiscount: 60, sku: 'KFR001', probability: 93, confidence: 97 },
  { id: 8, name: 'Сыр Российский 400г', category: 'Молочные', stock: 22, daysLeft: 5, status: 'Норма', price: 280, currentDiscount: 0, mlDiscount: 15, sku: 'CHS001', probability: 65, confidence: 79 },
  { id: 9, name: 'Хлеб Бородинский', category: 'Хлеб/Выпечка', stock: 15, daysLeft: 1, status: 'Просрочен', price: 55, currentDiscount: 0, mlDiscount: 55, sku: 'RYE001', probability: 92, confidence: 95 },
  { id: 10, name: 'Масло сливочное 180г', category: 'Молочные', stock: 30, daysLeft: 14, status: 'Норма', price: 210, currentDiscount: 0, mlDiscount: 10, sku: 'BTR001', probability: 55, confidence: 72 },
  { id: 11, name: 'Свинина шейка кг', category: 'Мясо/Рыба', stock: 12, daysLeft: 2, status: 'Неликвид', price: 520, currentDiscount: 0, mlDiscount: 35, sku: 'PRK001', probability: 84, confidence: 90 },
  { id: 12, name: 'Огурцы свежие кг', category: 'Овощи/Фрукты', stock: 55, daysLeft: 3, status: 'Неликвид', price: 120, currentDiscount: 0, mlDiscount: 40, sku: 'CUC001', probability: 88, confidence: 93 },
];

const INITIAL_SCHEDULES: ScheduleItem[] = [
  { id: 's1', frequency: 'Ежедневно', time: '08:00', report: 'Просроченные товары', email: 'manager@store.ru', enabled: true, format: 'PDF', lastSent: '07.04.2026' },
  { id: 's2', frequency: 'Еженедельно', time: 'Пн 09:00', report: 'Сводный отчёт', email: 'director@store.ru', enabled: true, format: 'Excel', lastSent: '07.04.2026' },
  { id: 's3', frequency: 'Ежемесячно', time: '1-е число', report: 'Отчёт по категориям', email: 'analytics@store.ru', enabled: false, format: 'PDF', lastSent: '01.04.2026' },
];

const INITIAL_HISTORY: UploadHistory[] = [
  { id: 'h1', date: '07.04.2026 14:23', filename: 'products_april.xlsx', records: 1248, status: 'Успешно', fields: ['Название товара', 'Категория', 'Остаток на складе', 'Цена продажи', 'Дата истечения срока', 'История продаж', 'Артикул/SKU'] },
  { id: 'h2', date: '01.04.2026 09:15', filename: 'products_march_final.csv', records: 1215, status: 'Успешно', fields: ['Название товара', 'Категория', 'Остаток на складе', 'Цена продажи', 'Дата истечения срока', 'История продаж', 'Артикул/SKU'] },
  { id: 'h3', date: '25.03.2026 16:40', filename: 'export_data.csv', records: 0, status: 'Ошибка', fields: ['Название товара', 'Категория'] },
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [uploadHistory, setUploadHistory] = useState<UploadHistory[]>(INITIAL_HISTORY);
  const [schedules, setSchedules] = useState<ScheduleItem[]>(INITIAL_SCHEDULES);
  const [appliedDiscounts, setAppliedDiscounts] = useState<Record<number, number>>({});
  const [lastUpload] = useState('07.04.2026');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const applyDiscount = (productId: number, discount: number) => {
    setAppliedDiscounts(prev => ({ ...prev, [productId]: discount }));
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, currentDiscount: discount } : p));
  };

  const addUploadHistory = (item: UploadHistory) => {
    setUploadHistory(prev => [item, ...prev].slice(0, 5));
  };

  const updateSchedule = (id: string, updates: Partial<ScheduleItem>) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <AppContext.Provider value={{
      products, totalProducts: 1248, lastUpload, uploadHistory, schedules,
      appliedDiscounts, applyDiscount, addUploadHistory, updateSchedule,
      categoryFilter, setCategoryFilter,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
