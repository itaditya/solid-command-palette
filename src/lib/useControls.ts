import { useStore } from './StoreContext';

export function useControls() {
  const [_state, storeMethods] = useStore();

  return {
    openPalette: storeMethods.openPalette,
    closePalette: storeMethods.closePalette,
    togglePalette: storeMethods.togglePalette,
  };
}
