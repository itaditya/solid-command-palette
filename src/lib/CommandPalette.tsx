import { Component, For, onMount, Show } from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { CommandPalettePortal } from './CommandPalettePortal';
import styles from './CommandPalette.module.css';

export const CommandPaletteInternal: Component = () => {
  const [state, { close }] = useStore();
  let wrapperRef;

  function handleWrapperClick() {
    close();
  }

  function handlePaletteClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onMount(() => {
    tinykeys(wrapperRef, {
      Escape: () => {
        console.log('escape press');
        close();
      },
    });
  });

  return (
    <div class={styles.wrapper} ref={wrapperRef} onClick={handleWrapperClick}>
      <div class={styles.palette} onClick={handlePaletteClick}>
        <div>
          <input type="text" placeholder="Search for stuff" />
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
