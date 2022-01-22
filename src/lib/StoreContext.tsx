import { createContext, useContext } from 'solid-js';
import { StoreContext } from './types';

const storeContext = createContext<StoreContext>();

export const Provider = storeContext.Provider;

export function useStore() {
  const store = useContext(storeContext);
  return store;
}
