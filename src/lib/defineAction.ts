import { Action, PartialAction } from './types';

const defaultRun: Action['run'] = ({ actionId }) => {
  console.warn(`The triggered action doesn't have a run function. It'll be a noop in production`, {
    actionId,
  });
};

export const defineAction = (partialAction: PartialAction): Action => {
  const id = partialAction.id || Math.random().toString();
  const title = partialAction.title;
  const subtitle = partialAction.subtitle || null;
  const shortcut = partialAction.shortcut || null;
  const run = partialAction.run || defaultRun;

  const normalizedAction = {
    id,
    title,
    subtitle,
    shortcut,
    run,
  };

  return normalizedAction;
};
