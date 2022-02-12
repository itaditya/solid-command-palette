import { describe, test, vi, expect, beforeAll, afterAll } from 'vitest';
import { GetFormattedShortcut } from './types';

describe('Test KbdShortcut on Mac', () => {
  const originalNavigator = window.navigator;
  const platformSpy = vi.spyOn(window, 'navigator', 'get');
  let getFormattedShortcut: GetFormattedShortcut;

  beforeAll(async () => {
    platformSpy.mockImplementation(() => {
      return {
        ...originalNavigator,
        platform: 'MacIntel',
      };
    });
    const utils = await import('./utils');
    getFormattedShortcut = utils.getFormattedShortcut;
  });

  afterAll(() => {
    platformSpy.mockRestore();
  });

  test('should format $mod as Command key', () => {
    const formattedShortcut = getFormattedShortcut('$mod+s');
    expect(formattedShortcut).toMatchInlineSnapshot(`
      [
        [
          "⌘",
          "s",
        ],
      ]
    `);
  });
});
