import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

axios.defaults.baseURL = 'http://localhost:8000/api/';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
