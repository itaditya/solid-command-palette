import { Component } from 'solid-js';
import { Snippet } from './Snippet/Snippet';

const ApiView: Component = () => {
  return (
    <section>
      <h2>API World</h2>
      <section>
        <h3 id="root">Root</h3>
        <Snippet snippetId="api-root" />
      </section>
      <section>
        <h3 id="define-action">defineAction</h3>
        <Snippet snippetId="api-define-action" />
      </section>
    </section>
  );
};

export default ApiView;
