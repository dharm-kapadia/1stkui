/* eslint-disable max-len */
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

import { User } from '../utils/types';

const IAuthContext = {
  currentUser: User,
  lastUpdateDateTime: Date | null
};

const defaultState = {
  currentUser: {
    userId: '',
    isLoggedIn: false
  },
  setCurrentUser: () => null,
  lastUpdateDateTime: null,
  setUpdateDateTime: () => null
};

const AuthContext = createContext < IAuthContext > defaultState;

const AuthProvider = ({ children }) => {
  const { keycloak } = useKeycloak();

  const [currentUser, setCurrentUser] = useState < User > defaultState.currentUser;
  const [lastUpdateDateTime, setLastUpdateDateTime] = (useState < Date) | (null > defaultState.lastUpdateDateTime);

  const tokenData = keycloak.tokenParsed?.realm_access;

  setCurrentUser({ ...currentUser, username: tokenData.username });
  setLastUpdateDateTime({ ...lastUpdateDateTime, lastUpdateDateTime: tokenData.lastUpdateDateTime });

  const contextValue = useMemo(
    () => ({
      currentUser
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element
};

export default AuthProvider;

export const AuthState = () => useContext(AuthContext);
