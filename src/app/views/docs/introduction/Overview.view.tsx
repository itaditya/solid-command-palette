import { Component, onMount } from 'solid-js';
import sdk from '@stackblitz/sdk';
import utilStyles from '../../../utils.module.css';
import docsStyles from '../docsUtils.module.css';

const embedExampleData = {
  projectId: 'solid-command-palette-example-lite',
  initialFile: 'src/App.tsx',
};

const OverviewView: Component = () => {
  let exampleElem: HTMLDivElement;

  onMount(() => {
    sdk.embedProjectId(exampleElem, embedExampleData.projectId, {
      view: 'editor',
      forceEmbedLayout: true,
      openFile: embedExampleData.initialFile,
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

      <h3>Live Example</h3>
      <div>
        <a
          href={`https://stackblitz.com/edit/${embedExampleData.projectId}?file=${embedExampleData.initialFile}`}
          class={utilStyles.demoAction}
          rel="noopener noreferrer"
          target="_blank"
        >
          Open in Stackblitz
        </a>
      </div>
      <div class={docsStyles.embedWrapper}>
        <div ref={exampleElem} />
      </div>
    </section>
  );
};

export default OverviewView;
