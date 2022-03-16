import { Component, For, Show, createEffect } from 'solid-js';
import { useStore } from '../../StoreContext';
import { KbdShortcut } from '../../KbdShortcut/KbdShortcut';
import { ActionId, WrappedAction, WrappedActionList, ResultContentProps } from '../../types';
import utilStyles from '../../utils.module.css';
import styles from './Result.module.css';
import { Dynamic } from 'solid-js/web';

const ResultContent: Component<ResultContentProps> = (p) => {
  return (
    <div
      class={styles.resultContent}
      classList={{
        [styles.active]: p.isActive,
      }}
    >
      <div>
        <h4 class={`${styles.resultTitle} ${utilStyles.stripSpace}`}>{p.action.title}</h4>
        <Show when={p.action.subtitle}>
          <p class={`${styles.resultSubtitle} ${utilStyles.stripSpace}`}>{p.action.subtitle}</p>
        </Show>
      </div>
      <div>
        <Show when={p.action.shortcut}>
          {(shortcut) => (
            <KbdShortcut
              class={styles.resultShortcut}
              shortcut={shortcut}
            />
          )}
        </Show>
      </div>
    </div>
  );
};

type ActiveItemId = null | ActionId;
type ResultItemElem = undefined | HTMLLIElement;

interface ResultItemProps {
  action: WrappedAction;
  activeItemId: ActiveItemId;
  onActionItemSelect: (action: WrappedAction) => void;
  onActionItemHover: (action: WrappedAction) => void;
}

const ResultItem: Component<ResultItemProps> = (p) => {
  let resultItemElem: ResultItemElem;
  let isMoving = false;

  const [state] = useStore();
  const ResultContentComponent = state.components?.ResultContent || ResultContent;

  function isActive() {
    return p.action.id === p.activeItemId;
  }

  function handleMouseMove(action: WrappedAction) {
    if (isMoving) {
      return;
    }

    isMoving = true;
    p.onActionItemHover(action);
  }

  function handleMouseLeave() {
    isMoving = false;
  }

  function handleMouseDown(event: MouseEvent) {
    // don't take focus away from search field when item is clicked.
    event.preventDefault();
  }

  createEffect(() => {
    if (isActive() && resultItemElem) {
      resultItemElem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  });

  return (
    <li
      role="option"
      ref={resultItemElem}
      id={`scp-result-item-${p.action.id}`}
      aria-selected={isActive()}
      onClick={[p.onActionItemSelect, p.action]}
      onMouseMove={[handleMouseMove, p.action]}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      <Dynamic
        component={ResultContentComponent}
        isActive={isActive()}
        action={p.action}
      />
    </li>
  );
};

export interface PanelResultProps {
  activeItemId: ActiveItemId;
  resultsList: WrappedActionList;
  resultListId: string;
  searchLabelId: string;
  onActionItemSelect: (action: WrappedAction) => void;
  onActionItemHover: (action: WrappedAction) => void;
}

export const PanelResult: Component<PanelResultProps> = (p) => {
  return (
    <div class={styles.resultWrapper}>
      <ul
        role="listbox"
        id={p.resultListId}
        aria-labelledby={p.searchLabelId}
        class={`${styles.resultList} ${utilStyles.stripSpace}`}
      >
        <For
          each={p.resultsList}
          fallback={
            <div class={styles.resultItem}>
              <h4 class={`${styles.resultTitle} ${utilStyles.stripSpace}`}>
                Couldn't find any matching actions
              </h4>
            </div>
          }
        >
          {(action) => (
            <ResultItem
              action={action}
              activeItemId={p.activeItemId}
              onActionItemHover={p.onActionItemHover}
              onActionItemSelect={p.onActionItemSelect}
            />
          )}
        </For>
      </ul>
    </div>
  );
};
