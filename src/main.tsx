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

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="850169876551-d5bij8ieqfbdhod0n3t6g2gdq6av3j98.apps.googleusercontent.com">
      <MsalProvider instance={msalInstance}>
        <Provider store={Store}>
          <PrimeReactProvider value={{ ripple: true }}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <App />
            </BrowserRouter>
          </PrimeReactProvider>
        </Provider>
      </MsalProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);