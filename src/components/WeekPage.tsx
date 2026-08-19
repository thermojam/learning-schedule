import {CheckCircle, Code, BookOpenText, ResultIcon, TopicIcon} from './icons';
import type {WeekSchedule} from '../data/schedule';

const trackColors: Record<string, { bg: string; text: string; border: string }> = {
    'Claude Code': {bg: 'bg-clay/10', text: 'text-clay-light', border: 'border-clay/25'},
    'Claude API': {bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber/25'},
    'Claude API Advanced': {bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber/25'},
    Business: {bg: 'bg-green-accent/10', text: 'text-green-accent', border: 'border-green-accent/25'},
    MCP: {bg: 'bg-blue-accent/10', text: 'text-blue-accent', border: 'border-blue-accent/25'},
    Integration: {bg: 'bg-purple-accent/10', text: 'text-purple-accent', border: 'border-purple-accent/25'},
};

export default function WeekPage({week}: { week: WeekSchedule }) {
    const colors = trackColors[week.track] ?? trackColors['Claude Code'];

    return (
        <div className="h-full flex flex-col">
            {/* Week Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                    <div
                        className={`w-9 h-9 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}
                    >
                        <TopicIcon name={week.icon} className={`w-5 h-5 ${colors.text}`}/>
                    </div>
                    <div>
                        <h2 className="text-[16px] font-bold text-cream tracking-[-0.01em] leading-tight">
                            Неделя {week.weekNumber}: {week.title}
                        </h2>
                        <p className="text-[11px] text-cream-muted font-medium mt-0.5">
                            {week.dateRange} • Трек: <span className={colors.text}>{week.track}</span>
                        </p>
                    </div>
                </div>
                <div
                    className={`px-2.5 py-1 rounded text-[10px] font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
                >
                    {week.dateRange}
                </div>
            </div>

            {/* Schedule Table */}
            <div className="flex-1 rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
                <table className="w-full text-[10.5px]">
                    <thead>
                    <tr className="border-b border-border bg-stripe/70">
                        <th className="text-left px-2 py-1.5 text-cream-muted font-semibold w-14 uppercase tracking-wider text-[9.5px]">День</th>
                        <th className="text-left px-2 py-1.5 text-cream-muted font-semibold w-24 uppercase tracking-wider text-[9.5px]">Время</th>
                        <th className="text-left px-2 py-1.5 text-cream-muted font-semibold w-28 uppercase tracking-wider text-[9.5px]">Курс</th>
                        <th className="text-left px-2 py-1.5 text-cream-muted font-semibold uppercase tracking-wider text-[9.5px]">Содержание</th>
                        <th className="text-left px-2 py-1.5 text-cream-muted font-semibold uppercase tracking-wider text-[9.5px]">Практика</th>
                        <th className="text-left px-2 py-1.5 text-cream-muted font-semibold w-32 uppercase tracking-wider text-[9.5px]">Результат</th>
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
                                <td className="px-2 py-[6px]">
                                    <span className="font-bold text-cream">{day.day}</span>
                                    <span className="text-cream-muted text-[9px] ml-1">{day.date}</span>
                                </td>
                                <td className="px-2 py-[6px]">
                    <span
                        className={`font-mono text-[10px] ${
                            isRest ? 'text-blue-accent' : isDeep ? 'text-clay-light' : 'text-cream-dim'
                        }`}
                    >
                      {day.time}
                    </span>
                                </td>
                                <td className="px-2 py-[6px]">
                    <span
                        className={`text-[10px] font-medium ${
                            isRest ? 'text-cream-muted italic' : 'text-cream'
                        }`}
                    >
                      {day.course}
                    </span>
                                </td>
                                <td className="px-2 py-[6px] text-cream-dim">{day.content}</td>
                                <td className="px-2 py-[6px] text-cream-dim">{day.practice}</td>
                                <td className="px-2 py-[6px]">
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

            {/* Bottom: Checklist + Notes + Code Snippets */}
            <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="rounded-lg border border-border bg-card/40 px-2.5 py-2">
                    <h3 className="text-[10px] font-semibold text-cream-muted uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <CheckCircle className="w-3.5 h-3.5" weight="duotone"/> Чек-лист дня
                    </h3>
                    <div className="space-y-1">
                        {['Теория (видео/лекция)', 'Практика на проекте', 'Коммит / push', 'Заметки и snippets'].map(
                            (item, idx) => (
                                <label
                                    key={idx}
                                    className="flex items-center gap-1.5 text-[10px] text-cream-dim cursor-pointer group"
                                >
                                    <span
                                        className="w-3.5 h-3.5 rounded border border-border-light bg-stripe flex items-center justify-center shrink-0 group-hover:border-clay/50 transition-colors"/>
                                    {item}
                                </label>
                            )
                        )}
                    </div>
                </div>

                <div className="rounded-lg border border-border bg-card/40 px-2.5 py-2">
                    <h3 className="text-[10px] font-semibold text-cream-muted uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <BookOpenText className="w-3.5 h-3.5" weight="duotone"/> Заметки
                    </h3>
                    <div className="space-y-[7px]">
                        {[1, 2, 3].map(l => (
                            <div key={l} className="h-3 border-b border-border/25 border-dashed"/>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border border-border bg-card/40 px-2.5 py-2">
                    <h3 className="text-[10px] font-semibold text-cream-muted uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Code className="w-3.5 h-3.5" weight="duotone"/> Code Snippets
                    </h3>
                    <div
                        className="font-mono text-[9px] text-cream-muted bg-code rounded px-2 py-1.5 border border-border/30 leading-relaxed min-h-[42px]">
                        <span className="opacity-50">// your code here...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
