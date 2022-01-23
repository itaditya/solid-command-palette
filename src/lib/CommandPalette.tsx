import { Component, createSignal, For, JSX, onMount, Show } from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { CommandPalettePortal } from './CommandPalettePortal';
import { StoreStateWrapped } from './types';
import styles from './CommandPalette.module.css';
import utilStyles from './utils.module.css';

type InputEventHandler = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
type WrappedAction = StoreStateWrapped['actions'][string];

export const CommandPaletteInternal: Component = () => {
  const [state, { closePalette, setSearchText }] = useStore();
  const [activeItemId, setActiveItemId] = createSignal('initial');

  let wrapperElem: HTMLDivElement;
  let paletteElem: HTMLDivElement;
  let searchInputElem: HTMLInputElement;

  function triggerRun(action: WrappedAction) {
    action.run({ actionId: action.id, actionsContext: state.actionsContext });
  }

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

  function handleActionItemSelect(action: WrappedAction) {
    triggerRun(action);
  }

  function handleKbdEnter(event: KeyboardEvent) {
    event.preventDefault();
    const action = state.actions[activeItemId()];
    triggerRun(action);
  }

  function handleActionItemHover(action: WrappedAction) {
    setActiveItemId(action.id);
  }

  onMount(() => {
    searchInputElem.select();

    tinykeys(wrapperElem, {
      Escape: () => {
        console.log('escape press');
        closePalette();
      },
      Enter: handleKbdEnter,
    });
  });

  return (
    <div class={styles.wrapper} ref={wrapperElem} onClick={handleWrapperClick}>
      <div class={styles.palette} ref={paletteElem} onClick={handlePaletteClick}>
        <div>
          <input
            type="text"
            class={`${styles.searchInput} ${utilStyles.boxBorder}`}
            placeholder="Type a command or search..."
            ref={searchInputElem}
            value={state.searchText}
            onInput={handleSearchInput}
          />
        </div>
        <div>
          <ul class={`${styles.resultList} ${utilStyles.stripSpace}`}>
            <For each={Object.values(state.actions)} fallback={<div>No Actions</div>}>
              {(action) => {
                return (
                  <li
                    class={styles.resultItem}
                    classList={{
                      [styles.activeItem]: action.id === activeItemId(),
                    }}
                    onClick={[handleActionItemSelect, action]}
                    onMouseEnter={[handleActionItemHover, action]}
                  >
                    <h4 class={utilStyles.stripSpace}>{action.title}</h4>
                    <Show when={action.subtitle}>
                      <p class={utilStyles.stripSpace}>{action.subtitle}</p>
                    </Show>
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
