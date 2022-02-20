import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import styles from './Api.module.css';

const ApiView: Component = () => {
  return (
    <section class={styles.section} data-level="1">
      <h2>API Documentation</h2>
      <section class={styles.section} data-level="2">
        <h3>Root</h3>
        <Snippet snippetId="api-root" />
      </section>
      <section class={styles.section} data-level="2">
        <h3>defineAction</h3>
        <Snippet snippetId="api-define-action" />
      </section>
    </section>
  );
};

export default ApiView;
