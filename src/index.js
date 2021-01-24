import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { StoreProvider } from './store';
import { homepage } from '../package.json';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Router basename={homepage}>
        <App />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
