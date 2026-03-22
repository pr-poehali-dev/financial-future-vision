import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

// ─── helpers ────────────────────────────────────────────────────────────────

function useAnimIn(active: boolean) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setShow(true), 80);
      return () => clearTimeout(t);
    } else {
      setShow(false);
    }
  }, [active]);
  return show;
}

function useSalary(active: boolean) {
  const [vals, setVals] = useState([0, 0, 0, 0, 0]);
  const targets = [15, 28, 45, 68, 100];
  useEffect(() => {
    if (!active) { setVals([0, 0, 0, 0, 0]); return; }
    const timers = targets.map((t, i) =>
      setTimeout(() => {
        const dur = 900;
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVals(prev => { const n = [...prev]; n[i] = Math.round(ease * t); return n; });
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, i * 160)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);
  return vals;
}

function useSkills(active: boolean) {
  const targets = [95, 90, 85, 88, 80];
  const [vals, setVals] = useState(targets.map(() => 0));
  useEffect(() => {
    if (!active) { setVals(targets.map(() => 0)); return; }
    const timers = targets.map((t, i) =>
      setTimeout(() => {
        const dur = 1000;
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVals(prev => { const n = [...prev]; n[i] = Math.round(ease * t); return n; });
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);
  return vals;
}

// ─── data ───────────────────────────────────────────────────────────────────

const TOTAL = 8;

const careerSteps = [
  { years: "2026–2028", role: "Стажёр / Аналитик", org: "Банк или инвест. компания", dot: "#d1d5db" },
  { years: "2028–2030", role: "Финансовый аналитик", org: "Корпоративный сектор", dot: "#9ca3af" },
  { years: "2030–2033", role: "Старший фин. менеджер", org: "Компания ТОП-100 РФ", dot: "#4b5563" },
  { years: "2033–2036", role: "CFO / Директор", org: "Публичная компания", dot: "#111827" },
];

const incomeBars = [
  { year: "2026", val: "60", h: 15 },
  { year: "2028", val: "110", h: 28 },
  { year: "2030", val: "180", h: 45 },
  { year: "2033", val: "270", h: 68 },
  { year: "2036", val: "400+", h: 100 },
];

const skillLabels = [
  "Финансовый анализ",
  "Инвест. моделирование",
  "Управление рисками",
  "Корпоративные финансы",
  "Деловой английский",
];

const certs = [
  { name: "CFA Level III", year: "к 2031", icon: "Award" },
  { name: "ACCA / DipIFR", year: "к 2029", icon: "FileText" },
  { name: "Bloomberg BMC", year: "к 2027", icon: "TrendingUp" },
  { name: "MBA (Finance)", year: "к 2033", icon: "GraduationCap" },
];

const lifestyle = [
  { icon: "Home", title: "Недвижимость", items: ["Квартира в Москве/СПб", "Загородный дом", "Инвест. объект"] },
  { icon: "Plane", title: "Путешествия", items: ["2–3 поездки за рубеж", "Бизнес-командировки", "Образовательный туризм"] },
  { icon: "TrendingUp", title: "Инвестиции", items: ["Портфель акций и ETF", "Облигации", "Венчур в стартапы"] },
  { icon: "BookOpen", title: "Развитие", items: ["Постоянное обучение", "Фин. конференции", "Авторские статьи"] },
  { icon: "Users", title: "Нетворкинг", items: ["Деловые клубы", "Менторство", "Партнёрства"] },
  { icon: "Heart", title: "Личное", items: ["Семья", "Спорт и здоровье", "Хобби"] },
];

const conclusionRows = [
  { label: "Должность", val: "CFO / Investment Director", icon: "Briefcase" },
  { label: "Доход", val: "400 000+ руб./мес.", icon: "DollarSign" },
  { label: "Сертификации", val: "CFA III, ACCA, MBA", icon: "Award" },
  { label: "Роль", val: "Лидер, ментор, инвестор", icon: "Star" },
];

// ─── slide components ────────────────────────────────────────────────────────

function Slide0({ active }: { active: boolean }) {
  const show = useAnimIn(active);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16 relative overflow-hidden">
      {/* bg accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gray-950 z-0" />
      <div className="absolute right-1/3 top-0 w-px h-full bg-gray-200 z-0" />

      <div className="relative z-10 w-full max-w-5xl flex items-center gap-0">
        {/* left */}
        <div className="flex-1 pr-16">
          <p
            className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-8 transition-all duration-500"
            style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(16px)", transitionDelay: "0ms" }}
          >
            Факультет экономики · 1 курс · 2026
          </p>
          <h1
            className="font-cormorant text-7xl md:text-8xl font-light leading-none mb-3 transition-all duration-700"
            style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(24px)", transitionDelay: "100ms" }}
          >
            Горюнова
          </h1>
          <h1
            className="font-cormorant text-7xl md:text-8xl font-light italic leading-none mb-10 text-gray-500 transition-all duration-700"
            style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(24px)", transitionDelay: "180ms" }}
          >
            Мария
          </h1>
          <div
            className="w-16 h-0.5 bg-gray-900 mb-8 transition-all duration-700"
            style={{ opacity: show ? 1 : 0, width: show ? 64 : 0, transitionDelay: "280ms" }}
          />
          <p
            className="font-cormorant text-2xl font-light text-gray-700 italic mb-2 transition-all duration-700"
            style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(16px)", transitionDelay: "340ms" }}
          >
            Кем я вижу себя через 10 лет
          </p>
          <p
            className="text-xs tracking-[0.2em] uppercase text-gray-400 transition-all duration-700"
            style={{ opacity: show ? 1 : 0, transitionDelay: "420ms" }}
          >
            Карьерная траектория в сфере финансов
          </p>
        </div>

        {/* right dark panel */}
        <div
          className="w-72 flex flex-col gap-5 transition-all duration-700"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateX(24px)", transitionDelay: "300ms" }}
        >
          {[
            { icon: "GraduationCap", label: "Направление", val: "Финансы и кредит" },
            { icon: "Building2", label: "Факультет", val: "Факультет экономики" },
            { icon: "Calendar", label: "Курс", val: "1 курс, 2026 год" },
            { icon: "Target", label: "Горизонт", val: "10 лет — 2036 год" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-sm bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Icon name={row.icon} size={16} className="text-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{row.label}</p>
                <p className="text-white font-medium text-sm">{row.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide1({ active }: { active: boolean }) {
  const show = useAnimIn(active);
  return (
    <div className="w-full h-full flex items-center justify-center px-16 bg-gray-950">
      <div className="max-w-5xl w-full">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-6 transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transitionDelay: "0ms" }}>Видение будущего</p>
        <h2 className="font-cormorant text-6xl md:text-7xl font-light text-white leading-tight mb-4 transition-all duration-600"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transitionDelay: "80ms" }}>
          Моя цель<br /><em className="italic text-gray-400">через 10 лет</em>
        </h2>
        <div className="w-12 h-px bg-gray-600 mb-10 transition-all duration-700"
          style={{ opacity: show ? 1 : 0, transitionDelay: "160ms" }} />
        <div className="grid grid-cols-3 gap-6">
          {[
            { n: "01", title: "Позиция", desc: "Финансовый директор (CFO) или руководитель инвестиционного подразделения" },
            { n: "02", title: "Масштаб", desc: "Бюджеты свыше 1 млрд рублей, управление командой финансистов" },
            { n: "03", title: "Экспертиза", desc: "Сертификация CFA, опыт с международными активами и рынками" },
          ].map((item, i) => (
            <div key={item.n}
              className="border border-gray-800 p-7 rounded-sm hover:border-gray-600 transition-all duration-700"
              style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(28px)", transitionDelay: `${240 + i * 120}ms` }}>
              <p className="font-cormorant text-5xl font-light text-gray-700 mb-4">{item.n}</p>
              <p className="text-white font-semibold text-sm tracking-widest uppercase mb-3">{item.title}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide2({ active }: { active: boolean }) {
  const show = useAnimIn(active);
  return (
    <div className="w-full h-full flex items-center justify-center px-16">
      <div className="max-w-5xl w-full">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-5 transition-all duration-500"
          style={{ opacity: show ? 1 : 0 }}>Карьерный трек</p>
        <h2 className="font-cormorant text-6xl font-light leading-tight mb-3 transition-all duration-600"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transitionDelay: "80ms" }}>
          Карьерные <em className="italic text-gray-400">цели</em>
        </h2>
        <div className="w-12 h-px bg-gray-900 mb-10 transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transitionDelay: "160ms" }} />

        <div className="flex gap-0">
          {careerSteps.map((step, i) => (
            <div key={i}
              className="flex-1 relative transition-all duration-700"
              style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(24px)", transitionDelay: `${220 + i * 120}ms` }}>
              {/* connector line */}
              {i < careerSteps.length - 1 && (
                <div className="absolute top-3 left-1/2 w-full h-px bg-gray-200 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-start pl-0 pr-6">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 mb-5 flex-shrink-0"
                  style={{ backgroundColor: step.dot, borderColor: step.dot }} />
                <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">{step.years}</p>
                <p className="font-semibold text-gray-900 text-lg leading-tight mb-1">{step.role}</p>
                <p className="text-gray-500 text-sm">{step.org}</p>
              </div>
            </div>
          ))}
        </div>

        {/* bottom quote */}
        <div className="mt-12 border-t border-gray-100 pt-8 transition-all duration-700"
          style={{ opacity: show ? 1 : 0, transitionDelay: "700ms" }}>
          <p className="font-cormorant text-2xl italic text-gray-400">
            «Каждый следующий шаг — логичное продолжение предыдущего»
          </p>
        </div>
      </div>
    </div>
  );
}

function Slide3({ active }: { active: boolean }) {
  const show = useAnimIn(active);
  const heights = useSalary(active);
  const colors = ["#d1d5db", "#9ca3af", "#6b7280", "#374151", "#111827"];

  return (
    <div className="w-full h-full flex items-center justify-center px-16 bg-gray-50">
      <div className="max-w-5xl w-full">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-5 transition-all duration-500"
          style={{ opacity: show ? 1 : 0 }}>Финансовые показатели</p>
        <h2 className="font-cormorant text-6xl font-light leading-tight mb-3 transition-all duration-600"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transitionDelay: "80ms" }}>
          Зарплата & <em className="italic text-gray-400">доход</em>
        </h2>
        <div className="w-12 h-px bg-gray-900 mb-10 transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transitionDelay: "160ms" }} />

        <div className="grid grid-cols-2 gap-16">
          {/* bars */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-5">Рост дохода, тыс. руб./мес.</p>
            <div className="flex items-end gap-3 h-44">
              {incomeBars.map((bar, i) => (
                <div key={bar.year} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-semibold text-gray-700" style={{ opacity: heights[i] > 0 ? 1 : 0, transition: "opacity 0.4s" }}>
                    {bar.val}
                  </span>
                  <div className="w-full bg-gray-200 rounded-sm relative overflow-hidden" style={{ height: 140 }}>
                    <div className="absolute bottom-0 w-full rounded-sm transition-all duration-1000 ease-out"
                      style={{ height: `${heights[i]}%`, backgroundColor: colors[i] }} />
                  </div>
                  <span className="text-xs text-gray-400">{bar.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stats */}
          <div className="flex flex-col gap-6 justify-center">
            {[
              { label: "Целевой оклад к 2036", val: "400 000+", sub: "рублей в месяц", delay: 300 },
              { label: "Годовой бонус (KPI)", val: "до 50%", sub: "от оклада", delay: 450 },
              { label: "Инвестиционный доход", val: "20–30%", sub: "от портфеля ежегодно", delay: 600 },
            ].map((stat) => (
              <div key={stat.label}
                className="border-l-4 border-gray-900 pl-5 transition-all duration-700"
                style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateX(16px)", transitionDelay: `${stat.delay}ms` }}>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                <p className="font-cormorant text-4xl font-light text-gray-900">{stat.val}</p>
                <p className="text-sm text-gray-500">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide4({ active }: { active: boolean }) {
  const show = useAnimIn(active);
  const skillVals = useSkills(active);

  return (
    <div className="w-full h-full flex items-center justify-center px-16">
      <div className="max-w-5xl w-full">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-5 transition-all duration-500"
          style={{ opacity: show ? 1 : 0 }}>Компетенции</p>
        <h2 className="font-cormorant text-6xl font-light leading-tight mb-3 transition-all duration-600"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transitionDelay: "80ms" }}>
          Ключевые <em className="italic text-gray-400">навыки</em>
        </h2>
        <div className="w-12 h-px bg-gray-900 mb-10 transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transitionDelay: "160ms" }} />

        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-5">
            {skillLabels.map((skill, i) => (
              <div key={skill}
                className="transition-all duration-700"
                style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateX(-12px)", transitionDelay: `${220 + i * 100}ms` }}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{skill}</span>
                  <span className="text-sm text-gray-400 tabular-nums">{skillVals[i]}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skillVals[i]}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-5 transition-all duration-500"
              style={{ opacity: show ? 1 : 0, transitionDelay: "220ms" }}>Целевые сертификации</p>
            <div className="space-y-3">
              {certs.map((c, i) => (
                <div key={c.name}
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-sm hover:bg-gray-50 transition-all duration-700"
                  style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateX(12px)", transitionDelay: `${300 + i * 100}ms` }}>
                  <Icon name={c.icon} size={18} className="text-gray-400 flex-shrink-0" />
                  <p className="flex-1 font-medium text-gray-900 text-sm">{c.name}</p>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-sm">{c.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide5({ active }: { active: boolean }) {
  const show = useAnimIn(active);
  return (
    <div className="w-full h-full flex items-center justify-center px-16 bg-gray-950">
      <div className="max-w-5xl w-full">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-5 transition-all duration-500"
          style={{ opacity: show ? 1 : 0 }}>Стиль жизни</p>
        <h2 className="font-cormorant text-6xl font-light text-white leading-tight mb-3 transition-all duration-600"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transitionDelay: "80ms" }}>
          Образ <em className="italic text-gray-400">жизни</em>
        </h2>
        <div className="w-12 h-px bg-gray-700 mb-8 transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transitionDelay: "160ms" }} />
        <div className="grid grid-cols-3 gap-4">
          {lifestyle.map((block, i) => (
            <div key={block.title}
              className="p-5 border border-gray-800 rounded-sm hover:border-gray-600 transition-all duration-700"
              style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transitionDelay: `${220 + i * 80}ms` }}>
              <div className="flex items-center gap-3 mb-3">
                <Icon name={block.icon} size={16} className="text-gray-400" />
                <p className="text-white font-semibold text-xs tracking-widest uppercase">{block.title}</p>
              </div>
              <ul className="space-y-1.5">
                {block.items.map(item => (
                  <li key={item} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="mt-[7px] w-1 h-1 bg-gray-600 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide6Sport({ active }: { active: boolean }) {
  const show = useAnimIn(active);
  const stats = [
    { value: "11", label: "лет лёгкой атлетики", icon: "Timer" },
    { value: "30+", label: "медалей за соревнования", icon: "Medal" },
    { value: "II", label: "взрослый разряд", icon: "Star" },
  ];
  const achievements = [
    { title: "Победительница городских соревнований", icon: "Trophy", tag: "Лёгкая атлетика" },
    { title: "Победительница областных соревнований", icon: "Trophy", tag: "Лёгкая атлетика" },
    { title: "Волейбол", icon: "Activity", tag: "Командный спорт" },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center px-16 bg-gray-950">
      <div className="max-w-5xl w-full">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-5 transition-all duration-500"
          style={{ opacity: show ? 1 : 0 }}>Личные достижения</p>
        <h2 className="font-cormorant text-6xl font-light text-white leading-tight mb-3 transition-all duration-600"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transitionDelay: "80ms" }}>
          Спорт & <em className="italic text-gray-400">достижения</em>
        </h2>
        <div className="w-12 h-px bg-gray-700 mb-10 transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transitionDelay: "160ms" }} />

        <div className="grid grid-cols-2 gap-12">
          {/* left: big stats */}
          <div className="flex flex-col gap-6">
            {stats.map((s, i) => (
              <div key={s.label}
                className="flex items-center gap-6 transition-all duration-700"
                style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateX(-20px)", transitionDelay: `${220 + i * 120}ms` }}>
                <div className="w-14 h-14 rounded-sm bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon} size={22} className="text-gray-300" />
                </div>
                <div>
                  <p className="font-cormorant text-5xl font-light text-white leading-none">{s.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* right: achievements */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 transition-all duration-500"
              style={{ opacity: show ? 1 : 0, transitionDelay: "220ms" }}>Достижения</p>
            {achievements.map((a, i) => (
              <div key={a.title}
                className="flex items-start gap-4 p-5 border border-gray-800 rounded-sm hover:border-gray-600 transition-all duration-700"
                style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateX(20px)", transitionDelay: `${300 + i * 120}ms` }}>
                <div className="w-9 h-9 rounded-sm bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={a.icon} size={16} className="text-gray-300" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm leading-snug">{a.title}</p>
                  <span className="inline-block mt-2 text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-sm">{a.tag}</span>
                </div>
              </div>
            ))}

            {/* quote */}
            <p className="font-cormorant text-xl italic text-gray-500 mt-4 transition-all duration-700"
              style={{ opacity: show ? 1 : 0, transitionDelay: "680ms" }}>
              «Дисциплина в спорте — фундамент дисциплины в карьере»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide6({ active }: { active: boolean }) {
  const show = useAnimIn(active);
  return (
    <div className="w-full h-full flex items-center justify-center px-16">
      <div className="max-w-5xl w-full">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-5 transition-all duration-500"
          style={{ opacity: show ? 1 : 0 }}>Итог</p>
        <h2 className="font-cormorant text-6xl font-light leading-tight mb-3 transition-all duration-600"
          style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transitionDelay: "80ms" }}>
          Заключение
        </h2>
        <div className="w-12 h-px bg-gray-900 mb-10 transition-all duration-500"
          style={{ opacity: show ? 1 : 0, transitionDelay: "160ms" }} />

        <div className="grid grid-cols-2 gap-16">
          <div>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 transition-all duration-700"
              style={{ opacity: show ? 1 : 0, transitionDelay: "240ms" }}>
              Через 10 лет я вижу себя <strong className="text-gray-900">востребованным финансовым профессионалом</strong> —
              человеком, принимающим стратегические решения и создающим реальную ценность для бизнеса.
            </p>
            <p className="font-cormorant text-2xl italic text-gray-400 leading-relaxed transition-all duration-700"
              style={{ opacity: show ? 1 : 0, transitionDelay: "360ms" }}>
              «Финансы — это язык бизнеса.<br />Я учу этот язык сегодня.»
            </p>
          </div>

          <div className="space-y-4">
            {conclusionRows.map((row, i) => (
              <div key={row.label}
                className="flex items-center gap-5 py-4 border-b border-gray-100 transition-all duration-700"
                style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateX(16px)", transitionDelay: `${300 + i * 100}ms` }}>
                <div className="w-9 h-9 rounded-sm bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon name={row.icon} size={16} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{row.label}</p>
                  <p className="font-semibold text-gray-900">{row.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* timeline */}
        <div className="mt-10 pt-8 border-t border-gray-100 transition-all duration-700"
          style={{ opacity: show ? 1 : 0, transitionDelay: "700ms" }}>
          <div className="relative flex items-start">
            <div className="absolute top-2 left-0 right-0 h-px bg-gray-200" />
            {["2026\nСтарт", "2028\nСтажировка", "2030\nАналитик", "2033\nМенеджер", "2036\nCFO"].map((label, i) => (
              <div key={label} className="flex-1 flex flex-col items-center relative">
                <div className="w-4 h-4 rounded-full border-2 border-gray-900 z-10"
                  style={{ background: i === 4 ? "#111" : "white" }} />
                <div className="mt-3 text-center">
                  {label.split("\n").map((l, j) => (
                    <p key={j} className={`text-xs leading-4 ${j === 0 ? "font-semibold text-gray-700" : "text-gray-400"}`}>{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── main ────────────────────────────────────────────────────────────────────

const slideComponents = [Slide0, Slide1, Slide2, Slide3, Slide4, Slide5, Slide6Sport, Slide6];
const slideLabels = ["Титул", "Цель", "Карьера", "Доход", "Навыки", "Жизнь", "Спорт", "Итог"];
const slideBg = ["white", "dark", "white", "light", "white", "dark", "dark", "white"];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [transitioning, setTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((target: number) => {
    if (transitioning || target === current || target < 0 || target >= TOTAL) return;
    setDir(target > current ? "next" : "prev");
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(target);
      setTransitioning(false);
    }, 320);
  }, [current, transitioning]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") go(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) go(dx > 0 ? current + 1 : current - 1);
    touchStartX.current = null;
  };

  const isDark = slideBg[current] === "dark";

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* slide area */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? (dir === "next" ? "translateY(12px)" : "translateY(-12px)") : "none", transition: "opacity 0.32s ease, transform 0.32s ease" }}
      >
        {slideComponents.map((SlideComp, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{ pointerEvents: i === current ? "auto" : "none", opacity: i === current ? 1 : 0 }}
          >
            <SlideComp active={i === current && !transitioning} />
          </div>
        ))}
      </div>

      {/* top bar */}
      <div className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-colors duration-500 ${isDark ? "border-gray-800" : "border-gray-100"} border-b`}
        style={{ background: isDark ? "rgba(3,7,18,0.85)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}>
        <span className={`font-cormorant text-lg font-light tracking-widest uppercase transition-colors duration-500 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          Финансы & Кредит
        </span>
        <div className="flex items-center gap-1">
          {slideLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`px-3 py-1.5 text-xs tracking-widest uppercase rounded-sm transition-all duration-300 font-medium ${
                i === current
                  ? isDark ? "bg-white/10 text-white" : "bg-gray-900 text-white"
                  : isDark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className={`font-cormorant text-lg tabular-nums transition-colors duration-500 ${isDark ? "text-gray-600" : "text-gray-300"}`}>
          {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {/* side arrows */}
      <button
        onClick={() => go(current - 1)}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
          current === 0 ? "opacity-0 pointer-events-none" : isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={() => go(current + 1)}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
          current === TOTAL - 1 ? "opacity-0 pointer-events-none" : isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        <Icon name="ChevronRight" size={20} />
      </button>

      {/* bottom dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? 24 : 6,
              height: 6,
              background: i === current
                ? isDark ? "white" : "#111"
                : isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>

      {/* keyboard hint */}
      <div className={`absolute bottom-6 right-8 z-50 text-xs transition-colors duration-500 ${isDark ? "text-gray-700" : "text-gray-300"}`}>
        ← → или пробел
      </div>
    </div>
  );
}