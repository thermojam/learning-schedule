import { ArrowSquareOut } from './icons';
import { courses } from '../data/schedule';

export default function CourseTable() {
    return (
        <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-stripe/70">
                <h2 className="text-[13px] font-semibold text-cream tracking-wide uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-clay" />
                    Сводная таблица маршрута
                </h2>
            </div>
            {/* Tablet and up: table */}
            <table className="w-full text-[11.5px] hidden md:table">
                <thead>
                <tr className="border-b border-border/60">
                    <th className="text-left px-3 py-1.5 text-cream-muted font-medium w-6">#</th>
                    <th className="text-left px-2 py-1.5 text-cream-muted font-medium">Курс</th>
                    <th className="text-left px-2 py-1.5 text-cream-muted font-medium w-16">Видео</th>
                    <th className="text-left px-2 py-1.5 text-cream-muted font-medium w-20">Лекции</th>
                    <th className="text-left px-2 py-1.5 text-cream-muted font-medium">Контроль</th>
                    <th className="text-center px-2 py-1.5 text-cream-muted font-medium w-14">Ссылка</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((c, i) => (
                    <tr
                        key={c.id}
                        className={`border-b border-border/30 ${
                            i % 2 === 0 ? 'bg-transparent' : 'bg-stripe/50'
                        } hover:bg-card-hover/50 transition-colors`}
                    >
                        <td className="px-4 py-2 text-cream-muted font-mono">{c.id}</td>
                        <td className="px-3 py-2 text-cream font-medium">{c.name}</td>
                        <td className="px-3 py-2 text-amber font-mono font-semibold">{c.duration}</td>
                        <td className="px-3 py-2 text-cream-dim">{c.lectures}</td>
                        <td className="px-3 py-2 text-cream-dim">{c.control}</td>
                        <td className="px-3 py-2 text-center">
                <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Открыть курс «${c.name}»`}
                    className="inline-flex items-center justify-center w-6 h-6 rounded bg-border/40 text-cream-muted hover:text-clay-light hover:bg-clay/10 transition-colors cursor-pointer"
                >
                  <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
                </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Mobile: card list */}
            <div className="md:hidden divide-y divide-border/30">
                {courses.map((c, i) => (
                    <div key={c.id} className={`px-3.5 py-3 ${i % 2 === 0 ? '' : 'bg-stripe/40'}`}>
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-baseline gap-2 min-w-0">
                                <span className="text-cream-muted font-mono text-[10px] shrink-0">{c.id}</span>
                                <span className="text-cream font-medium text-[12.5px] leading-snug">{c.name}</span>
                            </div>
                            <a
                                href={c.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Открыть курс «${c.name}»`}
                                className="inline-flex items-center justify-center w-6 h-6 rounded bg-border/40 text-cream-muted hover:text-clay-light hover:bg-clay/10 transition-colors cursor-pointer shrink-0"
                            >
                                <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
                            </a>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-[10.5px]">
                            <span className="text-amber font-mono font-semibold">{c.duration}</span>
                            <span className="text-cream-dim">{c.lectures}</span>
                        </div>
                        <p className="text-cream-dim text-[10.5px] mt-1">{c.control}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
