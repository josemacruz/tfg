import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './services/redux/store';
import LanguageContext from './LanguageContext/index';

ReactDOM.render(
  <Provider store={store}>
    <LanguageContext>
      <App />
    </LanguageContext>
  </Provider>,
  document.getElementById('root'),
);
