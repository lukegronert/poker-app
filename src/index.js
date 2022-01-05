import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import netlifyIdentity from 'netlify-identity-widget'

netlifyIdentity.init();
const user = netlifyIdentity.currentUser();
netlifyIdentity.on('login', user => console.log('login', user));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
