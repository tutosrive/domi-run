import { graphConfig } from './authConfig';

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(accessToken) {
  const headers = new Headers();
  console.log('ACCES-TOKEN => ', accessToken);
  const bearer = `Bearer ${accessToken}`;
  sessionStorage.setItem('ms_access_token', accessToken);
  headers.append('Authorization', bearer);
  const options = {
    method: 'GET',
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => {});
}
