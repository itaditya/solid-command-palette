import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import docsStyles from '../docsUtils.module.css';

const ApiRootView: Component = () => {
  return (
    <section class={docsStyles.section}>
      <h2>defineAction</h2>
      <p class={docsStyles.text}>It helps you define an action with autocomplete suggestions.</p>
      <Snippet snippetId="api-define-action" />
    </section>
  );
};

export default ApiRootView;
