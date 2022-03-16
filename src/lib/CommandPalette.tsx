import {
  Component,
  createEffect,
  createSignal,
  createUniqueId,
  JSX,
  onMount,
  onCleanup,
  Show,
} from 'solid-js';
import { Transition } from 'solid-transition-group';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { CommandPalettePortal } from './CommandPalettePortal';
import { KbdShortcut } from './KbdShortcut/KbdShortcut';
import { ScrollAssist } from './ScrollAssist/ScrollAssist';
import { PanelResult } from './Panel/Result/Result';
import { PanelFooter } from './Panel/Footer/Footer';
import { createSearchResultList } from './createActionList';
import { runAction } from './actionUtils/actionUtils';
import { ActionId, WrappedAction } from './types';
import utilStyles from './utils.module.css';
import styles from './CommandPalette.module.css';

type InputEventHandler = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
type ActiveItemId = null | ActionId;
type UserInteraction =
  | 'idle'
  | 'search'
  | 'navigate-kbd'
  | 'navigate-mouse'
  | 'navigate-scroll-assist';

export interface CommandPaletteProps {
  searchPlaceholder?: string;
}

const CommandPaletteInternal: Component<CommandPaletteProps> = (p) => {
  const [state, storeMethods] = useStore();
  const { closePalette, setSearchText, revertParentAction } = storeMethods;
  const resultsList = createSearchResultList();
  const [activeItemId, setActiveItemId] = createSignal<ActiveItemId>(null);
  const [userInteraction, setUserInteraction] = createSignal<UserInteraction>('idle');
  const searchLabelId = createUniqueId();
  const searchInputId = createUniqueId();
  const resultListId = createUniqueId();

  let wrapperElem: undefined | HTMLDivElement;
  let searchInputElem: undefined | HTMLInputElement;
  let closeBtnElem: undefined | HTMLButtonElement;
  let lastFocusedElem: null | HTMLElement;

  function triggerRun(action: WrappedAction) {
    runAction(action, state.actionsContext, storeMethods);
  }

  function activatePrevItem() {
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

  function activateNextItem() {
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

  function handleWrapperClick() {
    closePalette();
  }

  function handlePanelClick(event: MouseEvent) {
    event.stopPropagation();
  }

  const handleSearchInput: InputEventHandler = (event) => {
    const newValue = event.currentTarget.value;

    setUserInteraction('search');
    setSearchText(newValue);
  };

  function handleActionItemSelect(action: WrappedAction) {
    triggerRun(action);
  }

  function handleActionItemHover(action: WrappedAction) {
    setUserInteraction('navigate-mouse');
    setActiveItemId(action.id);
  }

  function handleKbdEnter(event: KeyboardEvent) {
    const targetElem = event.target as HTMLElement;

    if (closeBtnElem && closeBtnElem.contains(targetElem)) {
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

    setUserInteraction('navigate-kbd');
    activatePrevItem();
  }

  function handleKbdNext(event: KeyboardEvent) {
    event.preventDefault();

    setUserInteraction('navigate-kbd');
    activateNextItem();
  }

  function handleKbdFirst(event: KeyboardEvent) {
    event.preventDefault();

    const actionsList = resultsList();
    const firstAction = actionsList[0];

    if (firstAction) {
      setUserInteraction('navigate-kbd');
      setActiveItemId(firstAction.id);
    }
  }

  function handleKbdLast(event: KeyboardEvent) {
    event.preventDefault();

    const actionsList = resultsList();
    const lastAction = actionsList.at(-1);

    if (lastAction) {
      setUserInteraction('navigate-kbd');
      setActiveItemId(lastAction.id);
    }
  }

  function handleKbdDelete() {
    const isSearchEmpty = state.searchText.length <= 0;

    if (isSearchEmpty) {
      revertParentAction();
    }
  }

  function handleScrollAssistPrev() {
    setUserInteraction('navigate-scroll-assist');
    activatePrevItem();
  }

  function handleScrollAssistNext() {
    setUserInteraction('navigate-scroll-assist');
    activateNextItem();
  }

  function handleScrollAssistStop() {
    setUserInteraction('idle');
  }

  function getScrollAssistStatus() {
    if (userInteraction() === 'navigate-mouse') {
      return 'available';
    }

    if (userInteraction() === 'navigate-scroll-assist') {
      return 'running';
    }

    return 'stopped';
  }

  onMount(() => {
    lastFocusedElem = document.activeElement as HTMLElement;

    if (searchInputElem) {
      searchInputElem.select();
    }

    if (wrapperElem) {
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
        Backspace: handleKbdDelete,
      });
    }
  });

  onCleanup(() => {
    if (lastFocusedElem) {
      lastFocusedElem.focus();
    }

    lastFocusedElem = null;
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
    <div
      class={styles.wrapper}
      ref={wrapperElem}
      onClick={handleWrapperClick}
    >
      <div class={styles.palette}>
        <ScrollAssist
          direction="up"
          status={getScrollAssistStatus()}
          onNavigate={handleScrollAssistPrev}
          onStop={handleScrollAssistStop}
        />
        <ScrollAssist
          direction="down"
          status={getScrollAssistStatus()}
          onNavigate={handleScrollAssistNext}
          onStop={handleScrollAssistStop}
        />
        <div
          role="combobox"
          aria-expanded={true}
          aria-haspopup="listbox"
          aria-controls={resultListId}
          aria-activedescendant={`scp-result-item-${activeItemId()}`}
          aria-labelledby={searchLabelId}
          class={styles.panel}
          onClick={handlePanelClick}
        >
          <form
            role="search"
            class={styles.searchForm}
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label
              htmlFor={searchInputId}
              id={searchLabelId}
              class={utilStyles.visuallyHidden}
            >
              Search for an action and then select one of the option.
            </label>
            <input
              type="search"
              id={searchInputId}
              class={styles.searchInput}
              aria-autocomplete="list"
              autocomplete="off"
              autocapitalize="off"
              spellcheck={false}
              placeholder={p.searchPlaceholder || 'Type a command or search...'}
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
              <span class={utilStyles.visuallyHidden}>Close the Command Palette</span>
              <KbdShortcut
                shortcut="Escape"
                aria-hidden
              />
            </button>
          </form>
          <PanelResult
            activeItemId={activeItemId()}
            resultsList={resultsList()}
            resultListId={resultListId}
            searchLabelId={searchLabelId}
            onActionItemHover={handleActionItemHover}
            onActionItemSelect={handleActionItemSelect}
          />
          <PanelFooter />
        </div>
      </div>
    </div>
  );
};

export const CommandPalette: Component<CommandPaletteProps> = (p) => {
  const [state] = useStore();

  return (
    <CommandPalettePortal>
      <Transition
        enterClass={styles.animEnter}
        enterActiveClass={styles.animEnterActive}
        exitClass={styles.animExit}
        exitActiveClass={styles.animExitActive}
      >
        <Show when={state.visibility === 'opened'}>
          <CommandPaletteInternal {...p} />
        </Show>
      </Transition>
    </CommandPalettePortal>
  );
};
