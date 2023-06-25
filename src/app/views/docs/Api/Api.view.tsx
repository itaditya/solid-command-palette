import { Navigate } from '@solidjs/router';
import { Component } from 'solid-js';

const ApiView: Component = () => {
  return <Navigate href="/docs/api/define-action" />;
};

export default ApiView;
