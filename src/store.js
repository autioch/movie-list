import React, { createContext, useReducer, useContext, useMemo } from 'react';
import { reducer, initialState } from './reducer';

const StoreContext = createContext({});

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state, dispatch]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
