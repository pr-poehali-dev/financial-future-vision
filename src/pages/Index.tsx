import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  { id: 0, label: "Обо мне" },
  { id: 1, label: "Моя цель" },
  { id: 2, label: "Карьера" },
  { id: 3, label: "Зарплата" },
  { id: 4, label: "Навыки" },
  { id: 5, label: "Образ жизни" },
  { id: 6, label: "Заключение" },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function IncomeBar({ year, val, h, colorIdx }: { year: string; val: string; h: number; colorIdx: number }) {
  const { ref, inView } = useInView(0.2);
  const colors = ["#c8cdd4", "#9aa0aa", "#6d7580", "#424850", "#111111"];
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <span className="text-xs font-semibold text-gray-700" style={{ opacity: inView ? 1 : 0, transition: `opacity 0.5s ${colorIdx * 150 + 800}ms` }}>
        {val}
      </span>
      <div className="w-full bg-gray-200 rounded-sm relative overflow-hidden" style={{ height: "160px" }}>
        <div
          ref={ref}
          className="absolute bottom-0 w-full rounded-sm"
          style={{
            height: inView ? `${h}%` : "0%",
            backgroundColor: colors[colorIdx],
            transition: `height 1s ease-out ${colorIdx * 150}ms`,
          }}
        />
      </div>
      <span className="text-xs text-gray-400">{year}</span>
    </div>
  );
}

function IncomeChartBars() {
  const bars = [
    { year: "2026", h: 15, val: "60" },
    { year: "2028", h: 28, val: "110" },
    { year: "2030", h: 45, val: "180" },
    { year: "2033", h: 68, val: "270" },
    { year: "2036", h: 100, val: "400+" },
  ];
  return (
    <div className="flex items-end gap-3 h-48">
      {bars.map((bar, i) => (
        <IncomeBar key={bar.year} year={bar.year} val={bar.val} h={bar.h} colorIdx={i} />
      ))}
    </div>
  );
}

function SkillBar({ skill, pct }: { skill: string; pct: number }) {
  const { ref, inView } = useInView(0.2);
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{skill}</span>
        <span className="text-sm text-gray-400">{pct}%</span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          ref={ref}
          className="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-out"
          style={{ width: inView ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function TimelinePoint({ label, idx }: { label: string; idx: number }) {
  const { ref, inView } = useInView(0.2);
  const lines = label.split("\n");
  return (
    <div
      ref={ref}
      className="absolute top-0 flex flex-col items-center"
      style={{ left: `${idx * 25}%`, transform: "translateX(-50%)" }}
    >
      <div
        className="w-3 h-3 rounded-full border-2 border-gray-900 -mt-1.5 transition-all duration-500"
        style={{ background: inView && idx === 4 ? "#111" : "white", transitionDelay: `${idx * 200}ms` }}
      />
      <div className="mt-3 text-center transition-all duration-500" style={{ opacity: inView ? 1 : 0, transitionDelay: `${idx * 200 + 100}ms` }}>
        {lines.map((line, i) => <p key={i} className="text-xs text-gray-500 leading-4">{line}</p>)}
      </div>
    </div>
  );
}

function AnimatedNumber({ value, suffix = "", delay = 0 }: { value: string; suffix?: string; delay?: number }) {
  const { ref, inView } = useInView(0.3);
  return (
    <span
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transitionDelay: `${delay}ms`,
        display: "inline-block",
      }}
    >
      {value}{suffix}
    </span>
  );
}

function SlideWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)" }}
    >
      {children}
    </div>
  );
}

function SlideNumber({ n }: { n: number }) {
  return (
    <div className="font-cormorant text-[120px] leading-none font-light text-gray-100 select-none absolute -top-6 -left-4 z-0">
      {String(n).padStart(2, "0")}
    </div>
  );
}

function Divider() {
  return <div className="w-12 h-px bg-gray-900 my-6" />;
}

export default function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sectionRefs.current.findIndex((r) => r === e.target);
            if (idx !== -1) setActiveSlide(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionRefs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-golos bg-white text-gray-900 min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-white/90 backdrop-blur border-b border-gray-100">
        <span className="font-cormorant text-xl font-light tracking-widest uppercase text-gray-400">
          Финансы & Кредит
        </span>
        <div className="hidden md:flex gap-6">
          {slides.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`text-xs tracking-widest uppercase transition-colors font-golos font-medium ${
                activeSlide === s.id ? "text-gray-900 border-b border-gray-900" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* SLIDE 0 — ОБО МНЕ */}
      <section
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="min-h-screen flex items-center px-8 md:px-20 pt-20"
      >
        <SlideWrapper className="max-w-4xl w-full">
          <div className="relative">
            <SlideNumber n={1} />
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Факультет экономики · Направление «Финансы и кредит» · 1 курс</p>
              <h1 className="font-cormorant text-6xl md:text-8xl font-light leading-tight mb-4">
                Горюнова<br />
                <em className="italic">Мария</em>
              </h1>
              <p className="font-cormorant text-2xl md:text-3xl font-light text-gray-500 italic mb-2">
                Кем я вижу себя через 10 лет
              </p>
              <p className="text-sm text-gray-400 tracking-widest uppercase mb-2">Карьерная траектория в сфере финансов</p>
              <Divider />
              <div className="grid md:grid-cols-2 gap-10 mt-8">
                <div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Я — студентка первого курса направления <strong className="text-gray-900">«Финансы и кредит»</strong>.
                    Уже сейчас формирую профессиональный путь: изучаю финансовые рынки, банковское дело и инвестиции.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg mt-4">
                    Через 10 лет я вижу себя востребованным специалистом финансовой сферы с чёткими карьерными достижениями и устойчивым профессиональным статусом.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: "User", label: "Автор", val: "Горюнова Мария" },
                    { icon: "GraduationCap", label: "Направление", val: "Финансы и кредит" },
                    { icon: "Calendar", label: "Курс", val: "1 курс, 2026 год" },
                    { icon: "Target", label: "Горизонт", val: "10 лет — 2036 год" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4 p-4 border border-gray-100 rounded-sm">
                      <Icon name={item.icon} size={18} className="text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                        <p className="font-medium text-gray-900">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SlideWrapper>
      </section>

      {/* SLIDE 1 — МОЯ ЦЕЛЬ */}
      <section
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="min-h-screen flex items-center px-8 md:px-20 bg-gray-950 text-white"
      >
        <SlideWrapper className="max-w-4xl w-full">
          <div className="relative">
            <div className="font-cormorant text-[120px] leading-none font-light text-gray-800 select-none absolute -top-6 -left-4 z-0">
              02
            </div>
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">Видение будущего</p>
              <h2 className="font-cormorant text-6xl md:text-7xl font-light leading-tight mb-8 text-white">
                Моя цель<br />
                <em className="italic text-gray-400">через 10 лет</em>
              </h2>
              <div className="w-12 h-px bg-white my-6" />
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {[
                  { num: "01", title: "Позиция", desc: "Финансовый директор (CFO) или руководитель инвестиционного подразделения крупной компании" },
                  { num: "02", title: "Масштаб", desc: "Работа с бюджетами свыше 1 млрд рублей, управление командой финансистов" },
                  { num: "03", title: "Экспертиза", desc: "Международная сертификация CFA, опыт работы с иностранными активами и рынками" },
                ].map((item) => (
                  <div key={item.num} className="border border-gray-800 p-6 rounded-sm hover:border-gray-600 transition-colors">
                    <p className="font-cormorant text-4xl font-light text-gray-700 mb-3">{item.num}</p>
                    <p className="font-semibold text-white mb-2 text-sm tracking-wider uppercase">{item.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideWrapper>
      </section>

      {/* SLIDE 2 — КАРЬЕРНЫЕ ЦЕЛИ */}
      <section
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="min-h-screen flex items-center px-8 md:px-20 py-24"
      >
        <SlideWrapper className="max-w-4xl w-full">
          <div className="relative">
            <SlideNumber n={3} />
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Карьерный трек</p>
              <h2 className="font-cormorant text-6xl md:text-7xl font-light leading-tight mb-2">
                Карьерные<br />
                <em className="italic">цели</em>
              </h2>
              <Divider />
              <div className="mt-6 space-y-0">
                {[
                  { year: "2026–2028", role: "Стажёр / Младший аналитик", org: "Банк или инвестиционная компания", color: "bg-gray-200" },
                  { year: "2028–2030", role: "Финансовый аналитик", org: "Корпоративный сектор или консалтинг", color: "bg-gray-300" },
                  { year: "2030–2033", role: "Старший финансовый менеджер", org: "Крупная компания (ТОП-100 РФ)", color: "bg-gray-700" },
                  { year: "2033–2036", role: "CFO / Директор по инвестициям", org: "Публичная компания или холдинг", color: "bg-gray-900" },
                ].map((step, i) => (
                  <div key={i} className="flex items-stretch gap-0 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full mt-5 ${step.color} flex-shrink-0`} />
                      {i < 3 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                    </div>
                    <div className="ml-6 pb-8 flex-1">
                      <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">{step.year}</p>
                      <p className="font-semibold text-gray-900 text-lg">{step.role}</p>
                      <p className="text-gray-500 text-sm">{step.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideWrapper>
      </section>

      {/* SLIDE 3 — ЗАРПЛАТА */}
      <section
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="min-h-screen flex items-center px-8 md:px-20 py-24 bg-gray-50"
      >
        <SlideWrapper className="max-w-5xl w-full">
          <div className="relative">
            <div className="font-cormorant text-[120px] leading-none font-light text-gray-200 select-none absolute -top-6 -left-4 z-0">
              04
            </div>
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Финансовые показатели</p>
              <h2 className="font-cormorant text-6xl md:text-7xl font-light leading-tight mb-2">
                Зарплата &<br />
                <em className="italic">компенсации</em>
              </h2>
              <Divider />
              <div className="grid md:grid-cols-2 gap-12 mt-8">
                {/* BAR CHART */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Рост дохода (тыс. руб./мес.)</p>
                  <IncomeChartBars />
                </div>

                {/* STATS */}
                <div className="flex flex-col gap-6 justify-center">
                  {[
                    { label: "Целевой оклад к 2036 году", value: "400 000+", sub: "рублей в месяц", delay: 0 },
                    { label: "Годовой бонус (KPI)", value: "до 50%", sub: "от оклада", delay: 150 },
                    { label: "Инвестиционный доход", value: "20–30%", sub: "от портфеля ежегодно", delay: 300 },
                  ].map((stat) => (
                    <div key={stat.label} className="border-l-2 border-gray-900 pl-5">
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                      <p className="font-cormorant text-4xl font-light text-gray-900">
                        <AnimatedNumber value={stat.value} delay={stat.delay} />
                      </p>
                      <p className="text-sm text-gray-500">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SlideWrapper>
      </section>

      {/* SLIDE 4 — КЛЮЧЕВЫЕ НАВЫКИ */}
      <section
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="min-h-screen flex items-center px-8 md:px-20 py-24"
      >
        <SlideWrapper className="max-w-4xl w-full">
          <div className="relative">
            <SlideNumber n={5} />
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Компетенции</p>
              <h2 className="font-cormorant text-6xl md:text-7xl font-light leading-tight mb-2">
                Ключевые<br />
                <em className="italic">навыки</em>
              </h2>
              <Divider />
              <div className="grid md:grid-cols-2 gap-10 mt-8">
                {/* Skill bars */}
                <div className="space-y-6">
                  {[
                    { skill: "Финансовый анализ", pct: 95 },
                    { skill: "Инвестиционное моделирование", pct: 90 },
                    { skill: "Управление рисками", pct: 85 },
                    { skill: "Корпоративные финансы", pct: 88 },
                    { skill: "Английский язык (деловой)", pct: 80 },
                  ].map((s) => (
                    <SkillBar key={s.skill} skill={s.skill} pct={s.pct} />
                  ))}
                </div>

                {/* Certs */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-5">Целевые сертификации</p>
                  <div className="space-y-3">
                    {[
                      { cert: "CFA Level III", icon: "Award", year: "к 2031" },
                      { cert: "ACCA / DipIFR", icon: "FileText", year: "к 2029" },
                      { cert: "Bloomberg Market Concepts", icon: "TrendingUp", year: "к 2027" },
                      { cert: "MBA (Finance)", icon: "GraduationCap", year: "к 2033" },
                    ].map((c) => (
                      <div key={c.cert} className="flex items-center gap-4 p-4 border border-gray-100 rounded-sm hover:bg-gray-50 transition-colors">
                        <Icon name={c.icon} size={18} className="text-gray-400 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{c.cert}</p>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-sm">{c.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlideWrapper>
      </section>

      {/* SLIDE 5 — ОБРАЗ ЖИЗНИ */}
      <section
        ref={(el) => { sectionRefs.current[5] = el; }}
        className="min-h-screen flex items-center px-8 md:px-20 py-24 bg-gray-950 text-white"
      >
        <SlideWrapper className="max-w-5xl w-full">
          <div className="relative">
            <div className="font-cormorant text-[120px] leading-none font-light text-gray-800 select-none absolute -top-6 -left-4 z-0">
              06
            </div>
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">Стиль жизни</p>
              <h2 className="font-cormorant text-6xl md:text-7xl font-light leading-tight mb-2 text-white">
                Мой образ<br />
                <em className="italic text-gray-400">жизни</em>
              </h2>
              <div className="w-12 h-px bg-white my-6" />
              <div className="grid md:grid-cols-3 gap-5 mt-8">
                {[
                  {
                    icon: "Home",
                    title: "Недвижимость",
                    items: ["Собственная квартира в Москве или СПб", "Загородный дом / дача", "Инвестиционная недвижимость"],
                  },
                  {
                    icon: "Plane",
                    title: "Путешествия",
                    items: ["2–3 поездки за рубеж в год", "Деловые командировки в Европу", "Культурный и образовательный туризм"],
                  },
                  {
                    icon: "Heart",
                    title: "Личное",
                    items: ["Семья и стабильный быт", "Здоровый образ жизни и спорт", "Менторство молодых финансистов"],
                  },
                  {
                    icon: "TrendingUp",
                    title: "Инвестиции",
                    items: ["Диверсифицированный портфель", "Акции, облигации, ETF", "Венчурные вложения в стартапы"],
                  },
                  {
                    icon: "BookOpen",
                    title: "Развитие",
                    items: ["Постоянное обучение", "Участие в финансовых конференциях", "Написание статей и колонок"],
                  },
                  {
                    icon: "Users",
                    title: "Нетворкинг",
                    items: ["Профессиональное сообщество", "Членство в деловых клубах", "Партнёрства с экспертами"],
                  },
                ].map((block) => (
                  <div key={block.title} className="p-5 border border-gray-800 rounded-sm hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name={block.icon} size={18} className="text-gray-400" />
                      <p className="font-semibold text-white text-sm tracking-wide uppercase">{block.title}</p>
                    </div>
                    <ul className="space-y-1">
                      {block.items.map((item) => (
                        <li key={item} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="mt-2 w-1 h-1 bg-gray-600 rounded-full flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideWrapper>
      </section>

      {/* SLIDE 6 — ЗАКЛЮЧЕНИЕ */}
      <section
        ref={(el) => { sectionRefs.current[6] = el; }}
        className="min-h-screen flex items-center px-8 md:px-20 py-24"
      >
        <SlideWrapper className="max-w-4xl w-full">
          <div className="relative">
            <SlideNumber n={7} />
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Итог</p>
              <h2 className="font-cormorant text-6xl md:text-7xl font-light leading-tight mb-2">
                Заклю<br />
                <em className="italic">чение</em>
              </h2>
              <Divider />
              <div className="grid md:grid-cols-2 gap-12 mt-8">
                <div>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Через 10 лет я вижу себя <strong className="text-gray-900">востребованным финансовым профессионалом</strong> — 
                    человеком, который принимает стратегические решения, управляет крупными активами и создаёт реальную ценность для бизнеса.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Путь к этому начинается <strong className="text-gray-900">сегодня</strong>: с первого курса, первых знаний и первых профессиональных шагов.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Целевая должность", val: "CFO / Investment Director", icon: "Briefcase" },
                    { label: "Доход", val: "400 000+ руб./мес.", icon: "DollarSign" },
                    { label: "Сертификации", val: "CFA III, ACCA, MBA", icon: "Award" },
                    { label: "Статус", val: "Лидер, ментор, инвестор", icon: "Star" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-4 py-3 border-b border-gray-100">
                      <Icon name={row.icon} size={16} className="text-gray-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{row.label}</p>
                        <p className="font-semibold text-gray-900">{row.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROGRESS LINE */}
              <div className="mt-16">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Путь от сейчас до цели</p>
                <div className="relative">
                  <div className="h-px bg-gray-200 w-full" />
                  {["2026\nСтарт", "2028\nСтажировка", "2030\nАналитик", "2033\nМенеджер", "2036\nCFO"].map((label, i) => (
                    <TimelinePoint key={label} label={label} idx={i} />
                  ))}
                </div>
              </div>

              <p className="mt-24 font-cormorant text-3xl italic text-gray-400 text-center">
                «Финансы — это язык бизнеса. Я учу этот язык сегодня.»
              </p>
            </div>
          </div>
        </SlideWrapper>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-8 md:px-20 border-t border-gray-100 flex justify-between items-center">
        <span className="font-cormorant text-lg font-light text-gray-400">2026–2036</span>
        <span className="text-xs text-gray-300 tracking-widest uppercase">Факультет экономики · Финансы и кредит</span>
      </footer>
    </div>
  );
}