import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import docsStyles from '../docsUtils.module.css';

const InstallationView: Component = () => {
  return (
    <section class={docsStyles.section}>
      <h2>Installation</h2>
      <Snippet snippetId="installation-setup" />
    </section>
  );
};

export default InstallationView;
