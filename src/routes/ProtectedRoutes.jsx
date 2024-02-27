import PropTypes from 'prop-types';
import { signOut } from 'utils/apiHelper';

const PrivateRoute = ({ isSignedIn, children }) => {
  if (isSignedIn) return children;

  signOut();
  return null;
};

PrivateRoute.propTypes = {
  isSignedIn: PropTypes.bool,
  children: PropTypes.element
};

export default PrivateRoute;
