import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import { AppProvider } from './contexts/AppContext';
import AppError from './components/AppError/AppError';

ReactDOM.render(
  <AppError>
    <BrowserRouter>
      <AppProvider>    
        <App />
      </AppProvider>
    </BrowserRouter>
  </AppError>,
  document.getElementById('root')
);
