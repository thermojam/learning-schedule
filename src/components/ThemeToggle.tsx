import {Moon, Sun} from './icons';
import type {Theme} from '../hooks/useTheme';

interface Props {
    theme: Theme;
    onToggle: () => void;
}

export default function ThemeToggle({theme, onToggle}: Props) {
    const isDark = theme === 'dark';

    return (
        <button
            onClick={onToggle}
            title={`Переключить на ${isDark ? 'светлую' : 'тёмную'} тему (T)`}
            aria-label={`Переключить на ${isDark ? 'светлую' : 'тёмную'} тему`}
            role="switch"
            aria-checked={!isDark}
            className="group relative flex h-8 w-[58px] shrink-0 items-center rounded-full border border-border bg-stripe px-0.5 transition-colors hover:border-clay/40"
        >
            {/* Track icons */}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <Sun
            className={`h-3.5 w-3.5 transition-opacity duration-300 ${
                isDark ? 'text-cream-muted opacity-50' : 'opacity-0'
            }`}
            weight="bold"
        />
        <Moon
            className={`h-3.5 w-3.5 transition-opacity duration-300 ${
                isDark ? 'opacity-0' : 'text-cream-muted opacity-50'
            }`}
            weight="bold"
        />
      </span>

            {/* Sliding knob */}
            <span
                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ease-out ${
                    isDark
                        ? 'translate-x-[26px] bg-gradient-to-br from-border-light to-border'
                        : 'translate-x-0 bg-gradient-to-br from-clay to-clay-light'
                }`}
            >
        {isDark ? (
            <Moon className="h-4 w-4 text-cream" weight="fill"/>
        ) : (
            <Sun className="h-4 w-4 text-white" weight="fill"/>
        )}
      </span>
        </button>
    );
}
