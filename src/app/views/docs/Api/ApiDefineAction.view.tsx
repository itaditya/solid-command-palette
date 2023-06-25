import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import docsStyles from '../docsUtils.module.css';
import { Link } from '@solidjs/router';

const ApiRootView: Component = () => {
  return (
    <section class={docsStyles.section}>
      <h2>defineAction</h2>
      <p class={docsStyles.text}>It helps you define an action with autocomplete suggestions.</p>
      <p class={docsStyles.text}>
        Related actions can be grouped in modules and exported. The combined map of actions is
        passed to <Link href="/docs/api/root">Root</Link>
      </p>
      <Snippet snippetId="api-define-action" />
    </section>
  );
};

export default ApiRootView;
