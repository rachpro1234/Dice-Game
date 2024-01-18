import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { HashRouter } from "react-router-dom";


i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HashRouter basename='/Dice-Game'>
          <I18nextProvider i18n={i18next}>
              <App />
          </I18nextProvider>
      </HashRouter>
  </React.StrictMode>,

)
