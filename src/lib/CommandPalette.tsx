import { Component, For, onMount, Show } from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { CommandPalettePortal } from './CommandPalettePortal';
import styles from './CommandPalette.module.css';

export const CommandPaletteInternal: Component = () => {
  const [state, { close }] = useStore();

  let wrapperElem: HTMLDivElement;
  let paletteElem: HTMLDivElement;
  let searchInputElem: HTMLInputElement;

  function handleWrapperClick() {
    close();
  }

  function handlePaletteClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onMount(() => {
    searchInputElem.select();

    tinykeys(wrapperElem, {
      Escape: () => {
        console.log('escape press');
        close();
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
                    <button
                      onClick={() => {
                        action.run({ actionsContext: state.actionsContext });
                      }}
                    >
                      Run Action {action.id}
                    </button>
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
