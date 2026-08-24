import { useEffect, useState } from 'react';

/**
 * Syncs a piece of React state with `localStorage`, keyed by `key`.
 * Falls back to `initialValue` when nothing is stored yet or when
 * `localStorage` is unavailable (private browsing, quota exceeded) —
 * in that case the state still works for the current session, just
 * without persistence.
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = window.localStorage.getItem(key);
            return stored !== null ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // localStorage unavailable — state stays in memory for this session.
        }
    }, [key, value]);

    return [value, setValue] as const;
}
