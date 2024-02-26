let KEYCLOAK_URL = '';
let KEYCLOAK_CLIENT_ID = '';

if (process.env.REACT_APP_KEYCLOAK_URL !== undefined) {
  KEYCLOAK_URL = process.env.REACT_APP_KEYCLOAK_URL;
}
if (process.env.REACT_APP_KEYCLOAK_CLIENT_ID !== undefined) {
  KEYCLOAK_CLIENT_ID = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;
}

const loginWithCredentials = (userName, userPassword) =>
  fetch(KEYCLOAK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=password&client_id=${KEYCLOAK_CLIENT_ID}&username=${userName}&password=${userPassword}`
  });

export default loginWithCredentials;

const refreshToken = (refresh_token) =>
  fetch(KEYCLOAK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ZG5hLXVpOg=='
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`
  });
export { refreshToken };
