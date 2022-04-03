import { Component, For } from 'solid-js';
import { slides } from './data';
import utilStyles from '../../../utils.module.css';
import styles from './ExampleSlider.module.css';

export const ExampleSlider: Component = () => {
  return (
    <div class={styles.slidesWrapper}>
      <For each={slides}>
        {(slide) => (
          <figure class={`${styles.exampleWrapper} ${utilStyles.stripSpace}`}>
            <img
              class={styles.exampleImage}
              src={slide.imgUrl}
              alt={`Command Palette in ${slide.productName}`}
            />
            <figcaption>
              {slide.featureContent}{' '}
              <a
                class={styles.exampleLink}
                href={slide.productUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {slide.productName}
              </a>
            </figcaption>
          </figure>
        )}
      </For>
    </div>
  );
};
