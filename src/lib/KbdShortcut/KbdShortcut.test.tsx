import { describe, test } from 'vitest';
import { screen, render } from 'solid-testing-library';
// import { KbdShortcut } from './KbdShortcut';

const KbdShortcut = (p) => {
  console.log('props', p);
  return <h2>Hello</h2>;
};

describe('Test Keyboard Shortcut', () => {
  test('should render combined shortcut correctly', () => {
    render(() => <KbdShortcut shortcut="$mod+e" />);
    screen.debug();
  });
});
