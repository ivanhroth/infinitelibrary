import React from 'react';
import ReactDOM from 'react-dom';
//import './reset.css';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';

import configureStore from './store/configureStore';

const store = configureStore();
const result = dotenv.config();
console.log(result);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
