import { Component, JSX, splitProps } from 'solid-js';
import utilStyles from '../../utils.module.css';

export const socialsData = {
  github: {
    href: 'https://github.com/itaditya/solid-command-palette',
    alt: 'Navigate to GitHub',
    icon: 'M12 .3a12 12 0 00-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0012 .3',
  },
  twitter: {
    href: 'https://twitter.com/dev__adi',
    alt: 'Navigate to Twitter',
    icon: 'M12,0.1c-6.7,0-12,5.3-12,12s5.3,12,12,12s12-5.4,12-12S18.6,0.1,12,0.1z M17,9.4v0.4c0,3.8-2.6,8-7.5,8 c-1.5,0-2.9-0.5-4.1-1.3c0.2,0,0.4,0,0.7,0c1.2,0,2.3-0.5,3.3-1.2c-1.1,0-2.1-0.8-2.4-2c0.2,0.1,0.3,0.1,0.5,0.1 c0.2,0,0.5-0.1,0.7-0.1C6.9,13,6,11.9,6,10.5v-0.1c0.3,0.2,0.8,0.4,1.2,0.4c-0.7-0.5-1.2-1.4-1.2-2.3c0-0.5,0.1-1.1,0.3-1.4 c1.3,1.7,3.2,2.8,5.4,2.9c-0.1-0.2-0.1-0.4-0.1-0.6c0-1.6,1.2-2.8,2.7-2.8c0.8,0,1.4,0.3,1.9,0.9C17,7.3,17.6,7,18.1,6.7 c-0.2,0.7-0.6,1.2-1.1,1.6c0.5-0.1,1-0.2,1.5-0.4C18.1,8.4,17.6,8.9,17,9.4z',
  },
};

export interface Props extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  alt: string;
  icon: string;
}

export const SocialIcon: Component<Props> = (p) => {
  const [l, others] = splitProps(p, ['alt', 'icon']);

  return (
    <a
      {...others}
      rel="noopener"
      target="_blank"
    >
      <span class={utilStyles.visuallyHidden}>{l.alt}</span>
      <svg
        class={utilStyles.sizeIconWithFont}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d={l.icon}
        />
      </svg>
    </a>
  );
};
