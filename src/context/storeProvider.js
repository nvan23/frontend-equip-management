import React, { createContext, useReducer, useContext, useMemo } from 'react';
import { authInitialState, authReducer } from './auth';
import { equipInitialState, equipmentReducer } from './equipment';

/**
 * React context for store
 */
const storeContext = createContext();

/**
 * Combine initial states
 */
const store = {
  equip: equipInitialState,
  auth: authInitialState,
};

/**
 * Combine reducers
 */
const reducers = (store, action) => ({
  auth: authReducer(store.auth, action),
  equipment: equipmentReducer(store.equip, action),
});


export const StoreProvider = ({ children }) => {
  // const store = useMemo(() => [state, dispatch], [state]);

  return (
    <storeContext.Provider
      value={useReducer(reducers, store)}
    >
      {children}
    </storeContext.Provider>
  );
};

/**
 * React hook for consuming store
 */
export const useStore = () => useContext(storeContext);