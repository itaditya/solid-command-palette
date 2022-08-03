import { describe, expect, test } from 'vitest';
import { render } from 'solid-testing-library';
import { KbdShortcut } from './KbdShortcut';

describe('Test <KbdShortcut />', () => {
  test('should render Control K', () => {
    const { container } = render(() => <KbdShortcut shortcut='$mod+k' />);
    expect(container).toHaveTextContent('Ctrlk');
  });
});
