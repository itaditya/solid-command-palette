import { Component, For, onMount, Show } from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { CommandPalettePortal } from './CommandPalettePortal';
import styles from './CommandPalette.module.css';

export const CommandPaletteInternal: Component = () => {
  const [state, { closePalette }] = useStore();

  let wrapperElem: HTMLDivElement;
  let paletteElem: HTMLDivElement;
  let searchInputElem: HTMLInputElement;

  function handleWrapperClick() {
    closePalette();
  }

  function handlePaletteClick(event: MouseEvent) {
    event.stopPropagation();
  }

  function handleActionSelect(action) {
    action.run({ actionsContext: state.actionsContext });
  }

  onMount(() => {
    searchInputElem.select();

    tinykeys(wrapperElem, {
      Escape: () => {
        console.log('escape press');
        closePalette();
      },
    });
  });

  return (
    <div class={styles.wrapper} ref={wrapperElem} onClick={handleWrapperClick}>
      <div class={styles.palette} ref={paletteElem} onClick={handlePaletteClick}>
        <div>
          <input type="text" placeholder="Search for stuff" ref={searchInputElem} />
        </div>
        <div>
          <ul>
            <For each={Object.values(state.actions)} fallback={<div>No Actions</div>}>
              {(action) => {
                return (
                  <li>
                    <button onClick={[handleActionSelect, action]}>Run Action {action.id}</button>
                  </li>
                );
              }}
            </For>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const CommandPalette: Component = () => {
  const [state] = useStore();

  return (
    <CommandPalettePortal>
      <Show when={state.visibility === 'opened'}>
        <CommandPaletteInternal />
      </Show>
    </CommandPalettePortal>
  );
};
