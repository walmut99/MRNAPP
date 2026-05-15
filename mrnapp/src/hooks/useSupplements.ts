import { useEffect, useState } from 'react';
import { supplements as seedData } from '../data/sarah';

export type SupplementEntry = {
  id: string;
  type: 'supplement' | 'medication';
  isTemplate: boolean;
  name: string;
  dose: number | null;
  unit: 'mg' | 'mcg' | 'g' | 'IU' | 'capsule' | 'scoop' | null;
  frequency: 'daily' | 'weekly' | 'twice-weekly' | 'monthly' | 'as-needed' | null;
  frequencyDay: number | null;
  frequencyDays: number[] | null;
  startedDate: string | null;
  linkedMarkerId: string | null;
  retestDate: string | null;
  stoppedDate: string | null;
  source: 'manual' | 'onboarding' | 'chat-extraction';
  reminderEnabled: false;
};

// Module-level state so mutations in modals propagate back to the list screen.
let _entries: SupplementEntry[] = seedData as SupplementEntry[];
const _subscribers = new Set<() => void>();

function emit() {
  _subscribers.forEach(fn => fn());
}

export function useSupplements() {
  const [, tick] = useState(0);

  useEffect(() => {
    const rerender = () => tick(n => n + 1);
    _subscribers.add(rerender);
    return () => {
      _subscribers.delete(rerender);
    };
  }, []);

  const entries = _entries;
  const activeEntries = entries.filter(e => !e.stoppedDate);

  const entriesByType = {
    supplement: [...activeEntries.filter(e => e.type === 'supplement')].sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
    medication: [...activeEntries.filter(e => e.type === 'medication')].sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
  };

  const addEntry = (entry: Omit<SupplementEntry, 'id'>) => {
    _entries = [..._entries, { ...entry, id: `entry-${Date.now()}` } as SupplementEntry];
    emit();
  };

  const updateEntry = (id: string, updates: Partial<SupplementEntry>) => {
    _entries = _entries.map(e => (e.id === id ? { ...e, ...updates } : e));
    emit();
  };

  const deleteEntry = (id: string) => {
    _entries = _entries.filter(e => e.id !== id);
    emit();
  };

  const stopEntry = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    updateEntry(id, { stoppedDate: today });
  };

  return { entries, activeEntries, entriesByType, addEntry, updateEntry, deleteEntry, stopEntry };
}
