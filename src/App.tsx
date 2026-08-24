import {useState, useEffect, useCallback} from 'react';
import {CaretLeft, CaretRight, Printer, SquaresFour, CalendarBlank, TopicIcon} from './components/icons';
import type {TopicIconName} from './components/icons';
import PageHeader from './components/PageHeader';
import CourseTable from './components/CourseTable';
import TimeRules from './components/TimeRules';
import MilestonesBar from './components/MilestonesBar';
import ProgressTracker from './components/ProgressTracker';
import WeekPage from './components/WeekPage';
import ThemeToggle from './components/ThemeToggle';
import {useTheme} from './hooks/useTheme';
import {weeks} from './data/schedule';

const summaryCards: { title: string; icon: TopicIconName; content: string }[] = [
    {
        title: 'Принцип маршрута',
        icon: 'target',
        content:
            'Не «пройти курсы», а «каждая неделя заканчивается артефактом в реальном проекте». Практика нужна там, где заканчивается теория.',
    },
    {
        title: 'Стек интеграций',
        icon: 'wrench',
        content:
            'Claude Code → Claude API → MCP-серверы → DaVinci Resolve + PostgreSQL. Единый ИИ-контур для всех проектов.',
    },
    {
        title: 'Финальная цель',
        icon: 'rocket',
        content:
            'К 04.10 — первые платящие клиенты, 6 сертификатов в LinkedIn, полноценная ИИ-экосистема через MCP.',
    },
];

const legendItems = [
    {color: 'bg-amber', label: 'Сертификат'},
    {color: 'bg-clay', label: 'Deep work'},
    {color: 'bg-blue-accent', label: 'Отдых'},
    {color: 'bg-green-accent', label: 'Артефакт'},
];

function Legend() {
    return (
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1">
            {legendItems.map(it => (
                <span key={it.label} className="flex items-center gap-1.5 text-[10px] text-cream-muted">
          <span className={`w-2 h-2 rounded-full ${it.color}`}/>
                    {it.label}
        </span>
            ))}
        </div>
    );
}

function SummaryCard({title, icon, content}: { title: string; icon: TopicIconName; content: string }) {
    return (
        <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm px-3 py-2.5 flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
        <span className="w-6 h-6 rounded-md bg-clay/10 border border-clay/20 flex items-center justify-center shrink-0">
          <TopicIcon name={icon} className="w-3.5 h-3.5 text-clay-light"/>
        </span>
                <h3 className="text-[12px] font-semibold text-cream">{title}</h3>
            </div>
            <p className="text-[10.5px] text-cream-dim leading-relaxed flex-1">{content}</p>
        </div>
    );
}

function OverviewPage() {
    return (
        <div className="h-full flex flex-col">
            <PageHeader/>
            <div className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_235px] gap-2.5">
                    <CourseTable/>
                    <ProgressTracker/>
                </div>
                <TimeRules/>
                <MilestonesBar/>
                <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between px-1">
                    <Legend/>
                    <span className="text-[10px] text-cream-muted italic">
            Пропустил день — сдвиг, не отказ. Buffer — воскресенье.
          </span>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {summaryCards.map(card => (
                        <SummaryCard key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const {theme, toggleTheme} = useTheme();
    const totalPages = 1 + weeks.length;

    const goTo = useCallback(
        (page: number) => setCurrentPage(Math.max(0, Math.min(totalPages - 1, page))),
        [totalPages]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const isTextEntryField =
                target?.tagName === 'TEXTAREA' ||
                target?.isContentEditable ||
                (target?.tagName === 'INPUT' && !['checkbox', 'radio'].includes((target as HTMLInputElement).type));
            if (isTextEntryField) {
                return;
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                goTo(currentPage + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                goTo(currentPage - 1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                goTo(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                goTo(totalPages - 1);
            } else if (['t', 'T', 'е', 'Е'].includes(e.key)) {
                if (e.metaKey || e.ctrlKey || e.altKey) return;
                e.preventDefault();
                toggleTheme();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, goTo, totalPages, toggleTheme]);

    const navButton = (active: boolean) =>
        `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
            active
                ? 'bg-clay/15 text-clay-light border border-clay/25'
                : 'text-cream-muted hover:text-cream hover:bg-stripe border border-transparent'
        }`;

    return (
        <div className="min-h-screen bg-anthracite">
            {/* Navigation — screen only */}
            <div className="no-print sticky top-0 z-50 bg-anthracite/95 backdrop-blur-md border-b border-border/50">
                <div
                    className="max-w-[297mm] mx-auto px-2 py-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-4">
                    <div
                        className="flex items-center gap-1.5 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <button onClick={() => goTo(0)} className={navButton(currentPage === 0) + ' shrink-0'}>
                            <SquaresFour className="w-4 h-4" weight="duotone"/>
                            Обзор
                        </button>
                        {weeks.map((w, i) => (
                            <button key={i} onClick={() => goTo(i + 1)}
                                    className={navButton(currentPage === i + 1) + ' shrink-0'}>
                                <CalendarBlank className="w-3.5 h-3.5" weight="duotone"/>
                                <span className="hidden xl:inline">Нед.</span> {w.weekNumber}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-between gap-2 md:justify-end">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <button
                                onClick={() => goTo(currentPage - 1)}
                                disabled={currentPage === 0}
                                className="p-1.5 rounded-md text-cream-muted hover:text-cream hover:bg-stripe disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <CaretLeft className="w-4 h-4" weight="bold"/>
                            </button>
                            <span className="text-[12px] text-cream-muted font-mono px-1">
                {currentPage + 1}/{totalPages}
              </span>
                            <button
                                onClick={() => goTo(currentPage + 1)}
                                disabled={currentPage === totalPages - 1}
                                className="p-1.5 rounded-md text-cream-muted hover:text-cream hover:bg-stripe disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <CaretRight className="w-4 h-4" weight="bold"/>
                            </button>
                            <div className="w-px h-5 bg-border mx-1"/>
                            <ThemeToggle theme={theme} onToggle={toggleTheme}/>
                        </div>
                        <div className="w-px h-5 bg-border hidden md:block"/>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-md text-[13px] font-medium text-cream bg-clay/15 hover:bg-clay/25 border border-clay/25 transition-all shrink-0"
                        >
                            <Printer className="w-4 h-4" weight="duotone"/>
                            <span className="hidden sm:inline">Печать / PDF</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Screen view — active page only */}
            <div className="no-print">
                <div className="print-page bg-anthracite p-3 sm:p-4 md:p-6">
                    {currentPage === 0 ? (
                        <OverviewPage/>
                    ) : (
                        <div className="h-full flex flex-col">
                            <PageHeader
                                subtitle={`Неделя ${weeks[currentPage - 1].weekNumber} из 6 • ${
                                    weeks[currentPage - 1].dateRange
                                } • ${weeks[currentPage - 1].title}`}
                            />
                            <div className="flex-1">
                                <WeekPage week={weeks[currentPage - 1]}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Print view — all 7 pages */}
            <div className="print-only hidden">
                <div className="print-page bg-anthracite p-6">
                    <OverviewPage/>
                </div>
                {weeks.map((week, i) => (
                    <div key={i} className="print-page bg-anthracite p-6">
                        <PageHeader
                            subtitle={`Неделя ${week.weekNumber} из 6 • ${week.dateRange} • ${week.title}`}
                        />
                        <WeekPage week={week} readOnly/>
                    </div>
                ))}
            </div>

            {/* Footer — screen only */}
            <div
                className="no-print max-w-[297mm] mx-auto px-4 py-4 flex flex-col gap-1 text-center md:flex-row md:items-center md:justify-between md:text-left text-[12px] text-cream-muted">
                <span>Anthropic Learning Schedule • Никита • Старт 24.08.2026</span>
                <span className="font-mono hidden md:inline">← → страницы • T тема • ⌘P для PDF • A4 landscape</span>
            </div>
        </div>
    );
}
