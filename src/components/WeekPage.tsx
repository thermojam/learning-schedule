import {ResultIcon, TopicIcon} from './icons';
import type {WeekSchedule} from '../data/schedule';
import WeekWidgets from './WeekWidgets';

const trackColors: Record<string, { bg: string; text: string; border: string }> = {
    'Claude Code': {bg: 'bg-clay/10', text: 'text-clay-light', border: 'border-clay/25'},
    'Claude API': {bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber/25'},
    'Claude API Advanced': {bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber/25'},
    Business: {bg: 'bg-green-accent/10', text: 'text-green-accent', border: 'border-green-accent/25'},
    MCP: {bg: 'bg-blue-accent/10', text: 'text-blue-accent', border: 'border-blue-accent/25'},
    Integration: {bg: 'bg-purple-accent/10', text: 'text-purple-accent', border: 'border-purple-accent/25'},
};

export default function WeekPage({week, readOnly = false}: { week: WeekSchedule; readOnly?: boolean }) {
    const colors = trackColors[week.track] ?? trackColors['Claude Code'];

    return (
        <div className="h-full flex flex-col">
            {/* Week Header */}
            <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div
                        className={`w-9 h-9 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}
                    >
                        <TopicIcon name={week.icon} className={`w-5 h-5 ${colors.text}`}/>
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-[14px] sm:text-[16px] font-bold text-cream tracking-[-0.01em] leading-tight">
                            Неделя {week.weekNumber}: {week.title}
                        </h2>
                        <p className="text-[11px] text-cream-muted font-medium mt-0.5">
                            {week.dateRange} • Трек: <span className={colors.text}>{week.track}</span>
                        </p>
                    </div>
                </div>
                <div
                    className={`hidden sm:block self-start px-2.5 py-1 rounded text-[10px] font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
                >
                    {week.dateRange}
                </div>
            </div>

            {/* Schedule Table */}
            <div className="flex-1 rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
                {/* Mobile: card list */}
                <div className="md:hidden divide-y divide-border/20">
                    {week.days.map((day, i) => {
                        const isRest = day.time === 'Отдых' || day.time === 'Рефлексия';
                        const isDeep = day.course.includes('Deep');
                        const isCert = day.resultIcon === 'cert';
                        return (
                            <div
                                key={i}
                                className={`px-3.5 py-3 ${
                                    isRest
                                        ? 'bg-blue-accent/8'
                                        : isDeep
                                            ? 'bg-clay/8'
                                            : isCert
                                                ? 'bg-amber/8'
                                                : i % 2 === 0
                                                    ? 'bg-transparent'
                                                    : 'bg-stripe/50'
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="font-bold text-cream text-[11.5px]">{day.day}</span>
                                        <span className="text-cream-muted text-[9.5px]">{day.date}</span>
                                    </div>
                                    <span
                                        className={`font-mono text-[10px] ${
                                            isRest ? 'text-blue-accent' : isDeep ? 'text-clay-light' : 'text-cream-dim'
                                        }`}
                                    >
                                        {day.time}
                                    </span>
                                </div>
                                <p
                                    className={`text-[11px] font-medium mt-1 ${
                                        isRest ? 'text-cream-muted italic' : 'text-cream'
                                    }`}
                                >
                                    {day.course}
                                </p>
                                {day.content !== '—' && (
                                    <p className="text-[10.5px] text-cream-dim mt-1">
                                        <span className="text-cream-muted">Содержание: </span>
                                        {day.content}
                                    </p>
                                )}
                                {day.practice !== '—' && (
                                    <p className="text-[10.5px] text-cream-dim mt-1">
                                        <span className="text-cream-muted">Практика: </span>
                                        {day.practice}
                                    </p>
                                )}
                                <p
                                    className={`flex items-center text-[10.5px] mt-1 ${
                                        isCert ? 'text-amber font-semibold' : 'text-cream-dim'
                                    }`}
                                >
                                    <ResultIcon name={day.resultIcon}/>
                                    {day.result}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Tablet and up: table */}
                <table className="w-full text-[10.5px] hidden md:table">
                    <thead>
                    <tr className="border-b border-border bg-stripe/70">
                        <th className="text-left px-3.5 py-2 text-cream-muted font-semibold w-16 uppercase tracking-wider text-[9.5px]">День</th>
                        <th className="text-left px-3.5 py-2 text-cream-muted font-semibold w-26 uppercase tracking-wider text-[9.5px]">Время</th>
                        <th className="text-left px-3.5 py-2 text-cream-muted font-semibold w-32 uppercase tracking-wider text-[9.5px]">Курс</th>
                        <th className="text-left px-3.5 py-2 text-cream-muted font-semibold uppercase tracking-wider text-[9.5px]">Содержание</th>
                        <th className="text-left px-3.5 py-2 text-cream-muted font-semibold uppercase tracking-wider text-[9.5px]">Практика</th>
                        <th className="text-left px-3.5 py-2 text-cream-muted font-semibold w-36 uppercase tracking-wider text-[9.5px]">Результат</th>
                    </tr>
                    </thead>
                    <tbody>
                    {week.days.map((day, i) => {
                        const isRest = day.time === 'Отдых' || day.time === 'Рефлексия';
                        const isDeep = day.course.includes('Deep');
                        const isCert = day.resultIcon === 'cert';
                        return (
                            <tr
                                key={i}
                                className={`
                    border-b border-border/20 transition-colors
                    ${isRest ? 'bg-blue-accent/8' : ''}
                    ${isDeep ? 'bg-clay/8' : ''}
                    ${isCert ? 'bg-amber/8' : ''}
                    ${!isRest && !isDeep && !isCert ? (i % 2 === 0 ? 'bg-transparent' : 'bg-stripe/50') : ''}
                  `}
                            >
                                <td className="px-3.5 py-[7px]">
                                    <span className="font-bold text-cream">{day.day}</span>
                                    <span className="text-cream-muted text-[9px] ml-1">{day.date}</span>
                                </td>
                                <td className="px-3.5 py-[7px]">
                    <span
                        className={`font-mono text-[10px] ${
                            isRest ? 'text-blue-accent' : isDeep ? 'text-clay-light' : 'text-cream-dim'
                        }`}
                    >
                      {day.time}
                    </span>
                                </td>
                                <td className="px-3.5 py-[7px]">
                    <span
                        className={`text-[10px] font-medium ${
                            isRest ? 'text-cream-muted italic' : 'text-cream'
                        }`}
                    >
                      {day.course}
                    </span>
                                </td>
                                <td className="px-3.5 py-[7px] text-cream-dim">{day.content}</td>
                                <td className="px-3.5 py-[7px] text-cream-dim">{day.practice}</td>
                                <td className="px-3.5 py-[7px]">
                    <span
                        className={`flex items-center ${
                            isCert ? 'text-amber font-semibold' : 'text-cream-dim'
                        }`}
                    >
                      <ResultIcon name={day.resultIcon}/>
                        {day.result}
                    </span>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <WeekWidgets key={week.weekNumber} weekNumber={week.weekNumber} readOnly={readOnly}/>
        </div>
    );
}
