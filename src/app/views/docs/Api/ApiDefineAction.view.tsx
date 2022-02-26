import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import apiStyles from './apiUtils.module.css';

const ApiRootView: Component = () => {
  return (
    <section class={apiStyles.section} data-level="2">
      <h2>defineAction</h2>
      <p>It helps you define an action with autocomplete suggestions.</p>
      <Snippet snippetId="api-define-action" />
    </section>
  );
};

export default ApiRootView;
