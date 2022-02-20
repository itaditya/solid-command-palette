import { Component } from 'solid-js';
import { Snippet } from './Snippet/Snippet';

const ApiView: Component = () => {
  return (
    <div>
      <h2>API World</h2>
      <Snippet snippetId="api-root" />
    </div>
  );
};

export default ApiView;
