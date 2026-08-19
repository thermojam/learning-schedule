/**
 * Central icon registry — @phosphor-icons/react.
 *
 * Every icon in the app funnels through this file so the icon set stays
 * consistent and can be swapped in one place. No emoji anywhere in the UI.
 */
import {
    ArrowsClockwise,
    ArrowSquareOut,
    Brain,
    BookOpenText,
    CalendarBlank,
    CaretLeft,
    CaretRight,
    Certificate,
    CheckCircle,
    Clock,
    Code,
    Coffee,
    Eye,
    Fire,
    Lightning,
    ListChecks,
    Moon,
    Plugs,
    Printer,
    PuzzlePiece,
    RocketLaunch,
    ShieldCheck,
    Sparkle,
    SquaresFour,
    Star,
    Sun,
    Target,
    Trophy,
    Wrench,
} from '@phosphor-icons/react';
import type { IconWeight } from '@phosphor-icons/react';

/* ---------- UI chrome icons (re-exported directly) ---------- */
export {
    ArrowSquareOut,
    BookOpenText,
    CalendarBlank,
    CaretLeft,
    CaretRight,
    Certificate,
    CheckCircle,
    Code,
    Moon,
    Printer,
    Sparkle,
    SquaresFour,
    Star,
    Sun,
};

/* ---------- Topical icons (replace former emoji) ---------- */
export const topicIcons = {
    lightning: Lightning,
    plugs: Plugs,
    eye: Eye,
    fire: Fire,
    puzzle: PuzzlePiece,
    trophy: Trophy,
    target: Target,
    wrench: Wrench,
    rocket: RocketLaunch,
} as const;

export type TopicIconName = keyof typeof topicIcons;

interface TopicIconProps {
    name: TopicIconName;
    className?: string;
    weight?: IconWeight;
}

export function TopicIcon({ name, className, weight = 'duotone' }: TopicIconProps) {
    const Component = topicIcons[name];
    return <Component className={className} weight={weight} />;
}

/* ---------- Time-management rule icons (ordered) ---------- */
export const ruleIcons = [
    Clock,
    Brain,
    Lightning,
    Coffee,
    ShieldCheck,
    ListChecks,
    ArrowsClockwise,
] as const;

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
