import { render } from 'solid-js/web';

import App from './App';
import { Router } from '@solidjs/router';

const appRender = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const rootElem = document.getElementById('root') as HTMLElement;

render(appRender, rootElem);
