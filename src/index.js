/* eslint-disable global-require */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

if (process.env.NODE_ENV === 'production') {
  require('../node_modules/topcoder-react-ui-kit/dist/prod/style.css');
} else {
  require('../node_modules/topcoder-react-ui-kit/dist/dev/style.css');
}

import 'styles/main.scss';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

export default App;
