import { Navigate } from '@solidjs/router';
import { Component } from 'solid-js';

const DocsView: Component = () => {
  return <Navigate href="/docs/overview" />;
};

export default DocsView;
