import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import AuthProvider from './provider/AuthProvider';

import './styles/normalize.css';
import './styles/styles.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

