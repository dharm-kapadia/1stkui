/* eslint-disable max-len */
import * as jose from 'jose';

import { refreshToken } from './loginWithCredentials';

let BASE_URL = '';
let PROXY_URL = '';
let FORWARD_KEY = '';
let REPORT_BASE_URL = '';

if (process.env.REACT_APP_DATA_API_URL !== undefined) BASE_URL = process.env.REACT_APP_DATA_API_URL;
if (process.env.REACT_APP_PROXY_API_URL !== undefined) PROXY_URL = process.env.REACT_APP_PROXY_API_URL;
if (process.env.REACT_APP_FORWARD_PUBLIC_KEY !== undefined) FORWARD_KEY = process.env.REACT_APP_FORWARD_PUBLIC_KEY;
if (process.env.REACT_APP_REPORT_API_URL !== undefined) REPORT_BASE_URL = process.env.REACT_APP_REPORT_API_URL;

let token = '';

const getAccessToken = () => {
  return token;
};

const setToken = (vToken) => {
  token = vToken;
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify({ value }));
};

// remove local storage + replace history by login
export const signOut = () => {
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('isPremiumUser');
  localStorage.removeItem('loggedIn');
  window.location.replace('/');
};

// Try Refreshing token
export const tryRefreshToken = () => {
  const localRefreshToken = getAccessToken('refresh_token');
  if (localRefreshToken) {
    refreshToken(localRefreshToken)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          signOut();
          return;
        }
        setItem('access_token', data.access_token);
        setItem('refresh_token', data.refresh_token);
      })
      .catch(() => {
        signOut();
      });
  } else signOut();
};

const getItemFromLS = (key) => {
  const result = localStorage.getItem(key) || '';
  return result;
};

const getProxyForwardToken = async () => {
  const user = jose.decodeJwt(getAccessToken()).preferred_username;
  const secret = jose.base64url.decode(FORWARD_KEY);
  const jwe = await new jose.EncryptJWT({ user, origin: 'dna-ui' })
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('1m')
    .encrypt(secret);

  return jwe;
};

const getAPI = async (url) => {
  let baseUrl = BASE_URL;
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`
  };

  if (url.includes('/user/')) {
    baseUrl = PROXY_URL;
    const proxyForwardHeader = { 'forward-token': await getProxyForwardToken() };

    headers = {
      ...headers,
      ...proxyForwardHeader
    };
  }

  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'GET',
    headers
  });
  // check if user token is valid
  if (!response.ok && response.status === 401) {
    tryRefreshToken();
  }
  return response.json();
};

const getAPIWithCallback = async (url, callBack) => {
  let baseUrl = BASE_URL;
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`
  };

  if (url.includes('/user/')) {
    baseUrl = PROXY_URL;
    const proxyForwardHeader = { 'forward-token': await getProxyForwardToken() };

    headers = {
      ...headers,
      ...proxyForwardHeader
    };
  }

  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'GET',
    headers
  });
  // check if user token is valid
  if (!response.ok && response.status === 401) {
    tryRefreshToken();
  }
  callBack(response.headers.get('Last-Modified'));
  return response.json();
};

const optAPI = async (url) => {
  let headers = {
    Authorization: `Bearer ${getAccessToken()}`
  };

  if (url.includes('/user/')) {
    const proxyForwardHeader = { 'forward-token': await getProxyForwardToken() };

    headers = {
      ...headers,
      ...proxyForwardHeader
    };
  }

  const response = await fetch(`${BASE_URL}/${url}`, {
    method: 'OPTIONS',
    headers
  });
  // check if user token is valid
  if (!response.ok && response.status === 401) {
    tryRefreshToken();
  }
  return response.json();
};

const postAPI = async (url, body) => {
  let baseUrl = BASE_URL;
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`
  };

  if (url.includes('/user/')) {
    baseUrl = PROXY_URL;
    const proxyForwardHeader = { 'forward-token': await getProxyForwardToken() };

    headers = {
      ...headers,
      ...proxyForwardHeader
    };
  }

  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  // check if user token is valid
  if (!response.ok && response.status === 401) {
    tryRefreshToken();
  }
  return response.json();
};

const postDownloadAPI = async (url, body) => {
  const reportUrl = REPORT_BASE_URL;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`
  };

  const response = await fetch(`${reportUrl}/${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  return response;
};

const putAPI = async (url, body) => {
  let baseUrl = BASE_URL;
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`
  };

  if (url.includes('/user/')) {
    baseUrl = PROXY_URL;
    const proxyForwardHeader = { 'forward-token': await getProxyForwardToken() };

    headers = {
      ...headers,
      ...proxyForwardHeader
    };
  }

  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  });
  // check if user token is valid
  if (!response.ok && response.status === 401) {
    tryRefreshToken();
  }
  return response.json();
};

const patchAPI = async (url, body) => {
  let baseUrl = BASE_URL;
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`
  };

  if (url.includes('/user/')) {
    baseUrl = PROXY_URL;
    const proxyForwardHeader = { 'forward-token': await getProxyForwardToken() };

    headers = {
      ...headers,
      ...proxyForwardHeader
    };
  }

  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body)
  });
  // check if user token is valid
  if (!response.ok && response.status === 401) {
    tryRefreshToken();
  }
  return response.json();
};

const deleteAPI = async (url) => {
  let baseUrl = BASE_URL;
  let headers = {
    Authorization: `Bearer ${getAccessToken()}`
  };

  if (url.includes('/user/')) {
    baseUrl = PROXY_URL;
    const proxyForwardHeader = { 'forward-token': await getProxyForwardToken() };

    headers = {
      ...headers,
      ...proxyForwardHeader
    };
  }

  const response = await fetch(`${baseUrl}/${url}`, {
    method: 'DELETE',
    headers
  });
  // check if user token is valid
  if (!response.ok && response.status === 401) {
    tryRefreshToken();
  }
  return response.json();
};

export {
  setToken,
  getAccessToken,
  getItemFromLS,
  getAPI,
  optAPI,
  postAPI,
  putAPI,
  patchAPI,
  deleteAPI,
  getAPIWithCallback,
  postDownloadAPI
};
