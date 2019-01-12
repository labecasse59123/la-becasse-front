import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'react/App';

import './style/main.scss';

export default ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
