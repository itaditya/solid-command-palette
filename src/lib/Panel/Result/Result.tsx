import { Component, For, Show, createEffect } from 'solid-js';
import { KbdShortcut } from '../..';
import { ActionId, WrappedAction, WrappedActionList } from '../../types';
import utilStyles from '../../utils.module.css';
import styles from './Result.module.css';

interface ResultItemProps {
  action: WrappedAction;
  activeItemId: ActionId;
  onActionItemSelect: (action: WrappedAction) => void;
  onActionItemHover: (action: WrappedAction) => void;
}

const ResultItem: Component<ResultItemProps> = (p) => {
  let resultItemElem: HTMLLIElement;
  let isMoving = false;

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
    if (isActive()) {
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
      class={styles.resultItem}
      classList={{
        [styles.activeItem]: isActive(),
      }}
      aria-selected={isActive()}
      onClick={[p.onActionItemSelect, p.action]}
      onMouseMove={[handleMouseMove, p.action]}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      <div>
        <h4 class={`${styles.resultTitle} ${utilStyles.stripSpace}`}>{p.action.title}</h4>
        <Show when={p.action.subtitle}>
          <p class={`${styles.resultSubtitle} ${utilStyles.stripSpace}`}>{p.action.subtitle}</p>
        </Show>
      </div>
      <div>
        <Show when={p.action.shortcut}>
          <KbdShortcut class={styles.resultShortcut} shortcut={p.action.shortcut} />
        </Show>
      </div>
    </li>
  );
};

export interface PanelResultProps {
  activeItemId: ActionId;
  resultsList: WrappedActionList;
  searchInputId: string;
  onActionItemSelect: (action: WrappedAction) => void;
  onActionItemHover: (action: WrappedAction) => void;
}

export const PanelResult: Component<PanelResultProps> = (p) => {
  return (
    <div class={styles.resultWrapper}>
      <ul
        role="listbox"
        aria-labelledby={p.searchInputId}
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
