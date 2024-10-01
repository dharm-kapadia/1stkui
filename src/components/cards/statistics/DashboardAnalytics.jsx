import PropTypes from 'prop-types';

// material-ui
import { Icon, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

// project import
import MainCard from 'components/MainCard';

// assets

// ==============================|| STATISTICS ||============================== //

const DashboardAnalytics = ({ title, count, color, cardIcon }) => (
  <MainCard contentSX={{ p: 1.75 }}>
    <Stack spacing={0.5} direction="column">
      <Stack spacing={2} direction="row" alignItems="top" justifyContent="center">
        <Icon>{cardIcon}</Icon>
        <Typography variant="h2" color={color}>
          {title}
        </Typography>
      </Stack>
      <Divider />
      <Typography variant="h2" color="inherit" align="center">
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
