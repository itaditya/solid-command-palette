import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import docsStyles from '../docsUtils.module.css';

const ApiCommandPaletteView: Component = () => {
  return (
    <section class={docsStyles.section}>
      <h2>CommandPalette</h2>
      <p class={docsStyles.text}>
        It renders the Command Palette in a portal where users can search for actions and trigger
        them.
      </p>
      <p class={docsStyles.text}>Render it inside Root</p>
      <Snippet snippetId="api-command-palette" />
    </section>
  );
};

export default ApiCommandPaletteView;
