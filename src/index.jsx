import { ReactKeycloakProvider } from '@react-keycloak/web';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';
import keycloak from './Keycloak';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// project import
import { store } from 'store';
import App from './App';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const queryClient = new QueryClient();

/**
 * Call back function to log KeyCloak events
 *
 * @param {string} event    Event name
 * @param {error} error     Error description (if any)
 */
const eventLogger = (event, error) => {
  console.log('onKeycloakEvent', event, error);
};

/**
 * Callback to save login username to localStorage
 *
 * @param {JSON} result    JSON result string with userInfo
 */
const handleUserInfo = (result) => {
  localStorage.setItem('username', result.preferred_username);

  if (result.preferred_username.includes('borrower')) {
    localStorage.setItem('url', process.env.REACT_APP_CONNECTOR_BORROWER_API_URL);
  } else {
    localStorage.setItem('url', process.env.REACT_APP_CONNECTOR_LENDER_API_URL);
  }
};

/**
 * Callback to log KeyCloak tokens and request userInfo
 *
 * @param {JSON} tokens    Tokens returned from KeyCloak
 */
const tokenLogger = (tokens) => {
  console.log(tokens);

  localStorage.setItem('refreshToken', tokens.refreshToken);
  localStorage.setItem('token', tokens.token);
  localStorage.setItem('tokenTimeStamp', new Date().toISOString());

  keycloak.loadUserInfo().then(handleUserInfo);
};

/**
 * ReactKeyCloakProvider init specifications
 *
 */
const initOpts = {
  grant_type: process.env.REACT_APP_KEYCLOAK_GRANT_TYPE,
  client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  checkLoginIframe: false,
  onLoad: 'login-required'
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    LoadingComponent={<Loader />}
    onEvent={eventLogger}
    onTokens={tokenLogger}
    initOptions={initOpts}
  >
    <ReduxProvider store={store}>
      <BrowserRouter basename="/">
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </ReduxProvider>
  </ReactKeycloakProvider>
);
