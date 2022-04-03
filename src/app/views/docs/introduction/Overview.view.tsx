import { Component, onMount } from 'solid-js';
import sdk from '@stackblitz/sdk';
import docsStyles from '../docsUtils.module.css';

const OverviewView: Component = () => {
  let exampleElem: HTMLDivElement;

  onMount(() => {
    sdk.embedProjectId(exampleElem, 'solid-command-palette-example-lite', {
      view: 'editor',
      forceEmbedLayout: true,
      openFile: 'src/App.tsx',
      clickToLoad: true,
      height: 600,
    });
  });

  return (
    <section class={docsStyles.section}>
      <h2>Overview</h2>
      <p class={docsStyles.text}>
        Command Palette lets users perform tasks on your app with just keyboard. No need to drag the
        mouse around. Users can fuzzy search to find the action. If the action has a keyboard
        shortcut then they can trigger it from anywhere. This increases their productivity by 10x.
      </p>
      <div class={docsStyles.embedWrapper}>
        <div ref={exampleElem} />
      </div>
    </section>
  );
};

export default OverviewView;
