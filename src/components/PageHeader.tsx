import { BookOpenText, Sparkle } from './icons';

export default function PageHeader({ subtitle }: { subtitle?: string }) {
    return (
        <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-clay to-clay-light flex items-center justify-center glow-clay">
                        {/* Always white: sits on the clay gradient in both themes */}
                        <Sparkle className="w-5 h-5 text-white" weight="fill" />
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-accent rounded-full border-2 border-anthracite" />
                </div>
                <div className="min-w-0">
                    <h1 className="text-[16px] md:text-[19px] font-bold text-cream tracking-[-0.02em] leading-tight">
                        Anthropic Learning Schedule
                    </h1>
                    <p className="text-[11px] md:text-[12px] text-cream-muted font-medium tracking-wide uppercase mt-0">
                        {subtitle || '6 модулей • 40 часов • 6 сертификатов • Старт 24.08.2026'}
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stripe border border-border text-[11px] md:text-[12px] text-cream-dim">
                    <BookOpenText className="w-4 h-4" weight="duotone" />
                    <span>13.6ч видео + 26ч практики</span>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-clay/10 border border-clay/25 text-[11px] md:text-[12px] text-clay-light font-semibold">
                    Никита
                </div>
            </div>
        </div>
    );
}
