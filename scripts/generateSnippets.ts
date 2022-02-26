import path from 'path';
import fs from 'fs/promises';
import { getHighlighter, Highlighter } from 'shiki';

type SnippetId = string;
type SnippetIdList = Array<SnippetId>;

async function getSnippetIdList() {
  const snippetFolderPath = path.join(process.cwd(), 'snippets');
  const snippetFilePaths = await fs.readdir(snippetFolderPath);
  const snippetIdList: SnippetIdList = [];

  snippetFilePaths.forEach((file) => {
    const fileName = path.basename(file);
    const nameEndIndex = fileName.indexOf('.snippet');

    if (nameEndIndex > 0) {
      const snippetId = fileName.substring(0, nameEndIndex);
      snippetIdList.push(snippetId);
    }
  });

  return snippetIdList;
}

async function readPlainSnippet(snippetId: SnippetId) {
  const snippetFilePath = path.join(process.cwd(), 'snippets', `${snippetId}.snippet.tsx`);
  const plainSnippet = await fs.readFile(snippetFilePath, 'utf8');
  return plainSnippet;
}

async function writeHighlightedSnippet(snippetId: SnippetId, highlightedSnippet: string) {
  const snippetFilePath = path.join(process.cwd(), 'public', 'snippets', `${snippetId}.html`);
  await fs.writeFile(snippetFilePath, highlightedSnippet, 'utf8');
}

async function generateSnippet(highlighter: Highlighter, snippetId: SnippetId) {
  const plainSnippet = await readPlainSnippet(snippetId);
  const highlightedSnippet = highlighter.codeToHtml(plainSnippet, {
    lang: 'tsx',
  });
  await writeHighlightedSnippet(snippetId, highlightedSnippet);
}

async function generateSnippets() {
  const highlighter = await getHighlighter({
    theme: 'github-dark',
    langs: ['tsx'],
  });

  const snippetIdList = await getSnippetIdList();

  const promises = snippetIdList.map((snippetId) => {
    return generateSnippet(highlighter, snippetId);
  });

  await Promise.all(promises);
  console.log('Snippets generated!\n', snippetIdList);
}

generateSnippets();
