import { Component } from 'solid-js';
import { Navigate } from 'solid-app-router';

const DocsView: Component = () => {
  return <Navigate href="/docs/overview" />;
};

export default DocsView;
