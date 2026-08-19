import { ArrowSquareOut } from './icons';
import { courses } from '../data/schedule';

export default function CourseTable() {
    return (
        <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
            <div className="px-3 py-2 border-b border-border bg-stripe/70">
                <h2 className="text-[13px] font-semibold text-cream tracking-wide uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-clay" />
                    Сводная таблица маршрута
                </h2>
            </div>
            <table className="w-full text-[11.5px]">
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
                        <td className="px-3 py-1.5 text-cream-muted font-mono">{c.id}</td>
                        <td className="px-2 py-1.5 text-cream font-medium">{c.name}</td>
                        <td className="px-2 py-1.5 text-amber font-mono font-semibold">{c.duration}</td>
                        <td className="px-2 py-1.5 text-cream-dim">{c.lectures}</td>
                        <td className="px-2 py-1.5 text-cream-dim">{c.control}</td>
                        <td className="px-2 py-1.5 text-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-border/40 text-cream-muted hover:text-clay-light hover:bg-clay/10 transition-colors cursor-pointer">
                  <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
