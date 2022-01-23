import { Component, For, JSX, onMount, Show } from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { CommandPalettePortal } from './CommandPalettePortal';
import { StoreStateWrapped } from './types';
import styles from './CommandPalette.module.css';

type InputEventHandler = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
type WrappedAction = StoreStateWrapped['actions'][string];

export const CommandPaletteInternal: Component = () => {
  const [state, { closePalette, setSearchText }] = useStore();

  let wrapperElem: HTMLDivElement;
  let paletteElem: HTMLDivElement;
  let searchInputElem: HTMLInputElement;

  function handleWrapperClick() {
    closePalette();
  }

  function handlePaletteClick(event: MouseEvent) {
    event.stopPropagation();
  }

  const handleSearchInput: InputEventHandler = (event) => {
    const newValue = event.currentTarget.value;
    setSearchText(newValue);
  };

  function handleActionSelect(action: WrappedAction) {
    action.run({ actionId: action.id, actionsContext: state.actionsContext });
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
          <input
            type="text"
            placeholder="Search for stuff"
            ref={searchInputElem}
            value={state.searchText}
            onInput={handleSearchInput}
          />
        </div>
        <div>
          <ul>
            <For each={Object.values(state.actions)} fallback={<div>No Actions</div>}>
              {(action) => {
                return (
                  <li>
                    <h4>
                      {action.title}
                    </h4>
                    <Show when={action.subtitle}>
                      <p>
                        {action.subtitle}
                      </p>
                    </Show>
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
