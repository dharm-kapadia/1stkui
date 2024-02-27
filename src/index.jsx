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

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import { store } from 'store';
import App from './App';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const queryClient = new QueryClient();

const eventLogger = (event, error) => {
  console.log('onKeycloakEvent', event, error);
};

const handleUserInfo = (result) => {
  localStorage.setItem('username', result.preferred_username);
};

const tokenLogger = (tokens) => {
  console.log(tokens);

  localStorage.setItem('idToken', tokens.idToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  localStorage.setItem('token', tokens.token);
  localStorage.setItem('tokenTimeStamp', new Date().toISOString());

  keycloak.loadUserInfo().then(handleUserInfo);
};

const initOpts = {
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
