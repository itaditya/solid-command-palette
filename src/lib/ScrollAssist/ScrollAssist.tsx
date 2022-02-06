import { Component, createEffect } from 'solid-js';
import styles from './ScrollAssist.module.css';

type ScrollAssistProps = {
  direction: 'up' | 'down';
  status: 'available' | 'running' | 'stopped';
  onNavigate: () => void;
  onStop: () => void;
};

export const ScrollAssist: Component<ScrollAssistProps> = (p) => {
  let intervalId = null;

  function triggerNavigation() {
    p.onNavigate();
  }

  function startSelecting() {
    triggerNavigation();
    intervalId = setInterval(() => {
      if (p.status === 'running') {
        triggerNavigation();
      }
    }, 500);
  }

  function stopSelecting() {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = null;
  }

  function handleMouseEnter() {
    if (p.status === 'available') {
      startSelecting();
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (p.status !== 'running') {
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
      p.onStop();
    }
  }

  function handleMouseLeave() {
    p.onStop();
  }

  createEffect(() => {
    if (p.status === 'stopped') {
      stopSelecting();
    }
  });

  return (
    <div
      class={styles.scrollShape}
      data-direction={p.direction}
      data-status={p.status}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};
