import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { StoreProvider } from './store';
import { homepage } from '../package.json';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Router basename={homepage}>
        <App />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.body
);
