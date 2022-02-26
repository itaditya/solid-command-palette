import path from 'path';
import fs from 'fs/promises';
import { getHighlighter, Highlighter } from 'shiki';

type Snippet = {
  id: string;
  lang: string;
};
type SnippetList = Array<Snippet>;

async function getSnippetList() {
  const snippetFolderPath = path.join(process.cwd(), 'snippets');
  const snippetFilePaths = await fs.readdir(snippetFolderPath);
  const snippetIdList: SnippetList = [];

  snippetFilePaths.forEach((file) => {
    const fileName = path.basename(file);
    const [id, lang] = fileName.split('.snippet.');

    if (id && lang) {
      snippetIdList.push({
        id,
        lang,
      });
    }
  });

  return snippetIdList;
}

async function readPlainSnippet(snippet: Snippet) {
  const { id, lang } = snippet;
  const snippetFilePath = path.join(process.cwd(), 'snippets', `${id}.snippet.${lang}`);
  const plainSnippet = await fs.readFile(snippetFilePath, 'utf8');
  return plainSnippet;
}

async function writeHighlightedSnippet(snippet: Snippet, highlightedSnippet: string) {
  const snippetFilePath = path.join(process.cwd(), 'public', 'snippets', `${snippet.id}.html`);
  await fs.writeFile(snippetFilePath, highlightedSnippet, 'utf8');
}

async function generateSnippet(highlighter: Highlighter, snippet: Snippet) {
  const plainSnippet = await readPlainSnippet(snippet);
  const highlightedSnippet = highlighter.codeToHtml(plainSnippet, {
    lang: snippet.lang,
  });
  await writeHighlightedSnippet(snippet, highlightedSnippet);
}

async function generateSnippets() {
  const highlighter = await getHighlighter({
    theme: 'github-dark',
    langs: ['tsx', 'sh'],
  });

  const snippetList = await getSnippetList();

  const promises = snippetList.map((snippet) => {
    return generateSnippet(highlighter, snippet);
  });

  await Promise.all(promises);
  console.log('Snippets generated!\n', snippetList);
}

generateSnippets();
