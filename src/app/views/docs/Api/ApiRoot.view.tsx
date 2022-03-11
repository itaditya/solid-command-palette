import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import docsStyles from '../docsUtils.module.css';

const ApiRootView: Component = () => {
  return (
    <section class={docsStyles.section}>
      <h2>Root</h2>
      <p class={docsStyles.text}>
        It's responsible for wiring up the state provider, event listeners etc to make the Command
        Palette work.
      </p>
      <p class={docsStyles.text}>Render it at the top of your application.</p>
      <Snippet snippetId="api-root" />
    </section>
  );
};

export default ApiRootView;
