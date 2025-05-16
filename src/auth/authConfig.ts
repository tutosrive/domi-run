/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { LogLevel } from '@azure/msal-browser';

const env: ImportMetaEnv = import.meta.env;

export const msalConfig = {
  auth: {
    clientId: env.VITE_MS_CLIENT_ID,
    authority: env.VITE_MS_AUTHORITY,
    redirectUri: env.VITE_MS_REDIRECT_URI,
    // Not navigate to original prompt login (/login)
    navigateToLoginRequestUrl: env.VITE_MS_NAVIGATE_TO_LOGIN_REQUES_URL,
  },
  cache: {
    cacheLocation: env.VITE_MS_CACHE_LOCATION,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = { scopes: [env.VITE_MS_SCOPES] };

export const graphConfig = { graphMeEndpoint: env.VITE_MS_GRAPH_ME_ENDPOINT };
