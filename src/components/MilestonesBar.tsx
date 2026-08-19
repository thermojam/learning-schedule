import { TopicIcon } from './icons';
import { milestones } from '../data/schedule';

export default function MilestonesBar() {
    return (
        <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
            <div className="px-3 py-2 border-b border-border bg-stripe/70">
                <h2 className="text-[13px] font-semibold text-cream tracking-wide uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-accent" />
                    Контрольные точки маршрута
                </h2>
            </div>
            <div className="flex items-stretch divide-x divide-border/40">
                {milestones.map((m, i) => (
                    <div key={i} className="flex-1 px-3 py-2 relative">
                        {i < milestones.length - 1 && (
                            <div className="absolute right-0 top-1/2 w-2 h-px bg-border-light translate-x-1" />
                        )}
                        <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-clay/10 border border-clay/20 flex items-center justify-center shrink-0">
                <TopicIcon name={m.icon} className="w-4 h-4 text-clay-light" />
              </span>
                            <div>
                                <p className="text-[11px] font-mono font-bold text-clay-light">{m.date}</p>
                                <p className="text-[10.5px] text-cream-dim leading-tight mt-0.5">{m.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
