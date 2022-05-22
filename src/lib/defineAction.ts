import { Action, PartialAction } from './types';

export const defineAction = (partialAction: PartialAction): Action => {
  const id = partialAction.id || Math.random().toString();
  const parentActionId = partialAction.parentActionId || null;
  const title = partialAction.title;
  const subtitle = partialAction.subtitle || null;
  const keywords = partialAction.keywords || [];
  const shortcut = partialAction.shortcut || null;
  const run = partialAction.run;
  const isolateChildren = partialAction.isolateChildren ?? true;

  const normalizedAction = {
    id,
    parentActionId,
    title,
    subtitle,
    keywords,
    shortcut,
    cond: partialAction.cond,
    run,
    isolateChildren,
  } as Action;

  return normalizedAction;
};
