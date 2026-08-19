import {useCallback, useEffect, useState} from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'anthropic-schedule-theme';

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;

    // Fall back to the OS preference, defaulting to the dark brand identity
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
}

/**
 * Applies the theme by toggling `html.light`.
 * Every design token in index.css is re-declared under that scope,
 * so the entire UI (including print output) swaps in one place.
 */
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;

        // Briefly enable colour transitions so the swap feels intentional
        root.classList.add('theme-transition');
        root.classList.toggle('light', theme === 'light');
        root.style.colorScheme = theme;

        window.localStorage.setItem(STORAGE_KEY, theme);

        const timer = window.setTimeout(() => {
            root.classList.remove('theme-transition');
        }, 320);

        return () => window.clearTimeout(timer);
    }, [theme]);

    // Follow the OS only while the user hasn't made an explicit choice
    useEffect(() => {
        if (window.localStorage.getItem(STORAGE_KEY)) return;

        const mq = window.matchMedia('(prefers-color-scheme: light)');
        const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'light' : 'dark');

        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }, []);

    return {theme, setTheme, toggleTheme, isDark: theme === 'dark'};
}
