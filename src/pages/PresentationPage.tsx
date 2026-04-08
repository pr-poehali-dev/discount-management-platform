import { useState, useEffect, useCallback } from 'react';

const LIME = '#C0FF00';
const BLACK = '#000000';
const DARK = '#1A1A1A';
const GRAY = '#9E9E9E';
const LGRAY = '#E0E0E0';
const WHITE = '#FFFFFF';

// ─── shared components ───────────────────────────────────────────────────────

function LimeText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={className} style={{ color: LIME }}>{children}</span>;
}

function SectionTag({ children }: { children: string }) {
  return (
    <div className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4"
      style={{ background: LIME, color: BLACK }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-3" style={{ height: 2, background: LGRAY }} />;
}

function LimeDot() {
  return <span className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0 mt-1.5" style={{ background: LIME }} />;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start text-sm" style={{ color: DARK }}>
          <LimeDot />
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

function IconBox({ icon, title, text, accent = false }: { icon: string; title: string; text: string; accent?: boolean }) {
  return (
    <div className="rounded-xl p-5 border" style={{ borderColor: accent ? LIME : LGRAY, background: accent ? '#F9FFE0' : WHITE }}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold text-sm mb-1" style={{ color: BLACK }}>{title}</div>
      <div className="text-xs" style={{ color: '#555' }}>{text}</div>
    </div>
  );
}

// ─── slides ──────────────────────────────────────────────────────────────────

function Slide1() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <div className="text-xs tracking-widest uppercase mb-6 font-medium" style={{ color: GRAY }}>Информационно-аналитическая система</div>
      <div className="text-7xl font-black tracking-tight mb-2" style={{ color: BLACK }}>
        Умные<LimeText>Скидки</LimeText>
      </div>
      <div className="text-2xl font-light mb-1" style={{ color: '#333' }}>SmartSales</div>
      <div style={{ height: 3, width: 80, background: LIME, margin: '24px auto' }} />
      <div className="text-xl font-medium max-w-2xl" style={{ color: DARK }}>
        Информационно-аналитическая система для оперативного управления скидками в розничной торговле
      </div>
      <div className="mt-12 text-sm" style={{ color: GRAY }}>
        Колмакова Вероника Дмитриевна · Филимонова Дарья Александровна
      </div>
    </div>
  );
}

function Slide2() {
  const blocks = [
    { label: 'РАЗРАБАТЫВАЕМ', text: 'Информационно-аналитическую систему SmartSales' },
    { label: 'ПОЗВОЛЯЮЩУЮ', text: 'Розничным магазинам и дистрибьюторам, имеющим товары с истекающим сроком годности, а также нереализованные позиции' },
    { label: 'РЕШАТЬ ПРОБЛЕМУ', text: 'Финансовых потерь от списания товаров, которые можно продать, своевременно применив скидку' },
    { label: 'ПРИ ПОМОЩИ', text: 'ML-модели, прогнозирующей риск списания, и автоматической рекомендации оптимальных скидок' },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Формула продукта</SectionTag>
      <h2 className="text-4xl font-black mb-8" style={{ color: BLACK }}>Что мы создаём</h2>
      <div className="grid grid-cols-2 gap-5 flex-1">
        {blocks.map((b, i) => (
          <div key={i} className="rounded-2xl p-6 border-l-4 flex flex-col" style={{ borderColor: LIME, background: '#FAFAFA' }}>
            <div className="text-xs font-black tracking-widest mb-3" style={{ color: LIME }}>{b.label}</div>
            <div className="text-base font-medium" style={{ color: DARK }}>{b.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Проблема</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Финансовые потери ритейла</h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl p-6" style={{ background: '#F7F7F7', border: `1px solid ${LGRAY}` }}>
          <div className="font-bold text-base mb-3" style={{ color: BLACK }}>Две формы потерь</div>
          <BulletList items={[
            'Списание по сроку годности — утилизация просроченного, нереализованного товара',
            'Снижение оборотного капитала — накопление невостребованного товара',
          ]} />
        </div>
        <div className="rounded-2xl p-6" style={{ background: '#F7F7F7', border: `1px solid ${LGRAY}` }}>
          <div className="font-bold text-base mb-3" style={{ color: BLACK }}>Финансовые потери</div>
          <BulletList items={[
            '<b>Прямые</b> — себестоимость и упущенная прибыль (оплачено поставщику, выручки нет)',
            '<b>Косвенные</b> — заморозка средств ведёт к снижению оборачиваемости и ROI склада',
          ]} />
        </div>
      </div>
      <div className="rounded-2xl p-5 mb-5" style={{ background: '#F7F7F7', border: `1px solid ${LGRAY}` }}>
        <div className="font-bold text-base mb-3" style={{ color: BLACK }}>Операционные сложности</div>
        <div className="grid grid-cols-2 gap-2">
          <BulletList items={[
            'Ручной контроль сроков отнимает до 20% времени персонала',
            'Человеческий фактор ведёт к штрафам и потере репутации',
          ]} />
          <BulletList items={[
            'Нарушение FEFO — старая партия остаётся на складе',
            'Отсутствие системного подхода к управлению скидками',
          ]} />
        </div>
      </div>
      <div className="rounded-2xl p-4 text-center" style={{ background: LIME }}>
        <span className="text-2xl font-black" style={{ color: BLACK }}>Потери составляют 0,5–2% от оборота</span>
        <span className="text-base font-medium ml-3" style={{ color: '#333' }}>— миллиарды рублей ежегодно</span>
      </div>
    </div>
  );
}

function Slide4() {
  const features = [
    { icon: '🔮', label: 'Прогнозирование списаний' },
    { icon: '🏷️', label: 'Автоматическая рекомендация скидок' },
    { icon: '📤', label: 'Загрузка данных из учётной системы' },
    { icon: '📊', label: 'Интерактивный дашборд' },
    { icon: '📋', label: 'Выгрузка отчёта' },
  ];
  const users = ['Собственники магазина', 'Менеджеры по продажам', 'Товароведы', 'Маркетологи'];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Решение</SectionTag>
      <h2 className="text-4xl font-black mb-3" style={{ color: BLACK }}>Продукт «УмныеСкидки»</h2>
      <p className="text-base mb-6" style={{ color: '#555' }}>
        Помогает торговому ритейлу решать проблему потерь от списаний товара (в том числе с истекающим сроком годности) и управлять скидками при помощи прогнозной аналитики и машинного обучения.
      </p>
      <div className="grid grid-cols-5 gap-3 mb-6">
        {features.map((f, i) => (
          <div key={i} className="rounded-xl p-4 text-center border" style={{ borderColor: LIME }}>
            <div className="text-3xl mb-2">{f.icon}</div>
            <div className="text-xs font-semibold" style={{ color: DARK }}>{f.label}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-sm font-bold mb-3" style={{ color: GRAY }}>ДЛЯ КОГО:</div>
        <div className="flex gap-3 flex-wrap">
          {users.map((u, i) => (
            <div key={i} className="px-4 py-2 rounded-full text-sm font-medium border" style={{ borderColor: LGRAY, color: DARK }}>
              {u}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Анализ проблемной области</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Два реальных кейса</h2>
      <div className="grid grid-cols-2 gap-6 flex-1">
        <div className="rounded-2xl p-6 flex flex-col" style={{ background: '#F7F7F7', border: `1px solid ${LGRAY}` }}>
          <div className="font-black text-base mb-3" style={{ color: BLACK }}>Кейс 1. Парфюмерная сеть</div>
          <p className="text-sm mb-4" style={{ color: '#444' }}>
            Коммерческий директор российской сети парфюмерных магазинов — скидки вручную в Excel, сотрудник тратит много времени, пропускает залежавшийся товар.
          </p>
          <div className="rounded-xl p-4 mt-auto" style={{ background: LIME }}>
            <span className="text-sm font-bold" style={{ color: BLACK }}>Автоматизация позволила бы системе отслеживать и предлагать скидку</span>
          </div>
        </div>
        <div className="rounded-2xl p-6 flex flex-col" style={{ background: '#F7F7F7', border: `1px solid ${LGRAY}` }}>
          <div className="font-black text-base mb-3" style={{ color: BLACK }}>Кейс 2. Крупный дистрибьютор</div>
          <p className="text-sm mb-3" style={{ color: '#444' }}>
            Допустимый объём списаний <LimeText><b>0,4% от оборота</b></LimeText>. При обороте 1 млрд руб. ежемесячные потери <LimeText><b>4 млн руб.</b></LimeText>
          </p>
          <p className="text-sm mb-4" style={{ color: '#444' }}>
            Процесс возврата ручной, до двух кварталов — заморозка средств. Нужна система прогноза возвратов с привязкой к месту и вероятности.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <div className="rounded-xl p-3 text-center" style={{ background: LIME }}>
              <div className="text-xl font-black" style={{ color: BLACK }}>0,4%</div>
              <div className="text-xs" style={{ color: '#333' }}>допустимые списания</div>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: BLACK }}>
              <div className="text-xl font-black" style={{ color: LIME }}>4 млн ₽</div>
              <div className="text-xs" style={{ color: '#aaa' }}>потери в месяц</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide6() {
  const segments = [
    { name: 'Продуктовый ритейл', problem: 'Ограниченный срок годности' },
    { name: 'Автотовары', problem: 'Позиции с нерегулярным спросом' },
    { name: 'Стройматериалы', problem: 'Сезонность и накопление остатков' },
    { name: 'Косметика и парфюмерия', problem: 'Широкий ассортимент' },
    { name: 'Товары повседн. спроса', problem: 'Длительное хранение позиций' },
    { name: 'Канцелярские товары', problem: 'Потеря актуальности товаров' },
    { name: 'Технические товары', problem: 'Устаревание моделей' },
    { name: 'Мебельные магазины', problem: 'Позиции без оборота' },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Целевая аудитория</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Сегменты рынка</h2>
      <div className="grid grid-cols-4 gap-3 flex-1">
        {segments.map((s, i) => (
          <div key={i} className="rounded-xl p-4 flex flex-col border" style={{ borderColor: LGRAY }}>
            <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-black mb-2" style={{ background: LIME, color: BLACK }}>{i + 1}</div>
            <div className="font-bold text-sm mb-1" style={{ color: BLACK }}>{s.name}</div>
            <div className="text-xs mt-auto pt-2" style={{ color: GRAY, borderTop: `1px solid ${LGRAY}` }}>{s.problem}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl p-3 text-sm text-center" style={{ background: '#F7F7F7' }}>
        <b>Решение направлено на</b> снижение потерь от списания и увеличение оборачиваемости
      </div>
    </div>
  );
}

function Slide7() {
  const rows = [
    { crit: 'Фокус', us: 'Борьба с убытками от списаний', imp: 'Анализ цен и рынка', imr: 'Операционная эффективность', sp: 'Динамическое ценообразование' },
    { crit: 'Решение', us: 'ML-модель прогнозирует риск и рекомендует скидку', imp: 'Рекомендации по ценообразованию', imr: 'Оптимизация процессов', sp: 'ML-платформа прогнозирует спрос и рассчитывает скидки' },
    { crit: 'Ценность', us: 'Прямое сокращение списаний, превращение убытков в доход', imp: 'Повышение маржинальности', imr: 'Снижение операционных затрат', sp: 'Рост валового дохода на 3–5%' },
    { crit: 'Для кого', us: 'Малый и средний ритейл', imp: 'B2B-компании', imr: 'Крупный ритейл, банки', sp: 'Крупные ритейлеры >100 млрд ₽' },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Конкуренты</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Конкурентный анализ</h2>
      <div className="overflow-auto flex-1">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: BLACK }}>
              {['Критерий', 'УмныеСкидки', 'Imprice', 'Imredi', 'SmartPricing'].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-bold" style={{ color: i === 1 ? LIME : WHITE }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#F7F7F7' : WHITE }}>
                <td className="px-4 py-3 font-bold text-xs tracking-wide" style={{ color: GRAY }}>{r.crit}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: BLACK }}>{r.us}</td>
                <td className="px-4 py-3" style={{ color: '#444' }}>{r.imp}</td>
                <td className="px-4 py-3" style={{ color: '#444' }}>{r.imr}</td>
                <td className="px-4 py-3" style={{ color: '#444' }}>{r.sp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Slide8() {
  const channels = [
    { icon: '🎁', text: 'Бесплатное пилотное внедрение для первых клиентов' },
    { icon: '🤝', text: 'Рекомендации довольных клиентов' },
    { icon: '🎯', text: 'Индивидуальные демонстрации продукта' },
    { icon: '🏛️', text: 'Участие в отраслевых конференциях, выставках и форумах' },
    { icon: '📱', text: 'Таргетированная и контекстная реклама' },
    { icon: '💬', text: 'Скидка, если пришли по рекомендации и сделали нам рекламу' },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Каналы привлечения</SectionTag>
      <h2 className="text-4xl font-black mb-8" style={{ color: BLACK }}>Как мы привлекаем клиентов</h2>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {channels.map((c, i) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl p-5 border" style={{ borderColor: LGRAY }}>
            <div className="text-4xl flex-shrink-0">{c.icon}</div>
            <div className="text-base font-medium" style={{ color: DARK }}>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide9() {
  const levels = [
    { label: 'TAM', sub: 'Россия (розничная торговля)', value: '104 944', unit: 'млрд ₽', detail: '437 266 объектов × 20 000 руб./мес. × 12 мес.', color: '#F0F0F0' },
    { label: 'SAM', sub: 'Сибирский федеральный округ', value: '10 861', unit: 'млрд ₽', detail: '45 253 объекта × 20 000 × 12', color: '#E0E0E0' },
    { label: 'SOM', sub: 'Город Красноярск', value: '864', unit: 'млн ₽', detail: '3 600 объектов × 20 000 × 12', color: LIME },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Рынок</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>TAM / SAM / SOM</h2>
      <div className="text-sm mb-6" style={{ color: GRAY }}>По данным Росстата: 437 266 объектов розничной торговли в России (без аптек, палаток, киосков, столовых)</div>
      <div className="flex items-end gap-4 flex-1 mb-6">
        {levels.map((l, i) => (
          <div key={i} className="flex-1 rounded-2xl p-6 flex flex-col justify-between" style={{ background: l.color, minHeight: `${220 + i * 60}px`, border: `1px solid ${LGRAY}` }}>
            <div>
              <div className="text-2xl font-black mb-1" style={{ color: BLACK }}>{l.label}</div>
              <div className="text-xs font-medium mb-3" style={{ color: '#555' }}>{l.sub}</div>
            </div>
            <div>
              <div className="text-4xl font-black" style={{ color: BLACK }}>{l.value}</div>
              <div className="text-sm font-bold" style={{ color: '#333' }}>{l.unit}</div>
              <div className="text-xs mt-2" style={{ color: '#666' }}>{l.detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl p-4 text-center" style={{ background: BLACK }}>
        <span className="text-base font-bold" style={{ color: WHITE }}>Охват 2% потенциальных клиентов → </span>
        <span className="text-xl font-black" style={{ color: LIME }}>17,3 млн руб. выручки</span>
      </div>
    </div>
  );
}

function Slide10() {
  const blocks = [
    { title: 'Ключевые партнёры', items: ['Бизнес-объединения МСБ', 'Облачная инфраструктура', 'ML-поставщики'] },
    { title: 'Ключевые виды деятельности', items: ['Разработка продукта', 'Анализ данных и валидация', 'Продажи и маркетинг', 'Поддержка клиентов'] },
    { title: 'Ключевые ресурсы', items: ['Облачная инфраструктура', 'ML-модели и алгоритмы', 'Приложение, дизайн', 'Гранты, инвестиции'] },
    { title: 'Ценностное предложение', items: ['Сокращение списаний', 'ML-прогнозы', 'Автоматические скидки', 'Интерактивный дашборд'] },
    { title: 'Отношения с клиентами', items: ['Пробный период', 'Поддержка', 'Подписка с обновлением'] },
    { title: 'Сегменты потребителей', items: ['Продуктовые магазины', 'Автотовары', 'Стройматериалы', 'Косметика, мебель'] },
    { title: 'Каналы сбыта', items: ['Прямые продажи', 'Конференции', 'Реклама, рекомендации'] },
    { title: 'Структура расходов', items: ['ФОТ команды', 'Облачная инфраструктура', 'Маркетинг', 'Разработка MVP'] },
    { title: 'Потоки доходов', items: ['Ежемесячная подписка', 'Консалтинговые услуги'] },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Бизнес-модель</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Канва бизнес-модели</h2>
      <div className="grid grid-cols-3 gap-3 flex-1">
        {blocks.map((b, i) => (
          <div key={i} className="rounded-xl p-4 border" style={{ borderColor: i === 3 ? LIME : LGRAY, background: i === 3 ? '#F9FFE0' : '#FAFAFA' }}>
            <div className="text-xs font-black tracking-wide mb-2" style={{ color: i === 3 ? '#333' : GRAY }}>{b.title.toUpperCase()}</div>
            <ul className="space-y-1">
              {b.items.map((it, j) => (
                <li key={j} className="flex items-start gap-1.5 text-xs" style={{ color: DARK }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: LIME }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide11() {
  const modules = [
    { name: 'Загрузка данных массива (Excel/CSV)', icon: '📥' },
    { name: 'Предобработка и преобразование данных', icon: '⚙️' },
    { name: 'Алгоритмы обучения и прогнозирования', icon: '🧠' },
    { name: 'Визуализация в виде дашбордов', icon: '📊' },
    { name: 'Возможность выгрузки отчёта', icon: '📤' },
  ];
  const stack = [
    { layer: 'Backend', tech: 'Python, PostgreSQL', color: BLACK },
    { layer: 'Frontend', tech: 'REST API, React', color: '#333' },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Техническое решение</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Архитектура системы</h2>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {modules.map((m, i) => (
            <div key={i} className="flex items-center">
              <div className="rounded-xl p-4 text-center border flex flex-col items-center" style={{ borderColor: LIME, minWidth: 130 }}>
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="text-xs font-semibold" style={{ color: DARK }}>{m.name}</div>
              </div>
              {i < modules.length - 1 && (
                <div className="flex items-center px-1">
                  <div className="w-8 h-0.5" style={{ background: GRAY }} />
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-6" style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: GRAY }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6" style={{ background: '#F7F7F7', border: `1px solid ${LGRAY}` }}>
          <div className="font-bold text-sm mb-4" style={{ color: BLACK }}>Технологический стек</div>
          <div className="flex gap-4">
            {stack.map((s, i) => (
              <div key={i} className="flex-1 rounded-xl p-4 text-center" style={{ background: s.color }}>
                <div className="text-xs font-bold mb-1" style={{ color: LIME }}>{s.layer}</div>
                <div className="text-base font-black" style={{ color: WHITE }}>{s.tech}</div>
              </div>
            ))}
            <div className="flex-1 rounded-xl p-4 text-center border-2" style={{ borderColor: LIME }}>
              <div className="text-xs font-bold mb-1" style={{ color: GRAY }}>ML-модуль</div>
              <div className="text-base font-black" style={{ color: BLACK }}>Sklearn / Prophet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide12() {
  const risks = [
    { risk: 'Низкий спрос', rank: 0.72, measures: 'Пилотное внедрение, изучение рынка, пробный период' },
    { risk: 'Технические сбои', rank: 0.54, measures: 'Резервирование, мониторинг, SLA 99,5%' },
    { risk: 'Конкуренция со стороны крупных игроков', rank: 0.63, measures: 'Фокус на нише МСБ, быстрая итерация' },
    { risk: 'Проблемы с данными клиентов', rank: 0.45, measures: 'Шаблоны импорта, поддержка при интеграции' },
    { risk: 'Нехватка финансирования', rank: 0.58, measures: 'Гранты, MVP на минимальном бюджете' },
    { risk: 'Сложность внедрения', rank: 0.41, measures: 'Простой интерфейс, обучение пользователей' },
    { risk: 'Изменение законодательства', rank: 0.30, measures: 'Мониторинг НПА, юридическое сопровождение' },
    { risk: 'Утечка данных / кибербезопасность', rank: 0.66, measures: 'Шифрование, разграничение доступа, аудит' },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Риски</SectionTag>
      <h2 className="text-4xl font-black mb-4" style={{ color: BLACK }}>Риски и мероприятия</h2>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: BLACK }}>
              <th className="px-4 py-3 text-left font-bold" style={{ color: WHITE }}>Риск</th>
              <th className="px-4 py-3 text-left font-bold w-24" style={{ color: WHITE }}>Ранг (макс=1)</th>
              <th className="px-4 py-3 text-left font-bold" style={{ color: WHITE }}>Мероприятия по снижению</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#F7F7F7' : WHITE }}>
                <td className="px-4 py-2.5 font-medium" style={{ color: DARK }}>{r.risk}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className="font-black text-base" style={{ color: r.rank >= 0.6 ? '#cc0000' : r.rank >= 0.5 ? '#888' : '#444' }}>
                    {r.rank.toFixed(2)}
                  </span>
                  <div className="w-full rounded-full h-1.5 mt-1" style={{ background: LGRAY }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${r.rank * 100}%`, background: r.rank >= 0.6 ? '#cc0000' : LIME }} />
                  </div>
                </td>
                <td className="px-4 py-2.5 text-xs" style={{ color: '#555' }}>{r.measures}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Slide13() {
  const phases = [
    { period: 'Фев – Апр 2026', label: 'Разработка', items: ['Разработка ML-моделей', 'Разработка backend', 'Разработка frontend', 'Юридическое оформление'], color: '#E8E8E8' },
    { period: 'Май – Сен 2026', label: 'MVP', items: ['Тестирование и запуск MVP', 'Запуск прототипа на пилотных объектах', 'Получение первых продаж и обратной связи'], color: '#D0D0D0' },
    { period: 'Окт – Дек 2026', label: 'Запуск', items: ['Запуск полноценного приложения', 'Реализация полного функционала', 'Запуск рекламных кампаний'], color: '#B8D8A8' },
    { period: 'Янв – Июн 2027', label: 'СФО', items: ['Выход на Сибирский федеральный округ', 'Подключение первых клиентов', 'Расширение команды IT и продаж'], color: LIME },
    { period: 'Июл 2027 – Дек 2028', label: 'Россия', items: ['Выход на российский рынок', 'Масштабирование', 'Внедрение доп. услуг'], color: BLACK },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Roadmap</SectionTag>
      <h2 className="text-4xl font-black mb-8" style={{ color: BLACK }}>Дорожная карта</h2>
      <div className="relative flex-1">
        <div className="absolute top-8 left-0 right-0 h-0.5" style={{ background: LGRAY }} />
        <div className="flex gap-3">
          {phases.map((p, i) => (
            <div key={i} className="flex-1 flex flex-col">
              <div className="w-4 h-4 rounded-full mb-3 mx-auto border-2 relative z-10" style={{ background: p.color, borderColor: i === phases.length - 1 ? LIME : p.color === BLACK ? LIME : '#999' }} />
              <div className="rounded-2xl p-4 flex-1 flex flex-col" style={{ background: p.color, border: `1px solid ${LGRAY}` }}>
                <div className="text-xs font-black mb-1" style={{ color: p.color === BLACK ? LIME : '#555' }}>{p.period}</div>
                <div className="text-sm font-black mb-2" style={{ color: p.color === BLACK ? WHITE : BLACK }}>{p.label}</div>
                <ul className="space-y-1">
                  {p.items.map((it, j) => (
                    <li key={j} className="text-xs flex items-start gap-1" style={{ color: p.color === BLACK ? '#ccc' : '#444' }}>
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: p.color === BLACK ? LIME : GRAY }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide14() {
  const sub = [
    { label: 'Ежемесячная подписка', range: '20 000 – 70 000 ₽', items: ['CAC', 'ARPU', 'LT', 'LTV', 'LTV/CAC'], vals: ['120 000 ₽', '45 000 ₽', '9 мес.', '405 000 ₽', '3,4'] },
  ];
  const cons = [
    { label: 'Консалтинг', range: '30 000 – 90 000 ₽', items: ['Ср. цена', 'Покупок/год', 'LTV', 'CAC', 'LTV/CAC'], vals: ['60 000 ₽', '2', '120 000 ₽', '38 000 ₽', '3,2'] },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Юнит-экономика</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Финансовые метрики</h2>
      <div className="grid grid-cols-2 gap-6 flex-1">
        {[sub[0], cons[0]].map((block, bi) => (
          <div key={bi} className="rounded-2xl p-6 border" style={{ borderColor: LGRAY }}>
            <div className="font-black text-base mb-1" style={{ color: BLACK }}>{block.label}</div>
            <div className="text-sm mb-4 px-2 py-1 rounded inline-block" style={{ background: LIME, color: BLACK, fontWeight: 700 }}>{block.range}</div>
            <div className="space-y-3">
              {block.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${LGRAY}` }}>
                  <span className="text-sm font-medium" style={{ color: GRAY }}>{item}</span>
                  <span className="text-base font-black" style={{ color: BLACK }}>{block.vals[i]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide15() {
  const yr1 = [
    { label: 'Разработка продукта', value: '600 000', pct: 29 },
    { label: 'Облачные мощности и хостинг', value: '180 000', pct: 9 },
    { label: 'Регистрация юрлица и РИД', value: '100 000', pct: 5 },
    { label: 'Маркетинг (таргет/конф/демо/SEO)', value: '1 000 000', pct: 47 },
    { label: 'Налоги (УСН 6%)', value: '60 000', pct: 3 },
    { label: 'Резерв', value: '188 000', pct: 9 },
  ];
  const yr2 = [
    { label: 'Персонал', value: '2 080 000', pct: 30 },
    { label: 'Прямые расходы', value: '1 460 000', pct: 21 },
    { label: 'Маркетинг', value: '2 700 000', pct: 39 },
    { label: 'Налог', value: '349 200', pct: 5 },
    { label: 'Резерв', value: '624 000', pct: 9 },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Структура затрат</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Бюджет 1-го и 2-го года</h2>
      <div className="grid grid-cols-2 gap-6 flex-1">
        {[{ title: '1-й год', total: '2 068 000 ₽', data: yr1 }, { title: '2-й год', total: '6 864 000 ₽', data: yr2 }].map((yr, yi) => (
          <div key={yi} className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="font-black text-lg" style={{ color: BLACK }}>{yr.title}</div>
              <div className="font-black text-xl px-3 py-1 rounded-lg" style={{ background: LIME, color: BLACK }}>Итого: {yr.total}</div>
            </div>
            <div className="flex-1 space-y-2">
              {yr.data.map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-xs flex-shrink-0 w-40" style={{ color: DARK }}>{row.label}</div>
                  <div className="flex-1 rounded-full h-4 relative" style={{ background: LGRAY }}>
                    <div className="h-4 rounded-full" style={{ width: `${row.pct}%`, background: i % 2 === 0 ? BLACK : LIME }} />
                  </div>
                  <div className="text-xs font-bold w-20 text-right" style={{ color: BLACK }}>{row.value} ₽</div>
                  <div className="text-xs w-8 text-right" style={{ color: GRAY }}>{row.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide16() {
  const done = [
    'Разработана концепция и ТЗ',
    'Проведен анализ рынка и конкурентов',
    'Проведены интервью с отраслевыми экспертами',
    'Выявлены факторы, влияющие на скидки',
    'Проанализирована предметная область',
    'Определен технологический стек',
    'Разработана ML-модель прогнозирования',
    'Создан визуальный прототип',
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Текущее состояние</SectionTag>
      <h2 className="text-4xl font-black mb-8" style={{ color: BLACK }}>Что уже сделано</h2>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {done.map((item, i) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl p-5 border" style={{ borderColor: LGRAY }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm" style={{ background: LIME, color: BLACK }}>✓</div>
            <div className="text-base font-medium" style={{ color: DARK }}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide17() {
  const directions = [
    { icon: '💻', title: 'Технологическое', items: ['Разработка мобильной версии для категорийщиков', 'Автоматическое обновление данных в реальном времени'] },
    { icon: '🗺️', title: 'Географическое', items: ['Выход на города-миллионники (Новосибирск, Екатеринбург, Москва, СПб)', 'Расширение в другие федеральные округа (Приволжский, Центральный, Южный)'] },
    { icon: '💰', title: 'Финансовое', items: ['Внедрение тарифов Premium с расширенной аналитикой', 'Дополнительные тарифы и поддержка'] },
    { icon: '🏗️', title: 'Инфраструктурное', items: ['Привлечение крупных розничных сетей (федеральные игроки)', 'Сотрудничество с производителями товаров', 'Интеграция с системами лояльности'] },
  ];
  return (
    <div className="flex flex-col h-full px-14 py-10">
      <SectionTag>Масштабирование</SectionTag>
      <h2 className="text-4xl font-black mb-6" style={{ color: BLACK }}>Направления роста</h2>
      <div className="grid grid-cols-2 gap-5 flex-1">
        {directions.map((d, i) => (
          <div key={i} className="rounded-2xl p-6 border-l-4" style={{ borderColor: LIME, background: '#FAFAFA' }}>
            <div className="text-3xl mb-2">{d.icon}</div>
            <div className="font-black text-base mb-3" style={{ color: BLACK }}>{d.title}</div>
            <BulletList items={d.items} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide18() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <div className="text-8xl mb-6">🚀</div>
      <div className="text-5xl font-black mb-4" style={{ color: BLACK }}>
        Готовы снизить ваши потери от списаний до <LimeText>0,4%</LimeText>?
      </div>
      <div style={{ height: 3, width: 80, background: LIME, margin: '24px auto' }} />
      <div className="text-2xl font-medium mb-10" style={{ color: '#555' }}>Давайте обсудим пилотное внедрение</div>
      <a href="mailto:support@smartdiscount.ru"
        className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xl transition-all hover:scale-105"
        style={{ background: LIME, color: BLACK }}>
        📩 Заказать демо
      </a>
      <div className="mt-10 text-sm" style={{ color: GRAY }}>
        УмныеСкидки / SmartSales · support@smartdiscount.ru
      </div>
    </div>
  );
}

// ─── slide registry ────────────────────────────────────────────────────────

const SLIDES = [
  { num: 1, title: 'Титул', component: Slide1 },
  { num: 2, title: 'Формула продукта', component: Slide2 },
  { num: 3, title: 'Проблема', component: Slide3 },
  { num: 4, title: 'Решение', component: Slide4 },
  { num: 5, title: 'Анализ проблемной области', component: Slide5 },
  { num: 6, title: 'Целевая аудитория', component: Slide6 },
  { num: 7, title: 'Конкуренты', component: Slide7 },
  { num: 8, title: 'Каналы привлечения', component: Slide8 },
  { num: 9, title: 'Рынок (TAM/SAM/SOM)', component: Slide9 },
  { num: 10, title: 'Бизнес-модель', component: Slide10 },
  { num: 11, title: 'Техническое решение', component: Slide11 },
  { num: 12, title: 'Риски и мероприятия', component: Slide12 },
  { num: 13, title: 'Roadmap', component: Slide13 },
  { num: 14, title: 'Юнит-экономика', component: Slide14 },
  { num: 15, title: 'Структура затрат', component: Slide15 },
  { num: 16, title: 'Текущее состояние', component: Slide16 },
  { num: 17, title: 'Масштабирование', component: Slide17 },
  { num: 18, title: 'Призыв к действию', component: Slide18 },
];

// ─── main component ────────────────────────────────────────────────────────

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(SLIDES.length - 1, c + 1)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      if (e.key === 'f' || e.key === 'F') setFullscreen(f => !f);
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const SlideComponent = SLIDES[current].component;

  return (
    <div className="flex flex-col h-full" style={{ background: '#F0F0F0' }}>
      {/* Top bar */}
      {!fullscreen && (
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setNavOpen(!navOpen)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 text-sm font-medium flex items-center gap-1.5">
              <span>☰</span> Слайды
            </button>
            <span className="text-sm font-semibold" style={{ color: DARK }}>
              {SLIDES[current].num}. {SLIDES[current].title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} disabled={current === 0} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors">←</button>
            <span className="text-sm font-bold px-3" style={{ color: DARK }}>{current + 1} / {SLIDES.length}</span>
            <button onClick={next} disabled={current === SLIDES.length - 1} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors">→</button>
            <button onClick={() => setFullscreen(true)} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 ml-2">⛶ На весь экран</button>
          </div>
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        {/* Slide nav panel */}
        {navOpen && !fullscreen && (
          <div className="w-52 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => { setCurrent(i); setNavOpen(false); }}
                className="w-full px-3 py-2.5 text-left flex items-center gap-2 border-b border-gray-50 text-sm transition-colors hover:bg-gray-50"
                style={{ background: current === i ? '#F9FFE0' : undefined, borderLeft: current === i ? `3px solid ${LIME}` : '3px solid transparent' }}>
                <span className="font-black text-xs w-5 flex-shrink-0" style={{ color: current === i ? '#333' : GRAY }}>{s.num}</span>
                <span className="font-medium truncate" style={{ color: DARK }}>{s.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Slide area */}
        <div className={`flex-1 flex items-center justify-center p-4 ${fullscreen ? 'fixed inset-0 z-50 p-0' : ''}`} style={{ background: fullscreen ? BLACK : '#E8E8E8' }}>
          <div className="relative" style={{
            width: fullscreen ? '100vw' : 'min(100%, calc((100vh - 120px) * 16 / 9))',
            aspectRatio: '16/9',
            background: WHITE,
            boxShadow: fullscreen ? 'none' : '0 8px 32px rgba(0,0,0,0.18)',
            borderRadius: fullscreen ? 0 : 8,
            overflow: 'hidden',
          }}>
            <SlideComponent />

            {/* Slide number badge */}
            <div className="absolute bottom-3 right-4 text-xs font-bold" style={{ color: LGRAY }}>
              {current + 1} / {SLIDES.length}
            </div>

            {/* Fullscreen controls */}
            {fullscreen && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button onClick={prev} disabled={current === 0} className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold disabled:opacity-30" style={{ background: 'rgba(0,0,0,0.5)', color: WHITE }}>‹</button>
                <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: 'rgba(0,0,0,0.5)', color: WHITE }}>{current + 1} / {SLIDES.length}</span>
                <button onClick={next} disabled={current === SLIDES.length - 1} className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold disabled:opacity-30" style={{ background: 'rgba(0,0,0,0.5)', color: WHITE }}>›</button>
                <button onClick={() => setFullscreen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(0,0,0,0.5)', color: WHITE }}>✕</button>
              </div>
            )}
          </div>
        </div>

        {/* Progress dots */}
        {!fullscreen && (
          <div className="w-10 bg-white border-l border-gray-200 flex flex-col items-center py-4 gap-1.5 overflow-y-auto flex-shrink-0">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="rounded-full transition-all"
                style={{ width: current === i ? 8 : 6, height: current === i ? 8 : 6, background: current === i ? LIME : LGRAY }} />
            ))}
          </div>
        )}
      </div>

      {/* Keyboard hint */}
      {!fullscreen && (
        <div className="px-4 py-1.5 bg-white border-t border-gray-100 text-xs text-center" style={{ color: GRAY }}>
          ← → для навигации · F — полный экран
        </div>
      )}
    </div>
  );
}
