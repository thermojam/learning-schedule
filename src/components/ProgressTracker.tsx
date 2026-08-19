const TOTAL_HOURS = 13.6;

const trackGroups = [
    {name: 'Claude Code', color: 'bg-clay', hours: 2.5},
    {name: 'Claude API', color: 'bg-amber', hours: 8.1},
    {name: 'Business', color: 'bg-green-accent', hours: 0.9},
    {name: 'MCP', color: 'bg-blue-accent', hours: 2.1},
];

export default function ProgressTracker() {
    return (
        <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-stripe/70">
                <h2 className="text-[13px] font-semibold text-cream tracking-wide uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-accent"/>
                    Прогресс по трекам
                </h2>
            </div>
            <div className="px-3 py-2.5 space-y-2">
                {trackGroups.map((g, i) => (
                    <div key={i} className="flex items-center py-4 gap-2">
            <span className="text-[12px] text-cream-dim w-[72px] text-right font-medium shrink-0">
              {g.name}
            </span>
                        <div className="flex-1 h-2.5 bg-border/30 rounded-full overflow-hidden relative">
                            <div
                                className={`h-full ${g.color} rounded-full relative`}
                                style={{width: `${(g.hours / TOTAL_HOURS) * 100}%`}}
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-full"/>
                            </div>
                        </div>
                        <span className="text-[10px] text-cream-muted font-mono w-9 shrink-0">{g.hours}ч</span>
                    </div>
                ))}
                <div className="flex items-center gap-2 pt-1 border-t border-border/30">
          <span className="text-[10px] text-cream font-semibold w-[72px] text-right shrink-0">
            Итого
          </span>
                    <div className="flex-1 h-1 bg-border/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-clay via-amber to-blue-accent rounded-full w-full"/>
                    </div>
                    <span className="text-[10px] text-cream font-mono font-semibold w-9 shrink-0">40ч</span>
                </div>
            </div>
        </div>
    );
}
