import { useEffect, useState } from 'react';

import { foodLibrary } from '../data/sarah';

// Note: Free for all users in v1. May become Premium-gated post-launch.
// See strategic question: "what's the clear integrating factor for Premium?"

// ── Types ─────────────────────────────────────────────────────────────────────

export type FoodEntry = {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  restaurant: string | null;
  timesLogged: number;
  createdAt: string;
  source: 'chat' | 'manual';
};

// ── Module-level state ────────────────────────────────────────────────────────

let _entries: FoodEntry[] = foodLibrary as FoodEntry[];

const _subscribers = new Set<() => void>();

function emit() { _subscribers.forEach(fn => fn()); }

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useFoodLibrary() {
  const [, tick] = useState(0);

  useEffect(() => {
    const rerender = () => tick(n => n + 1);
    _subscribers.add(rerender);
    return () => { _subscribers.delete(rerender); };
  }, []);

  return {
    entries: [..._entries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),

    addEntry(entry: Omit<FoodEntry, 'id' | 'timesLogged'>) {
      _entries = [
        { ...entry, id: 'meal-' + Date.now(), timesLogged: 1 },
        ..._entries,
      ];
      emit();
    },

    updateEntry(id: string, patch: Partial<FoodEntry>) {
      _entries = _entries.map(e => (e.id === id ? { ...e, ...patch } : e));
      emit();
    },

    deleteEntry(id: string) {
      _entries = _entries.filter(e => e.id !== id);
      emit();
    },

    incrementLogCount(id: string) {
      _entries = _entries.map(e =>
        e.id === id ? { ...e, timesLogged: e.timesLogged + 1 } : e,
      );
      emit();
    },
  };
}
