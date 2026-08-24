import type {ReactNode} from 'react';
import {Check, CheckCircle} from './icons';
import {useLocalStorageState} from '../hooks/useLocalStorageState';
import {cn} from '../utils/cn';

const CHECKLIST_ITEMS = [
    'Теория (видео/лекция)',
    'Практика на проекте',
    'Коммит / push',
    'Заметки и snippets',
] as const;

function storageKeys(weekNumber: number) {
    return {
        checklist: `anthropic-schedule-week-${weekNumber}-checklist`,
        notes: `anthropic-schedule-week-${weekNumber}-notes`,
        snippet: `anthropic-schedule-week-${weekNumber}-snippet`,
        snippetLang: `anthropic-schedule-week-${weekNumber}-snippet-lang`,
    };
}

interface WidgetProps {
    weekNumber: number;
    readOnly: boolean;
}

function WidgetCard({icon, title, trailing, children}: {
    icon: ReactNode;
    title: string;
    trailing?: ReactNode;
    children: ReactNode;
}) {
    return (
        <div className="rounded-lg border border-border bg-card/40 px-3.5 py-3">
            <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-[10px] font-semibold text-cream-muted uppercase tracking-wider flex items-center gap-1.5">
                    {icon} {title}
                </h3>
                {trailing}
            </div>
            {children}
        </div>
    );
}

function ChecklistCard({weekNumber, readOnly}: WidgetProps) {
    const key = storageKeys(weekNumber).checklist;
    const [checked, setChecked] = useLocalStorageState<boolean[]>(
        key,
        CHECKLIST_ITEMS.map(() => false)
    );
    const done = checked.filter(Boolean).length;
    const total = CHECKLIST_ITEMS.length;

    const toggle = (index: number) => {
        setChecked(checked.map((value, i) => (i === index ? !value : value)));
    };

    const progressFrac = (
        <span className="text-[9.5px] font-mono text-clay-light font-semibold">
            {done}/{total}
        </span>
    );

    if (readOnly) {
        return (
            <WidgetCard
                icon={<CheckCircle className="w-3.5 h-3.5" weight="duotone"/>}
                title="Чек-лист дня"
                trailing={progressFrac}
            >
                <div className="space-y-1">
                    {CHECKLIST_ITEMS.map((label, i) => (
                        <div
                            key={label}
                            className={cn(
                                'text-[10px]',
                                checked[i]
                                    ? 'text-cream-muted line-through decoration-border-light'
                                    : 'text-cream-dim'
                            )}
                        >
                            {checked[i] ? '✓' : '○'} {label}
                        </div>
                    ))}
                </div>
            </WidgetCard>
        );
    }

    return (
        <WidgetCard
            icon={<CheckCircle className="w-3.5 h-3.5" weight="duotone"/>}
            title="Чек-лист дня"
            trailing={progressFrac}
        >
            <div className="h-[3px] rounded-full bg-stripe overflow-hidden mb-2">
                <div
                    className="h-full bg-clay rounded-full transition-[width] duration-[250ms]"
                    style={{width: `${(done / total) * 100}%`}}
                />
            </div>
            <div className="space-y-1.5">
                {CHECKLIST_ITEMS.map((label, i) => (
                    <label
                        key={label}
                        className="flex items-center gap-1.5 text-[10px] text-cream-dim cursor-pointer group"
                    >
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={checked[i]}
                            onChange={() => toggle(i)}
                        />
                        <span
                            className="w-3.5 h-3.5 rounded-full border border-border-light bg-stripe flex items-center justify-center shrink-0 transition-colors peer-checked:bg-clay peer-checked:border-clay group-hover:border-clay/50"
                        >
                            {checked[i] && <Check className="w-2 h-2 text-anthracite" weight="bold"/>}
                        </span>
                        <span className={cn(checked[i] && 'text-cream-muted line-through decoration-border-light')}>
                            {label}
                        </span>
                    </label>
                ))}
            </div>
        </WidgetCard>
    );
}

export default function WeekWidgets({weekNumber, readOnly = false}: { weekNumber: number; readOnly?: boolean }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3">
            <ChecklistCard weekNumber={weekNumber} readOnly={readOnly}/>
        </div>
    );
}
