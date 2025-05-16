import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import App from './App';
import 'tabulator-tables/dist/css/tabulator.min.css';
import './index.css';

// Microsoft requires to login
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './auth/authConfig';
import { Provider } from 'react-redux';
import Store from './store/store';

const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <MsalProvider instance={msalInstance}>
        <Provider store={Store}>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <App />
          </BrowserRouter>
        </Provider>
      </MsalProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);
