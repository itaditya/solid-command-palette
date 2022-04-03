import { Component } from 'solid-js';
import { Snippet } from '../Snippet/Snippet';
import docsStyles from '../docsUtils.module.css';

const InstallationView: Component = () => {
  return (
    <div class={docsStyles.section}>
      <section class={docsStyles.section}>
        <h2>Install Packages</h2>
        <Snippet snippetId="installation-packages" />
      </section>
      <br />
      <section class={docsStyles.section}>
        <h2>Define Actions</h2>
        <Snippet snippetId="installation-define-actions" />
      </section>
      <br />
      <section class={docsStyles.section}>
        <h2>Integrate with Components</h2>
        <Snippet snippetId="installation-integrate-components" />
      </section>
    </div>
  );
};

export default InstallationView;
