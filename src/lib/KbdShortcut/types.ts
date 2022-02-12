import { Action } from '../types';

export type GetFormattedShortcut = (shortcut: Action['shortcut']) => Array<Array<string>>;
