/**
 * Icon lookup data (name → component) for `icons.tsx`.
 *
 * Split out from `icons.tsx` because `react-refresh/only-export-components`
 * requires files that export components to export *only* components — these
 * are plain object/array data, not components.
 */
import {
    ArrowsClockwise,
    Brain,
    Clock,
    Coffee,
    Eye,
    Fire,
    Lightning,
    ListChecks,
    Plugs,
    PuzzlePiece,
    RocketLaunch,
    ShieldCheck,
    Target,
    Trophy,
    Wrench,
} from '@phosphor-icons/react';

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
