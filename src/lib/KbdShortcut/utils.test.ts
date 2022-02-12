import { describe, test, expect } from 'vitest';
import { getFormattedShortcut } from './utils';

describe('Test KbdShortcut on Mac', () => {
  test('should format combination shortcut correctly', () => {
    const formattedShortcut = getFormattedShortcut('Shift+Alt+k');
    expect(formattedShortcut).toMatchInlineSnapshot(`
      [
        [
          "Shift",
          "Alt",
          "k",
        ],
      ]
    `);
  });

  test('should format sequence shortcut correctly', () => {
    const formattedShortcut = getFormattedShortcut('g h');
    expect(formattedShortcut).toMatchInlineSnapshot(`
      [
        [
          "g",
        ],
        [
          "h",
        ],
      ]
    `);
  });

  test('should format combined shortcut correctly', () => {
    const formattedShortcut = getFormattedShortcut('Control+k f');
    expect(formattedShortcut).toMatchInlineSnapshot(`
      [
        [
          "Ctrl",
          "k",
        ],
        [
          "f",
        ],
      ]
    `);
  });

  test('should format Escape shortcut correctly', () => {
    const formattedShortcut = getFormattedShortcut('Escape q');
    expect(formattedShortcut).toMatchInlineSnapshot(`
      [
        [
          "Esc",
        ],
        [
          "q",
        ],
      ]
    `);
  });
});
