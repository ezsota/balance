// React
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
// App
import App from './App.jsx'
// Styles
import "bootstrap/dist/css/bootstrap.min.css"; // BS CSS
import 'bootstrap'; // BS JS (POPPER)
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
