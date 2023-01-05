import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'themes';
import { HelmetProvider } from 'react-helmet-async';
// import ScrollToTop from './components/ScrollToTop';

// react hot toast
import {Toaster} from 'react-hot-toast'

// locale i18n
import "./i18n";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
          <Toaster position='top-right' />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
