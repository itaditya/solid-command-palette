import { Component, createRenderEffect, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Transition } from 'solid-transition-group';
import { useStore } from './StoreContext';
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

  return <Portal mount={portalElem}>
    <Transition onBeforeEnter={(el) => (el.style.opacity = 0)}
      onEnter={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 400
        });
        a.finished.then(done);
      }}
      onAfterEnter={(el) => (el.style.opacity = 1)}
      onExit={(el, done) => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 400
        });
        a.finished.then(done);
      }}>
      {p.children}
    </Transition>
  </Portal>;
};
