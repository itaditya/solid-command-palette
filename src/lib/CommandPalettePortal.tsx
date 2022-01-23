import { Component, createRenderEffect, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';

export const CommandPalettePortal: Component = (p) => {
  let portalElem: HTMLDivElement = null;

  createRenderEffect(() => {
    if (portalElem) {
      return;
    }

    const parent = document.body;
    const newPortalElem = document.createElement('div');
    newPortalElem.classList.add('command-palette-portal');
    parent.appendChild(newPortalElem);
    portalElem = newPortalElem;
  });

  onCleanup(() => {
    if (portalElem) {
      portalElem.remove();
      portalElem = null;
    }
  });

  return <Portal mount={portalElem}>{p.children}</Portal>;
};
