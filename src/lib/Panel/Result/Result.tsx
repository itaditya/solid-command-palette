import { Component, For, Show } from 'solid-js';
import { KbdShortcut } from '../..';
import { ActionId, Action, WrappedActionList } from '../../types';
import utilStyles from '../../utils.module.css';
import styles from './Result.module.css';

export interface Props {
  activeItemId: ActionId;
  resultsList: WrappedActionList;
  searchInputId: string;
  onActionItemSelect: (action: Action) => void;
  onActionItemHover: (action: Action) => void;
}

export const PanelResult: Component<Props> = (p) => {
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
          {(action) => {
            return (
              <li
                role="option"
                class={`${styles.resultItem} ${utilStyles.boxBorder}`}
                classList={{
                  [styles.activeItem]: action.id === p.activeItemId,
                }}
                aria-selected={action.id === p.activeItemId}
                onClick={[p.onActionItemSelect, action]}
                onMouseEnter={[p.onActionItemHover, action]}
                onMouseDown={(event) => {
                  // don't take focus away from search field when item is clicked.
                  event.preventDefault();
                }}
              >
                <div>
                  <h4 class={`${styles.resultTitle} ${utilStyles.stripSpace}`}>{action.title}</h4>
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
  );
};
