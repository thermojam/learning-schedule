import {ruleIcons} from './icons';
import {timeRules} from '../data/schedule';

export default function TimeRules() {
    return (
        <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
            <div className="px-3 py-2 border-b border-border bg-stripe/70">
                <h2 className="text-[13px] font-semibold text-cream tracking-wide uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber"/>
                    Правила тайм-менеджмента
                </h2>
            </div>
            <div className="grid grid-cols-7 gap-0 divide-x divide-border/40">
                {timeRules.map((rule, i) => {
                    const Icon = ruleIcons[i];
                    return (
                        <div key={i} className="px-2 py-2 text-center hover:bg-card-hover/30 transition-colors">
                            <div
                                className="w-6 h-6 rounded-md bg-border/40 flex items-center justify-center mx-auto mb-1">
                                <Icon className="w-4 h-4 text-amber" weight="duotone"/>
                            </div>
                            <p className="text-[10.5px] font-semibold text-cream leading-tight">{rule.rule}</p>
                            <p className="text-[9.5px] text-clay-light mt-0.5 leading-tight">{rule.format}</p>
                            <p className="text-[9px] text-cream-muted mt-0.5 leading-tight italic">{rule.reason}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
