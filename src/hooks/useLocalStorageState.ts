import { useCallback, useEffect, useState } from 'react';

const EVENT_NAME = 'anthropic-schedule:local-storage-change';

interface StorageChangeDetail {
    key: string;
    sourceId: number;
}

let nextInstanceId = 0;

function readValue<T>(key: string, initialValue: T): T {
    try {
        const stored = window.localStorage.getItem(key);
        return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
        return initialValue;
    }
}

/**
 * Syncs a piece of React state with `localStorage`, keyed by `key`.
 * Falls back to `initialValue` when nothing is stored yet or when
 * `localStorage` is unavailable (private browsing, quota exceeded) —
 * in that case the state still works for the current session, just
 * without persistence.
 *
 * Multiple mounted instances sharing the same `key` (e.g. the interactive
 * and print-only widgets for the same week) stay in sync via a same-tab
 * broadcast event — `storage` events only fire in *other* tabs, so writes
 * from one instance would otherwise never reach another already-mounted
 * instance of the same key.
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
    const [instanceId] = useState(() => nextInstanceId++);
    const [value, setStateValue] = useState<T>(() => readValue(key, initialValue));

    const setValue = useCallback(
        (next: T) => {
            setStateValue(next);
            try {
                window.localStorage.setItem(key, JSON.stringify(next));
            } catch {
                // localStorage unavailable — state stays in memory for this session.
            }
            window.dispatchEvent(
                new CustomEvent<StorageChangeDetail>(EVENT_NAME, { detail: { key, sourceId: instanceId } })
            );
        },
        [key, instanceId]
    );

    useEffect(() => {
        const handleChange = (e: Event) => {
            const { key: changedKey, sourceId } = (e as CustomEvent<StorageChangeDetail>).detail;
            if (changedKey !== key || sourceId === instanceId) return;
            setStateValue(readValue(key, initialValue));
        };
        window.addEventListener(EVENT_NAME, handleChange);
        return () => window.removeEventListener(EVENT_NAME, handleChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- initialValue is a mount-time-only fallback, same contract as useState's own initial argument
    }, [key, instanceId]);

    return [value, setValue] as const;
}
