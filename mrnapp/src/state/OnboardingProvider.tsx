import { ReactNode, useCallback, useEffect, useReducer, useRef, useState } from 'react';

import {
  INITIAL_STATE,
  OnboardingContext,
  OnboardingState,
  clearPersistedState,
  readPersistedState,
  writePersistedState,
} from './onboarding';

type Action =
  | { type: 'hydrate'; payload: Partial<OnboardingState> }
  | { type: 'update'; payload: Partial<OnboardingState> }
  | { type: 'reset' };

function reducer(state: OnboardingState, action: Action): OnboardingState {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.payload };
    case 'update':
      return { ...state, ...action.payload };
    case 'reset':
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

type Props = { children: ReactNode };

export function OnboardingProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isHydrated, setHydrated] = useState(false);
  const skipNextWriteRef = useRef(true);

  useEffect(() => {
    let cancelled = false;
    readPersistedState().then((persisted) => {
      if (cancelled) return;
      if (persisted) dispatch({ type: 'hydrate', payload: persisted });
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (skipNextWriteRef.current) {
      skipNextWriteRef.current = false;
      return;
    }
    void writePersistedState(state);
  }, [state, isHydrated]);

  const update = useCallback((patch: Partial<OnboardingState>) => {
    dispatch({ type: 'update', payload: patch });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
    void clearPersistedState();
  }, []);

  return (
    <OnboardingContext.Provider value={{ state, isHydrated, update, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}
