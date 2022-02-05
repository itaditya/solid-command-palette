import { Component, createEffect } from 'solid-js';
import styles from './ScrollAssist.module.css';

type ScrollAssistProps = {
  direction: 'up' | 'down';
  interrupted: boolean;
  onScroll: () => void;
  onResume: () => void;
};

export const ScrollAssist: Component<ScrollAssistProps> = (p) => {
  let isRunning = false;
  let intervalId = null;

  function startSelecting() {
    isRunning = true;

    if (p.interrupted) {
      p.onResume();
    }

    intervalId = setInterval(() => {
      p.onScroll();
    }, 500);
  }

  function stopSelecting() {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = null;
    isRunning = false;
  }

  function handleMouseEnter() {
    if (isRunning) {
      return;
    }

    startSelecting();
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isRunning) {
      return;
    }

    let shouldStop = false;

    if (p.direction === 'up' && event.movementY > 0) {
      shouldStop = true;
    }

    if (p.direction === 'down' && event.movementY < 0) {
      shouldStop = true;
    }

    if (shouldStop) {
      stopSelecting();
    }
  }

  function handleMouseLeave() {
    stopSelecting();
  }

  createEffect(() => {
    if (p.interrupted) {
      stopSelecting();
    }
  });

  return (
    <div
      class={styles.scrollShape}
      data-direction={p.direction}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};
