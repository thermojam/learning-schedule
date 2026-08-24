import {useEffect, useRef, useState} from 'react';
import type {ReactNode, RefObject} from 'react';
import {BookOpenText, Check, CheckCircle} from './icons';
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

function useAutosize(ref: RefObject<HTMLTextAreaElement | null>, value: string) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }, [ref, value]);
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

function SavedFlag({show}: { show: boolean }) {
    return (
        <span
            className={cn(
                'text-[9px] text-green-accent transition-opacity duration-300',
                show ? 'opacity-100' : 'opacity-0'
            )}
        >
            ✓ Сохранено
        </span>
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

function NotesCard({weekNumber, readOnly}: WidgetProps) {
    const key = storageKeys(weekNumber).notes;
    const [saved, setSaved] = useLocalStorageState<string>(key, '');
    const [draft, setDraft] = useState(saved);
    const [justSaved, setJustSaved] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutosize(textareaRef, draft);

    useEffect(() => {
        if (draft === saved) return;
        const timeout = window.setTimeout(() => {
            setSaved(draft);
            setJustSaved(true);
        }, 400);
        return () => window.clearTimeout(timeout);
    }, [draft, saved, setSaved]);

    useEffect(() => {
        if (!justSaved) return;
        const timeout = window.setTimeout(() => setJustSaved(false), 1200);
        return () => window.clearTimeout(timeout);
    }, [justSaved]);

    if (readOnly) {
        return (
            <WidgetCard icon={<BookOpenText className="w-3.5 h-3.5" weight="duotone"/>} title="Заметки">
                <div className="text-[10.5px] text-cream-dim whitespace-pre-wrap">
                    {saved || <span className="text-cream-muted">— пусто —</span>}
                </div>
            </WidgetCard>
        );
    }

    return (
        <WidgetCard
            icon={<BookOpenText className="w-3.5 h-3.5" weight="duotone"/>}
            title="Заметки"
            trailing={<SavedFlag show={justSaved}/>}
        >
            <textarea
                ref={textareaRef}
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Заметки по неделе..."
                rows={3}
                className="w-full resize-none overflow-hidden bg-code border border-border/50 rounded-md text-cream-dim placeholder:text-cream-muted/60 text-[10.5px] leading-relaxed px-2.5 py-2 focus:outline-none focus:border-clay-dim"
            />
            <div className="text-[9px] text-cream-muted text-right mt-1">{draft.length} симв.</div>
        </WidgetCard>
    );
}

export default function WeekWidgets({weekNumber, readOnly = false}: { weekNumber: number; readOnly?: boolean }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3">
            <ChecklistCard weekNumber={weekNumber} readOnly={readOnly}/>
            <NotesCard weekNumber={weekNumber} readOnly={readOnly}/>
        </div>
    );
}
