import type { ResultIconName, TopicIconName } from '../components/icons';

export interface Course {
    id: number;
    name: string;
    platform: string;
    duration: string;
    lectures: string;
    control: string;
    link: string;
}

export interface DaySchedule {
    day: string;
    date: string;
    time: string;
    course: string;
    content: string;
    practice: string;
    result: string;
    resultIcon?: ResultIconName;
}

export interface WeekSchedule {
    weekNumber: number;
    title: string;
    dateRange: string;
    icon: TopicIconName;
    track: string;
    days: DaySchedule[];
}

export interface Milestone {
    date: string;
    description: string;
    icon: TopicIconName;
}

export interface TimeRule {
    rule: string;
    format: string;
    reason: string;
}

export const courses: Course[] = [
    { id: 1, name: 'Claude Code 101', platform: 'Skilljar', duration: '1.5 ч', lectures: '12 лекций', control: 'quiz + сертификат', link: 'anthropic.skilljar.com' },
    { id: 2, name: 'Claude Code in Action', platform: 'Skilljar', duration: '1 ч', lectures: '15 лекций', control: 'quiz + сертификат', link: 'anthropic.skilljar.com' },
    { id: 3, name: 'Building with the Claude API', platform: 'Skilljar', duration: '8.1 ч', lectures: '84 лекции', control: '10 quizzes + сертификат', link: 'anthropic.skilljar.com' },
    { id: 4, name: 'AI Fluency for Small Businesses', platform: 'Skilljar', duration: '0.9 ч', lectures: '9 лекций', control: 'quiz + сертификат', link: 'anthropic.skilljar.com' },
    { id: 5, name: 'Introduction to MCP', platform: 'Skilljar', duration: '1 ч', lectures: '16 лекций', control: 'quiz + сертификат', link: 'anthropic.skilljar.com' },
    { id: 6, name: 'MCP: Advanced Topics', platform: 'Skilljar', duration: '1.1 ч', lectures: '15 лекций', control: '2 quizzes + сертификат', link: 'anthropic.skilljar.com' },
];

export const timeRules: TimeRule[] = [
    { rule: 'Фикс-слот', format: 'Пн–Пт 19:00–20:30', reason: 'Мозг привыкает к ритму' },
    { rule: 'Помодоро', format: '50 мин / 10 мин отдых', reason: 'Концентрация без выгорания' },
    { rule: 'Теория → практика', format: '+40 мин после видео', reason: '70% забывается за сутки' },
    { rule: 'Deep work суббота', format: '11:00–14:00, без телефона', reason: 'Сложные задачи = поток' },
    { rule: 'Воскресенье — отдых', format: 'Без кода и курсов', reason: 'Восстановление важнее' },
    { rule: 'Пятница-ревью', format: '30 мин рефлексия', reason: 'План живой, не догма' },
    { rule: 'Пропуск → сдвиг', format: 'Buffer — воскресенье', reason: 'Система не ломается' },
];

export const milestones: Milestone[] = [
    { date: '30.08', description: 'CLAUDE.md + skills во всех репозиториях', icon: 'lightning' },
    { date: '13.09', description: 'weightlift-platform на Claude API (Vision + Batch)', icon: 'plugs' },
    { date: '20.09', description: 'Первая рекламная кампания запущена', icon: 'fire' },
    { date: '04.10', description: 'Клиенты + 6 сертификатов + MCP-экосистема', icon: 'trophy' },
];

export const weeks: WeekSchedule[] = [
    {
        weekNumber: 1,
        title: 'Claude Code — ускорение разработки',
        dateRange: '24–30.08',
        icon: 'lightning',
        track: 'Claude Code',
        days: [
            { day: 'Пн', date: '24.08', time: '19:00–20:30', course: 'Claude Code 101', content: 'Лекции 1–6: установка, workflow', practice: 'Установить Claude Code, skill-deck', result: 'Рабочая установка' },
            { day: 'Вт', date: '25.08', time: '19:00–20:30', course: 'Claude Code 101', content: 'Лекции 7–12 + quiz', practice: 'Написать CLAUDE.md для skill-deck', result: 'Сертификат 1', resultIcon: 'cert' },
            { day: 'Ср', date: '26.08', time: '19:00–20:30', course: 'Code in Action', content: 'Лекции 1–8: сессии, steering', practice: 'Рефакторинг Playwright-тестов', result: '—' },
            { day: 'Чт', date: '27.08', time: '19:00–20:30', course: 'Code in Action', content: 'Лекции 9–15 + quiz', practice: 'Доделать тесты + CI-пайплайн', result: 'Тесты зелёные', resultIcon: 'check' },
            { day: 'Пт', date: '28.08', time: '19:00–20:00', course: 'Ревью недели', content: '—', practice: 'CLAUDE.md для weightlift-platform', result: '2 файла контекста' },
            { day: 'Сб', date: '29.08', time: '11:00–14:00', course: 'Deep work', content: 'Субагенты и skills', practice: 'Создать skill для миграций БД', result: 'Рабочий skill', resultIcon: 'star' },
            { day: 'Вс', date: '30.08', time: 'Отдых', course: '—', content: '—', practice: '—', result: 'Восстановление', resultIcon: 'rest' },
        ],
    },
    {
        weekNumber: 2,
        title: 'Claude API — замена OpenRouter',
        dateRange: '31.08–06.09',
        icon: 'plugs',
        track: 'Claude API',
        days: [
            { day: 'Пн', date: '31.08', time: '19:00–20:30', course: 'Building API', content: 'Лекции 1–12: первый вызов', practice: 'Заменить вызов OpenRouter', result: 'API-ключ работает', resultIcon: 'check' },
            { day: 'Вт', date: '01.09', time: '19:00–20:30', course: 'Building API', content: 'Лекции 13–24: параметры, токены', practice: 'Настроить выбор модели и лимиты', result: 'Конфиг готов' },
            { day: 'Ср', date: '02.09', time: '19:00–20:30', course: 'Building API', content: 'Лекции 25–36: structured outputs', practice: 'Структурированные рекомендации', result: 'JSON-схема', resultIcon: 'check' },
            { day: 'Чт', date: '03.09', time: '19:00–20:30', course: 'Building API', content: 'Лекции 37–48: tool use', practice: 'Tools для дневника тренировок', result: 'ИИ пишет в БД', resultIcon: 'star' },
            { day: 'Пт', date: '04.09', time: '19:00–20:00', course: 'Ревью + quiz', content: 'Закрепление', practice: '—', result: 'Quizzes пройдены', resultIcon: 'check' },
            { day: 'Сб', date: '05.09', time: '11:00–14:00', course: 'Deep work', content: 'Полная миграция', practice: 'Ассистент полностью на Claude', result: 'OpenRouter отключён', resultIcon: 'star' },
            { day: 'Вс', date: '06.09', time: 'Отдых', course: '—', content: '—', practice: '—', result: 'Восстановление', resultIcon: 'rest' },
        ],
    },
    {
        weekNumber: 3,
        title: 'Claude API — Vision, Batch, агенты',
        dateRange: '07–13.09',
        icon: 'eye',
        track: 'Claude API Advanced',
        days: [
            { day: 'Пн', date: '07.09', time: '19:00–20:30', course: 'Building API', content: 'Лекции 49–60: Vision', practice: 'Анализ фото техники упражнений', result: 'Vision-эндпоинт', resultIcon: 'check' },
            { day: 'Вт', date: '08.09', time: '19:00–20:30', course: 'Building API', content: 'Лекции 61–72: Batch API', practice: 'Очередь SEO-описаний', result: 'Batch-скрипт', resultIcon: 'check' },
            { day: 'Ср', date: '09.09', time: '19:00–20:30', course: 'Building API', content: 'Лекции 73–84 + quiz', practice: 'Сложная логика планов', result: 'Сертификат API', resultIcon: 'cert' },
            { day: 'Чт', date: '10.09', time: '19:00–20:30', course: 'Практика Vision', content: 'Разбор скриншотов', practice: 'DaVinci таймлайны', result: 'Кейс портфолио' },
            { day: 'Пт', date: '11.09', time: '19:00–20:00', course: 'Ревью', content: '—', practice: '—', result: '—' },
            { day: 'Сб', date: '12.09', time: '11:00–14:00', course: 'Deep work: Batch', content: '50 SEO-статей', practice: 'skill-deck контент-база', result: 'База готова', resultIcon: 'star' },
            { day: 'Вс', date: '13.09', time: 'Отдых', course: '—', content: '—', practice: '—', result: 'Восстановление', resultIcon: 'rest' },
        ],
    },
    {
        weekNumber: 4,
        title: 'Маркетинг и продажи',
        dateRange: '14–20.09',
        icon: 'fire',
        track: 'Business',
        days: [
            { day: 'Пн', date: '14.09', time: '19:00–20:30', course: 'AI Fluency', content: 'Лекции 1–5', practice: 'Конспект под athome', result: '—' },
            { day: 'Вт', date: '15.09', time: '19:00–20:30', course: 'AI Fluency', content: 'Лекции 6–9 + quiz', practice: '—', result: 'Бизнес-сертификат', resultIcon: 'cert' },
            { day: 'Ср', date: '16.09', time: '19:00–20:30', course: 'Практика', content: 'CustDev-анализ ЦА', practice: 'athome через Claude', result: '3 сегмента ЦА', resultIcon: 'check' },
            { day: 'Чт', date: '17.09', time: '19:00–20:30', course: 'Практика', content: '20 креативов + email', practice: 'Рекламная воронка', result: 'Воронка v1', resultIcon: 'star' },
            { day: 'Пт', date: '18.09', time: '19:00–20:00', course: 'Практика', content: 'Контент-план 30 дней', practice: 'kk публикации', result: 'План готов' },
            { day: 'Сб', date: '19.09', time: '11:00–14:00', course: 'Deep work', content: 'Лендинг + реклама', practice: 'Запуск кампании', result: 'Кампания LIVE', resultIcon: 'star' },
            { day: 'Вс', date: '20.09', time: 'Отдых', course: '—', content: '—', practice: '—', result: 'Восстановление', resultIcon: 'rest' },
        ],
    },
    {
        weekNumber: 5,
        title: 'MCP — связываем всё в экосистему',
        dateRange: '21–27.09',
        icon: 'puzzle',
        track: 'MCP',
        days: [
            { day: 'Пн', date: '21.09', time: '19:00–20:30', course: 'Intro to MCP', content: 'Лекции 1–8', practice: 'MCP-инфраструктура', result: 'SDK работает', resultIcon: 'check' },
            { day: 'Вт', date: '22.09', time: '19:00–20:30', course: 'Intro to MCP', content: 'Лекции 9–16 + quiz', practice: 'Черновик сервера', result: 'Сертификат MCP-1', resultIcon: 'cert' },
            { day: 'Ср', date: '23.09', time: '19:00–20:30', course: 'MCP Advanced', content: 'Лекции 1–8', practice: 'Sampling, notifications', result: 'Сервер v2' },
            { day: 'Чт', date: '24.09', time: '19:00–20:30', course: 'MCP Advanced', content: 'Лекции 9–15 + quiz', practice: 'Безопасность, продакшен', result: 'Сертификат MCP-2', resultIcon: 'cert' },
            { day: 'Пт', date: '25.09', time: '19:00–20:00', course: 'Ревью', content: '—', practice: '—', result: '—' },
            { day: 'Сб', date: '26.09', time: '11:00–14:00', course: 'Deep work', content: 'MCP-сервер', practice: 'DaVinci Resolve + PostgreSQL', result: 'Claude → Resolve', resultIcon: 'star' },
            { day: 'Вс', date: '27.09', time: 'Отдых', course: '—', content: '—', practice: '—', result: 'Восстановление', resultIcon: 'rest' },
        ],
    },
    {
        weekNumber: 6,
        title: 'Интеграция, запуск, смыслы',
        dateRange: '28.09–04.10',
        icon: 'trophy',
        track: 'Integration',
        days: [
            { day: 'Пн', date: '28.09', time: '19:00–20:30', course: 'Интеграция', content: 'MCP-серверы → Claude', practice: 'Code/Desktop подключение', result: 'Единый контур', resultIcon: 'check' },
            { day: 'Вт', date: '29.09', time: '19:00–20:30', course: 'Интеграция', content: 'Финализация MCP', practice: 'Тестирование всей цепочки', result: 'Стабильная связка' },
            { day: 'Ср', date: '30.09', time: '19:00–20:30', course: 'Маркетинг', content: 'Анализ рекламы', practice: 'Итерация креативов с Claude', result: 'CPL снижен', resultIcon: 'check' },
            { day: 'Чт', date: '01.10', time: '19:00–20:30', course: 'Маркетинг', content: 'Оптимизация воронки', practice: 'A/B-тесты лендинга', result: 'Конверсия выше' },
            { day: 'Пт', date: '02.10', time: '19:00–20:00', course: 'Большое ревью', content: 'Итоги месяца', practice: '—', result: 'План на Q4' },
            { day: 'Сб', date: '03.10', time: '11:00–14:00', course: 'Финализация', content: 'Клиенты + LinkedIn', practice: '6 сертификатов опубликованы', result: 'Продукт запущен', resultIcon: 'star' },
            { day: 'Вс', date: '04.10', time: 'Рефлексия', course: 'Notebook', content: 'Час рефлексии', practice: 'Что даёт смысл?', result: 'Личный манифест', resultIcon: 'rest' },
        ],
    },
];
