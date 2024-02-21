import PropTypes from 'prop-types';

// material-ui
import { Icon, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

// project import
import MainCard from 'components/MainCard';

// assets

// ==============================|| STATISTICS ||============================== //

const DashboardAnalytics = ({ title, count, color, cardIcon }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.75}>
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
        <Icon>{cardIcon}</Icon>
        <Typography variant="h2" color={color}>
          {title}
        </Typography>
      </Stack>
      <Divider />
      <Typography variant="h1" color="inherit" align="center">
        {count}
      </Typography>
    </Stack>
  </MainCard>
);

DashboardAnalytics.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  cardIcon: PropTypes.node
};

DashboardAnalytics.defaultProps = {
  color: 'primary'
};

export default DashboardAnalytics;
