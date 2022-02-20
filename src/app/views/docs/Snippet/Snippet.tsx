import { Component, createResource } from 'solid-js';
import styles from './Snippet.module.css';

type SnippetId = string;

async function fetchSnippet(snippetId: SnippetId) {
  const apiUrl = `/snippets/${snippetId}.html`;
  const response = await fetch(apiUrl);
  const snippet = await response.text();
  return snippet;
}

export interface SnippetProps {
  snippetId: SnippetId;
}

export const Snippet: Component<SnippetProps> = (p) => {
  const [snippet] = createResource(p.snippetId, fetchSnippet);

  return <div class={styles.snippet} data-snippet-id={p.snippetId} innerHTML={snippet()} />;
};
