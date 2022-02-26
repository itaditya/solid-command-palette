import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import apiStyles from './apiUtils.module.css';

const ApiRootView: Component = () => {
  return (
    <section class={apiStyles.section} data-level="2">
      <h2>Root</h2>
      <p>Render this at the top of your application.</p>
      <Snippet snippetId="api-root" />
    </section>
  );
};

export default ApiRootView;
