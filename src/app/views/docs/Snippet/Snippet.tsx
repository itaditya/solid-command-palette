import { Component, createResource } from 'solid-js';
import styles from './Snippet.module.css';

type SnippetId = string;
type SnippetContent = string;

const snippetsCache = new Map<SnippetId, SnippetContent>();

async function fetchSnippet(snippetId: SnippetId) {
  if (snippetsCache.has(snippetId)) {
    return snippetsCache.get(snippetId);
  }

  const apiUrl = `/snippets/${snippetId}.html`;
  const response = await fetch(apiUrl);
  const snippet = await response.text() as SnippetContent;

  snippetsCache.set(snippetId, snippet);

  return snippet;
}

export interface SnippetProps {
  snippetId: SnippetId;
}

export const Snippet: Component<SnippetProps> = (p) => {
  const [snippet] = createResource(p.snippetId, fetchSnippet);

  return <div class={styles.snippet} data-snippet-id={p.snippetId} innerHTML={snippet()} />;
};
