import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM || '',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || '',
  clientSecret: process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET || '',
  authType: process.env.REACT_APP_KEYCLOAK_AUTH_TYPE || '',
  grantType: process.env.REACT_APP_KEYCLOAK_GRANT_TYPE || ''
  //  api: process.env.REACT_APP_CONNECTOR_API || ''
});

export default keycloak;
