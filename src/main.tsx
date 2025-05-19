import './index.css';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'tabulator-tables/dist/css/tabulator.min.css';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Microsoft requires to login
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './auth/authConfig';

import { Provider } from 'react-redux';
import Store from './store/store';
import { PrimeReactProvider } from 'primereact/api';

// Configuración de MSAL (Microsoft Authentication Library)
const msalInstance = new PublicClientApplication(msalConfig);

// Renderizado de la aplicación
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <GoogleOAuthProvider clientId="850169876551-d5bij8ieqfbdhod0n3t6g2gdq6av3j98.apps.googleusercontent.com">
        <MsalProvider instance={msalInstance}>
          <Provider store={Store}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <App />
            </BrowserRouter>
          </Provider>
        </MsalProvider>
      </GoogleOAuthProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
