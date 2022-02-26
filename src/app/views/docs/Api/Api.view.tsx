import { Navigate } from 'solid-app-router';
import { Component } from 'solid-js';

const ApiView: Component = () => {
  return <Navigate href="/docs/api/root" />;
};

export default ApiView;
