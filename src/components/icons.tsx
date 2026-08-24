/**
 * Central icon registry — @phosphor-icons/react.
 *
 * Every icon in the app funnels through this file so the icon set stays
 * consistent and can be swapped in one place. No emoji anywhere in the UI.
 *
 * The `topicIcons`/`ruleIcons` name→component lookup maps live in
 * `./iconRegistry` rather than here — `react-refresh/only-export-components`
 * requires a file that exports components to export only components, and
 * those maps are plain data. Add new topical/rule icons there.
 */
import {
    ArrowSquareOut,
    BookOpenText,
    CalendarBlank,
    CaretLeft,
    CaretRight,
    Certificate,
    Check,
    CheckCircle,
    Code,
    Copy,
    Moon,
    Printer,
    Sparkle,
    SquaresFour,
    Star,
    Sun,
} from '@phosphor-icons/react';
import type { IconWeight } from '@phosphor-icons/react';
import { topicIcons } from './iconRegistry';
import type { TopicIconName } from './iconRegistry';

/* ---------- UI chrome icons (re-exported directly) ---------- */
export {
    ArrowSquareOut,
    BookOpenText,
    CalendarBlank,
    CaretLeft,
    CaretRight,
    Certificate,
    Check,
    CheckCircle,
    Code,
    Copy,
    Moon,
    Printer,
    Sparkle,
    SquaresFour,
    Star,
    Sun,
};

export type { TopicIconName };

interface TopicIconProps {
    name: TopicIconName;
    className?: string;
    weight?: IconWeight;
}

export function TopicIcon({ name, className, weight = 'duotone' }: TopicIconProps) {
    const Component = topicIcons[name];
    return <Component className={className} weight={weight} />;
}

/* ---------- Result badge icons ---------- */
export type ResultIconName = 'cert' | 'check' | 'star' | 'rest';

export function ResultIcon({ name }: { name?: ResultIconName }) {
    if (!name) return null;

    const base = 'w-3.5 h-3.5 inline-block mr-1 shrink-0';

    switch (name) {
        case 'cert':
            return <Certificate className={`${base} text-amber`} weight="duotone" />;
        case 'check':
            return <CheckCircle className={`${base} text-green-accent`} weight="duotone" />;
        case 'star':
            return <Star className={`${base} text-clay-light`} weight="fill" />;
        case 'rest':
            return <Moon className={`${base} text-blue-accent`} weight="duotone" />;
        default:
            return null;
    }
}
