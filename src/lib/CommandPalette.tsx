import {
  Component,
  createEffect,
  createSignal,
  createUniqueId,
  For,
  JSX,
  onMount,
  Show,
} from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { CommandPalettePortal } from './CommandPalettePortal';
import { KbdShortcut } from './KbdShortcut/KbdShortcut';
import { createSearchResultList } from './createActionList';
import { StoreStateWrapped } from './types';
import utilStyles from './utils.module.css';
import styles from './CommandPalette.module.css';

type InputEventHandler = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
type WrappedAction = StoreStateWrapped['actions'][string];

export const CommandPaletteInternal: Component = () => {
  const [state, { closePalette, setSearchText }] = useStore();
  const resultsList = createSearchResultList();
  const [activeItemId, setActiveItemId] = createSignal(null);
  const searchLabelId = createUniqueId();
  const searchInputId = createUniqueId();

  let wrapperElem: HTMLDivElement;
  let paletteElem: HTMLDivElement;
  let searchInputElem: HTMLInputElement;
  let closeBtnElem: HTMLButtonElement;

  function triggerRun(action: WrappedAction) {
    const rootContext = state.actionsContext.root;
    const dynamicContext = state.actionsContext.dynamic[action.id] || {};
    action.run({ actionId: action.id, rootContext, dynamicContext });
    closePalette(); // commented for easy dev.
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
    const targetElem = event.target as HTMLElement;

    if (closeBtnElem.contains(targetElem)) {
      return;
    }

    event.preventDefault();

    const activeActionId = activeItemId();

    if (!activeActionId) {
      return null;
    }

    const action = state.actions[activeActionId];
    triggerRun(action);
  }

  function handleKbdPrev(event: KeyboardEvent) {
    event.preventDefault();

    const actionsList = resultsList();
    const actionsCount = actionsList.length;
    const activeActionId = activeItemId();

    const currentActionIndex = actionsList.findIndex((action) => action.id === activeActionId);

    if (currentActionIndex < 0) {
      return;
    }

    const prevActionIndex = (actionsCount + currentActionIndex - 1) % actionsCount;
    const prevActionId = actionsList[prevActionIndex].id;

    setActiveItemId(prevActionId);
  }

  function handleKbdNext(event: KeyboardEvent) {
    event.preventDefault();

    const actionsList = resultsList();
    const actionsCount = actionsList.length;
    const activeActionId = activeItemId();

    const currentActionIndex = actionsList.findIndex((action) => action.id === activeActionId);

    if (currentActionIndex < 0) {
      return;
    }

    const nextActionIndex = (currentActionIndex + 1) % actionsCount;
    const nextActionId = actionsList[nextActionIndex].id;

    setActiveItemId(nextActionId);
  }

  function handleKbdFirst(event: KeyboardEvent) {
    event.preventDefault();

    const actionsList = resultsList();
    const firstAction = actionsList[0];

    if (firstAction) {
      setActiveItemId(firstAction.id);
    }
  }

  function handleKbdLast(event: KeyboardEvent) {
    event.preventDefault();

    const actionsList = resultsList();
    // @ts-expect-error Solid has issues with `.at`
    const lastAction = actionsList.at(-1);

    if (lastAction) {
      setActiveItemId(lastAction.id);
    }
  }

  function handleActionItemHover(action: WrappedAction) {
    setActiveItemId(action.id);
  }

  onMount(() => {
    searchInputElem.select();

    tinykeys(wrapperElem, {
      Escape: (event) => {
        event.preventDefault();
        closePalette();
      },
      Enter: handleKbdEnter,
      ArrowUp: handleKbdPrev,
      ArrowDown: handleKbdNext,
      PageUp: handleKbdFirst,
      PageDown: handleKbdLast,
    });
  });

  createEffect(() => {
    const actionsList = resultsList();
    const firstResultId = actionsList[0]?.id;

    if (firstResultId) {
      setActiveItemId(firstResultId);
    } else {
      setActiveItemId(null);
    }
  });

  return (
    <div class={styles.wrapper} ref={wrapperElem} onClick={handleWrapperClick}>
      <div class={styles.palette} ref={paletteElem} onClick={handlePaletteClick}>
        <form
          role="search"
          class={styles.searchForm}
          aria-label="Command Palette Search"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor={searchInputId} id={searchLabelId} class={utilStyles.visuallyHidden}>
            Search for an action and then select one of the option.
          </label>
          <input
            type="search"
            id={searchInputId}
            class={`${styles.searchInput} ${utilStyles.boxBorder}`}
            autocomplete="off"
            placeholder="Type a command or search..."
            data-cp-kbd-shortcuts="disabled"
            ref={searchInputElem}
            value={state.searchText}
            onInput={handleSearchInput}
          />
          <button
            type="button"
            class={styles.closeBtn}
            ref={closeBtnElem}
            onClick={() => {
              closePalette();
            }}
          >
            <KbdShortcut shortcut="Escape" />
          </button>
        </form>
        <div class={styles.resultWrapper}>
          <ul
            role="listbox"
            aria-labelledby={searchInputId}
            class={`${styles.resultList} ${utilStyles.stripSpace}`}
          >
            <For
              each={resultsList()}
              fallback={
                <div class={styles.resultItem}>
                  <h4 class={`${styles.resultTitle} ${utilStyles.stripSpace}`}>
                    Couldn't find any matching actions
                  </h4>
                </div>
              }
            >
              {(action) => {
                return (
                  <li
                    role="option"
                    class={`${styles.resultItem} ${utilStyles.boxBorder}`}
                    classList={{
                      [styles.activeItem]: action.id === activeItemId(),
                    }}
                    aria-selected={action.id === activeItemId()}
                    onClick={[handleActionItemSelect, action]}
                    onMouseEnter={[handleActionItemHover, action]}
                    onMouseDown={(event) => {
                      // don't take focus away from search field when item is clicked.
                      event.preventDefault();
                    }}
                  >
                    <div>
                      <h4 class={`${styles.resultTitle} ${utilStyles.stripSpace}`}>
                        {action.title}
                      </h4>
                      <Show when={action.subtitle}>
                        <p class={`${styles.resultSubtitle} ${utilStyles.stripSpace}`}>
                          {action.subtitle}
                        </p>
                      </Show>
                    </div>
                    <div>
                      <Show when={action.shortcut}>
                        <KbdShortcut class={styles.resultShortcut} shortcut={action.shortcut} />
                      </Show>
                    </div>
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
